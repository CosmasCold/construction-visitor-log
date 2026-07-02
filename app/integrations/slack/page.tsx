import type { Metadata } from "next";
import { cookies } from "next/headers";
import SlackIntegrationClient from "./SlackIntegrationClient";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  const isPT = locale === "pt";

  return {
    title: isPT
      ? "Integração Slack – SiteSafe"
      : "Slack Integration – SiteSafe",
    description: isPT
      ? "Receba notificações de check-in e check-out de visitantes diretamente no Slack. Alertas em tempo real para sua equipe."
      : "Get visitor check-in and check-out notifications directly in Slack. Real-time alerts for your team.",
  };
}

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <SlackIntegrationClient locale={locale} />;
}