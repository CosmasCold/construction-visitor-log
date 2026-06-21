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
      if (account?.provider !== "google" || !user.email) return false;

      // Find an existing company with this email (could be from a previous signup)
      const existingCompany = await prisma.company.findUnique({
        where: { email: user.email },
      });

      if (existingCompany) {
        // Ensure the company's trial is active (reset to 14 days if it expired)
        if (!existingCompany.trialEndsAt || existingCompany.trialEndsAt < new Date()) {
          await prisma.company.update({
            where: { id: existingCompany.id },
            data: { trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) },
          });
        }

        // Create the user and link to this existing company
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
      } else {
        // No company exists – create a new one with a unique slug
        const baseSlug = user.email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "-");
        let slug = baseSlug;
        let counter = 1;

        // Ensure slug uniqueness
        while (await prisma.company.findUnique({ where: { slug } })) {
          slug = `${baseSlug}-${counter++}`;
        }

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
      }

      return true;
    },

    async jwt({ token, user, account }) {
      if (user && account) {
        // After sign in, always fetch the latest companyId from DB
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email ?? token.email! },
          select: { role: true, companyId: true },
        });
        if (dbUser) {
          token.role = dbUser.role;
          token.companyId = dbUser.companyId ?? undefined;
        }
      }
      return token;
    },

    async session({ session, token }) {
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