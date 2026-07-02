import type { Metadata } from "next";
import { cookies } from "next/headers";
import ResetPasswordClient from "./ResetPasswordClient";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  const isPT = locale === "pt";

  return {
    title: isPT
      ? "Redefinir Senha – SiteSafe"
      : "Reset Password – SiteSafe",
    description: isPT
      ? "Crie uma nova senha para sua conta SiteSafe."
      : "Create a new password for your SiteSafe account.",
  };
}

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <ResetPasswordClient locale={locale} />;
}