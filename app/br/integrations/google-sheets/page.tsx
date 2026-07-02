import type { Metadata } from "next";
import GoogleSheetsClient from "../../../integrations/google-sheets/GoogleSheetsClient";

export const metadata: Metadata = {
  title: "Integração Google Sheets – SiteSafe",
  description: "Exporte registros de visitantes automaticamente para o Google Sheets. Sincronização em tempo real, sem configuração complexa.",
  alternates: {
    canonical: "https://sitesafe.thesift.space/br/integrations/google-sheets",
    languages: {
      en: "https://sitesafe.thesift.space/integrations/google-sheets",
      "pt-BR": "https://sitesafe.thesift.space/br/integrations/google-sheets",
    },
  },
};

export default function BRGoogleSheetsPage() {
  return <GoogleSheetsClient locale="pt" />;
}