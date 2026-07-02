import type { Metadata } from "next";
import { cookies } from "next/headers";
import LandingClient from "./LandingClient";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  const isPT = locale === "pt";

  return {
    title: isPT
      ? "SiteSafe – Controle de Visitantes Digital para Obras e Escritórios"
      : "SiteSafe – Smart Visitor Management for Construction & Offices",
    description: isPT
      ? "Substitua registros em papel por check-in digital com QR code. 14 dias grátis, sem cartão de crédito. Até 20 locais por R$249/mês."
      : "Replace paper logs with QR check-in, safety briefings & real-time dashboards. 14-day free trial. Up to 20 sites for $49/mo.",
  };
}

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <LandingClient locale={locale} />;
}