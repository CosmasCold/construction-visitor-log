import type { Metadata } from "next";
import PressClient from "../../press/PressClient";

export const metadata: Metadata = {
  title: "Imprensa SiteSafe – Kit de Mídia e Contato",
  description: "Acesse o kit de mídia da SiteSafe: logotipos, capturas de tela e informações da empresa. Entre em contato com nossa equipe de comunicação.",
  alternates: {
    canonical: "https://sitesafe.thesift.space/br/press",
    languages: {
      en: "https://sitesafe.thesift.space/press",
      "pt-BR": "https://sitesafe.thesift.space/br/press",
    },
  },
};

export default function BRPressPage() {
  return <PressClient locale="pt" />;
}