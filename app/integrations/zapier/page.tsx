import type { Metadata } from "next";
import { cookies } from "next/headers";
import ZapierIntegrationClient from "./ZapierIntegrationClient";

export const metadata: Metadata = {
  title: "Zapier & Make Integration – SiteSafe",
  description: "Connect SiteSafe to 5,000+ apps using Zapier or Make – no code required.",
};

export default async function ZapierIntegrationPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";

  return <ZapierIntegrationClient locale={locale} />;
}