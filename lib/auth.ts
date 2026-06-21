// lib/auth.ts
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";
import { signInLimiter } from "./ratelimit";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Admin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const ip =
          req?.headers?.["x-forwarded-for"]?.split(",")[0]?.trim() ?? "unknown";
        const { success } = await signInLimiter.limit(ip);
        if (!success) {
          throw new Error("Too many login attempts. Please try again later.");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.passwordHash) return null;

        if (!user.verified) {
          throw new Error("Please verify your email before logging in. Check your inbox.");
        }

        const passwordValid = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );
        if (!passwordValid) return null;

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          companyId: user.companyId ?? undefined,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log("signIn callback:", { provider: account?.provider, email: user.email });

      if (account?.provider !== "google" || !user.email) {
        console.log("Not a Google sign-in or missing email, skipping");
        return true; // allow credentials / other providers
      }

      try {
        const existingCompany = await prisma.company.findUnique({
          where: { email: user.email },
        });

        if (existingCompany) {
          console.log("Found existing company:", existingCompany.name);

          // Reactivate trial if expired
          if (!existingCompany.trialEndsAt || existingCompany.trialEndsAt < new Date()) {
            console.log("Reactivating trial for company");
            await prisma.company.update({
              where: { id: existingCompany.id },
              data: { trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) },
            });
          }

          // Link or create user
          await prisma.user.upsert({
            where: { email: user.email },
            create: {
              email: user.email,
              name: user.name,
              image: user.image,
              emailVerified: new Date(),
              passwordHash: null,
              verified: true,
              role: "company_owner",
              companyId: existingCompany.id,
            },
            update: {
              companyId: existingCompany.id,
              role: "company_owner",
            },
          });

          console.log("User linked to existing company");
        } else {
          // Create new company with unique slug
          const baseSlug = user.email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "-");
          let slug = baseSlug;
          let counter = 1;
          while (await prisma.company.findUnique({ where: { slug } })) {
            slug = `${baseSlug}-${counter++}`;
          }

          console.log("Creating new company with slug:", slug);
          const company = await prisma.company.create({
            data: {
              name: `${user.name || "My"} Company`,
              slug,
              email: user.email,
              trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
            },
          });

          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              image: user.image,
              emailVerified: new Date(),
              passwordHash: null,
              verified: true,
              role: "company_owner",
              companyId: company.id,
            },
          });

          console.log("New user and company created");
        }
      } catch (error) {
        console.error("signIn callback error:", error);
        return false; // block sign-in
      }

      return true;
    },

    async jwt({ token, user, account }) {
      console.log("jwt callback:", { tokenEmail: token.email, userEmail: user?.email, provider: account?.provider });

      if (user && account) {
        // After first sign-in, ensure token has correct companyId
        const email = user.email ?? token.email;
        if (email) {
          const dbUser = await prisma.user.findUnique({
            where: { email },
            select: { role: true, companyId: true },
          });
          if (dbUser) {
            token.role = dbUser.role;
            token.companyId = dbUser.companyId ?? undefined;
            console.log("jwt token updated with companyId:", token.companyId);
          } else {
            console.log("User not found in DB during jwt callback");
          }
        }
      }
      return token;
    },

    async session({ session, token }) {
      console.log("session callback:", { tokenCompanyId: token.companyId });
      if (session.user) {
        session.user.role = token.role;
        session.user.companyId = token.companyId;
        session.user.email = token.email;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
    signOut: "/auth/signout",
  },
  secret: process.env.NEXTAUTH_SECRET,
};