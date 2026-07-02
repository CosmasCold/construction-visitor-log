import type { Metadata } from "next";
import SignupClient from "../../signup/SignupClient";

export const metadata: Metadata = {
  title: "Criar Conta SiteSafe – Teste Grátis de 14 Dias",
  description: "Comece seu teste gratuito de 14 dias. Sem cartão de crédito. Configure seu primeiro local em menos de 2 minutos.",
  alternates: {
    canonical: "https://sitesafe.thesift.space/br/signup",
    languages: {
      en: "https://sitesafe.thesift.space/signup",
      "pt-BR": "https://sitesafe.thesift.space/br/signup",
    },
  },
};

export default function BRSignupPage() {
  return <SignupClient locale="pt" />;
}