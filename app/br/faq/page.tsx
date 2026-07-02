import type { Metadata } from "next";
import FAQClient from "../../faq/FAQClient";

export const metadata: Metadata = {
  title: "Perguntas Frequentes – SiteSafe",
  description: "Tire suas dúvidas sobre a SiteSafe. Preços, funcionalidades, segurança, conformidade LGPD e muito mais.",
  alternates: {
    canonical: "https://sitesafe.thesift.space/br/faq",
    languages: {
      en: "https://sitesafe.thesift.space/faq",
      "pt-BR": "https://sitesafe.thesift.space/br/faq",
    },
  },
};

export default function BRFAQPage() {
  return <FAQClient locale="pt" />;
}