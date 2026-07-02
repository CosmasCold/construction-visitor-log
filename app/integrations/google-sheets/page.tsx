import type { Metadata } from "next";
import { cookies } from "next/headers";
import GoogleSheetsClient from "./GoogleSheetsClient";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  const isPT = locale === "pt";

  return {
    title: isPT
      ? "Integração Google Sheets – SiteSafe"
      : "Google Sheets Integration – SiteSafe",
    description: isPT
      ? "Exporte registros de visitantes automaticamente para o Google Sheets. Sincronização em tempo real, sem configuração complexa."
      : "Export visitor logs automatically to Google Sheets. Real-time sync, no complex setup required.",
  };
}

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <GoogleSheetsClient locale={locale} />;
}