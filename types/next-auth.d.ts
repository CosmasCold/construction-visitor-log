import "next-auth";

declare module "next-auth" {
  interface User {
    role?: string;
    companyId?: string;
  }

  interface Session {
    user: {
      role?: string;
      companyId?: string;
      email?: string | null;   // ✅ allow email
      name?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    companyId?: string;
    email?: string | null;
  }
}