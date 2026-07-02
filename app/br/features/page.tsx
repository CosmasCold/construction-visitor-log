import type { Metadata } from "next";
import FeaturesClient from "../../features/FeaturesClient";

export const metadata: Metadata = {
  title: "Funcionalidades SiteSafe – Controle de Visitantes Completo",
  description: "Descubra todas as funcionalidades da SiteSafe: check-in QR, briefings de segurança, dashboard em tempo real, exportações e muito mais.",
  alternates: {
    canonical: "https://sitesafe.thesift.space/br/features",
    languages: {
      en: "https://sitesafe.thesift.space/features",
      "pt-BR": "https://sitesafe.thesift.space/br/features",
    },
  },
};

export default function BRFeaturesPage() {
  return <FeaturesClient locale="pt" />;
}