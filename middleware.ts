// middleware.ts
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/admin/:path*"],  // protect everything under /admin except the login page
};