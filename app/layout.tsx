// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import NavWrapper from "@/components/NavWrapper";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "SiteSafe – Smart Visitor Management",
  description:
    "Smart visitor management for construction sites, warehouses, and offices. QR check‑in, real‑time dashboard, audit‑ready exports.",
  openGraph: {
    title: "SiteSafe – Smart Visitor Management",
    description:
      "Smart visitor management for construction sites, warehouses, and offices.",
    type: "website",
    url: "https://sitesafe.thesift.space",
    images: [{ url: "https://sitesafe.thesift.space/og-image.png", width: 1200, height: 630 }],
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
                href="/features"
                className="text-slate-300 hover:text-white transition-colors duration-150 whitespace-nowrap"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="text-slate-300 hover:text-white transition-colors duration-150 whitespace-nowrap"
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="text-slate-300 hover:text-white transition-colors duration-150 whitespace-nowrap"
              >
                About
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center text-xs text-slate-500">
          Encrypted data · GDPR / LGPD ready · No third‑party ad trackers
        </div>

        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
          <Link href="/terms" className="hover:text-white transition-colors duration-150">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-white transition-colors duration-150">Privacy Policy</Link>
          <Link href="/blog" className="hover:text-white transition-colors duration-150">Blog</Link>
          <Link href="/docs" className="hover:text-white transition-colors duration-150">API Docs</Link>
          <Link href="/features" className="hover:text-white transition-colors duration-150">Features</Link>
          <Link href="/integrations" className="hover:text-white transition-colors duration-150">Integrations</Link>
          <Link href="/faq" className="text-sky-400 hover:text-sky-300 transition-colors duration-150 inline-flex items-center gap-1">
            <span className="text-lg leading-none">?</span> FAQ
          </Link>
          <Link href="/compare" className="hover:text-white transition-colors duration-150">Compare</Link>
          <Link href="/changelog" className="hover:text-white transition-colors duration-150">Changelog</Link>
          <Link href="/pricing" className="hover:text-white transition-colors duration-150">Pricing</Link>
          <Link href="/locations" className="hover:text-white transition-colors duration-150">Locations</Link>
          <Link href="/press" className="hover:text-white transition-colors duration-150">Press</Link>
          <a
            href="https://x.com/sitesafehq"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-150"
            aria-label="SiteSafe on X"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/company/sitesafe-smart-visitor-management"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-150"
            aria-label="SiteSafe on LinkedIn"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <Link href="/about" className="hover:text-white transition-colors duration-150">About</Link>
          <Link href="/security" className="hover:text-white transition-colors duration-150">Security</Link>
          <Link href="/contact" className="hover:text-white transition-colors duration-150">Contact</Link>
          <a
            href="mailto:hello@sitesafe.thesift.space"
            className="hover:text-white transition-colors duration-150"
          >
            Email
          </a>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-slate-500">
          <span>Proudly built with</span>
          <div className="flex items-center gap-3">
            <span className="bg-white/10 px-2 py-0.5 rounded">Neon</span>
            <span className="bg-white/10 px-2 py-0.5 rounded">Vercel</span>
            <span className="bg-white/10 px-2 py-0.5 rounded">Brevo</span>
            <span className="bg-white/10 px-2 py-0.5 rounded">Upstash</span>
          </div>
        </div>

        <div className="text-sm text-center">
          &copy; {new Date().getFullYear()} SiteSafe. All rights reserved.
        </div>
      </div>
    </footer>
  );

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SiteSafe",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Smart visitor management for construction sites, warehouses, and offices. QR check‑in, real‑time dashboard, audit‑ready exports.",
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
  };

  return (
    <html lang="en">
      <head>
        // app/layout.tsx — inside <head>
<script
  dangerouslySetInnerHTML={{
    __html: `
      _linkedin_partner_id = "10468409";
      window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
      window._linkedin_data_partner_ids.push(_linkedin_partner_id);
      (function(l) {
        if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
        window.lintrk.q=[]}
        var s = document.getElementsByTagName("script")[0];
        var b = document.createElement("script");
        b.type = "text/javascript";b.async = true;
        b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
        s.parentNode.insertBefore(b, s);
      })(window.lintrk);
    `,
  }}
/>
<noscript>
  <img
    height="1"
    width="1"
    style={{ display: "none" }}
    alt=""
    src="https://px.ads.linkedin.com/collect/?pid=10468409&fmt=gif"
  />
</noscript>
        <link rel="preconnect" href="https://saasdb.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fazier.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.saashub.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.youtube.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://client.crisp.chat" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/hero-bg.webp" fetchPriority="high" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <script src="https://analytics.ahrefs.com/analytics.js" data-key="0KWpb4lQa7ZMwscJ/c+npA" async></script>
      <body className="relative flex flex-col min-h-screen">
        {/* ── Premium background (GPU‑safe, static) ── */}
        <div className="bg-premium" />

        <NavWrapper header={header} footer={footer}>
          <main className="flex-1">{children}</main>
        </NavWrapper>
        <Analytics />
        <Script src="/crisp-init.js" strategy="lazyOnload" />
        <ExitIntentPopup />
      </body>
    </html>
  );
}