import type { Metadata } from "next";
import { cookies } from "next/headers";
import AboutClient from "./AboutClient";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  const isPT = locale === "pt";

  return {
    title: isPT
      ? "Sobre a SiteSafe – Gestão de Visitantes para Empresas Brasileiras"
      : "About SiteSafe – Visitor Management Built for Safety & Scale",
    description: isPT
      ? "Conheça a SiteSafe: software de controle de visitantes criado para obras, armazéns e escritórios. Segurança, conformidade e eficiência em um só lugar."
      : "Meet SiteSafe: visitor management software built for construction sites, warehouses, and offices. Safety, compliance, and efficiency in one platform.",
  };
}

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <AboutClient locale={locale} />;
}