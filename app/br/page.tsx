import type { Metadata } from "next";
import LandingClient from "../LandingClient";

export const metadata: Metadata = {
  title: "SiteSafe – Controle de Visitantes Digital para Obras e Escritórios",
  description: "Substitua registros em papel por check-in digital com QR code. 14 dias grátis, sem cartão de crédito. Até 20 locais por R/mês.",
  alternates: {
    canonical: "https://sitesafe.thesift.space/br",
    languages: {
      en: "https://sitesafe.thesift.space/",
      "pt-BR": "https://sitesafe.thesift.space/br",
    },
  },
};

export default function BRLandingPage() {
  return <LandingClient locale="pt" />;
}