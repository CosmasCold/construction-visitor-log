// lib/auth.ts
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin",
      credentials: {
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Check against the environment variable
        if (credentials?.password === process.env.ADMIN_PASSWORD) {
          return { id: "admin", name: "Site Manager" };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",  // custom login page
  },
  secret: process.env.NEXTAUTH_SECRET,
};