import type { Metadata } from "next";
import { cookies } from "next/headers";
import PricingClient from "./PricingClient";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  const isPT = locale === "pt";

  return {
    title: isPT
      ? "Preços SiteSafe – R$249/mês para 20 Locais · Teste Grátis"
      : "SiteSafe Pricing – $49/month for 20 Sites · Free Trial",
    description: isPT
      ? "Preço fixo sem taxas por local. Economize R$6.000+/ano vs concorrentes. 14 dias grátis, sem cartão de crédito."
      : "Flat pricing with no per-site fees. Save $1,200+/year vs competitors. 14-day free trial, no credit card required.",
  };
}

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <PricingClient locale={locale} />;
}