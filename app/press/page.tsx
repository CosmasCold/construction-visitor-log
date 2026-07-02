import type { Metadata } from "next";
import { cookies } from "next/headers";
import PressClient from "./PressClient";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  const isPT = locale === "pt";

  return {
    title: isPT
      ? "Imprensa SiteSafe – Kit de Mídia e Contato"
      : "SiteSafe Press – Media Kit & Contact",
    description: isPT
      ? "Acesse o kit de mídia da SiteSafe: logotipos, capturas de tela e informações da empresa. Entre em contato com nossa equipe de comunicação."
      : "Access the SiteSafe media kit: logos, screenshots, and company information. Get in touch with our communications team.",
  };
}

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <PressClient locale={locale} />;
}