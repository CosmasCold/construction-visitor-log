import type { Metadata } from "next";
import RoiCalculatorClient from "../../roi-calculator/RoiCalculatorClient";

export const metadata: Metadata = {
  title: "Calculadora de ROI – SiteSafe",
  description: "Calcule quanto sua empresa economiza com o controle digital de visitantes vs registros em papel. Veja o retorno em minutos.",
  alternates: {
    canonical: "https://sitesafe.thesift.space/br/roi-calculator",
    languages: {
      en: "https://sitesafe.thesift.space/roi-calculator",
      "pt-BR": "https://sitesafe.thesift.space/br/roi-calculator",
    },
  },
};

export default function BRRoiCalculatorPage() {
  return <RoiCalculatorClient locale="pt" />;
}