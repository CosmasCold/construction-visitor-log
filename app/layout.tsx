// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "SiteSafe – Construction Visitor Log",
  description:
    "Digital check‑in for construction sites. Replace paper logs with an audit‑ready visitor management system.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Dynamic logo link
  let logoHref = "/";
  if (session?.user) {
    if (session.user.role === "super_admin") {
      logoHref = "/admin";
    } else if (session.user.role === "company_owner") {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email! },
        include: { company: { select: { slug: true } } },
      });
      logoHref = user?.company?.slug
        ? `/dashboard?slug=${user.company.slug}`
        : "/dashboard";
    }
  }

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <header className="bg-black/30 backdrop-blur-md border-b border-white/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-14">
            <Link
              href={logoHref}
              className="text-white font-semibold text-lg tracking-tight hover:text-sky-300 transition-colors"
            >
              SiteSafe
            </Link>
            <nav className="flex gap-4 text-sm items-center">
              {session ? (
                <>
                  <Link
                    href={logoHref}
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    Dashboard
                  </Link>
                  {session.user?.role === "super_admin" && (
                    <Link
                      href="/admin"
                      className="text-slate-300 hover:text-white transition-colors"
                    >
                      Admin
                    </Link>
                  )}
                  <Link
                    href="/settings"
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    Settings
                  </Link>
                  <form action="/api/auth/signout" method="POST">
                    <button
                      type="submit"
                      className="text-slate-300 hover:text-white bg-transparent border-none cursor-pointer text-sm"
                    >
                      Logout
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link
                    href="/"
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                  <Link
                    href="/admin/login"
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    Sign in
                  </Link>
                </>
              )}
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="bg-black/20 border-t border-white/5 text-slate-400 py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm">
              &copy; {new Date().getFullYear()} SiteSafe. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <a
                href="mailto:cloudandclipboard@gmail.com"
                className="hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}