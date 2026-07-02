import type { Metadata } from "next";
import AuditClient from "../../audit/AuditClient";

export const metadata: Metadata = {
  title: "Autodiagnóstico Gratuito de Controle de Visitantes – SiteSafe",
  description: "Responda 10 perguntas e descubra se seu processo de registro de visitantes sobreviveria a uma inspeção de segurança. Leva 60 segundos.",
  alternates: {
    canonical: "https://sitesafe.thesift.space/br/audit",
    languages: {
      en: "https://sitesafe.thesift.space/audit",
      "pt-BR": "https://sitesafe.thesift.space/br/audit",
    },
  },
};

export default function BRAuditPage() {
  return <AuditClient locale="pt" />;
}