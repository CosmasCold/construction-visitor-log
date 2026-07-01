import type { Metadata } from "next";
import { cookies } from "next/headers";
import ResetPasswordClient from "./ResetPasswordClient";

export const metadata: Metadata = {
  title: "Set New Password – SiteSafe",
  description: "Set a new password for your SiteSafe account.",
};

export default async function ResetPasswordPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";

  return <ResetPasswordClient locale={locale} />;
}