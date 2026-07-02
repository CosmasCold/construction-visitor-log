import type { Metadata } from "next";
import ZapierIntegrationClient from "../../../integrations/zapier/ZapierIntegrationClient";

export const metadata: Metadata = {
  title: "Integração Zapier – SiteSafe",
  description: "Automatize fluxos de trabalho com a integração Zapier da SiteSafe. Conecte-se a 5.000+ aplicativos sem código.",
  alternates: {
    canonical: "https://sitesafe.thesift.space/br/integrations/zapier",
    languages: {
      en: "https://sitesafe.thesift.space/integrations/zapier",
      "pt-BR": "https://sitesafe.thesift.space/br/integrations/zapier",
    },
  },
};

export default function BRZapierIntegrationPage() {
  return <ZapierIntegrationClient locale="pt" />;
}