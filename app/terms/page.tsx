import type { Metadata } from "next";
import { cookies } from "next/headers";
import TermsClient from "./TermsClient";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  const isPT = locale === "pt";

  return {
    title: isPT
      ? "Termos de Serviço – SiteSafe"
      : "Terms of Service – SiteSafe",
    description: isPT
      ? "Leia os termos de serviço da SiteSafe. Uso da plataforma, responsabilidades, limitação de responsabilidade e política de cancelamento."
      : "Read SiteSafe's terms of service. Platform usage, responsibilities, liability limitations, and cancellation policy.",
  };
}

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <TermsClient locale={locale} />;
}