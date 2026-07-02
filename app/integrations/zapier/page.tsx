import type { Metadata } from "next";
import { cookies } from "next/headers";
import ZapierIntegrationClient from "./ZapierIntegrationClient";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  const isPT = locale === "pt";

  return {
    title: isPT
      ? "Integração Zapier – SiteSafe"
      : "Zapier Integration – SiteSafe",
    description: isPT
      ? "Automatize fluxos de trabalho com a integração Zapier da SiteSafe. Conecte-se a 5.000+ aplicativos sem código."
      : "Automate workflows with SiteSafe's Zapier integration. Connect to 5,000+ apps without writing code.",
  };
}

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <ZapierIntegrationClient locale={locale} />;
}