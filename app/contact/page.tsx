import type { Metadata } from "next";
import { cookies } from "next/headers";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact – SiteSafe",
  description:
    "Get in touch with the SiteSafe team. No sales calls — just real humans when you need help.",
};

export default async function ContactPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";

  return <ContactClient locale={locale} />;
}