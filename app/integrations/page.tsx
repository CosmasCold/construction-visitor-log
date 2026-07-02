import type { Metadata } from "next";
import { cookies } from "next/headers";
import IntegrationsClient from "./IntegrationsClient";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  const isPT = locale === "pt";

  return {
    title: isPT
      ? "Integrações SiteSafe – Slack, Google Sheets, Zapier"
      : "SiteSafe Integrations – Slack, Google Sheets, Zapier",
    description: isPT
      ? "Conecte SiteSafe às suas ferramentas favoritas. Notificações Slack, exportação Google Sheets, automações Zapier e webhooks personalizados."
      : "Connect SiteSafe to your favorite tools. Slack notifications, Google Sheets exports, Zapier automations, and custom webhooks.",
  };
}

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <IntegrationsClient locale={locale} />;
}