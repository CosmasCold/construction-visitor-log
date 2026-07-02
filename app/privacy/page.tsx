import type { Metadata } from "next";
import { cookies } from "next/headers";
import PrivacyClient from "./PrivacyClient";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  const isPT = locale === "pt";

  return {
    title: isPT
      ? "Política de Privacidade – SiteSafe"
      : "Privacy Policy – SiteSafe",
    description: isPT
      ? "Saiba como a SiteSafe protege seus dados e os dados dos seus visitantes. Conformidade com GDPR, LGPD e CCPA."
      : "Learn how SiteSafe protects your data and your visitors' data. GDPR, LGPD, and CCPA compliant.",
  };
}

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <PrivacyClient locale={locale} />;
}