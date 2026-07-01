import type { Metadata } from "next";
import { cookies } from "next/headers";
import PricingClient from "./PricingClient";

export const metadata: Metadata = {
  title: "Visitor Management Pricing — $49/mo Flat for 20 Sites | SiteSafe",
  description:
    "Transparent visitor management pricing. $49/month flat for up to 20 sites, unlimited visitors. No per-location fees. 14-day free trial, no credit card, no sales calls.",
  alternates: {
    canonical: "https://sitesafe.thesift.space/pricing",
  },
  openGraph: {
    title: "Visitor Management Pricing — $49/mo Flat for 20 Sites | SiteSafe",
    description:
      "Transparent visitor management pricing. $49/month flat for up to 20 sites. No per-location fees. 14-day free trial.",
    url: "https://sitesafe.thesift.space/pricing",
    images: [
      {
        url: "https://sitesafe.thesift.space/og-image.png",
        width: 1200,
        height: 630,
        alt: "SiteSafe Pricing — $49/mo for 20 Sites",
      },
    ],
  },
};

export default async function PricingPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";

  return <PricingClient locale={locale} />;
}