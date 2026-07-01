import type { Metadata } from "next";
import { cookies } from "next/headers";
import FeaturesClient from "./FeaturesClient";

export const metadata: Metadata = {
  title: "Features — SiteSafe Visitor Management",
  description:
    "QR check-in, safety briefings, watchlist screening, lockdown mode, emergency evacuation lists, audit exports, and more. All included for $49/mo across 20 sites.",
  openGraph: {
    title: "Features — SiteSafe Visitor Management",
    description: "Everything you need to replace paper logs across 20 sites. Flat $49/mo.",
    images: ["/dash.png"],
  },
};

export default async function FeaturesPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";

  return <FeaturesClient locale={locale} />;
}