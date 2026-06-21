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

      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
        select: { id: true, companyId: true },
      });

      const createCompany = (name: string) =>
        prisma.company.create({
          data: {
            name,
            slug: user.email!.split("@")[0],
            email: user.email!,
            trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          },
        });

      if (!existingUser) {
        const company = await createCompany(`${user.name || "My"} Company`);
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
      } else if (!existingUser.companyId) {
        const company = await createCompany(`${user.name || "My"} Company`);
        await prisma.user.update({
          where: { id: existingUser.id },
          data: { companyId: company.id },
        });
      }
      return true;
    },

    async jwt({ token, user, account }) {
      // On first sign‑in (or token refresh), pull fresh data from DB
      if (user && account) {
        // Use user.email (always present) instead of token.email (which might be undefined)
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