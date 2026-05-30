// proxy.ts
import { withAuth } from "next-auth/middleware";

export const proxy = withAuth({
  callbacks: {
    authorized({ token }) {
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/admin/:path*"],
};