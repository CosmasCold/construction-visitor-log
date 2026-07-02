import type { Metadata } from "next";
import { cookies } from "next/headers";
import SignupClient from "./SignupClient";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  const isPT = locale === "pt";

  return {
    title: isPT
      ? "Criar Conta SiteSafe – Teste Grátis de 14 Dias"
      : "Sign Up for SiteSafe – 14-Day Free Trial",
    description: isPT
      ? "Comece seu teste gratuito de 14 dias. Sem cartão de crédito. Configure seu primeiro local em menos de 2 minutos."
      : "Start your 14-day free trial. No credit card required. Set up your first site in under 2 minutes.",
  };
}

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <SignupClient locale={locale} />;
}