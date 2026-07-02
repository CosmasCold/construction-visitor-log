"use client";

import Link from "next/link";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";

interface CompareClientProps {
  locale: "en" | "pt";
}

const t = {
  en: {
    title: "SiteSafe vs the Alternatives",
    subtitle:
      "A side-by-side look at how SiteSafe compares to Envoy, SwipedOn, and the classic paper log.",
    featureComparison: "Feature Comparison",
    savingsTitle: "How much would you save?",
    savingsSubtitle: "Move the slider to match your number of sites.",
    sites: "Number of Sites",
    siteSingular: "site",
    sitePlural: "sites",
    whyTitle: "Why Choose SiteSafe?",
    ctaTitle: "Start Your Free Trial Today",
    ctaSubtitle: "14-day free trial. No credit card. No sales call.",
    ctaButton: "Start My Free Trial",
    checklistPrompt:
      "Don't leave without your free audit checklist.",
    checklistLink: "Download the 10-point checklist →",
    siteSafeLabel: "SiteSafe",
    envoyLabel: "Envoy",
    swipedOnLabel: "SwipedOn",
    paperLogLabel: "Paper Log",
    feature: "Feature",
    savingsMath:
      "The math is simple. SiteSafe saves you thousands of dollars compared to per-site pricing — and gives you more features.",
    comparisonData: [
      { feature: "QR check-in", siteSafe: true, envoy: true, swipedOn: true, paperLog: false },
      { feature: "Photo capture", siteSafe: true, envoy: true, swipedOn: true, paperLog: false },
      { feature: "Mandatory safety acknowledgment", siteSafe: "Mandatory", envoy: "Optional", swipedOn: "Not available", paperLog: false, siteSafeNote: "✅ Mandatory", envoyNote: "❌ Optional", swipedOnNote: "❌ Not available" },
      { feature: "Host email notifications", siteSafe: "Included", envoy: "Paid add-on", swipedOn: "Paid add-on", paperLog: false, siteSafeNote: "✅ Included", envoyNote: "❌ Paid add-on", swipedOnNote: "❌ Paid add-on" },
      { feature: "Pre-registration", siteSafe: "Included", envoy: "Paid add-on", swipedOn: "Paid add-on", paperLog: false, siteSafeNote: "✅ Included", envoyNote: "❌ Paid add-on", swipedOnNote: "❌ Paid add-on" },
      { feature: "Visitor badge printing", siteSafe: true, envoy: true, swipedOn: true, paperLog: false },
      { feature: "Real-time dashboard", siteSafe: "Every 5 sec", envoy: "Standard", swipedOn: "Standard", paperLog: false },
      { feature: "Remote sign-out", siteSafe: true, envoy: true, swipedOn: true, paperLog: false },
      { feature: "Audit exports (CSV/Excel/PDF)", siteSafe: "Filterable", envoy: "Paid tier", swipedOn: "Basic", paperLog: false, siteSafeNote: "✅ Filterable", envoyNote: "❌ Paid tier", swipedOnNote: "❌ Basic" },
      { feature: "Built-in analytics", siteSafe: "30-day, CSV", envoy: "Premium", swipedOn: "Basic", paperLog: false, siteSafeNote: "✅ 30-day, CSV", envoyNote: "❌ Premium", swipedOnNote: "❌ Basic" },
      { feature: "REST API", siteSafe: "Full docs", envoy: "Enterprise", swipedOn: "Enterprise", paperLog: false, siteSafeNote: "✅ Full docs", envoyNote: "❌ Enterprise", swipedOnNote: "❌ Enterprise" },
      { feature: "Multi-site management", siteSafe: "Up to 20, free", envoy: "Per-site fee", swipedOn: "Per-site fee", paperLog: false, siteSafeNote: "✅ Up to 20, free", envoyNote: "❌ Per-site fee", swipedOnNote: "❌ Per-site fee" },
      { feature: "Watchlist / blocklist", siteSafe: "Included", envoy: "Paid add-on", swipedOn: "Not available", paperLog: false, siteSafeNote: "✅ Included", envoyNote: "❌ Paid add-on", swipedOnNote: "❌ Not available" },
      { feature: "Emergency evacuation list", siteSafe: "Included", envoy: "Not available", swipedOn: "Not available", paperLog: false, siteSafeNote: "✅ Included", envoyNote: "❌ Not available", swipedOnNote: "❌ Not available" },
      { feature: "Lockdown mode", siteSafe: "Included", envoy: "Not available", swipedOn: "Not available", paperLog: false, siteSafeNote: "✅ Included", envoyNote: "❌ Not available", swipedOnNote: "❌ Not available" },
      { feature: "Webhooks", siteSafe: "Included", envoy: "Enterprise", swipedOn: "Enterprise", paperLog: false, siteSafeNote: "✅ Included", envoyNote: "❌ Enterprise", swipedOnNote: "❌ Enterprise" },
      { feature: "Digital document signing", siteSafe: "Included", envoy: "Enterprise", swipedOn: "Not available", paperLog: false, siteSafeNote: "✅ Included", envoyNote: "❌ Enterprise", swipedOnNote: "❌ Not available" },
      { feature: "Free trial", siteSafe: "14 days, no card", envoy: "N/A", swipedOn: "Limited", paperLog: "N/A", siteSafeNote: "✅ 14 days, no card", envoyNote: "❌ N/A", swipedOnNote: "✅ Limited" },
      { feature: "Sales calls required", siteSafe: "No", envoy: "Yes", swipedOn: "No", paperLog: "N/A", siteSafeNote: "✅ No", envoyNote: "❌ Yes", swipedOnNote: "✅ No" },
      { feature: "Pricing model", siteSafe: "$49/mo flat", envoy: "$99+/mo + fees", swipedOn: "$39+/mo + fees", paperLog: "$20/yr clipboards", siteSafeNote: "**$49/mo flat**", envoyNote: "**$99+/mo + fees**", swipedOnNote: "**$39+/mo + fees**", paperLogNote: "**$20/yr clipboards**" },
      { feature: "Hidden costs", siteSafe: "None", envoy: "Per-visitor fees", swipedOn: "Upsells", paperLog: "Audit risk", siteSafeNote: "✅ None", envoyNote: "❌ Per-visitor fees", swipedOnNote: "❌ Upsells", paperLogNote: "❌ Audit risk" },
    ],
    savingsTable: [
      { sites: 1, envoy: "~$99/mo", swipedOn: "~$39/mo", siteSafe: "$49/mo" },
      { sites: 5, envoy: "~$600/mo", swipedOn: "~$360/mo", siteSafe: "$49/mo" },
      { sites: 10, envoy: "~$1,200/mo", swipedOn: "~$720/mo", siteSafe: "$49/mo" },
      { sites: 20, envoy: "~$2,400/mo", swipedOn: "~$1,440/mo", siteSafe: "$49/mo" },
    ],
    whySiteSafe: [
      {
        title: "1. Flat pricing, no surprises",
        body: "$49/month for up to 20 sites. No per-location fees. No hidden add-ons.",
      },
      {
        title: "2. Compliance built-in",
        body: "Mandatory safety acknowledgment. Emergency evacuation lists. Lockdown mode. Watchlist screening. All standard.",
      },
      {
        title: "3. No sales calls",
        body: "Start your 14-day free trial instantly. No demos. No pressure.",
      },
      {
        title: "4. Everything included",
        body: "No feature-gating. No paid tiers. Every feature works across every site.",
      },
    ],
  },
  pt: {
    title: "SiteSafe vs as Alternativas",
    subtitle:
      "Uma comparação lado a lado de como a SiteSafe se compara à Envoy, SwipedOn e ao clássico registro em papel.",
    featureComparison: "Comparação de Funcionalidades",
    savingsTitle: "Quanto você economizaria?",
    savingsSubtitle: "Ajuste para corresponder ao número de seus locais.",
    sites: "Número de Locais",
    siteSingular: "local",
    sitePlural: "locais",
    whyTitle: "Por que escolher a SiteSafe?",
    ctaTitle: "Comece seu Teste Grátis Hoje",
    ctaSubtitle: "Teste grátis de 14 dias. Sem cartão de crédito. Sem ligação de vendas.",
    ctaButton: "Começar Meu Teste Grátis",
    checklistPrompt:
      "Não saia sem sua lista de verificação de auditoria gratuita.",
    checklistLink: "Baixar a lista de 10 pontos →",
    siteSafeLabel: "SiteSafe",
    envoyLabel: "Envoy",
    swipedOnLabel: "SwipedOn",
    paperLogLabel: "Registro em Papel",
    feature: "Funcionalidade",
    savingsMath:
      "A conta é simples. A SiteSafe economiza milhares de reais comparado ao preço por local — e oferece mais funcionalidades.",
    comparisonData: [
      { feature: "Check-in por QR", siteSafe: true, envoy: true, swipedOn: true, paperLog: false },
      { feature: "Captura de foto", siteSafe: true, envoy: true, swipedOn: true, paperLog: false },
      { feature: "Reconhecimento de segurança obrigatório", siteSafe: "Obrigatório", envoy: "Opcional", swipedOn: "Indisponível", paperLog: false, siteSafeNote: "✅ Obrigatório", envoyNote: "❌ Opcional", swipedOnNote: "❌ Indisponível" },
      { feature: "Notificações por e-mail ao anfitrião", siteSafe: "Incluso", envoy: "Pago extra", swipedOn: "Pago extra", paperLog: false, siteSafeNote: "✅ Incluso", envoyNote: "❌ Pago extra", swipedOnNote: "❌ Pago extra" },
      { feature: "Pré-cadastro", siteSafe: "Incluso", envoy: "Pago extra", swipedOn: "Pago extra", paperLog: false, siteSafeNote: "✅ Incluso", envoyNote: "❌ Pago extra", swipedOnNote: "❌ Pago extra" },
      { feature: "Impressão de crachá de visitante", siteSafe: true, envoy: true, swipedOn: true, paperLog: false },
      { feature: "Painel em tempo real", siteSafe: "A cada 5 seg", envoy: "Padrão", swipedOn: "Padrão", paperLog: false },
      { feature: "Saída remota", siteSafe: true, envoy: true, swipedOn: true, paperLog: false },
      { feature: "Exportações de auditoria (CSV/Excel/PDF)", siteSafe: "Filtrável", envoy: "Tier pago", swipedOn: "Básico", paperLog: false, siteSafeNote: "✅ Filtrável", envoyNote: "❌ Tier pago", swipedOnNote: "❌ Básico" },
      { feature: "Análises integradas", siteSafe: "30 dias, CSV", envoy: "Premium", swipedOn: "Básico", paperLog: false, siteSafeNote: "✅ 30 dias, CSV", envoyNote: "❌ Premium", swipedOnNote: "❌ Básico" },
      { feature: "API REST", siteSafe: "Documentação completa", envoy: "Enterprise", swipedOn: "Enterprise", paperLog: false, siteSafeNote: "✅ Documentação completa", envoyNote: "❌ Enterprise", swipedOnNote: "❌ Enterprise" },
      { feature: "Gestão multi-local", siteSafe: "Até 20, grátis", envoy: "Taxa por local", swipedOn: "Taxa por local", paperLog: false, siteSafeNote: "✅ Até 20, grátis", envoyNote: "❌ Taxa por local", swipedOnNote: "❌ Taxa por local" },
      { feature: "Lista de bloqueio / watchlist", siteSafe: "Incluso", envoy: "Pago extra", swipedOn: "Indisponível", paperLog: false, siteSafeNote: "✅ Incluso", envoyNote: "❌ Pago extra", swipedOnNote: "❌ Indisponível" },
      { feature: "Lista de evacuação de emergência", siteSafe: "Incluso", envoy: "Indisponível", swipedOn: "Indisponível", paperLog: false, siteSafeNote: "✅ Incluso", envoyNote: "❌ Indisponível", swipedOnNote: "❌ Indisponível" },
      { feature: "Modo lockdown", siteSafe: "Incluso", envoy: "Indisponível", swipedOn: "Indisponível", paperLog: false, siteSafeNote: "✅ Incluso", envoyNote: "❌ Indisponível", swipedOnNote: "❌ Indisponível" },
      { feature: "Webhooks", siteSafe: "Incluso", envoy: "Enterprise", swipedOn: "Enterprise", paperLog: false, siteSafeNote: "✅ Incluso", envoyNote: "❌ Enterprise", swipedOnNote: "❌ Enterprise" },
      { feature: "Assinatura digital de documentos", siteSafe: "Incluso", envoy: "Enterprise", swipedOn: "Indisponível", paperLog: false, siteSafeNote: "✅ Incluso", envoyNote: "❌ Enterprise", swipedOnNote: "❌ Indisponível" },
      { feature: "Teste grátis", siteSafe: "14 dias, sem cartão", envoy: "N/A", swipedOn: "Limitado", paperLog: "N/A", siteSafeNote: "✅ 14 dias, sem cartão", envoyNote: "❌ N/A", swipedOnNote: "✅ Limitado" },
      { feature: "Ligações de vendas obrigatórias", siteSafe: "Não", envoy: "Sim", swipedOn: "Não", paperLog: "N/A", siteSafeNote: "✅ Não", envoyNote: "❌ Sim", swipedOnNote: "✅ Não" },
      { feature: "Modelo de preço", siteSafe: "R$249/mês fixo", envoy: "R$499+/mês + taxas", swipedOn: "R$199+/mês + taxas", paperLog: "R$100/ano em pranchetas", siteSafeNote: "**R$249/mês fixo**", envoyNote: "**R$499+/mês + taxas**", swipedOnNote: "**R$199+/mês + taxas**", paperLogNote: "**R$100/ano em pranchetas**" },
      { feature: "Custos ocultos", siteSafe: "Nenhum", envoy: "Taxa por visitante", swipedOn: "Upsells", paperLog: "Risco de auditoria", siteSafeNote: "✅ Nenhum", envoyNote: "❌ Taxa por visitante", swipedOnNote: "❌ Upsells", paperLogNote: "❌ Risco de auditoria" },
    ],
    savingsTable: [
      { sites: 1, envoy: "~R$499/mês", swipedOn: "~R$199/mês", siteSafe: "R$249/mês" },
      { sites: 5, envoy: "~R$3.000/mês", swipedOn: "~R$1.800/mês", siteSafe: "R$249/mês" },
      { sites: 10, envoy: "~R$6.000/mês", swipedOn: "~R$3.600/mês", siteSafe: "R$249/mês" },
      { sites: 20, envoy: "~R$12.000/mês", swipedOn: "~R$7.200/mês", siteSafe: "R$249/mês" },
    ],
    whySiteSafe: [
      {
        title: "1. Preço fixo, sem surpresas",
        body: "R$249/mês para até 20 locais. Sem taxa por local. Sem complementos ocultos.",
      },
      {
        title: "2. Compliance integrado",
        body: "Reconhecimento obrigatório de segurança. Listas de evacuação de emergência. Modo lockdown. Lista de bloqueio. Tudo padrão.",
      },
      {
        title: "3. Sem ligações de vendas",
        body: "Comece seu teste grátis de 14 dias instantaneamente. Sem demonstrações. Sem pressão.",
      },
      {
        title: "4. Tudo incluso",
        body: "Sem bloqueio de funcionalidades. Sem tiers pagos. Cada funcionalidade funciona em cada local.",
      },
    ],
  },
};

export default function CompareClient({ locale }: CompareClientProps) {
  const copy = t[locale];

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white">
      <PublicHeader locale={locale} />

      <main className="py-16 px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {copy.title}
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              {copy.subtitle}
            </p>
          </div>

          {/* Feature Comparison Table */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">{copy.featureComparison}</h2>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-sm text-left">
                <thead className="bg-white/5">
                  <tr className="text-slate-300">
                    <th className="p-3 font-medium">{copy.feature}</th>
                    <th className="p-3 font-medium text-sky-400">{copy.siteSafeLabel}</th>
                    <th className="p-3 font-medium">{copy.envoyLabel}</th>
                    <th className="p-3 font-medium">{copy.swipedOnLabel}</th>
                    <th className="p-3 font-medium">{copy.paperLogLabel}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {copy.comparisonData.map((row, idx) => (
                    <tr key={idx} className="text-slate-400 hover:bg-white/[0.03] transition-colors">
                      <td className="p-3 font-medium text-slate-200">{row.feature}</td>
                      <td className="p-3 font-semibold text-white">{row.siteSafeNote || renderBoolean(row.siteSafe)}</td>
                      <td className="p-3">{row.envoyNote || renderBoolean(row.envoy)}</td>
                      <td className="p-3">{row.swipedOnNote || renderBoolean(row.swipedOn)}</td>
                      <td className="p-3">{row.paperLogNote || renderBoolean(row.paperLog)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Savings Table */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">{copy.savingsTitle}</h2>
            <p className="text-slate-400 text-sm">
              {copy.savingsSubtitle}
            </p>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-sm text-left">
                <thead className="bg-white/5">
                  <tr className="text-slate-300">
                    <th className="p-3 font-medium">{copy.sites}</th>
                    <th className="p-3 font-medium">{copy.envoyLabel}</th>
                    <th className="p-3 font-medium">{copy.swipedOnLabel}</th>
                    <th className="p-3 font-medium text-sky-400">{copy.siteSafeLabel}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {copy.savingsTable.map((row, idx) => (
                    <tr key={idx} className="text-slate-400 hover:bg-white/[0.03] transition-colors">
                      <td className="p-3 font-medium text-slate-200">{row.sites} {row.sites > 1 ? copy.sitePlural : copy.siteSingular}</td>
                      <td className="p-3">{row.envoy}</td>
                      <td className="p-3">{row.swipedOn}</td>
                      <td className="p-3 font-semibold text-white">{row.siteSafe}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-300 text-center">
              {copy.savingsMath}
            </p>
          </section>

          {/* Why Choose SiteSafe */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">{copy.whyTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {copy.whySiteSafe.map((point, idx) => (
                <div key={idx} className="rounded-xl border border-white/5 bg-white/[0.03] p-5 space-y-2">
                  <h3 className="font-semibold text-white text-sm">{point.title}</h3>
                  <p className="text-xs text-slate-400">{point.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="text-center space-y-6">
            <h2 className="text-2xl font-bold">{copy.ctaTitle}</h2>
            <p className="text-slate-300">{copy.ctaSubtitle}</p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-xl px-8 py-3 text-sm transition-all shadow-lg"
            >
              {copy.ctaButton} <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-xs text-slate-500">
              {copy.checklistPrompt}{" "}
              <Link href="/audit" className="text-sky-400 hover:underline">
                {copy.checklistLink}
              </Link>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

function renderBoolean(value: boolean | string) {
  if (typeof value === "string") return value;
  return value ? (
    <CheckCircle2 className="w-4 h-4 text-emerald-400 inline" />
  ) : (
    <XCircle className="w-4 h-4 text-rose-400 inline" />
  );
}