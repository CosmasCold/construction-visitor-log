import type { Metadata } from "next";
import ContactClient from "../../contact/ContactClient";

export const metadata: Metadata = {
  title: "Contato SiteSafe – Vendas e Suporte",
  description: "Entre em contato com a SiteSafe para vendas, suporte ou parcerias. Respondemos em até 24 horas.",
  alternates: {
    canonical: "https://sitesafe.thesift.space/br/contact",
    languages: {
      en: "https://sitesafe.thesift.space/contact",
      "pt-BR": "https://sitesafe.thesift.space/br/contact",
    },
  },
};

export default function BRContactPage() {
  return <ContactClient locale="pt" />;
}