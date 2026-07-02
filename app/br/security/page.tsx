import type { Metadata } from "next";
import SecurityClient from "../../security/SecurityClient";

export const metadata: Metadata = {
  title: "Segurança SiteSafe – Criptografia e Conformidade",
  description: "Dados criptografados em trânsito e em repouso. Conformidade com SOC 2, GDPR, LGPD. Saiba como protegemos suas informações.",
  alternates: {
    canonical: "https://sitesafe.thesift.space/br/security",
    languages: {
      en: "https://sitesafe.thesift.space/security",
      "pt-BR": "https://sitesafe.thesift.space/br/security",
    },
  },
};

export default function BRSecurityPage() {
  return <SecurityClient locale="pt" />;
}