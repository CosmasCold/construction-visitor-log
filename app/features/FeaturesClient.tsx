"use client";

import Link from "next/link";
import PublicHeader from "@/components/PublicHeader";
import {
  QrCode,
  Users,
  Mail,
  UserPlus,
  Printer,
  FileDown,
  Building,
  TrendingUp,
  Code,
  ArrowRight,
  CheckCircle2,
  Camera,
  ListChecks,
  Zap,
  AlertTriangle,
  FileText,
  ShieldAlert,
  Lock,
  BadgeCheck,
  Flame,
  Star,
  ShieldCheck,
} from "lucide-react";

interface FeaturesClientProps {
  locale: "en" | "pt";
}

const t = {
  en: {
    home: "Home",
    startTrial: "Start free trial",
    heroBadge: (n: number) => `${n} features included — no add-ons, no upsells`,
    heroTitle: "Everything you need to",
    heroTitleGradient: "replace paper logs",
    heroSubtitle:
      "No per-feature pricing. No enterprise tiers. Every tool below is included in the flat $49/month plan for up to 20 sites.",
    tryDemo: "Try Live Demo",
    trustNoCard: "No credit card",
    trustFree: "14-day trial",
    trustCancel: "Cancel anytime",
    pricingTitle: "One price. All features. No surprises.",
    pricingSubtitle:
      "Most visitor management tools charge per site or per feature. We think that's unfair to multi-location teams.",
    price: "$49",
    pricePeriod: "/mo",
    pricingCta: "Start my free 14-day trial",
    pricingNote: "No credit card required. Cancel anytime.",
    faqTeaser: "Questions?",
    faqDesc: "Everything is covered in our FAQ — no sales call needed.",
    viewFaq: "View FAQ",
    footer: "© 2026 SiteSafe by TheSift. All rights reserved.",
    featureGroups: [
      {
        outcome: "Check visitors in — securely and instantly",
        icon: BadgeCheck,
        items: [
          {
            icon: QrCode,
            title: "QR check-in",
            desc: "Each site gets a unique QR code. Visitors scan with their phone camera and sign in through their browser — no app download, no clipboard, no friction.",
            highlight: "Under 10 seconds",
          },
          {
            icon: Camera,
            title: "Photo capture",
            desc: "Auto-capture visitor photos at check-in. Stored securely with their record and printed on badges so security knows exactly who is on site.",
            highlight: "Instant ID",
          },
          {
            icon: ShieldCheck,
            title: "Mandatory safety briefing",
            desc: "Every visitor must acknowledge your safety rules before entry. Non-skippable, time-stamped, and audit-ready. Compliance proof is automatic.",
            highlight: "100% compliance",
          },
          {
            icon: ListChecks,
            title: "Pre-screening questions",
            desc: "Ask custom yes/no questions before entry. Block visitors who answer 'yes' to risk questions. Answers stored with the log for full traceability.",
            highlight: "Risk filtering",
          },
          {
            icon: ShieldAlert,
            title: "Watchlist & blocklist",
            desc: "Flag names, emails, or phone numbers. Blocked visitors are stopped at check-in and you get instant alerts via email, Slack, or webhook.",
            highlight: "Real-time alerts",
          },
          {
            icon: FileText,
            title: "Digital document signing",
            desc: "Require NDAs, waivers, or policies before entry. Visitors sign directly on the check-in screen with their finger or stylus. Stored forever.",
            highlight: "Legally binding",
          },
        ],
      },
      {
        outcome: "Know who is on site — and keep them safe",
        icon: Users,
        items: [
          {
            icon: Users,
            title: "Real-time dashboard",
            desc: "See exactly who is on site right now across all locations. Auto-refreshes every few seconds. Filter by site, host, or date range.",
            highlight: "Live data",
          },
          {
            icon: Mail,
            title: "Host notifications",
            desc: "Hosts get automatic email alerts when their visitor arrives. No more missed connections or front desk calls.",
            highlight: "Via Brevo",
          },
          {
            icon: UserPlus,
            title: "Pre-registration",
            desc: "Add expected visitors ahead of time. They sign in with one tap — no typing, no delays at the front desk or gate.",
            highlight: "One-tap entry",
          },
          {
            icon: Printer,
            title: "Badge printing",
            desc: "Print visitor badges with photo directly from the dashboard or check-in page. Compact, professional, and secure.",
            highlight: "Instant badges",
          },
          {
            icon: Lock,
            title: "Lockdown mode",
            desc: "One click blocks all new check-ins and flags the site. Security knows exactly who was inside and who tried to enter.",
            highlight: "Emergency ready",
          },
          {
            icon: AlertTriangle,
            title: "Emergency evacuation list",
            desc: "One click generates a PDF of everyone on site — names, hosts, photos, and sign-in times. Essential for drills and real emergencies.",
            highlight: "12 seconds",
          },
        ],
      },
      {
        outcome: "Pass audits without the panic",
        icon: FileDown,
        items: [
          {
            icon: FileDown,
            title: "One-click exports",
            desc: "Export filtered visitor logs in CSV, Excel, or PDF. Includes pre-screening answers, signatures, photos, and timestamps.",
            highlight: "Audit-ready",
          },
          {
            icon: TrendingUp,
            title: "Built-in analytics",
            desc: "30-day trend charts, visitor totals by site, peak hour analysis, and CSV export. Understand traffic patterns at a glance.",
            highlight: "Trend insights",
          },
          {
            icon: Building,
            title: "Multi-site management",
            desc: "Up to 20 sites under one account. Each site gets its own QR code, hosts, settings, and visitor log. Switch in one click.",
            highlight: "One account",
          },
        ],
      },
      {
        outcome: "Connect to your existing tools",
        icon: Zap,
        items: [
          {
            icon: Code,
            title: "REST API",
            desc: "Full REST API with Bearer token authentication. Connect SiteSafe to your HR tools, Slack, custom dashboards, or anything else.",
            highlight: "Developer-first",
          },
          {
            icon: Zap,
            title: "Webhooks",
            desc: "Send real-time events — check-in, check-out, blocklist hits — to any URL. Build custom workflows in minutes.",
            highlight: "Real-time",
          },
          {
            icon: Zap,
            title: "Built-in integrations",
            desc: "Slack notifications, Google Sheets sync, and Zapier support come standard. No extra configuration needed.",
            highlight: "No-code",
          },
        ],
      },
    ],
    pricingFeatures: [
      "Unlimited visitors across all sites",
      "QR codes for every location",
      "Photo capture & badge printing",
      "Audit exports (CSV, Excel, PDF)",
      "Watchlist & lockdown mode",
      "Digital document signing",
      "REST API & webhooks",
      "Live chat support (< 60 sec)",
    ],
  },
  pt: {
    home: "Início",
    startTrial: "Começar teste grátis",
    heroBadge: (n: number) => `${n} funcionalidades inclusas — sem complementos, sem upsells`,
    heroTitle: "Tudo o que você precisa para",
    heroTitleGradient: "substituir registros em papel",
    heroSubtitle:
      "Sem preço por funcionalidade. Sem tiers enterprise. Cada ferramenta abaixo está inclusa no plano fixo de R$249/mês para até 20 locais.",
    tryDemo: "Experimentar Demonstração",
    trustNoCard: "Sem cartão de crédito",
    trustFree: "Teste de 14 dias",
    trustCancel: "Cancele quando quiser",
    pricingTitle: "Um preço. Todas as funcionalidades. Sem surpresas.",
    pricingSubtitle:
      "A maioria das ferramentas de gestão de visitantes cobra por local ou por funcionalidade. Achamos isso injusto para equipes multi-local.",
    price: "R$249",
    pricePeriod: "/mês",
    pricingCta: "Começar meu teste grátis de 14 dias",
    pricingNote: "Sem cartão de crédito. Cancele quando quiser.",
    faqTeaser: "Dúvidas?",
    faqDesc: "Tudo está coberto em nosso FAQ — sem ligação de vendas.",
    viewFaq: "Ver FAQ",
    footer: "© 2026 SiteSafe by TheSift. Todos os direitos reservados.",
    featureGroups: [
      {
        outcome: "Registre visitantes — com segurança e instantaneamente",
        icon: BadgeCheck,
        items: [
          {
            icon: QrCode,
            title: "Check-in por QR",
            desc: "Cada local recebe um QR code único. Visitantes escaneiam com a câmera do celular e fazem check-in pelo navegador — sem baixar app, sem prancheta, sem atrito.",
            highlight: "Menos de 10 segundos",
          },
          {
            icon: Camera,
            title: "Captura de foto",
            desc: "Captura automática de fotos dos visitantes no check-in. Armazenada com segurança no registro e impressa nos crachás para que a segurança saiba exatamente quem está no local.",
            highlight: "ID instantâneo",
          },
          {
            icon: ShieldCheck,
            title: "Briefing de segurança obrigatório",
            desc: "Cada visitante deve reconhecer suas regras de segurança antes da entrada. Impossível de pular, com timestamp e pronto para auditoria. A prova de compliance é automática.",
            highlight: "100% compliance",
          },
          {
            icon: ListChecks,
            title: "Perguntas de pré-triagem",
            desc: "Faça perguntas personalizadas de sim/não antes da entrada. Bloqueie visitantes que respondem 'sim' a perguntas de risco. Respostas armazenadas no registro para rastreabilidade completa.",
            highlight: "Filtragem de risco",
          },
          {
            icon: ShieldAlert,
            title: "Lista de bloqueio / watchlist",
            desc: "Sinalize nomes, e-mails ou telefones. Visitantes bloqueados são impedidos no check-in e você recebe alertas instantâneos por e-mail, Slack ou webhook.",
            highlight: "Alertas em tempo real",
          },
          {
            icon: FileText,
            title: "Assinatura digital de documentos",
            desc: "Exija NDAs, termos ou políticas antes da entrada. Visitantes assinam diretamente na tela de check-in com o dedo ou caneta. Armazenado para sempre.",
            highlight: "Juridicamente válido",
          },
        ],
      },
      {
        outcome: "Saiba quem está no local — e mantenha-os seguros",
        icon: Users,
        items: [
          {
            icon: Users,
            title: "Painel em tempo real",
            desc: "Veja exatamente quem está no local agora em todas as unidades. Atualiza automaticamente a cada poucos segundos. Filtre por local, anfitrião ou intervalo de datas.",
            highlight: "Dados ao vivo",
          },
          {
            icon: Mail,
            title: "Notificações aos anfitriões",
            desc: "Anfitriões recebem alertas automáticos por e-mail quando seu visitante chega. Chega de conexões perdidas ou ligações na recepção.",
            highlight: "Via Brevo",
          },
          {
            icon: UserPlus,
            title: "Pré-cadastro",
            desc: "Adicione visitantes esperados com antecedência. Eles fazem check-in com um toque — sem digitar, sem atrasos na recepção ou portaria.",
            highlight: "Entrada com um toque",
          },
          {
            icon: Printer,
            title: "Impressão de crachás",
            desc: "Imprima crachás de visitantes com foto diretamente do painel ou página de check-in. Compacto, profissional e seguro.",
            highlight: "Crachás instantâneos",
          },
          {
            icon: Lock,
            title: "Modo lockdown",
            desc: "Um clique bloqueia todos os novos check-ins e sinaliza o local. A segurança sabe exatamente quem estava dentro e quem tentou entrar.",
            highlight: "Pronto para emergências",
          },
          {
            icon: AlertTriangle,
            title: "Lista de evacuação de emergência",
            desc: "Um clique gera um PDF de todos no local — nomes, anfitriões, fotos e horários de entrada. Essencial para simulados e emergências reais.",
            highlight: "12 segundos",
          },
        ],
      },
      {
        outcome: "Passe em auditorias sem pânico",
        icon: FileDown,
        items: [
          {
            icon: FileDown,
            title: "Exportações em um clique",
            desc: "Exporte registros de visitantes filtrados em CSV, Excel ou PDF. Inclui respostas de pré-triagem, assinaturas, fotos e timestamps.",
            highlight: "Pronto para auditoria",
          },
          {
            icon: TrendingUp,
            title: "Análises integradas",
            desc: "Gráficos de tendência de 30 dias, totais de visitantes por local, análise de horários de pico e exportação CSV. Entenda padrões de tráfego rapidamente.",
            highlight: "Insights de tendência",
          },
          {
            icon: Building,
            title: "Gestão multi-local",
            desc: "Até 20 locais em uma conta. Cada local recebe seu próprio QR code, anfitriões, configurações e registro de visitantes. Alterne em um clique.",
            highlight: "Uma conta",
          },
        ],
      },
      {
        outcome: "Conecte-se às suas ferramentas existentes",
        icon: Zap,
        items: [
          {
            icon: Code,
            title: "API REST",
            desc: "API REST completa com autenticação Bearer token. Conecte a SiteSafe às suas ferramentas de RH, Slack, painéis personalizados ou qualquer outra coisa.",
            highlight: "Foco no desenvolvedor",
          },
          {
            icon: Zap,
            title: "Webhooks",
            desc: "Envie eventos em tempo real — check-in, check-out, detecções na lista de bloqueio — para qualquer URL. Construa fluxos personalizados em minutos.",
            highlight: "Tempo real",
          },
          {
            icon: Zap,
            title: "Integrações integradas",
            desc: "Notificações Slack, sincronização Google Sheets e suporte Zapier vêm como padrão. Sem configuração extra necessária.",
            highlight: "No-code",
          },
        ],
      },
    ],
    pricingFeatures: [
      "Visitantes ilimitados em todos os locais",
      "QR codes para cada local",
      "Captura de foto e impressão de crachás",
      "Exportações de auditoria (CSV, Excel, PDF)",
      "Lista de bloqueio e modo lockdown",
      "Assinatura digital de documentos",
      "API REST e webhooks",
      "Suporte por chat ao vivo (< 60 seg)",
    ],
  },
};

export default function FeaturesClient({ locale }: FeaturesClientProps) {
  const copy = t[locale];
  const allFeatures = copy.featureGroups.flatMap((g) => g.items);
  const totalFeatures = allFeatures.length;

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200">
      <PublicHeader locale={locale} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        
        {/* ─── Hero ─── */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-medium mb-6">
            <Flame className="w-3.5 h-3.5" />
            {copy.heroBadge(totalFeatures)}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            {copy.heroTitle}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
              {copy.heroTitleGradient}
            </span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            {copy.heroSubtitle}
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] active:scale-[0.98]"
            >
              {copy.startTrial} <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-slate-300 border border-white/10 hover:bg-white/5 transition-all"
            >
              {copy.tryDemo}
            </Link>
          </div>
          <p className="mt-4 text-xs text-slate-500 flex items-center justify-center gap-4">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {copy.trustNoCard}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {copy.trustFree}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {copy.trustCancel}
            </span>
          </p>
        </div>

        {/* ─── Feature Grid ─── */}
        <div className="space-y-20">
          {copy.featureGroups.map((group, groupIdx) => (
            <section key={groupIdx}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center">
                  <group.icon className="w-5 h-5 text-sky-400" />
                </div>
                <h2 className="text-xl font-bold text-white">{group.outcome}</h2>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="group h-full rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/10 p-6 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-sky-500/10 transition-colors">
                        <item.icon className="w-5 h-5 text-slate-300 group-hover:text-sky-400 transition-colors" />
                      </div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-medium text-sky-400 uppercase tracking-wider">
                        {item.highlight}
                      </span>
                    </div>
                    <h3 className="font-semibold text-white text-sm mb-2">{item.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* ─── Pricing Anchor ─── */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-sky-500/20 rounded-full blur-[80px]" />
          
          <div className="relative">
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-sm text-slate-400 ml-2">4.9/5 on G2</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              {copy.pricingTitle}
            </h2>
            <p className="text-lg text-slate-400 max-w-xl mx-auto mb-8">
              {copy.pricingSubtitle}
            </p>
            
            <div className="flex items-baseline justify-center gap-1 mb-8">
              <span className="text-5xl sm:text-6xl font-extrabold text-white">{copy.price}</span>
              <span className="text-xl text-slate-400">{copy.pricePeriod}</span>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-3 max-w-lg mx-auto mb-8 text-left">
              {copy.pricingFeatures.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
            
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-lg active:scale-[0.98]"
            >
              {copy.pricingCta}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <p className="mt-3 text-xs text-slate-500">
              {copy.pricingNote}
            </p>
          </div>
        </div>

        {/* ─── FAQ Teaser ─── */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-white mb-3">{copy.faqTeaser}</h2>
          <p className="text-sm text-slate-400 mb-4">
            {copy.faqDesc}
          </p>
          <Link
            href="/#faq"
            className="inline-flex items-center gap-1 text-sm text-sky-400 hover:text-sky-300 transition-colors"
          >
            {copy.viewFaq} <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-white/5 py-12 bg-[#070b14]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-slate-600">
            {copy.footer}
          </p>
        </div>
      </footer>
    </div>
  );
}