// app/roi-calculator/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, DollarSign, Clock, Users, FileText } from "lucide-react";
import { logEvent } from "@/lib/analytics";

export default function RoiCalculatorPage() {
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
  const siteSafeCost = 49 * 12;
  const savings = totalAnnualCost - siteSafeCost;
  const savingsPercent =
    totalAnnualCost > 0 ? Math.round((savings / totalAnnualCost) * 100) : 0;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            Paper Visitor Log Cost Calculator
          </h1>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Find out how much your current sign‑in process is really costing you.
          </p>
        </div>

        <form
          onSubmit={handleCalculate}
          className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6 sm:p-8 space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              How many visitors sign in per day?
            </label>
            <input
              type="number"
              min="0"
              placeholder="e.g., 20"
              value={visitorsPerDay}
              onChange={(e) => setVisitorsPerDay(e.target.value)}
              required
              className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Average time spent per visitor (minutes)
            </label>
            <input
              type="number"
              min="0"
              placeholder="e.g., 2"
              value={timePerVisitor}
              onChange={(e) => setTimePerVisitor(e.target.value)}
              required
              className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Staff labor cost per hour ($)
            </label>
            <input
              type="number"
              min="0"
              placeholder="e.g., 25"
              value={laborCostPerHour}
              onChange={(e) => setLaborCostPerHour(e.target.value)}
              required
              className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Hours spent preparing for each audit
            </label>
            <input
              type="number"
              min="0"
              placeholder="e.g., 4"
              value={auditPrepHours}
              onChange={(e) => setAuditPrepHours(e.target.value)}
              required
              className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Audits per year
            </label>
            <input
              type="number"
              min="0"
              placeholder="e.g., 2"
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
            Calculate my hidden costs
          </button>
        </form>

        {showResults && (
          <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-semibold text-white text-center mb-4">
              Your paper log is costing you
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/[0.04] rounded-xl p-4 text-center">
                <Clock className="w-5 h-5 text-sky-400 mx-auto mb-2" />
                <p className="text-xs text-slate-400">Daily time wasted</p>
                <p className="text-lg font-bold text-white mt-1">
                  {dailyTimeMin.toFixed(0)} min
                </p>
              </div>
              <div className="bg-white/[0.04] rounded-xl p-4 text-center">
                <DollarSign className="w-5 h-5 text-sky-400 mx-auto mb-2" />
                <p className="text-xs text-slate-400">Annual labor cost</p>
                <p className="text-lg font-bold text-white mt-1">
                  ${annualLaborCost.toFixed(0)}
                </p>
              </div>
              <div className="bg-white/[0.04] rounded-xl p-4 text-center">
                <FileText className="w-5 h-5 text-sky-400 mx-auto mb-2" />
                <p className="text-xs text-slate-400">Audit prep cost</p>
                <p className="text-lg font-bold text-white mt-1">
                  ${auditCost.toFixed(0)}/yr
                </p>
              </div>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-400/30 rounded-xl p-5 text-center">
              <p className="text-sm text-slate-300">
                Total annual cost of paper logs
              </p>
              <p className="text-3xl font-extrabold text-white mt-1">
                ${totalAnnualCost.toFixed(0)}
              </p>
              <div className="mt-2 text-emerald-300 font-semibold">
                Switch to SiteSafe and save ${savings.toFixed(0)}/year (
                {savingsPercent}%)
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Based on $49/month flat pricing
              </p>
            </div>

            <div className="text-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all duration-200 active:scale-[0.98] shadow-lg"
                onClick={() => logEvent("roi_cta_click")}
              >
                Start Free Trial <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <p className="text-xs text-slate-500 mt-2">
                14‑day trial · No credit card · No sales call
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}