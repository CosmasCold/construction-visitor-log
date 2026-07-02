import type { Metadata } from "next";
import { cookies } from "next/headers";
import DocsClient from "./DocsClient";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";
  const isPT = locale === "pt";

  const title = isPT
    ? "Documentação da API — SiteSafe REST API"
    : "API Documentation — SiteSafe REST API";
  
  const description = isPT
    ? "Integre a SiteSafe com suas próprias ferramentas usando nossa API REST. Autenticação Bearer, respostas JSON, webhooks. Gerencie locais, visitantes e exportações programaticamente."
    : "Integrate SiteSafe with your own tools using our REST API. Bearer token auth, JSON responses, webhooks. Manage sites, visitors, and exports programmatically.";

  return {
    title,
    description,
    openGraph: {
      title: isPT ? "Documentação da API SiteSafe" : "SiteSafe API Documentation",
      description: isPT
        ? "API REST para controle de visitantes. Autenticação Bearer, webhooks, respostas JSON."
        : "REST API for visitor management. Bearer token auth, webhooks, JSON responses.",
      images: ["/og-image.png"],
    },
  };
}

export default async function DocsPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("sitesafe-locale")?.value as "en" | "pt") || "en";

  return <DocsClient locale={locale} />;
}