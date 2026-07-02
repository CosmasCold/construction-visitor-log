import type { Metadata } from "next";
import AboutClient from "../../about/AboutClient";

export const metadata: Metadata = {
  title: "Sobre a SiteSafe – Gestão de Visitantes para Empresas Brasileiras",
  description: "Conheça a SiteSafe: software de controle de visitantes criado para obras, armazéns e escritórios. Segurança, conformidade e eficiência em um só lugar.",
  alternates: {
    canonical: "https://sitesafe.thesift.space/br/about",
    languages: {
      en: "https://sitesafe.thesift.space/about",
      "pt-BR": "https://sitesafe.thesift.space/br/about",
    },
  },
};

export default function BRAboutPage() {
  return <AboutClient locale="pt" />;
}