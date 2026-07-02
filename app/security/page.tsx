import type { Metadata } from "next";
import { cookies } from "next/headers";
import SecurityClient from "./SecurityClient";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  const isPT = locale === "pt";

  return {
    title: isPT
      ? "Segurança SiteSafe – Criptografia e Conformidade"
      : "SiteSafe Security – Encryption & Compliance",
    description: isPT
      ? "Dados criptografados em trânsito e em repouso. Conformidade com SOC 2, GDPR, LGPD. Saiba como protegemos suas informações."
      : "Encrypted data in transit and at rest. SOC 2, GDPR, LGPD compliant. Learn how we protect your information.",
  };
}

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <SecurityClient locale={locale} />;
}