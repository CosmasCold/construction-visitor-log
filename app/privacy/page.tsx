import type { Metadata } from "next";
import { cookies } from "next/headers";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Privacy Policy — SiteSafe",
  description:
    "How SiteSafe collects, uses, and protects your data. GDPR, LGPD, and SOC 2 compliant visitor management.",
};

export default async function PrivacyPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";

  return <PrivacyClient locale={locale} />;
}