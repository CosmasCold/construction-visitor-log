import type { Metadata } from "next";
import ResetPasswordClient from "../../forgot-password/reset/ResetPasswordClient";

export const metadata: Metadata = {
  title: "Redefinir Senha – SiteSafe",
  description: "Crie uma nova senha para sua conta SiteSafe.",
  alternates: {
    canonical: "https://sitesafe.thesift.space/br/reset-password",
    languages: {
      en: "https://sitesafe.thesift.space/reset-password",
      "pt-BR": "https://sitesafe.thesift.space/br/reset-password",
    },
  },
};

export default function BRResetPasswordPage() {
  return <ResetPasswordClient locale="pt" />;
}