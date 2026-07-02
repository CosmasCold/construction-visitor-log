import type { Metadata } from "next";
import { cookies } from "next/headers";
import FeaturesClient from "./FeaturesClient";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  const isPT = locale === "pt";

  return {
    title: isPT
      ? "Funcionalidades SiteSafe – Controle de Visitantes Completo"
      : "SiteSafe Features – Complete Visitor Management",
    description: isPT
      ? "Descubra todas as funcionalidades da SiteSafe: check-in QR, briefings de segurança, dashboard em tempo real, exportações e muito mais."
      : "Explore all SiteSafe features: QR check-in, safety briefings, real-time dashboard, exports, and more.",
  };
}

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <FeaturesClient locale={locale} />;
}