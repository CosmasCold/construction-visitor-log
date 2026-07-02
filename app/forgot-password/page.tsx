import type { Metadata } from "next";
import { cookies } from "next/headers";
import ForgotPasswordClient from "./ForgotPasswordClient";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  const isPT = locale === "pt";

  return {
    title: isPT
      ? "Recuperar Senha – SiteSafe"
      : "Reset Password – SiteSafe",
    description: isPT
      ? "Recupere o acesso à sua conta SiteSafe. Enviamos um link seguro para seu e-mail."
      : "Reset your SiteSafe account password. We'll send a secure link to your email.",
  };
}

export default async function ForgotPasswordPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";

  return <ForgotPasswordClient locale={locale} />;
}