"use client";

import Image from "next/image";
import Link from "next/link";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import {
  Download,
  ExternalLink,
  Mail,
  User,
  Camera,
} from "lucide-react";
import CopyButton from "@/components/CopyButton";

interface PressClientProps {
  locale: "en" | "pt";
}

const t = {
  en: {
    backToSite: "Back to site",
    title: "Press Kit",
    subtitle:
      "Official brand assets, product screenshots, and company information for media, partners, and investors. Everything here is free to use with attribution.",
    founded: "Founded",
    pricing: "Pricing",
    sites: "Sites",
    aboutTitle: "About SiteSafe",
    founderTitle: "Founder",
    founderName: "Gabriel Freitas",
    founderRole: "Founder & CEO",
    founderBio:
      "Gabriel founded SiteSafe to solve the problem he kept hearing from facility managers: paper visitor logs fail audits, and existing software is too expensive or complicated. He built the entire platform with a focus on simplicity, compliance, and transparent pricing.",
    logoTitle: "Logo",
    logoDesc:
      "The SiteSafe logo is a shield checkmark icon representing security and verification.",
    logoUsage:
      "Use the SVG for both dark and light backgrounds. The icon scales cleanly from 16px to 512px.",
    downloadLogo: "Download Logo (SVG)",
    screenshotsTitle: "Product Screenshots",
    screenshotCount: (n: number) => `${n} images`,
    openFullSize: "Open full size",
    downloadPng: "PNG",
    clickToView:
      "Click any image to view full size. Use the download link to save the PNG.",
    brandColorsTitle: "Brand Colors",
    mediaContactTitle: "Media Contact",
    mediaContactDesc:
      "For press inquiries, partnership opportunities, or interview requests, reach out directly.",
    mediaEmail: "hello@thesift.space",
    footer:
      "© 2026 SiteSafe by TheSift. All brand assets are free to use with attribution.",
    boilerplate: `SiteSafe is a smart digital check-in platform that replaces paper visitor logs with QR codes, mandatory safety briefings, and real-time dashboards. It includes advanced security features as standard — watchlist/blocklist with instant alerts, one-click emergency evacuation lists with photos, lockdown mode, digital document signing, and webhooks — all for a flat $49/month with up to 20 sites and unlimited visitors. No per-site fees, no sales calls, and a 14-day free trial with no credit card required. SiteSafe serves construction companies, warehouses, corporate offices, manufacturing plants, logistics hubs, schools, and healthcare facilities across the United States and internationally.`,
    screenshots: [
      {
        src: "/dash.png",
        alt: "SiteSafe real-time dashboard showing active visitors across multiple sites with stats, site cards, and visitor log",
        caption: "Admin Dashboard",
        desc: "Real-time visitor tracking, site management, and one-click exports across all locations.",
      },
      {
        src: "/check.png",
        alt: "SiteSafe visitor check-in interface with safety briefing, photo capture, and digital signature",
        caption: "Visitor Check-In",
        desc: "QR or tablet-based check-in with mandatory safety briefings, photo capture, and document signing.",
      },
    ],
    colors: [
      { name: "Sky", hex: "#0ea5e9", class: "bg-sky-500" },
      { name: "Dark", hex: "#0a0f1c", class: "bg-[#0a0f1c] border border-white/10" },
      { name: "Slate", hex: "#94a3b8", class: "bg-slate-400" },
      { name: "Emerald", hex: "#10b981", class: "bg-emerald-500" },
    ],
  },
  pt: {
    backToSite: "Voltar ao site",
    title: "Kit de Imprensa",
    subtitle:
      "Materiais oficiais da marca, capturas de tela do produto e informações da empresa para mídia, parceiros e investidores. Tudo aqui é gratuito para uso com atribuição.",
    founded: "Fundada",
    pricing: "Preço",
    sites: "Locais",
    aboutTitle: "Sobre a SiteSafe",
    founderTitle: "Fundador",
    founderName: "Gabriel Freitas",
    founderRole: "Fundador & CEO",
    founderBio:
      "Gabriel fundou a SiteSafe para resolver o problema que ouvia constantemente de gerentes de facilities: registros de visitantes em papel falham em auditorias, e o software existente é muito caro ou complicado. Ele construiu toda a plataforma com foco em simplicidade, compliance e preços transparentes.",
    logoTitle: "Logo",
    logoDesc:
      "A logo da SiteSafe é um ícone de escudo com checkmark representando segurança e verificação.",
    logoUsage:
      "Use o SVG para fundos escuros e claros. O ícone escala perfeitamente de 16px a 512px.",
    downloadLogo: "Baixar Logo (SVG)",
    screenshotsTitle: "Capturas de Tela do Produto",
    screenshotCount: (n: number) => `${n} imagens`,
    openFullSize: "Abrir em tamanho real",
    downloadPng: "PNG",
    clickToView:
      "Clique em qualquer imagem para ver em tamanho real. Use o link de download para salvar o PNG.",
    brandColorsTitle: "Cores da Marca",
    mediaContactTitle: "Contato de Imprensa",
    mediaContactDesc:
      "Para consultas de imprensa, oportunidades de parceria ou solicitações de entrevista, entre em contato diretamente.",
    mediaEmail: "hello@thesift.space",
    footer:
      "© 2026 SiteSafe by TheSift. Todos os materiais da marca são gratuitos para uso com atribuição.",
    boilerplate: `A SiteSafe é uma plataforma inteligente de check-in digital que substitui registros de visitantes em papel por QR codes, briefings de segurança obrigatórios e painéis em tempo real. Inclui recursos avançados de segurança como padrão — lista de bloqueio/watchlist com alertas instantâneos, listas de evacuação de emergência em um clique com fotos, modo lockdown, assinatura digital de documentos e webhooks — tudo por um valor fixo de R$249/mês com até 20 locais e visitantes ilimitados. Sem taxas por local, sem ligações de vendas e teste grátis de 14 dias sem cartão de crédito. A SiteSafe atende empresas de construção, armazéns, escritórios corporativos, fábricas, centros de logística, escolas e instalações de saúde nos Estados Unidos e internacionalmente.`,
    screenshots: [
      {
        src: "/dash.png",
        alt: "Painel em tempo real da SiteSafe mostrando visitantes ativos em múltiplos locais com estatísticas, cards de locais e registro de visitantes",
        caption: "Painel Administrativo",
        desc: "Rastreamento de visitantes em tempo real, gestão de locais e exportações em um clique em todas as unidades.",
      },
      {
        src: "/check.png",
        alt: "Interface de check-in de visitantes da SiteSafe com briefing de segurança, captura de foto e assinatura digital",
        caption: "Check-In de Visitantes",
        desc: "Check-in por QR ou tablet com briefings de segurança obrigatórios, captura de foto e assinatura de documentos.",
      },
    ],
    colors: [
      { name: "Sky", hex: "#0ea5e9", class: "bg-sky-500" },
      { name: "Dark", hex: "#0a0f1c", class: "bg-[#0a0f1c] border border-white/10" },
      { name: "Slate", hex: "#94a3b8", class: "bg-slate-400" },
      { name: "Emerald", hex: "#10b981", class: "bg-emerald-500" },
    ],
  },
};

export default function PressClient({ locale }: PressClientProps) {
  const copy = t[locale];

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200">
      <PublicHeader locale={locale} narrow />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        {/* ─── Hero ─── */}
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            {copy.title}
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            {copy.subtitle}
          </p>
        </div>

        {/* ─── Quick Facts ─── */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: copy.founded, value: "2025", icon: User },
            { label: copy.pricing, value: locale === "pt" ? "R$249/mês fixo" : "$49/mo flat", icon: Camera },
            { label: copy.sites, value: locale === "pt" ? "Até 20 por conta" : "Up to 20 per account", icon: Camera },
          ].map((fact, i) => (
            <div key={i} className="rounded-xl border border-white/5 bg-white/[0.03] p-5 text-center">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mx-auto mb-3">
                <fact.icon className="w-4 h-4 text-sky-400" />
              </div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium mb-1">{fact.label}</p>
              <p className="text-sm font-semibold text-white">{fact.value}</p>
            </div>
          ))}
        </div>

        {/* ─── Boilerplate ─── */}
        <section className="rounded-xl border border-white/5 bg-white/[0.03] overflow-hidden">
          <div className="bg-white/[0.02] border-b border-white/5 px-6 py-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">{copy.aboutTitle}</h2>
          </div>
          <div className="p-6">
            <p className="text-sm text-slate-300 leading-relaxed">
              {copy.boilerplate}
            </p>
            <div className="mt-4">
              <CopyButton text={copy.boilerplate} />
            </div>
          </div>
        </section>

        {/* ─── Founder ─── */}
        <section className="rounded-xl border border-white/5 bg-white/[0.03] overflow-hidden">
          <div className="bg-white/[0.02] border-b border-white/5 px-6 py-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">{copy.founderTitle}</h2>
          </div>
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">{copy.founderName}</h3>
                <p className="text-xs text-slate-500 mb-3">{copy.founderRole}</p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {copy.founderBio}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Logo ─── */}
        <section className="rounded-xl border border-white/5 bg-white/[0.03] overflow-hidden">
          <div className="bg-white/[0.02] border-b border-white/5 px-6 py-3 flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">{copy.logoTitle}</h2>
            <a
              href="/favicon.svg"
              download
              className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 transition-colors"
            >
              <Download className="w-3 h-3" /> SVG
            </a>
          </div>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-full sm:w-40 h-32 rounded-xl bg-[#0f172a] border border-white/10 flex items-center justify-center">
                <img
                  src="/favicon.svg"
                  alt="SiteSafe logo on dark background"
                  className="w-12 h-12"
                />
              </div>
              <div className="w-full sm:w-40 h-32 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                <img
                  src="/favicon.svg"
                  alt="SiteSafe logo on light background"
                  className="w-12 h-12"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-300 mb-2">
                  {copy.logoDesc}
                </p>
                <p className="text-xs text-slate-500 mb-4">
                  {copy.logoUsage}
                </p>
                <a
                  href="/favicon.svg"
                  download
                  className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all active:scale-[0.98]"
                >
                  <Download className="w-4 h-4" /> {copy.downloadLogo}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Screenshots ─── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">{copy.screenshotsTitle}</h2>
            <span className="text-xs text-slate-600">{copy.screenshotCount(copy.screenshots.length)}</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {copy.screenshots.map((shot, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-white/5 bg-white/[0.03] overflow-hidden hover:border-white/10 transition-colors"
              >
                <a
                  href={shot.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative group"
                >
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={800}
                    height={500}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-3 py-1.5 rounded-lg text-xs font-medium">
                      <ExternalLink className="w-3 h-3" /> {copy.openFullSize}
                    </span>
                  </div>
                </a>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-white">{shot.caption}</h3>
                    <a
                      href={shot.src}
                      download
                      className="text-xs text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" /> {copy.downloadPng}
                    </a>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{shot.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-600 mt-4 text-center">
            {copy.clickToView}
          </p>
        </section>

        {/* ─── Brand Colors ─── */}
        <section className="rounded-xl border border-white/5 bg-white/[0.03] overflow-hidden">
          <div className="bg-white/[0.02] border-b border-white/5 px-6 py-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">{copy.brandColorsTitle}</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {copy.colors.map((color, i) => (
                <div key={i} className="rounded-lg overflow-hidden">
                  <div className={`h-16 ${color.class}`} />
                  <div className="bg-white/[0.03] p-2.5">
                    <p className="text-xs font-medium text-white">{color.name}</p>
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5">{color.hex}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Contact ─── */}
        <section className="rounded-xl border border-white/5 bg-sky-500/5 p-8 text-center">
          <h2 className="text-sm font-semibold text-white mb-2">{copy.mediaContactTitle}</h2>
          <p className="text-xs text-slate-400 mb-4 max-w-md mx-auto">
            {copy.mediaContactDesc}
          </p>
          <a
            href={`mailto:${copy.mediaEmail}`}
            className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors"
          >
            <Mail className="w-4 h-4" /> {copy.mediaEmail}
          </a>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <PublicFooter locale={locale} />
    </div>
  );
}