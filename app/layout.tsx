// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import CookieBanner from "@/components/CookieBanner";

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
        <link rel="alternate" hrefLang="en" href="https://sitesafe.thesift.space/" />
        <link rel="alternate" hrefLang="pt-BR" href="https://sitesafe.thesift.space/br" />
        <link rel="alternate" hrefLang="x-default" href="https://sitesafe.thesift.space/" />
      </head>
      <script src="https://analytics.ahrefs.com/analytics.js" data-key="0KWpb4lQa7ZMwscJ/c+npA" async></script>
      <body className="relative flex flex-col min-h-screen">
        <div className="bg-premium" />
        <main className="flex-1">{children}</main>
        <Analytics />
        <Script src="/crisp-init.js" strategy="lazyOnload" />
        <ExitIntentPopup />
        {children}
  <CookieBanner />
      </body>
    </html>
  );
}