import type { Metadata } from "next";
import DocsClient from "../../docs/DocsClient";

export const metadata: Metadata = {
  title: "Documentação da API — SiteSafe REST API",
  description: "Integre a SiteSafe com suas próprias ferramentas usando nossa API REST. Autenticação Bearer, respostas JSON, webhooks. Gerencie locais, visitantes e exportações programaticamente.",
  alternates: {
    canonical: "https://sitesafe.thesift.space/br/docs",
    languages: {
      en: "https://sitesafe.thesift.space/docs",
      "pt-BR": "https://sitesafe.thesift.space/br/docs",
    },
  },
};

export default function BRDocsPage() {
  return <DocsClient locale="pt" />;
}