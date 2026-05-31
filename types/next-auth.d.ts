import "next-auth";

declare module "next-auth" {
  interface User {
    role?: string;
    siteId?: string;       // keep if still used
    companyId?: string;
  }

  interface Session {
    user: {
      role?: string;
      siteId?: string;
      companyId?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    siteId?: string;
    companyId?: string;
  }
}