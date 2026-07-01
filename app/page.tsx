import type { Metadata } from "next";
import { cookies } from "next/headers";
import LandingClient from "./LandingClient";

export const metadata: Metadata = {
  title: "SiteSafe: Best Visitor Management System for Multi-Site Teams (2026)",
  description:
    "The best visitor management system for 20-site teams. Flat $49/mo. QR check-in, safety briefings, audit exports, watchlist & lockdown. 14-day free trial — no credit card.",
  alternates: {
    canonical: "https://sitesafe.thesift.space",
  },
  openGraph: {
    title: "SiteSafe: Best Visitor Management System for Multi-Site Teams (2026)",
    description:
      "Flat $49/mo for up to 20 sites. QR check-in, safety briefings, audit exports. 14-day free trial, no credit card.",
    url: "https://sitesafe.thesift.space",
    siteName: "SiteSafe",
    images: [
      {
        url: "https://sitesafe.thesift.space/og-image.png",
        width: 1200,
        height: 630,
        alt: "SiteSafe — Best Visitor Management System for 20 Sites",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SiteSafe: Best Visitor Management System for Multi-Site Teams (2026)",
    description:
      "Flat $49/mo for up to 20 sites. QR check-in, safety briefings, audit exports. 14-day free trial, no credit card.",
    images: ["https://sitesafe.thesift.space/og-image.png"],
  },
};

export default async function LandingPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";

  return <LandingClient locale={locale} />;
}