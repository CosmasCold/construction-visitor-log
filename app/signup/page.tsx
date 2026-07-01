// app/signup/page.tsx
import type { Metadata } from "next";
import { cookies } from "next/headers";
import SignupClient from "./SignupClient";

export const metadata: Metadata = {
  title: "Start Free Trial – SiteSafe",
  description:
    "Start your 14‑day free trial of SiteSafe. No credit card required, no sales calls.",
};

export default async function SignupPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";

  return <SignupClient locale={locale} />;
}