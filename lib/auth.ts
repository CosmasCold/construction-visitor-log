// lib/auth.ts
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";
import { signInLimiter } from "./ratelimit";
import { sendWelcomeEmail } from "./email";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
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
      if (account?.provider !== "google" || !user.email) {
        return true;
      }

      try {
        const existingCompany = await prisma.company.findUnique({
          where: { email: user.email },
        });

        if (existingCompany) {
          // Reactivate trial if expired
          if (!existingCompany.trialEndsAt || existingCompany.trialEndsAt < new Date()) {
            await prisma.company.update({
              where: { id: existingCompany.id },
              data: { trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) },
            });
          }

          // Ensure there is at least one default site
          const existingSites = await prisma.site.findMany({
            where: { companyId: existingCompany.id },
            take: 1,
          });
          if (existingSites.length === 0) {
            await prisma.site.create({
              data: {
                name: "Default Site",
                slug: existingCompany.slug + "-default",
                companyId: existingCompany.id,
              },
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
        } else {
          // Create new company with unique slug
          const baseSlug = user.email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "-");
          let slug = baseSlug;
          let counter = 1;
          while (await prisma.company.findUnique({ where: { slug } })) {
            slug = `${baseSlug}-${counter++}`;
          }

          const company = await prisma.company.create({
            data: {
              name: `${user.name || "My"} Company`,
              slug,
              email: user.email,
              region: "en",
              trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
            },
          });

          await prisma.site.create({
            data: {
              name: "Default Site",
              slug: slug + "-default",
              companyId: company.id,
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

          // Send welcome email
          await sendWelcomeEmail(user.email, `${process.env.NEXTAUTH_URL}/dashboard`, "en");

          await prisma.company.update({
            where: { id: company.id },
            data: { trialEmailSequence: { push: "welcome" } },
          });
        }
      } catch (error) {
        console.error("signIn callback error:", error);
        return false;
      }

      return true;
    },

    async jwt({ token, user, account }) {
      if (user && account) {
        const email = user.email ?? token.email;
        if (email) {
          const dbUser = await prisma.user.findUnique({
            where: { email },
            select: { role: true, companyId: true },
          });
          if (dbUser) {
            token.role = dbUser.role;
            token.companyId = dbUser.companyId ?? undefined;
          }
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