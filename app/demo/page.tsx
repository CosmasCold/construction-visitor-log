import type { Metadata } from "next";
import { cookies } from "next/headers";
import DemoClient from "./DemoClient";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  const isPT = locale === "pt";

  return {
    title: isPT
      ? "Agende uma Demo – SiteSafe"
      : "Book a Demo – SiteSafe",
    description: isPT
      ? "Agende uma demonstração personalizada da SiteSafe. Veja como nosso controle de visitantes digital funciona para obras e escritórios."
      : "Schedule a personalized demo of SiteSafe. See how our digital visitor management works for construction sites and offices.",
  };
}

export default async function Page() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  
  return <DemoClient locale={locale} />;
}