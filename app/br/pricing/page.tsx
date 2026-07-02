import type { Metadata } from "next";
import PricingClient from "../../pricing/PricingClient";

export const metadata: Metadata = {
  title: "Preços SiteSafe – R/mês para 20 Locais · Teste Grátis",
  description: "Preço fixo sem taxas por local. Economize R.000+/ano vs concorrentes. 14 dias grátis, sem cartão de crédito.",
  alternates: {
    canonical: "https://sitesafe.thesift.space/br/pricing",
    languages: {
      en: "https://sitesafe.thesift.space/pricing",
      "pt-BR": "https://sitesafe.thesift.space/br/pricing",
    },
  },
};

export default function BRPricingPage() {
  return <PricingClient locale="pt" />;
}