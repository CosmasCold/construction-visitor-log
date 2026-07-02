"use client";

import Link from "next/link";
import Image from "next/image";
import ChecklistForm from "@/components/ChecklistForm";
import ReviewBadges from "@/components/ReviewBadges";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import TrackedCtaLink from "@/components/TrackedCtaLink";
import HeroVideo from "@/components/HeroVideo";
import FadeInSection from "@/components/FadeInSection";
import StickyCTA from "@/components/StickyCTA";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import {
  QrCode,
  ShieldCheck,
  Users,
  Mail,
  UserPlus,
  Printer,
  FileDown,
  Building,
  TrendingUp,
  Code,
  DollarSign,
  ArrowRight,
  CheckCircle2,
  Camera,
  ListChecks,
  Zap,
  Wrench,
  Package,
  Truck,
  Factory,
  Building2,
  AlertTriangle,
  ShieldAlert,
  FileText,
  Timer,
  Clock,
  GitBranch,
  ChevronRight,
  Play,
  Star,
  BadgeCheck,
  Lock,
  Flame,
} from "lucide-react";

interface LandingClientProps {
  locale: "en" | "pt";
}

const t = {
  en: {
    heroBadge: "No sales calls. No per-site fees. Setup in 3 minutes.",
    heroTitle: "Stop losing visitor logs",
    heroTitleGradient: "across 20 sites",
    heroSubtitle:
      "Paper logs get lost. Spreadsheets get messy. Compliance audits turn into nightmares. SiteSafe replaces all of it with one real-time dashboard — flat $49/mo, up to 20 sites.",
    tryDemo: "Try Live Demo",
    startTrial: "Start Free Trial",
    noCreditCard: "No credit card",
    cancelIn2Clicks: "Cancel in 2 clicks",
    setupIn3Min: "3-min setup",
    trustedBy: "Trusted by multi-site teams",
    rating: "4.9/5 on G2",
    oldWayTitle: "The old way",
    oldWayItems: [
      "Hunting down 6 different logbooks at month-end",
      "Missing visitor photos when security needs them",
      "Reconstructing sign-in sheets for the auditor",
      "No way to know if a blocked visitor tried to enter",
      "Paying per-site fees that multiply every month",
    ],
    newWayTitle: "The SiteSafe way",
    newWayItems: [
      "One dashboard. Every site. One export button.",
      "Visitor photos attached to every record, automatically",
      "Audit-ready PDFs with timestamps and signatures",
      "Instant alerts when a blocked visitor attempts check-in",
      "Flat $49/mo. Add sites 2 through 20 at no extra cost.",
    ],
    featuresTitle: "Everything you need to run visitor management at scale",
    featuresSubtitle:
      "Not feature bloat. Just the tools that keep your sites secure, compliant, and efficient.",
    worksWith: "Works with your existing stack",
    seeInAction: "See it in action",
    demoSubtitle:
      "Watch how SiteSafe replaces paper logs across multiple sites in under 3 minutes.",
    demoFooter: "3-minute demo • No sales calls • Try it free",
    testimonialsTitle: "Teams that switched never looked back",
    pricingTitle: "One price. No surprises.",
    pricingSubtitle:
      "Most visitor management tools charge per site. We think that's unfair to multi-location teams.",
    flatRate: "Flat monthly rate",
    price: "$49",
    pricePeriod: "/mo",
    pricingDesc:
      "Up to 20 sites. Unlimited visitors. All compliance and security features included.",
    pricingFeatures: [
      "Unlimited visitors across all sites",
      "QR codes for every location",
      "Photo capture & badge printing",
      "Audit exports (CSV, Excel, PDF)",
      "Watchlist & lockdown mode",
      "Digital document signing",
      "REST API & webhooks",
      "Live chat support (< 60 sec response)",
    ],
    startTrialCta: "Start my free 14-day trial",
    noCardRequired: "No credit card required. Cancel anytime.",
    builtFor: "Built for multi-site teams",
    auditCtaTitle: "Is your visitor log audit-ready?",
    auditCtaDesc:
      "Most teams fail compliance checks because of gaps they don't know exist. Run our 60-second self-audit and see exactly where you stand.",
    runAudit: "Run the free audit",
    faqTitle: "Questions? No sales call needed.",
    finalCtaTitle: "Start your 14-day free trial today",
    finalCtaDesc:
      "Join teams that replaced paper logs across 20 sites in one afternoon. No credit card. No sales call. No catch.",
    setupFooter: "Setup takes 3 minutes. Cancel in 2 clicks.",
    privacy: "Privacy",
    terms: "Terms",
    signIn: "Sign in",
    footer: "© 2026 SiteSafe by TheSift. All rights reserved.",
    outcomeGroups: [
      {
        outcome: "Know who is on every site — instantly",
        items: [
          { title: "QR check-in", desc: "Visitors scan, sign, and get cleared in under 10 seconds. No app download needed." },
          { title: "Photo capture", desc: "Auto-capture visitor photos at sign-in. Security knows exactly who is on site." },
          { title: "Mandatory safety briefings", desc: "Visitors must acknowledge hazards before entry. Compliance proof is automatic." },
        ],
      },
      {
        outcome: "Stop unwanted access before it happens",
        items: [
          { title: "Pre-screening questions", desc: "Block visitors who answer 'yes' to risk questions before they reach your door." },
          { title: "Watchlist & blocklist", desc: "Flagged visitors are stopped at check-in. You get an instant alert." },
          { title: "Lockdown mode", desc: "One click blocks all new check-ins. Active visitors are flagged for security." },
        ],
      },
      {
        outcome: "Pass audits without the panic",
        items: [
          { title: "One-click exports", desc: "CSV, Excel, or PDF filtered by date, site, or host. Includes every pre-screening answer." },
          { title: "Digital document signing", desc: "NDAs and waivers signed before entry. Stored forever for audit." },
          { title: "Emergency evacuation list", desc: "Instant PDF of everyone on site. For drills and real emergencies." },
        ],
      },
      {
        outcome: "Manage 20 sites without 20 logins",
        items: [
          { title: "One account, 20 sites", desc: "Each site gets its own QR code, settings, and visitor log. Switch in one click." },
          { title: "Host notifications", desc: "Visitor selects their host. Brevo sends an alert before they reach the desk." },
          { title: "Pre-registration", desc: "Add expected visitors for one-tap sign-in. No delays at the front desk." },
          { title: "Badge printing", desc: "Print photo badges from the active list. Professional and secure." },
        ],
      },
    ],
    integrations: [
      { title: "REST API", desc: "Connect to Slack, HR tools, or your own dashboard." },
      { title: "Webhooks", desc: "Real-time event streaming to your own tools." },
      { title: "Zapier, Google Sheets, Slack", desc: "No-code integrations that work in minutes." },
    ],
    testimonials: [
      {
        quote: "We replaced paper logs across 8 sites in one afternoon. The safety inspector actually complimented our records.",
        author: "Marcus Chen",
        role: "Facilities Director, Coastal Build Group",
        metric: "8 sites",
        metricLabel: "migrated in 1 day",
      },
      {
        quote: "The lockdown feature alone is worth it. We tested it during a drill and had a full evacuation list in 12 seconds.",
        author: "Sarah Okafor",
        role: "Head of Security, Meridian Health",
        metric: "12 sec",
        metricLabel: "evacuation list",
      },
      {
        quote: "I used to chase down 6 different logbooks at month-end. Now I export one CSV and I'm done.",
        author: "David Park",
        role: "Operations Manager, Apex Logistics",
        metric: "6 hrs",
        metricLabel: "saved per month",
      },
    ],
    objections: [
      { q: "What if we have more than 20 sites?", a: "Contact us for enterprise pricing. Most teams under 20 sites never need to talk to sales." },
      { q: "Do visitors need to download an app?", a: "No. They scan a QR code with their phone camera and check in through their browser." },
      { q: "Can we try it without a credit card?", a: "Yes. The 14-day trial starts instantly. No card, no sales call, no catch." },
      { q: "How long does setup take?", a: "Most teams are live in under 3 minutes. Create a site, load the check-in page on any tablet at reception, or print a QR code for visitors to scan with their own phones." },
      { q: "Is our data secure?", a: "All data is encrypted at rest and in transit. We run on SOC 2 Type II infrastructure." },
    ],
    industries: ["Construction", "Warehousing", "Offices", "Manufacturing", "Logistics"],
  },
  pt: {
    heroBadge: "Sem ligações de vendas. Sem taxas por local. Configuração em 3 minutos.",
    heroTitle: "Pare de perder registros de visitantes",
    heroTitleGradient: "em 20 locais",
    heroSubtitle:
      "Registros em papel se perdem. Planilhas ficam confusas. Auditorias de compliance viram pesadelos. A SiteSafe substitui tudo isso por um painel em tempo real — R$249/mês fixo, até 20 locais.",
    tryDemo: "Experimentar Demonstração",
    startTrial: "Começar Teste Grátis",
    noCreditCard: "Sem cartão de crédito",
    cancelIn2Clicks: "Cancele em 2 cliques",
    setupIn3Min: "Configuração em 3 min",
    trustedBy: "Confiado por equipes multi-local",
    rating: "4.9/5 no G2",
    oldWayTitle: "O jeito antigo",
    oldWayItems: [
      "Caçar 6 registros diferentes no fim do mês",
      "Fotos de visitantes faltando quando a segurança precisa",
      "Reconstruir fichas de entrada para o auditor",
      "Sem saber se um visitante bloqueado tentou entrar",
      "Pagar taxas por local que multiplicam todo mês",
    ],
    newWayTitle: "O jeito SiteSafe",
    newWayItems: [
      "Um painel. Todos os locais. Um botão de exportação.",
      "Fotos de visitantes anexadas a cada registro, automaticamente",
      "PDFs prontos para auditoria com timestamps e assinaturas",
      "Alertas instantâneos quando um visitante bloqueado tenta check-in",
      "R$249/mês fixo. Adicione locais 2 a 20 sem custo extra.",
    ],
    featuresTitle: "Tudo que você precisa para gerenciar visitantes em escala",
    featuresSubtitle:
      "Sem excesso de funcionalidades. Apenas as ferramentas que mantêm seus locais seguros, em compliance e eficientes.",
    worksWith: "Funciona com sua stack existente",
    seeInAction: "Veja em ação",
    demoSubtitle:
      "Assista como a SiteSafe substitui registros em papel em múltiplos locais em menos de 3 minutos.",
    demoFooter: "Demo de 3 min • Sem ligações de vendas • Teste grátis",
    testimonialsTitle: "Equipes que mudaram nunca voltaram atrás",
    pricingTitle: "Um preço. Sem surpresas.",
    pricingSubtitle:
      "A maioria das ferramentas cobra por local. Achamos isso injusto para equipes multi-local.",
    flatRate: "Preço mensal fixo",
    price: "R$249",
    pricePeriod: "/mês",
    pricingDesc:
      "Até 20 locais. Visitantes ilimitados. Todos os recursos de compliance e segurança inclusos.",
    pricingFeatures: [
      "Visitantes ilimitados em todos os locais",
      "QR codes para cada local",
      "Captura de foto e impressão de crachá",
      "Exportações de auditoria (CSV, Excel, PDF)",
      "Lista de bloqueio e modo lockdown",
      "Assinatura digital de documentos",
      "API REST e webhooks",
      "Suporte por chat (< 60 seg de resposta)",
    ],
    startTrialCta: "Começar meu teste grátis de 14 dias",
    noCardRequired: "Sem cartão de crédito. Cancele quando quiser.",
    builtFor: "Feito para equipes multi-local",
    auditCtaTitle: "Seu registro de visitantes está pronto para auditoria?",
    auditCtaDesc:
      "A maioria das equipes falha em auditorias de compliance por lacunas que não sabem que existem. Faça nossa auto-auditoria de 60 segundos e veja exatamente onde você está.",
    runAudit: "Fazer a auditoria gratuita",
    faqTitle: "Dúvidas? Sem ligação de vendas necessária.",
    finalCtaTitle: "Comece seu teste grátis de 14 dias hoje",
    finalCtaDesc:
      "Junte-se a equipes que substituíram registros em papel em 20 locais em uma tarde. Sem cartão de crédito. Sem ligação de vendas. Sem pegadinhas.",
    setupFooter: "Configuração em 3 minutos. Cancele em 2 cliques.",
    privacy: "Privacidade",
    terms: "Termos",
    signIn: "Entrar",
    footer: "© 2026 SiteSafe by TheSift. Todos os direitos reservados.",
    outcomeGroups: [
      {
        outcome: "Saiba quem está em cada local — instantaneamente",
        items: [
          { title: "Check-in por QR", desc: "Visitantes escaneiam, assinam e são liberados em menos de 10 segundos. Sem download de app." },
          { title: "Captura de foto", desc: "Captura automática de fotos de visitantes na entrada. A segurança sabe exatamente quem está no local." },
          { title: "Briefings de segurança obrigatórios", desc: "Visitantes devem reconhecer riscos antes da entrada. A prova de compliance é automática." },
        ],
      },
      {
        outcome: "Impeça acesso indesejado antes que aconteça",
        items: [
          { title: "Perguntas de pré-triagem", desc: "Bloqueie visitantes que respondem 'sim' a perguntas de risco antes de chegarem à sua porta." },
          { title: "Lista de monitoramento e bloqueio", desc: "Visitantes sinalizados são impedidos no check-in. Você recebe um alerta instantâneo." },
          { title: "Modo lockdown", desc: "Um clique bloqueia todos os novos check-ins. Visitantes ativos são sinalizados para segurança." },
        ],
      },
      {
        outcome: "Passe em auditorias sem pânico",
        items: [
          { title: "Exportações em um clique", desc: "CSV, Excel ou PDF filtrados por data, local ou anfitrião. Inclui todas as respostas de pré-triagem." },
          { title: "Assinatura digital de documentos", desc: "NDAs e termos assinados antes da entrada. Armazenados para sempre para auditoria." },
          { title: "Lista de evacuação de emergência", desc: "PDF instantâneo de todos no local. Para treinamentos e emergências reais." },
        ],
      },
      {
        outcome: "Gerencie 20 locais sem 20 logins",
        items: [
          { title: "Uma conta, 20 locais", desc: "Cada local recebe seu próprio QR code, configurações e registro de visitantes. Alterne em um clique." },
          { title: "Notificações aos anfitriões", desc: "O visitante seleciona seu anfitrião. A Brevo envia um alerta antes de chegarem à recepção." },
          { title: "Pré-cadastro", desc: "Adicione visitantes esperados para check-in com um toque. Sem atrasos na recepção." },
          { title: "Impressão de crachá", desc: "Imprima crachás com foto da lista ativa. Profissional e seguro." },
        ],
      },
    ],
    integrations: [
      { title: "API REST", desc: "Conecte ao Slack, ferramentas de RH ou seu próprio painel." },
      { title: "Webhooks", desc: "Streaming de eventos em tempo real para suas próprias ferramentas." },
      { title: "Zapier, Google Sheets, Slack", desc: "Integrações no-code que funcionam em minutos." },
    ],
    testimonials: [
      {
        quote: "Substituímos registros em papel em 8 locais em uma tarde. O inspetor de segurança até elogiou nossos registros.",
        author: "Marcus Chen",
        role: "Diretor de Facilities, Coastal Build Group",
        metric: "8 locais",
        metricLabel: "migrados em 1 dia",
      },
      {
        quote: "O modo lockdown sozinho já vale a pena. Testamos durante um treinamento e tivemos uma lista completa de evacuação em 12 segundos.",
        author: "Sarah Okafor",
        role: "Chefe de Segurança, Meridian Health",
        metric: "12 seg",
        metricLabel: "lista de evacuação",
      },
      {
        quote: "Eu costumava caçar 6 registros diferentes no fim do mês. Agora exporto um CSV e acabei.",
        author: "David Park",
        role: "Gerente de Operações, Apex Logistics",
        metric: "6 hrs",
        metricLabel: "economizados por mês",
      },
    ],
    objections: [
      { q: "E se tivermos mais de 20 locais?", a: "Entre em contato para preços enterprise. A maioria das equipes com menos de 20 locais nunca precisa falar com vendas." },
      { q: "Os visitantes precisam baixar um app?", a: "Não. Eles escaneiam um QR code com a câmera do celular e fazem check-in pelo navegador." },
      { q: "Podemos testar sem cartão de crédito?", a: "Sim. O teste de 14 dias começa instantaneamente. Sem cartão, sem ligação de vendas, sem pegadinha." },
      { q: "Quanto tempo leva a configuração?", a: "A maioria das equipes está online em menos de 3 minutos. Crie um local, carregue a página de check-in em qualquer tablet na recepção, ou imprima um QR code para os visitantes escanearem com os próprios celulares." },
      { q: "Nossos dados estão seguros?", a: "Todos os dados são criptografados em repouso e em trânsito. Rodamos em infraestrutura SOC 2 Type II." },
    ],
    industries: ["Construção", "Armazenagem", "Escritórios", "Manufatura", "Logística"],
  },
};

const outcomeIcons = [
  [Users, ShieldAlert, FileText, Building],
  [QrCode, Camera, ShieldCheck],
  [ListChecks, ShieldAlert, Lock],
  [FileDown, FileText, AlertTriangle],
  [Building, Mail, UserPlus, Printer],
];

const integrationIcons = [Code, Zap, GitBranch];

const industryIcons = [Wrench, Package, Building2, Factory, Truck];

export default function LandingClient({ locale }: LandingClientProps) {
  const copy = t[locale];
  const price = locale === "pt" ? "R$249" : "$49";
  const pricePeriod = locale === "pt" ? "/mês" : "/mo";

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white overflow-x-hidden">
      {/* Schema markup for rich snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "SiteSafe",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            description:
              "Visitor management system for multi-site teams. QR check-in, safety briefings, photo capture, audit exports, watchlist, lockdown mode, and digital document signing.",
            offers: {
              "@type": "Offer",
              price: locale === "pt" ? "249" : "49",
              priceCurrency: locale === "pt" ? "BRL" : "USD",
              priceValidUntil: "2026-12-31",
              url: "https://sitesafe.thesift.space",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              ratingCount: "47",
              bestRating: "5",
              worstRating: "1",
            },
            brand: {
              "@type": "Brand",
              name: "SiteSafe",
            },
            url: "https://sitesafe.thesift.space",
            screenshot: {
              "@type": "ImageObject",
              url: "https://sitesafe.thesift.space/dash.png",
            },
          }),
        }}
      />

      <PublicHeader locale={locale} />

      {/* ─── Hero ─── */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-medium mb-6">
                <Flame className="w-3.5 h-3.5" />
                {copy.heroBadge}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
                {copy.heroTitle}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
                  {copy.heroTitleGradient}
                </span>
              </h1>
              <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
                {copy.heroSubtitle}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <TrackedCtaLink
                  href="/demo"
                  className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] active:scale-[0.98]"
                >
                  {copy.tryDemo}
                  <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </TrackedCtaLink>
                <TrackedCtaLink
                  href="/signup"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-slate-300 border border-white/10 hover:bg-white/5 transition-all"
                >
                  {copy.startTrial}
                </TrackedCtaLink>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  {copy.noCreditCard}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  {copy.cancelIn2Clicks}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  {copy.setupIn3Min}
                </span>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl border border-white/10 bg-[#0f172a] shadow-2xl overflow-hidden aspect-[16/10]">
                <Image
                  src="/dash.png"
                  alt="SiteSafe real-time visitor dashboard showing active visitors across multiple sites"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-48 p-3 rounded-xl bg-[#1e293b] border border-white/10 z-10">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-medium text-emerald-400">Live</span>
                  </div>
                  <p className="text-lg font-bold text-white">24 visitors</p>
                  <p className="text-xs text-slate-400">{locale === "pt" ? "em 8 locais agora" : "across 8 sites right now"}</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-sky-500/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Social Proof Bar ─── */}
      <section className="border-y border-white/5 bg-white/[0.02] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                {copy.trustedBy}
              </p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
              <span className="text-sm font-semibold text-slate-400">Coastal Build</span>
              <span className="text-sm font-semibold text-slate-400">Meridian Health</span>
              <span className="text-sm font-semibold text-slate-400">Apex Logistics</span>
              <span className="text-sm font-semibold text-slate-400">Summit Mfg</span>
              <span className="text-sm font-semibold text-slate-400">Metro Warehousing</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs text-slate-500">{copy.rating}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── The Problem (Before/After) ─── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {locale === "pt" ? "Registros em papel são um risco." : "Paper logs are a liability."}{" "}
              <span className="text-slate-500">
                {locale === "pt" ? "Sua planilha não é uma estratégia de compliance." : "Your spreadsheet is not a compliance strategy."}
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8">
              <div className="flex items-center gap-2 mb-6">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <h3 className="font-semibold text-red-300">{copy.oldWayTitle}</h3>
              </div>
              <ul className="space-y-4">
                {copy.oldWayItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                    <span className="mt-0.5 w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8">
              <div className="flex items-center gap-2 mb-6">
                <BadgeCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="font-semibold text-emerald-300">{copy.newWayTitle}</h3>
              </div>
              <ul className="space-y-4">
                {copy.newWayItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section id="features" className="py-20 sm:py-28 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              {copy.featuresTitle}
            </h2>
            <p className="text-lg text-slate-400">
              {copy.featuresSubtitle}
            </p>
          </div>
          <div className="space-y-20">
            {copy.outcomeGroups.map((group, groupIdx) => (
              <div key={groupIdx}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center">
                    {(() => {
                      const Icon = outcomeIcons[0][groupIdx];
                      return <Icon className="w-5 h-5 text-sky-400" />;
                    })()}
                  </div>
                  <h3 className="text-xl font-bold text-white">{group.outcome}</h3>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {group.items.map((item, idx) => (
                    <FadeInSection key={idx} delay={idx * 100}>
                      <div className="group h-full rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/10 p-6 transition-all duration-300">
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-4 group-hover:bg-sky-500/10 transition-colors">
                          {(() => {
                            const Icon = outcomeIcons[groupIdx + 1][idx];
                            return <Icon className="w-5 h-5 text-slate-300 group-hover:text-sky-400 transition-colors" />;
                          })()}
                        </div>
                        <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                      </div>
                    </FadeInSection>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-20 pt-16 border-t border-white/5">
            <h3 className="text-center text-lg font-semibold text-slate-300 mb-8">
              {copy.worksWith}
            </h3>
            <div className="grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
              {copy.integrations.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.03]">
                  {(() => {
                    const Icon = integrationIcons[idx];
                    return <Icon className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />;
                  })()}
                  <div>
                    <h4 className="text-sm font-medium text-white">{item.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Demo Video ─── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight mb-3">
              {copy.seeInAction}
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              {copy.demoSubtitle}
            </p>
          </div>
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0f172a]">
            <iframe
              src="https://www.youtube-nocookie.com/embed/ntRt1qVkLgo?si=BmRSpzC4Jeea1uij"
              title="SiteSafe Demo Video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <p className="text-center text-xs text-slate-500 mt-4">
            {copy.demoFooter}
          </p>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="py-20 sm:py-28 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-3">
              {copy.testimonialsTitle}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {copy.testimonials.map((t, i) => (
              <FadeInSection key={i} delay={i * 150}>
                <div className="h-full rounded-2xl border border-white/5 bg-white/[0.03] p-8 flex flex-col">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed flex-grow italic">
                    {t.quote}
                  </p>
                  <div className="mt-6 pt-6 border-t border-white/5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white">{t.author}</p>
                        <p className="text-xs text-slate-500">{t.role}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-sky-400">{t.metric}</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">{t.metricLabel}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <section id="pricing" className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              {copy.pricingTitle}
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              {copy.pricingSubtitle}
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-sky-500/20 rounded-full blur-[80px]" />
            <div className="relative">
              <p className="text-sm text-sky-300 font-medium mb-2 uppercase tracking-wider">
                {copy.flatRate}
              </p>
              <div className="flex items-baseline justify-center gap-1 mb-4">
                <span className="text-5xl sm:text-6xl font-extrabold text-white">{price}</span>
                <span className="text-xl text-slate-400">{pricePeriod}</span>
              </div>
              <p className="text-slate-300 mb-8 max-w-md mx-auto">
                {copy.pricingDesc}
              </p>
              <div className="grid sm:grid-cols-2 gap-3 max-w-lg mx-auto mb-8 text-left">
                {copy.pricingFeatures.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <TrackedCtaLink
                href="/signup"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-lg active:scale-[0.98]"
              >
                {copy.startTrialCta}
                <ArrowRight className="ml-2 w-4 h-4" />
              </TrackedCtaLink>
              <p className="mt-3 text-xs text-slate-500">
                {copy.noCardRequired}
              </p>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap justify-center items-center gap-6 opacity-60">
            <a href="https://saasdb.net" rel="noopener noreferrer" target="_blank">
              <Image src="https://saasdb.net/badge/featured-dark.svg" alt="Featured on SaasDB" width={150} height={56} unoptimized className="h-10 w-auto" />
            </a>
            <a href="https://fazier.com/launches/sitesafe.thesift.space" target="_blank" rel="noopener noreferrer">
              <Image src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=launched&theme=light" alt="Launched on Fazier" width={120} height={40} unoptimized className="h-8 w-auto" />
            </a>
            <a href="https://www.saashub.com/sitesafe-by-thesift" target="_blank" rel="noopener noreferrer">
              <Image src="https://cdn-b.saashub.com/img/badges/approved-dark.png?v=1" alt="SiteSafe by TheSift badge" width={150} height={50} unoptimized className="h-8 w-auto" />
            </a>
            <ReviewBadges />
          </div>
        </div>
      </section>

      {/* ─── Industries ─── */}
      <section className="py-16 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">
            {copy.builtFor}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {copy.industries.map((industry, idx) => (
              <div key={industry} className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/[0.03] text-sm text-slate-300">
                {(() => {
                  const Icon = industryIcons[idx];
                  return <Icon className="w-4 h-4 text-sky-400" />;
                })()}
                {industry}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Audit CTA ─── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
              {copy.auditCtaTitle}
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-6">
              {copy.auditCtaDesc}
            </p>
            <Link
              href="/audit"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-300 hover:bg-sky-500/20 transition-all"
            >
              {copy.runAudit}
              <ChevronRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="py-20 sm:py-28 bg-white/[0.02]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
            {copy.faqTitle}
          </h2>
          <div className="space-y-4">
            {copy.objections.map((item, i) => (
              <div key={i} className="rounded-xl border border-white/5 bg-white/[0.03] p-6">
                <h3 className="font-semibold text-white mb-2">{item.q}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-500/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            {copy.finalCtaTitle}
          </h2>
          <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
            {copy.finalCtaDesc}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <TrackedCtaLink
              href="/demo"
              className="inline-flex items-center justify-center px-10 py-4 text-lg font-semibold rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-[0_0_60px_-15px_rgba(255,255,255,0.3)] active:scale-[0.98]"
            >
              {copy.tryDemo}
              <ChevronRight className="ml-2 w-5 h-5" />
            </TrackedCtaLink>
            <TrackedCtaLink
              href="/signup"
              className="inline-flex items-center justify-center px-10 py-4 text-lg font-medium rounded-xl text-slate-300 border border-white/10 hover:bg-white/5 transition-all"
            >
              {copy.startTrial}
            </TrackedCtaLink>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            {copy.setupFooter}
          </p>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <PublicFooter locale={locale} />

      <StickyCTA />
    </div>
  );
}