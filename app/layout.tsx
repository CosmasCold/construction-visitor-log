// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import NavWrapper from "@/components/NavWrapper";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "SiteSafe – Construction Visitor Log",
  description:
    "Digital check‑in for construction sites. Replace paper logs with an audit‑ready visitor management system.",
  openGraph: {
    title: "SiteSafe – Construction Visitor Log",
    description:
      "Digital check‑in for construction sites. Replace paper logs with an audit‑ready visitor management system.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  icons: {
    icon: "/logo.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

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

  const header = (
    <header className="bg-black/20 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-14">
        <Link
          href={logoHref}
          className="flex items-center gap-2 text-white font-semibold text-lg tracking-tight hover:text-sky-300 transition-colors duration-150"
        >
          <Image
            src="/logo.png"
            alt="SiteSafe"
            width={32}
            height={32}
            className="h-8 w-auto"
          />
          <span>SiteSafe</span>
        </Link>
        <nav className="flex gap-4 text-sm items-center">
          {session ? (
            <>
              <Link
                href={logoHref}
                className="text-slate-300 hover:text-white transition-colors duration-150"
              >
                Dashboard
              </Link>
              {session.user?.role === "super_admin" && (
                <Link
                  href="/admin"
                  className="text-slate-300 hover:text-white transition-colors duration-150"
                >
                  Admin
                </Link>
              )}
              <Link
                href="/settings"
                className="text-slate-300 hover:text-white transition-colors duration-150"
              >
                Settings
              </Link>
              <form action="/api/auth/signout" method="POST">
                <button
                  type="submit"
                  className="text-slate-300 hover:text-white bg-transparent border-none cursor-pointer text-sm transition-colors duration-150"
                >
                  Logout
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/"
                className="text-slate-300 hover:text-white transition-colors duration-150"
              >
                Home
              </Link>
              <Link
                href="/admin/login"
                className="text-slate-300 hover:text-white transition-colors duration-150"
              >
                Sign in
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );

  const footer = (
    <footer className="bg-black/20 border-t border-white/5 text-slate-400 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-sm">
          &copy; {new Date().getFullYear()} SiteSafe. All rights reserved.
        </div>
        <div className="flex gap-6 text-sm">
          <Link href="/terms" className="hover:text-white transition-colors duration-150">
            Terms of Service
          </Link>
          <Link href="/privacy" className="hover:text-white transition-colors duration-150">
            Privacy Policy
          </Link>
          <Link href="/blog" className="hover:text-white transition-colors duration-150">
            Blog
          </Link>
          <a
            href="mailto:cloudandclipboard@gmail.com"
            className="hover:text-white transition-colors duration-150"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <NavWrapper header={header} footer={footer}>
          <main className="flex-1">{children}</main>
        </NavWrapper>
        <Analytics />
      </body>
    </html>
  );
}