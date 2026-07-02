import type { Metadata } from "next";
import IntegrationsClient from "../../integrations/IntegrationsClient";

export const metadata: Metadata = {
  title: "Integrações SiteSafe – Slack, Google Sheets, Zapier",
  description: "Conecte SiteSafe às suas ferramentas favoritas. Notificações Slack, exportação Google Sheets, automações Zapier e webhooks personalizados.",
  alternates: {
    canonical: "https://sitesafe.thesift.space/br/integrations",
    languages: {
      en: "https://sitesafe.thesift.space/integrations",
      "pt-BR": "https://sitesafe.thesift.space/br/integrations",
    },
  },
};

export default function BRIntegrationsPage() {
  return <IntegrationsClient locale="pt" />;
}