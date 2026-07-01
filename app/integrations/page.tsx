import type { Metadata } from "next";
import { cookies } from "next/headers";
import IntegrationsClient from "./IntegrationsClient";

export const metadata: Metadata = {
  title: "Integrations — SiteSafe Visitor Management",
  description:
    "Connect SiteSafe with Slack, Google Sheets, Zapier, and custom tools via Webhooks and REST API. All included in the flat $49/mo plan.",
  openGraph: {
    title: "SiteSafe Integrations — Slack, Zapier, Google Sheets & API",
    description: "No-code and developer integrations included. Webhooks, REST API, Slack alerts, and more.",
    images: ["/og-image.png"],
  },
};

export default async function IntegrationsPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";

  return <IntegrationsClient locale={locale} />;
}