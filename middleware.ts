import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Never redirect /br, /api, /checkin, /admin, /dashboard, static files
  if (
    pathname.startsWith("/br") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/checkin") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/settings") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }
  
  // Check for PT locale cookie
  const locale = request.cookies.get("sitesafe-locale")?.value;
  
  // If user has PT cookie, redirect to /br version
  if (locale === "pt") {
    const url = request.nextUrl.clone();
    url.pathname = `/br${pathname}`;
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|checkin|admin|dashboard|settings).*)"],
};