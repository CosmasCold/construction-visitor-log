// lib/auth.ts
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";
import { signInLimiter } from "./ratelimit";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        // ---------- rate limit ----------
        const ip =
          req?.headers?.["x-forwarded-for"]?.split(",")[0]?.trim() ?? "unknown";
        const { success } = await signInLimiter.limit(ip);
        if (!success) {
          throw new Error("Too many login attempts. Please try again later.");
        }
        // -------------------------------

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

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
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.companyId = user.companyId;
        token.email = user.email;
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