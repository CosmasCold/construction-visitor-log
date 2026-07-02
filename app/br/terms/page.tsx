import type { Metadata } from "next";
import TermsClient from "../../terms/TermsClient";

export const metadata: Metadata = {
  title: "Termos de Serviço – SiteSafe",
  description: "Leia os termos de serviço da SiteSafe. Uso da plataforma, responsabilidades, limitação de responsabilidade e política de cancelamento.",
  alternates: {
    canonical: "https://sitesafe.thesift.space/br/terms",
    languages: {
      en: "https://sitesafe.thesift.space/terms",
      "pt-BR": "https://sitesafe.thesift.space/br/terms",
    },
  },
};

export default function BRTermsPage() {
  return <TermsClient locale="pt" />;
}