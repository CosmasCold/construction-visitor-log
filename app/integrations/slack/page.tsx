import type { Metadata } from "next";
import { cookies } from "next/headers";
import SlackIntegrationClient from "./SlackIntegrationClient";

export const metadata: Metadata = {
  title: "Slack Integration — SiteSafe Visitor Management",
  description:
    "Get real-time visitor check-in alerts, blocklist warnings, and lockdown notifications in Slack. Set up in 2 minutes, no code required.",
  openGraph: {
    title: "SiteSafe Slack Integration — Real-Time Visitor Alerts",
    description: "Instant Slack notifications for check-ins, blocklist hits, and lockdown mode. No code required.",
    images: ["/og-image.png"],
  },
};

export default async function SlackIntegrationPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";

  return <SlackIntegrationClient locale={locale} />;
}