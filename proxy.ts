// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ token }) {
      return !!token; // only allow authenticated users
    },
  },
});

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/api/sites/:path*"],
};