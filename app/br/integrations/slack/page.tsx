import type { Metadata } from "next";
import SlackIntegrationClient from "../../../integrations/slack/SlackIntegrationClient";

export const metadata: Metadata = {
  title: "Integração Slack – SiteSafe",
  description: "Receba notificações de check-in e check-out de visitantes diretamente no Slack. Alertas em tempo real para sua equipe.",
  alternates: {
    canonical: "https://sitesafe.thesift.space/br/integrations/slack",
    languages: {
      en: "https://sitesafe.thesift.space/integrations/slack",
      "pt-BR": "https://sitesafe.thesift.space/br/integrations/slack",
    },
  },
};

export default function BRSlackIntegrationPage() {
  return <SlackIntegrationClient locale="pt" />;
}