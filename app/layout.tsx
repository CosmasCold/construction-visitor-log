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
  title: "SiteSafe – Smart Visitor Management",
  description:
    "Replace paper sign‑in sheets with a secure, digital check‑in for any workplace. Real‑time dashboard, audit‑ready exports, and customizable policy acknowledgments.",
  openGraph: {
    title: "SiteSafe – Smart Visitor Management",
    description:
      "Replace paper sign‑in sheets with a secure, digital check‑in for any workplace.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  icons: {
    icon: "/favicon.svg",
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
    <header className="bg-gradient-to-b from-black/30 to-transparent backdrop-blur-lg border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14 sm:h-16">
        <Link
          href={logoHref}
          className="flex items-center gap-2 text-white font-semibold text-base sm:text-lg tracking-tight hover:text-sky-300 transition-colors duration-150 shrink-0"
        >
          <Image
            src="/favicon.svg"
            alt="SiteSafe"
            width={28}
            height={28}
            className="h-7 w-auto sm:h-8"
          />
          <span className="hidden sm:inline">SiteSafe</span>
        </Link>
        <nav className="flex gap-3 sm:gap-4 text-xs sm:text-sm items-center flex-wrap justify-end">
          {session ? (
            <>
              <Link
                href={logoHref}
                className="text-slate-300 hover:text-white transition-colors duration-150 whitespace-nowrap"
              >
                Dashboard
              </Link>
              {session.user?.role === "super_admin" && (
                <Link
                  href="/admin"
                  className="text-slate-300 hover:text-white transition-colors duration-150 whitespace-nowrap"
                >
                  Admin
                </Link>
              )}
              <Link
                href="/settings"
                className="text-slate-300 hover:text-white transition-colors duration-150 whitespace-nowrap"
              >
                Settings
              </Link>
              <form action="/api/auth/signout" method="POST">
                <button
                  type="submit"
                  className="text-slate-300 hover:text-white bg-transparent border-none cursor-pointer text-xs sm:text-sm transition-colors duration-150 whitespace-nowrap"
                >
                  Logout
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/"
                className="text-slate-300 hover:text-white transition-colors duration-150 whitespace-nowrap"
              >
                Home
              </Link>
              <Link
                href="/admin/login"
                className="text-slate-300 hover:text-white transition-colors duration-150 whitespace-nowrap"
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="text-sm text-center sm:text-left">
          &copy; {new Date().getFullYear()} SiteSafe. All rights reserved.
        </div>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
          <Link href="/terms" className="hover:text-white transition-colors duration-150">
            Terms of Service
          </Link>
          <Link href="/privacy" className="hover:text-white transition-colors duration-150">
            Privacy Policy
          </Link>
          <Link href="/blog" className="hover:text-white transition-colors duration-150">
            Blog
          </Link>
          <Link href="/docs" className="hover:text-white transition-colors duration-150">
            API Docs
          </Link>
          <Link href="/faq" className="text-sky-400 hover:text-sky-300 transition-colors duration-150 inline-flex items-center gap-1">
            <span className="text-lg leading-none">?</span> FAQ
          </Link>
          <Link href="/compare" className="hover:text-white transition-colors duration-150">
            Compare
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
        {/* Crisp chat widget */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              window.$crisp = [];
              window.CRISP_WEBSITE_ID = "9ecf2637-4b7e-4c6d-8e92-5326ce566ebc";
              (function() {
                var d = document;
                var s = d.createElement("script");
                s.src = "https://client.crisp.chat/l.js";
                s.async = 1;
                d.getElementsByTagName("head")[0].appendChild(s);
              })();
            `,
          }}
        />
        {/* Structured data for SiteSafe */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "SiteSafe",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              description:
                "Smart Visitor Management for construction sites, warehouses, and offices. QR check‑in, real‑time dashboard, audit‑ready exports.",
              offers: {
                "@type": "Offer",
                price: "49.00",
                priceCurrency: "USD",
                priceValidUntil: "2027-12-31",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5",
                reviewCount: "1",
              },
              url: "https://sitesafe.thesift.space",
            }),
          }}
        />
      </body>
    </html>
  );
}