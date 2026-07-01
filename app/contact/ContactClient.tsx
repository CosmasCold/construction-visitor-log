"use client";

import Link from "next/link";
import PublicHeader from "@/components/PublicHeader";

interface ContactClientProps {
  locale: "en" | "pt";
}

const t = {
  en: {
    title: "Contact",
    subtitle: "We're a small team, but we read every message.",
    generalInquiries: "General inquiries",
    email: "hello@thesift.space",
    pressMedia: "Press & media",
    pressKit: "Press Kit",
    pressDesc:
      "For logos, screenshots, and brand assets, visit the",
    partnerships: "Partnerships",
    partnershipsDesc:
      "If you're interested in a co-branded audit tool, integration, or reseller arrangement, we'd love to hear from you at the email above.",
    footerNote:
      "No sales calls. No chatbots. Just a real person when you need one.",
  },
  pt: {
    title: "Contato",
    subtitle: "Somos uma equipe pequena, mas lemos todas as mensagens.",
    generalInquiries: "Contato geral",
    email: "hello@thesift.space",
    pressMedia: "Imprensa & mídia",
    pressKit: "Kit de Imprensa",
    pressDesc:
      "Para logos, capturas de tela e materiais da marca, visite o",
    partnerships: "Parcerias",
    partnershipsDesc:
      "Se você tem interesse em uma ferramenta de auditoria co-branded, integração ou acordo de revenda, adoraríamos ouvir você pelo e-mail acima.",
    footerNote:
      "Sem ligações de vendas. Sem chatbots. Apenas uma pessoa real quando você precisar.",
  },
};

export default function ContactClient({ locale }: ContactClientProps) {
  const copy = t[locale];

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white">
      <PublicHeader locale={locale} narrow />

      <main className="py-12 px-4">
        <div className="max-w-2xl mx-auto bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 p-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">{copy.title}</h1>
          <p className="text-sm text-slate-400 mb-6">{copy.subtitle}</p>

          <div className="space-y-6 text-sm leading-relaxed text-slate-200">
            <div>
              <h2 className="text-lg font-semibold text-white mb-1">{copy.generalInquiries}</h2>
              <a
                href={`mailto:${copy.email}`}
                className="text-sky-400 hover:text-sky-300 transition-colors"
              >
                {copy.email}
              </a>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-1">{copy.pressMedia}</h2>
              <p>
                {copy.pressDesc}{" "}
                <Link href="/press" className="text-sky-400 hover:text-sky-300 transition-colors">
                  {copy.pressKit}
                </Link>.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-1">{copy.partnerships}</h2>
              <p>{copy.partnershipsDesc}</p>
            </div>

            <div className="border-t border-white/10 pt-4 mt-4">
              <p className="text-slate-400 italic">{copy.footerNote}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}