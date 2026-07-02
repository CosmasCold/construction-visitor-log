import type { Metadata } from "next";
import CompareClient from "../../compare/CompareClient";

export const metadata: Metadata = {
  title: "SiteSafe vs Envoy vs SwipedOn vs Registro em Papel — Comparativo (2026)",
  description: "Veja como a SiteSafe se compara ao Envoy, SwipedOn e registros em papel. Comparativo funcionalidade por funcionalidade com preço transparente — R/mês para 20 locais.",
  alternates: {
    canonical: "https://sitesafe.thesift.space/br/compare",
    languages: {
      en: "https://sitesafe.thesift.space/compare",
      "pt-BR": "https://sitesafe.thesift.space/br/compare",
    },
  },
};

export default function BRComparePage() {
  return <CompareClient locale="pt" />;
}