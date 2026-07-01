"use client";

import Link from "next/link";
import PublicHeader from "@/components/PublicHeader";
import {
  ArrowRight,
  CheckCircle2,
  DollarSign,
  Star,
  Zap,
  Users,
  FileText,
  TrendingUp,
  ChevronRight,
  BadgeCheck,
  Flame,
} from "lucide-react";

interface PricingClientProps {
  locale: "en" | "pt";
}

const t = {
  en: {
    home: "Home",
    features: "Features",
    startTrial: "Start free trial",
    heroBadge: "Save $1,000+/year vs. per-site pricing",
    heroTitle: "One price.",
    heroTitleGradient: "20 sites. No surprises.",
    heroSubtitle:
      "Most visitor management tools charge per site. We think that's unfair to multi-location teams. Flat $49/mo. Unlimited visitors. Every feature included.",
    planName: "SiteSafe Pro",
    price: "$49",
    pricePeriod: "/mo",
    billedMonthly: "Billed monthly. No annual contract.",
    ctaPrimary: "Start My Free Trial",
    trustBadges: [
      "No credit card required",
      "Cancel in 2 clicks",
      "Setup in 3 minutes",
      "No sales calls ever",
    ],
    planFeatures: [
      "Up to 20 sites",
      "Unlimited visitors",
      "All features included",
      "14-day free trial",
      "No credit card required",
      "Cancel anytime",
    ],
    featuresTitle: "Everything included — no add-ons",
    featuresSubtitle:
      "Every feature below works across all 20 sites. No upsells, no enterprise tiers.",
    comparisonTitle: "The real cost of per-site pricing",
    comparisonSubtitle:
      "Compare SiteSafe's flat rate to what you'd pay with per-location pricing.",
    comparisonHeaders: ["Scenario", "SiteSafe", "Envoy", "SwipedOn", "Your Savings"],
    comparisonDisclaimer:
      "Envoy and SwipedOn pricing based on public per-location rates. Actual costs may vary.",
    testimonialQuote:
      "We were paying $89/site with our old provider. With 8 locations, that was $712/month. SiteSafe is $49 for all 20 sites. The math was obvious.",
    testimonialName: "David Park",
    testimonialRole: "Operations Manager, Apex Logistics",
    testimonialSavings: "Saved $7,956/year",
    faqTitle: "Common questions",
    faqLink: "View full FAQ →",
    moreQuestions: "More questions?",
    finalCtaTitle: "Start saving today",
    finalCtaSubtitle:
      "14-day free trial. No credit card. No sales call. See why 200+ teams switched from per-site pricing.",
    finalCtaPrimary: "Start Free Trial",
    finalCtaSecondary: "Try Live Demo",
    auditPrompt: "Not sure if you're ready to switch?",
    auditLink: "Run our free 60-second visitor log audit →",
    footer: "© 2026 SiteSafe by TheSift. All rights reserved.",
    featureCategories: [
      {
        category: "Check-in",
        icon: Zap,
        items: [
          "QR check-in per site",
          "Mandatory policy acknowledgment",
          "Photo capture at sign-in",
          "Custom pre-screening questions",
          "Watchlist / blocklist screening",
        ],
      },
      {
        category: "Management",
        icon: Users,
        items: [
          "Real-time dashboard (auto-refresh)",
          "Host email notifications",
          "Pre-registration of visitors",
          "Photo badge printing",
          "One-click lockdown mode",
          "Emergency evacuation list (PDF)",
        ],
      },
      {
        category: "Compliance & Export",
        icon: FileText,
        items: [
          "Audit exports (CSV, Excel, PDF)",
          "Multi-site management (up to 20)",
          "Built-in analytics & trends",
          "Digital document signing (NDAs, waivers)",
          "5-year data retention",
        ],
      },
      {
        category: "Integrations",
        icon: TrendingUp,
        items: ["REST API with Bearer auth", "Webhooks (real-time events)", "Slack notifications", "Google Sheets sync", "Zapier support"],
      },
    ],
    comparisonData: [
      { feature: "5 sites", siteSafe: "$49", envoy: "~$600", swipedOn: "~$360", savings: "$551+" },
      { feature: "10 sites", siteSafe: "$49", envoy: "~$1,200", swipedOn: "~$720", savings: "$671+" },
      { feature: "15 sites", siteSafe: "$49", envoy: "~$1,800", swipedOn: "~$1,080", savings: "$1,031+" },
      { feature: "20 sites", siteSafe: "$49", envoy: "~$2,400", swipedOn: "~$1,440", savings: "$1,391+" },
      { feature: "Mandatory safety briefings", siteSafe: "✅ Included", envoy: "❌ Add-on / not available", swipedOn: "❌ Not available", savings: "—" },
      { feature: "Lockdown mode", siteSafe: "✅ Included", envoy: "❌ Not available", swipedOn: "❌ Not available", savings: "—" },
      { feature: "Sales call required", siteSafe: "❌ Never", envoy: "✅ Always", swipedOn: "❌ No", savings: "—" },
      { feature: "Setup time", siteSafe: "3 minutes", envoy: "Days to weeks", swipedOn: "Hours", savings: "—" },
    ],
    faqs: [
      {
        q: "What happens after the 14-day trial?",
        a: "You'll be prompted to add a payment method to continue. If you choose not to, your account and data are deleted after 30 days.",
      },
      {
        q: "Can I add more than 20 sites?",
        a: "Contact us for enterprise pricing. Most teams under 20 sites never need to talk to sales.",
      },
      {
        q: "Is there a limit on visitors per month?",
        a: "No. Unlimited visitors across all sites. The only limit is the number of sites (20).",
      },
      {
        q: "Do I need a credit card to start the trial?",
        a: "No. The 14-day trial starts instantly with just an email and password.",
      },
    ],
  },
  pt: {
    home: "Início",
    features: "Funcionalidades",
    startTrial: "Começar teste grátis",
    heroBadge: "Economize R$6.000+/ano vs. preço por local",
    heroTitle: "Um preço.",
    heroTitleGradient: "20 locais. Sem surpresas.",
    heroSubtitle:
      "A maioria das ferramentas de gestão de visitantes cobra por local. Achamos isso injusto para equipes multi-local. R$249/mês fixo. Visitantes ilimitados. Tudo incluso.",
    planName: "SiteSafe Pro",
    price: "R$249",
    pricePeriod: "/mês",
    billedMonthly: "Cobrança mensal. Sem contrato anual.",
    ctaPrimary: "Começar Meu Teste Grátis",
    trustBadges: [
      "Sem cartão de crédito",
      "Cancele em 2 cliques",
      "Configuração em 3 minutos",
      "Sem ligações de vendas",
    ],
    planFeatures: [
      "Até 20 locais",
      "Visitantes ilimitados",
      "Todas as funcionalidades inclusas",
      "Teste grátis de 14 dias",
      "Sem cartão de crédito",
      "Cancele quando quiser",
    ],
    featuresTitle: "Tudo incluso — sem complementos",
    featuresSubtitle:
      "Cada funcionalidade abaixo funciona em todos os 20 locais. Sem upsells, sem tiers enterprise.",
    comparisonTitle: "O custo real do preço por local",
    comparisonSubtitle:
      "Compare o preço fixo da SiteSafe com o que você pagaria com cobrança por local.",
    comparisonHeaders: ["Cenário", "SiteSafe", "Envoy", "SwipedOn", "Sua Economia"],
    comparisonDisclaimer:
      "Preços da Envoy e SwipedOn baseados em tarifas públicas por local. Custos reais podem variar.",
    testimonialQuote:
      "Pagávamos R$89/local com nosso antigo fornecedor. Com 8 unidades, eram R$712/mês. A SiteSafe cobra R$249 por todos os 20 locais. A conta era óbvia.",
    testimonialName: "David Park",
    testimonialRole: "Gerente de Operações, Apex Logistics",
    testimonialSavings: "Economizou R$47.736/ano",
    faqTitle: "Perguntas comuns",
    faqLink: "Ver FAQ completo →",
    moreQuestions: "Mais dúvidas?",
    finalCtaTitle: "Comece a economizar hoje",
    finalCtaSubtitle:
      "Teste grátis de 14 dias. Sem cartão de crédito. Sem ligação de vendas. Veja por que mais de 200 equipes mudaram do preço por local.",
    finalCtaPrimary: "Começar Teste Grátis",
    finalCtaSecondary: "Experimentar Demonstração",
    auditPrompt: "Não tem certeza se está pronto para mudar?",
    auditLink: "Faça nossa auditoria gratuita de 60 segundos →",
    footer: "© 2026 SiteSafe by TheSift. Todos os direitos reservados.",
    featureCategories: [
      {
        category: "Check-in",
        icon: Zap,
        items: [
          "Check-in por QR por local",
          "Reconhecimento obrigatório de políticas",
          "Captura de foto na entrada",
          "Perguntas de pré-triagem personalizadas",
          "Triagem de lista de bloqueio / watchlist",
        ],
      },
      {
        category: "Gestão",
        icon: Users,
        items: [
          "Painel em tempo real (auto-atualização)",
          "Notificações por e-mail aos anfitriões",
          "Pré-cadastro de visitantes",
          "Impressão de crachá com foto",
          "Modo lockdown com um clique",
          "Lista de evacuação de emergência (PDF)",
        ],
      },
      {
        category: "Compliance & Exportação",
        icon: FileText,
        items: [
          "Exportações de auditoria (CSV, Excel, PDF)",
          "Gestão multi-local (até 20)",
          "Análises e tendências integradas",
          "Assinatura digital de documentos (NDAs, termos)",
          "Retenção de dados por 5 anos",
        ],
      },
      {
        category: "Integrações",
        icon: TrendingUp,
        items: ["API REST com auth Bearer", "Webhooks (eventos em tempo real)", "Notificações Slack", "Sincronização Google Sheets", "Suporte Zapier"],
      },
    ],
    comparisonData: [
      { feature: "5 locais", siteSafe: "R$249", envoy: "~R$3.000", swipedOn: "~R$1.800", savings: "R$2.751+" },
      { feature: "10 locais", siteSafe: "R$249", envoy: "~R$6.000", swipedOn: "~R$3.600", savings: "R$3.351+" },
      { feature: "15 locais", siteSafe: "R$249", envoy: "~R$9.000", swipedOn: "~R$5.400", savings: "R$5.151+" },
      { feature: "20 locais", siteSafe: "R$249", envoy: "~R$12.000", swipedOn: "~R$7.200", savings: "R$6.951+" },
      { feature: "Briefings de segurança obrigatórios", siteSafe: "✅ Incluso", envoy: "❌ Complemento / indisponível", swipedOn: "❌ Indisponível", savings: "—" },
      { feature: "Modo lockdown", siteSafe: "✅ Incluso", envoy: "❌ Indisponível", swipedOn: "❌ Indisponível", savings: "—" },
      { feature: "Ligação de vendas obrigatória", siteSafe: "❌ Nunca", envoy: "✅ Sempre", swipedOn: "❌ Não", savings: "—" },
      { feature: "Tempo de configuração", siteSafe: "3 minutos", envoy: "Dias a semanas", swipedOn: "Horas", savings: "—" },
    ],
    faqs: [
      {
        q: "O que acontece após o teste de 14 dias?",
        a: "Você será convidado a adicionar uma forma de pagamento para continuar. Se preferir não, sua conta e dados serão excluídos após 30 dias.",
      },
      {
        q: "Posso adicionar mais de 20 locais?",
        a: "Entre em contato para preços enterprise. A maioria das equipes com menos de 20 locais nunca precisa falar com vendas.",
      },
      {
        q: "Há limite de visitantes por mês?",
        a: "Não. Visitantes ilimitados em todos os locais. O único limite é o número de locais (20).",
      },
      {
        q: "Preciso de cartão de crédito para começar o teste?",
        a: "Não. O teste de 14 dias começa instantaneamente com apenas e-mail e senha.",
      },
    ],
  },
};

export default function PricingClient({ locale }: PricingClientProps) {
  const copy = t[locale];

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200">
      <PublicHeader locale={locale} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-20">
        {/* ─── Hero ─── */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
            <Flame className="w-3.5 h-3.5" />
            {copy.heroBadge}
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
        </div>

        {/* ─── Pricing Card ─── */}
        <div className="max-w-lg mx-auto">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-sky-500/20 rounded-full blur-[80px]" />
            
            <div className="relative">
              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs text-slate-400 ml-2">4.9/5 on G2</span>
              </div>

              <p className="text-sm text-sky-300 font-medium mb-2 uppercase tracking-wider">
                {copy.planName}
              </p>
              
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="text-6xl sm:text-7xl font-extrabold text-white">{copy.price}</span>
                <span className="text-xl text-slate-400">{copy.pricePeriod}</span>
              </div>
              
              <p className="text-sm text-slate-400 mb-8">
                {copy.billedMonthly}
              </p>

              <div className="space-y-3 text-left max-w-sm mx-auto mb-8">
                {copy.planFeatures.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <Link
                href="/signup"
                className="inline-flex items-center justify-center w-full px-8 py-4 text-base font-semibold rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-lg active:scale-[0.98]"
              >
                {copy.ctaPrimary}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] text-slate-500">
                {copy.trustBadges.map((badge, i) => (
                  <span key={i} className="flex items-center gap-1">
                    <BadgeCheck className="w-3 h-3 text-emerald-400" /> {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── Feature Grid ─── */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              {copy.featuresTitle}
            </h2>
            <p className="text-slate-400">
              {copy.featuresSubtitle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {copy.featureCategories.map((cat, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 hover:bg-white/[0.06] transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center">
                    <cat.icon className="w-4 h-4 text-sky-400" />
                  </div>
                  <h3 className="font-semibold text-white">{cat.category}</h3>
                </div>
                <ul className="space-y-2">
                  {cat.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Comparison Table ─── */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              {copy.comparisonTitle}
            </h2>
            <p className="text-slate-400">
              {copy.comparisonSubtitle}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/[0.03] border-b border-white/5">
                    {copy.comparisonHeaders.map((h, i) => (
                      <th key={i} className={`p-4 text-left text-xs uppercase tracking-wider font-semibold ${
                        i === 1 ? "text-emerald-400" : i === 4 ? "text-sky-400" : "text-slate-500"
                      }`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {copy.comparisonData.map((row, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 text-sm font-medium text-white">{row.feature}</td>
                      <td className="p-4 text-sm font-bold text-emerald-400">{row.siteSafe}</td>
                      <td className="p-4 text-sm text-slate-400">{row.envoy}</td>
                      <td className="p-4 text-sm text-slate-400">{row.swipedOn}</td>
                      <td className="p-4 text-sm font-bold text-sky-400">{row.savings}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-center text-sm text-slate-500 mt-4">
            {copy.comparisonDisclaimer}
          </p>
        </section>

        {/* ─── Testimonial ─── */}
        <section className="rounded-2xl border border-white/5 bg-white/[0.03] p-8 sm:p-10">
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <blockquote className="text-lg sm:text-xl text-slate-200 text-center leading-relaxed max-w-2xl mx-auto mb-6 italic">
            {copy.testimonialQuote}
          </blockquote>
          <div className="text-center">
            <p className="text-sm font-semibold text-white">{copy.testimonialName}</p>
            <p className="text-xs text-slate-500">{copy.testimonialRole}</p>
            <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <DollarSign className="w-3 h-3" />
              {copy.testimonialSavings}
            </div>
          </div>
        </section>

        {/* ─── FAQ Teaser ─── */}
        <section className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-6 text-center">
            {copy.faqTitle}
          </h2>
          <div className="space-y-4">
            {copy.faqs.map((faq, i) => (
              <details key={i} className="group rounded-xl border border-white/5 bg-white/[0.03] overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-white/[0.02] transition-colors">
                  <span className="text-sm font-medium text-white">{faq.q}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-open:rotate-90 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-5 pb-5 text-sm text-slate-400 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
          <p className="text-center text-xs text-slate-500 mt-4">
            {copy.moreQuestions}{" "}
            <Link href="/faq" className="text-sky-400 hover:text-sky-300 transition-colors">
              {copy.faqLink}
            </Link>
          </p>
        </section>

        {/* ─── Final CTA ─── */}
        <section className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-sky-500/20 rounded-full blur-[80px]" />
          
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {copy.finalCtaTitle}
            </h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              {copy.finalCtaSubtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-lg active:scale-[0.98]"
              >
                {copy.finalCtaPrimary}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-slate-300 border border-white/10 hover:bg-white/5 transition-all"
              >
                {copy.finalCtaSecondary}
              </Link>
            </div>
            
            <div className="mt-4 flex items-center justify-center gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {locale === "pt" ? "Sem cartão de crédito" : "No credit card"}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {locale === "pt" ? "14 dias grátis" : "14 days free"}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {locale === "pt" ? "Cancele quando quiser" : "Cancel anytime"}
              </span>
            </div>
          </div>
        </section>

        {/* ─── Audit CTA ─── */}
        <div className="text-center">
          <p className="text-sm text-slate-400">
            {copy.auditPrompt}{" "}
            <Link href="/audit" className="text-sky-400 hover:text-sky-300 transition-colors">
              {copy.auditLink}
            </Link>
          </p>
        </div>
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-white/5 py-12 bg-[#070b14]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-xs text-slate-600">
            {copy.footer}
          </p>
        </div>
      </footer>
    </div>
  );
}