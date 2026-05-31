// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ token }) {
      return !!token;
    },
  },
});

export const config = {
  matcher: [
    "/admin/((?!login).*)", // protects /admin/* but skips /admin/login
    "/dashboard/:path*",
    "/api/sites/:path*",
  ],
};