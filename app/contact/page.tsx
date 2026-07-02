import type { Metadata } from "next";
import { cookies } from "next/headers";
import ContactClient from "./ContactClient";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  const isPT = locale === "pt";

  return {
    title: isPT
      ? "Contato SiteSafe – Vendas e Suporte"
      : "Contact SiteSafe – Sales & Support",
    description: isPT
      ? "Entre em contato com a SiteSafe para vendas, suporte ou parcerias. Respondemos em até 24 horas."
      : "Get in touch with SiteSafe for sales, support, or partnership inquiries. We typically respond within 24 hours.",
  };
}

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <ContactClient locale={locale} />;
}