import type { Metadata } from "next";
import ForgotPasswordClient from "../../forgot-password/ForgotPasswordClient";

export const metadata: Metadata = {
  title: "Recuperar Senha – SiteSafe",
  description: "Recupere o acesso à sua conta SiteSafe. Enviamos um link seguro para seu e-mail.",
  alternates: {
    canonical: "https://sitesafe.thesift.space/br/forgot-password",
    languages: {
      en: "https://sitesafe.thesift.space/forgot-password",
      "pt-BR": "https://sitesafe.thesift.space/br/forgot-password",
    },
  },
};

export default function BRForgotPasswordPage() {
  return <ForgotPasswordClient locale="pt" />;
}