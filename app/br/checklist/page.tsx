import type { Metadata } from "next";
import ChecklistClient from "../../checklist/ChecklistClient";

export const metadata: Metadata = {
  title: "Checklist de Controle de Visitantes – SiteSafe",
  description: "Baixe o checklist gratuito de controle de visitantes para obras e escritórios. Garanta conformidade com segurança e LGPD.",
  alternates: {
    canonical: "https://sitesafe.thesift.space/br/checklist",
    languages: {
      en: "https://sitesafe.thesift.space/checklist",
      "pt-BR": "https://sitesafe.thesift.space/br/checklist",
    },
  },
};

export default function BRChecklistPage() {
  return <ChecklistClient locale="pt" />;
}