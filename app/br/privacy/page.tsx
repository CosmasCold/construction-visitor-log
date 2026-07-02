import type { Metadata } from "next";
import PrivacyClient from "../../privacy/PrivacyClient";

export const metadata: Metadata = {
  title: "Política de Privacidade – SiteSafe",
  description: "Saiba como a SiteSafe protege seus dados e os dados dos seus visitantes. Conformidade com GDPR, LGPD e CCPA.",
  alternates: {
    canonical: "https://sitesafe.thesift.space/br/privacy",
    languages: {
      en: "https://sitesafe.thesift.space/privacy",
      "pt-BR": "https://sitesafe.thesift.space/br/privacy",
    },
  },
};

export default function BRPrivacyPage() {
  return <PrivacyClient locale="pt" />;
}