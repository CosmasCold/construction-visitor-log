"use client";

import { useState } from "react";
import Link from "next/link";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";
import { ArrowRight, DollarSign, Clock, FileText } from "lucide-react";
import { logEvent } from "@/lib/analytics";

interface RoiCalculatorClientProps {
  locale: "en" | "pt";
}

const t = {
  en: {
    title: "Paper Visitor Log Cost Calculator",
    subtitle: "Find out how much your current sign-in process is really costing you.",
    visitorsPerDay: "How many visitors sign in per day?",
    visitorsPlaceholder: "e.g., 20",
    timePerVisitor: "Average time spent per visitor (minutes)",
    timePlaceholder: "e.g., 2",
    laborCost: "Staff labor cost per hour ($)",
    laborPlaceholder: "e.g., 25",
    auditPrepHours: "Hours spent preparing for each audit",
    auditPlaceholder: "e.g., 4",
    auditsPerYear: "Audits per year",
    auditsPlaceholder: "e.g., 2",
    calculate: "Calculate my hidden costs",
    resultsTitle: "Your paper log is costing you",
    dailyTimeLabel: "Daily time wasted",
    dailyTimeUnit: "min",
    annualLaborLabel: "Annual labor cost",
    auditCostLabel: "Audit prep cost",
    auditCostUnit: "/yr",
    totalCostLabel: "Total annual cost of paper logs",
    savingsText: (savings: number, percent: number) =>
      `Switch to SiteSafe and save $${savings.toFixed(0)}/year (${percent}%)`,
    pricingNote: "Based on $49/month flat pricing",
    cta: "Start Free Trial",
    ctaSub: "14-day trial · No credit card · No sales call",
    currency: "$",
    siteSafeCost: 49 * 12,
  },
  pt: {
    title: "Calculadora de Custo de Registro em Papel",
    subtitle: "Descubra quanto seu processo de registro atual realmente custa.",
    visitorsPerDay: "Quantos visitantes se registram por dia?",
    visitorsPlaceholder: "ex: 20",
    timePerVisitor: "Tempo médio gasto por visitante (minutos)",
    timePlaceholder: "ex: 2",
    laborCost: "Custo de mão de obra por hora (R$)",
    laborPlaceholder: "ex: 25",
    auditPrepHours: "Horas gastas preparando cada auditoria",
    auditPlaceholder: "ex: 4",
    auditsPerYear: "Auditorias por ano",
    auditsPlaceholder: "ex: 2",
    calculate: "Calcular meus custos ocultos",
    resultsTitle: "Seu registro em papel está custando",
    dailyTimeLabel: "Tempo diário desperdiçado",
    dailyTimeUnit: "min",
    annualLaborLabel: "Custo anual de mão de obra",
    auditCostLabel: "Custo de preparação de auditoria",
    auditCostUnit: "/ano",
    totalCostLabel: "Custo anual total do registro em papel",
    savingsText: (savings: number, percent: number) =>
      `Mude para a SiteSafe e economize R$${savings.toFixed(0)}/ano (${percent}%)`,
    pricingNote: "Baseado no preço fixo de R$249/mês",
    cta: "Começar Teste Grátis",
    ctaSub: "Teste de 14 dias · Sem cartão de crédito · Sem ligação de vendas",
    currency: "R$",
    siteSafeCost: 249 * 12,
  },
};

export default function RoiCalculatorClient({ locale }: RoiCalculatorClientProps) {
  const copy = t[locale];
  const [visitorsPerDay, setVisitorsPerDay] = useState("");
  const [timePerVisitor, setTimePerVisitor] = useState("2");
  const [laborCostPerHour, setLaborCostPerHour] = useState("25");
  const [auditPrepHours, setAuditPrepHours] = useState("4");
  const [auditsPerYear, setAuditsPerYear] = useState("2");
  const [showResults, setShowResults] = useState(false);

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    setShowResults(true);
    logEvent("roi_calculator_used", {
      visitors: visitorsPerDay,
      auditHours: auditPrepHours,
    });
  }

  const dailyTimeMin =
    parseFloat(visitorsPerDay || "0") * parseFloat(timePerVisitor || "0");
  const dailyTimeHours = dailyTimeMin / 60;
  const dailyLaborCost =
    dailyTimeHours * parseFloat(laborCostPerHour || "0");
  const annualLaborCost = dailyLaborCost * 260;
  const auditCost =
    parseFloat(auditPrepHours || "0") *
    parseFloat(laborCostPerHour || "0") *
    parseFloat(auditsPerYear || "0");
  const totalAnnualCost = annualLaborCost + auditCost;
  const savings = totalAnnualCost - copy.siteSafeCost;
  const savingsPercent =
    totalAnnualCost > 0 ? Math.round((savings / totalAnnualCost) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200">
      <PublicHeader locale={locale} narrow />

      <main className="py-12 px-4">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
              {copy.title}
            </h1>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              {copy.subtitle}
            </p>
          </div>

          <form
            onSubmit={handleCalculate}
            className="bg-white/[0.06] backdrop-blur-lg rounded-2xl border border-white/10 p-6 sm:p-8 space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                {copy.visitorsPerDay}
              </label>
              <input
                type="number"
                min="0"
                placeholder={copy.visitorsPlaceholder}
                value={visitorsPerDay}
                onChange={(e) => setVisitorsPerDay(e.target.value)}
                required
                className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                {copy.timePerVisitor}
              </label>
              <input
                type="number"
                min="0"
                placeholder={copy.timePlaceholder}
                value={timePerVisitor}
                onChange={(e) => setTimePerVisitor(e.target.value)}
                required
                className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                {copy.laborCost}
              </label>
              <input
                type="number"
                min="0"
                placeholder={copy.laborPlaceholder}
                value={laborCostPerHour}
                onChange={(e) => setLaborCostPerHour(e.target.value)}
                required
                className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                {copy.auditPrepHours}
              </label>
              <input
                type="number"
                min="0"
                placeholder={copy.auditPlaceholder}
                value={auditPrepHours}
                onChange={(e) => setAuditPrepHours(e.target.value)}
                required
                className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                {copy.auditsPerYear}
              </label>
              <input
                type="number"
                min="0"
                placeholder={copy.auditsPlaceholder}
                value={auditsPerYear}
                onChange={(e) => setAuditsPerYear(e.target.value)}
                required
                className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-xl px-6 py-3 text-sm transition-all"
            >
              {copy.calculate}
            </button>
          </form>

          {showResults && (
            <div className="bg-white/[0.06] backdrop-blur-lg rounded-2xl border border-white/10 p-6 sm:p-8 space-y-6">
              <h2 className="text-xl font-semibold text-white text-center mb-4">
                {copy.resultsTitle}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white/[0.04] rounded-xl p-4 text-center">
                  <Clock className="w-5 h-5 text-sky-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-400">{copy.dailyTimeLabel}</p>
                  <p className="text-lg font-bold text-white mt-1">
                    {dailyTimeMin.toFixed(0)} {copy.dailyTimeUnit}
                  </p>
                </div>
                <div className="bg-white/[0.04] rounded-xl p-4 text-center">
                  <DollarSign className="w-5 h-5 text-sky-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-400">{copy.annualLaborLabel}</p>
                  <p className="text-lg font-bold text-white mt-1">
                    {copy.currency}{annualLaborCost.toFixed(0)}
                  </p>
                </div>
                <div className="bg-white/[0.04] rounded-xl p-4 text-center">
                  <FileText className="w-5 h-5 text-sky-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-400">{copy.auditCostLabel}</p>
                  <p className="text-lg font-bold text-white mt-1">
                    {copy.currency}{auditCost.toFixed(0)}{copy.auditCostUnit}
                  </p>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-400/30 rounded-xl p-5 text-center">
                <p className="text-sm text-slate-300">
                  {copy.totalCostLabel}
                </p>
                <p className="text-3xl font-extrabold text-white mt-1">
                  {copy.currency}{totalAnnualCost.toFixed(0)}
                </p>
                <div className="mt-2 text-emerald-300 font-semibold">
                  {copy.savingsText(savings, savingsPercent)}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {copy.pricingNote}
                </p>
              </div>

              <div className="text-center">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all duration-200 active:scale-[0.98] shadow-lg"
                  onClick={() => logEvent("roi_cta_click")}
                >
                  {copy.cta} <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
                <p className="text-xs text-slate-500 mt-2">
                  {copy.ctaSub}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}