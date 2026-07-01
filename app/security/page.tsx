import type { Metadata } from "next";
import { cookies } from "next/headers";
import SecurityClient from "./SecurityClient";

export const metadata: Metadata = {
  title: "Security & Compliance — SiteSafe Visitor Management",
  description:
    "SiteSafe security: TLS 1.3 encryption, SOC 2 Type II infrastructure, GDPR/LGPD ready, PCI DSS compliant payments via Stripe, hashed API keys, no third-party trackers.",
  openGraph: {
    title: "SiteSafe Security & Compliance",
    description: "Enterprise-grade security for visitor data. Encryption, compliance, and zero tracking.",
    images: ["/og-image.png"],
  },
};

export default async function SecurityPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";

  return <SecurityClient locale={locale} />;
}