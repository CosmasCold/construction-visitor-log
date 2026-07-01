import type { Metadata } from "next";
import { cookies } from "next/headers";
import FAQClient from "./FAQClient";

export const metadata: Metadata = {
  title: "FAQ — SiteSafe Visitor Management",
  description:
    "Common questions about SiteSafe pricing, features, security, and setup. $49/month for up to 20 sites, 14-day free trial, no credit card required.",
  openGraph: {
    title: "FAQ — SiteSafe",
    description: "Answers to every question about SiteSafe. No sales calls needed.",
  },
};

export default async function FAQPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";

  return <FAQClient locale={locale} />;
}