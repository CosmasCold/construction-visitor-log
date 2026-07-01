import type { Metadata } from "next";
import { cookies } from "next/headers";
import TermsClient from "./TermsClient";

export const metadata: Metadata = {
  title: "Terms of Service — SiteSafe",
  description:
    "Terms of Service for SiteSafe — the smart visitor management platform for multi-site teams.",
};

export default async function TermsPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";

  return <TermsClient locale={locale} />;
}