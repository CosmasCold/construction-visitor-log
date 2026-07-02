import type { Metadata } from "next";
import DemoClient from "../../demo/DemoClient";

export const metadata: Metadata = {
  title: "Agende uma Demo – SiteSafe",
  description: "Agende uma demonstração personalizada da SiteSafe. Veja como nosso controle de visitantes digital funciona para obras e escritórios.",
  alternates: {
    canonical: "https://sitesafe.thesift.space/br/demo",
    languages: {
      en: "https://sitesafe.thesift.space/demo",
      "pt-BR": "https://sitesafe.thesift.space/br/demo",
    },
  },
};

export default function BRDemoPage() {
  return <DemoClient locale="pt" />;
}