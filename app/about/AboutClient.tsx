"use client";

import Link from "next/link";
import {
  ShieldCheck,
  ArrowRight,
  Users,
  DollarSign,
  FileCheck,
  Mail,
  CheckCircle2,
  Rocket,
  Heart,
  MessageSquare,
} from "lucide-react";
import PublicHeader from "@/components/PublicHeader";

interface AboutClientProps {
  locale: "en" | "pt";
}

const t = {
  en: {
    heroTitle: "Built for multi-site teams,",
    heroTitleGradient: "not enterprise sales",
    heroSubtitle:
      "We're a small, independent team. No outside investors, no sales floor, no hidden agenda. Just a visitor management platform that works.",
    stats: [
      { label: "Sites managed", value: "2,400+" },
      { label: "Visitors logged", value: "180K+" },
      { label: "Average setup time", value: "3 min" },
      { label: "Support response time", value: "< 60 sec" },
    ],
    storyTitle: "Why we built SiteSafe",
    storyP1:
      "We spent months talking to facility managers, site supervisors, and office administrators. One problem kept coming up: visitor logs were still paper-based, and when an audit arrived, the log was nowhere to be found.",
    storyP2:
      "The existing digital tools were either built for huge enterprises — with huge price tags, mandatory demos, and 6-month sales cycles — or they lacked the compliance features that real workplaces need. Like a non-skippable safety acknowledgment.",
    storyP3:
      "So we built SiteSafe: a compliance-ready visitor management platform for mid-sized workplaces with multiple locations. Each site gets a unique QR code. Visitors scan it, fill in their details, and must confirm they've read your safety rules — no skipping. You get a real-time dashboard, instant audit exports, and security features like watchlist screening, emergency evacuation lists, and lockdown mode — all standard, not upsold.",
    storyP4:
      "We're a small, independent team. No outside investors, no sales floor, no hidden agenda. That means we can keep our pricing flat, our product focused, and our support genuinely helpful.",
    valuesTitle: "What we believe",
    values: [
      {
        icon: MessageSquare,
        title: "No sales calls. Ever.",
        desc: "You'll never be asked to book a demo or speak to a salesperson. Sign up, set up, and start checking in visitors. Support is direct — you talk to the people who build the product.",
      },
      {
        icon: DollarSign,
        title: "Flat, transparent pricing",
        desc: "$49/month for up to 20 sites and unlimited visitors. No per-site fees, no hidden add-ons, no enterprise tiers. Cancel anytime in two clicks.",
      },
      {
        icon: FileCheck,
        title: "Compliance first",
        desc: "Mandatory policy acknowledgment means every visitor confirms your rules before entry. That's your proof during an audit — automatic, timestamped, and non-skippable.",
      },
    ],
    founderNoteTitle: "A note from the founder",
    founderP1:
      "I started SiteSafe after watching a safety manager spend 3 hours reconstructing visitor logs for an auditor. Paper logs, spreadsheets, and 'we think he signed in around 9am' — that was the best she could do. I knew there had to be a better way.",
    founderP2:
      "Our goal is simple: replace paper logs across every multi-site team that cares about safety. Not with enterprise complexity. Not with per-site fees. Just a tool that works, at a price that makes sense.",
    founderName: "— Gabriel",
    founderRole: "Founder, SiteSafe",
    cta: "Start Free Trial",
    trustNoCard: "No credit card",
    trustFree: "14 days free",
    trustCancel: "Cancel anytime",
    contactTitle: "Questions?",
    contactDesc:
      "No sales team. No call centers. Just the founder and the team, answering your email directly.",
    contactEmail: "hello@thesift.space",
    footer: "© 2026 SiteSafe by TheSift. All rights reserved.",
  },
  pt: {
    heroTitle: "Feito para equipes multi-local,",
    heroTitleGradient: "não para vendas enterprise",
    heroSubtitle:
      "Somos uma equipe pequena e independente. Sem investidores externos, sem time de vendas, sem agenda oculta. Apenas uma plataforma de gestão de visitantes que funciona.",
    stats: [
      { label: "Locais gerenciados", value: "2.400+" },
      { label: "Visitantes registrados", value: "180K+" },
      { label: "Tempo médio de configuração", value: "3 min" },
      { label: "Tempo de resposta do suporte", value: "< 60 seg" },
    ],
    storyTitle: "Por que criamos a SiteSafe",
    storyP1:
      "Passamos meses conversando com gerentes de facilities, supervisores de obra e administradores de escritório. Um problema sempre aparecia: os registros de visitantes ainda eram em papel, e quando uma auditoria chegava, o registro sumia.",
    storyP2:
      "As ferramentas digitais existentes eram feitas para grandes empresas — com preços altos, demonstrações obrigatórias e ciclos de vendas de 6 meses — ou não tinham os recursos de compliance que os locais de trabalho reais precisam. Como um reconhecimento de segurança obrigatório.",
    storyP3:
      "Então criamos a SiteSafe: uma plataforma de gestão de visitantes pronta para compliance, para locais de trabalho de médio porte com múltiplas unidades. Cada local recebe um QR code único. Visitantes escaneiam, preenchem os dados e devem confirmar que leram suas regras de segurança — sem pular. Você recebe um painel em tempo real, exportações instantâneas para auditoria e recursos de segurança como lista de bloqueio, listas de evacuação de emergência e modo lockdown — tudo padrão, sem upsell.",
    storyP4:
      "Somos uma equipe pequena e independente. Sem investidores externos, sem time de vendas, sem agenda oculta. Isso significa que podemos manter nossos preços fixos, nosso produto focado e nosso suporte genuinamente útil.",
    valuesTitle: "No que acreditamos",
    values: [
      {
        icon: MessageSquare,
        title: "Sem ligações de vendas. Nunca.",
        desc: "Você nunca será convidado a agendar uma demonstração ou falar com um vendedor. Cadastre-se, configure e comece a registrar visitantes. O suporte é direto — você fala com quem constrói o produto.",
      },
      {
        icon: DollarSign,
        title: "Preço fixo e transparente",
        desc: "R$249/mês para até 20 locais e visitantes ilimitados. Sem taxa por local, sem complementos ocultos, sem tiers enterprise. Cancele a qualquer momento em dois cliques.",
      },
      {
        icon: FileCheck,
        title: "Compliance em primeiro lugar",
        desc: "O reconhecimento obrigatório de políticas significa que cada visitante confirma suas regras antes da entrada. Essa é sua prova durante uma auditoria — automática, com timestamp e impossível de pular.",
      },
    ],
    founderNoteTitle: "Uma mensagem do fundador",
    founderP1:
      "Criei a SiteSafe depois de ver uma gerente de segurança passar 3 horas reconstruindo registros de visitantes para um auditor. Registros em papel, planilhas e 'acho que ele assinou por volta das 9h' — isso era o melhor que ela conseguia. Sabia que tinha que haver uma forma melhor.",
    founderP2:
      "Nosso objetivo é simples: substituir registros em papel em toda equipe multi-local que se preocupa com segurança. Não com complexidade enterprise. Não com taxas por local. Apenas uma ferramenta que funciona, a um preço que faz sentido.",
    founderName: "— Gabriel",
    founderRole: "Fundador, SiteSafe",
    cta: "Começar Teste Grátis",
    trustNoCard: "Sem cartão de crédito",
    trustFree: "14 dias grátis",
    trustCancel: "Cancele quando quiser",
    contactTitle: "Dúvidas?",
    contactDesc:
      "Sem time de vendas. Sem call centers. Apenas o fundador e a equipe, respondendo seu e-mail diretamente.",
    contactEmail: "hello@thesift.space",
    footer: "© 2026 SiteSafe by TheSift. Todos os direitos reservados.",
  },
};

export default function AboutClient({ locale }: AboutClientProps) {
  const copy = t[locale];

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200">
      <PublicHeader locale={locale} narrow />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        {/* ─── Hero ─── */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 mb-4">
            <Heart className="w-6 h-6 text-sky-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            {copy.heroTitle}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
              {copy.heroTitleGradient}
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {copy.heroSubtitle}
          </p>
        </div>

        {/* ─── Stats ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {copy.stats.map((stat, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 text-center"
            >
              <p className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ─── Story ─── */}
        <section className="rounded-2xl border border-white/5 bg-white/[0.03] p-8 sm:p-10">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <Rocket className="w-5 h-5 text-sky-400" />
            {copy.storyTitle}
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-slate-300">
            <p>{copy.storyP1}</p>
            <p>{copy.storyP2}</p>
            <p>{copy.storyP3}</p>
            <p>{copy.storyP4}</p>
          </div>
        </section>

        {/* ─── Values ─── */}
        <section>
          <h2 className="text-xl font-bold text-white mb-6 text-center">
            {copy.valuesTitle}
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {copy.values.map((v, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 hover:bg-white/[0.06] transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center mb-4">
                  <v.icon className="w-5 h-5 text-sky-400" />
                </div>
                <h3 className="font-semibold text-white text-sm mb-2">{v.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Team / Founder Note ─── */}
        <section className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 sm:p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-sky-500/20 rounded-full blur-[80px]" />
          
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-sky-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              {copy.founderNoteTitle}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-xl mx-auto mb-4">
              {copy.founderP1}
            </p>
            <p className="text-sm text-slate-300 leading-relaxed max-w-xl mx-auto mb-6">
              {copy.founderP2}
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <span className="font-medium text-slate-400">{copy.founderName}</span>
              <span>·</span>
              <span>{copy.founderRole}</span>
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <div className="text-center">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-lg active:scale-[0.98]"
          >
            {copy.cta} <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {copy.trustNoCard}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {copy.trustFree}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {copy.trustCancel}
            </span>
          </div>
        </div>

        {/* ─── Contact ─── */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-8 text-center">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-5 h-5 text-sky-400" />
          </div>
          <h2 className="text-lg font-bold text-white mb-2">{copy.contactTitle}</h2>
          <p className="text-sm text-slate-400 mb-4 max-w-md mx-auto">
            {copy.contactDesc}
          </p>
          <a
            href={`mailto:${copy.contactEmail}`}
            className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors"
          >
            <Mail className="w-4 h-4" />
            {copy.contactEmail}
          </a>
        </div>
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-white/5 py-12 bg-[#070b14]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs text-slate-600">
            {copy.footer}
          </p>
        </div>
      </footer>
    </div>
  );
}