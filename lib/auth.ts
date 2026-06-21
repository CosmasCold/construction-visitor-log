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

        // Rate limiter (unchanged)
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
      if (account?.provider === "google" && user.email) {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
          select: { id: true, companyId: true },
        });

        if (!existingUser) {
          // First Google sign‑in: create user + default company
          const company = await prisma.company.create({
            data: {
              name: `${user.name || "My"} Company`,
              slug: user.email.split("@")[0],
              email: user.email,
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
        } else if (!existingUser.companyId) {
          // Existing user without company – create one
          const company = await prisma.company.create({
            data: {
              name: `${user.name || "My"} Company`,
              slug: user.email.split("@")[0],
              email: user.email,
            },
          });

          await prisma.user.update({
            where: { id: existingUser.id },
            data: { companyId: company.id },
          });
        }
        // if user already exists and has a company, just sign in
      }
      return true;
    },

    async jwt({ token, user, account }) {
      // On first sign‑in, enrich token with DB fields
      if (user && account) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email! },
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