import type { Metadata } from "next";
import { cookies } from "next/headers";
import ChecklistClient from "./ChecklistClient";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  const isPT = locale === "pt";

  return {
    title: isPT
      ? "Checklist de Controle de Visitantes – SiteSafe"
      : "Visitor Management Checklist – SiteSafe",
    description: isPT
      ? "Baixe o checklist gratuito de controle de visitantes para obras e escritórios. Garanta conformidade com segurança e LGPD."
      : "Download the free visitor management checklist for construction sites and offices. Ensure safety compliance and audit readiness.",
  };
}

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <ChecklistClient locale={locale} />;
}