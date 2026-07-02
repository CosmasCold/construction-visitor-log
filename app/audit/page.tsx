import type { Metadata } from "next";
import { cookies } from "next/headers";
import AuditClient from "./AuditClient";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  const isPT = locale === "pt";

  return {
    title: isPT
      ? "Autodiagnóstico Gratuito de Controle de Visitantes – SiteSafe"
      : "Free Visitor Log Self-Audit – SiteSafe",
    description: isPT
      ? "Responda 10 perguntas e descubra se seu processo de registro de visitantes sobreviveria a uma inspeção de segurança. Leva 60 segundos."
      : "Take this 10-question audit to see if your visitor sign-in process would survive a safety inspection. Takes 60 seconds.",
  };
}

export default async function AuditPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";

  return <AuditClient locale={locale} />;
}