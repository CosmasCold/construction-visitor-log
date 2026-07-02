import type { Metadata } from "next";
import { cookies } from "next/headers";
import FAQClient from "./FAQClient";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  const isPT = locale === "pt";

  return {
    title: isPT
      ? "Perguntas Frequentes – SiteSafe"
      : "Frequently Asked Questions – SiteSafe",
    description: isPT
      ? "Tire suas dúvidas sobre a SiteSafe. Preços, funcionalidades, segurança, conformidade LGPD e muito mais."
      : "Get answers about SiteSafe. Pricing, features, security, GDPR compliance, and more.",
  };
}

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <FAQClient locale={locale} />;
}