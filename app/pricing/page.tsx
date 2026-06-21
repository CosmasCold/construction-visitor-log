// app/pricing/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ReviewBadges from "@/components/ReviewBadges";
import { CheckCircle2, ArrowRight, ShieldCheck, XCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing – SiteSafe",
  description:
    "Simple, flat pricing for compliance‑ready visitor management. Up to 20 sites, unlimited visitors, $49/month, no hidden fees.",
};

const features = [
  "Up to 20 sites",
  "Unlimited visitors",
  "QR check‑in per site",
  "Mandatory policy acknowledgment",
  "Real‑time dashboard",
  "Host email notifications",
  "Pre‑registration",
  "Visitor badge printing",
  "Audit exports (CSV, Excel, PDF)",
  "Built‑in analytics",
  "Watchlist / blocklist",
  "Emergency evacuation list",
  "Lockdown mode",
  "Digital document signing",
  "Webhooks",
  "REST API",
  "14‑day free trial",
];

const comparisons = [
  { feature: "10 sites", sitesafe: "$49", envoy: "~$1,200", swipedon: "~$720" },
  { feature: "20 sites", sitesafe: "$49", envoy: "~$2,400", swipedon: "~$1,440" },
  { feature: "Mandatory safety briefings", sitesafe: true, envoy: false, swipedon: false },
  { feature: "Sales call required", sitesafe: false, envoy: true, swipedon: true },
];

function renderCell(value: string | boolean) {
  if (value === true) return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
  if (value === false) return <XCircle className="w-5 h-5 text-rose-400" />;
  return <span className="text-sm font-medium text-white">{value}</span>;
}

export default function PricingPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            Simple, flat pricing for multi‑site teams
          </h1>
          <p className="text-lg text-slate-400">
            Up to 20 sites. Unlimited visitors. No per‑site fees. No surprises.
          </p>
        </div>

        {/* Pricing card */}
        <div className="max-w-sm mx-auto">
          <div className="bg-white/[0.10] backdrop-blur-lg rounded-2xl border border-white/10 shadow-card-raised p-8 text-center accent-glow aurora-bg">
            <h2 className="text-xl font-semibold text-white mb-2">SiteSafe Pro</h2>
            <p className="text-5xl font-extrabold text-white mt-4 mb-1">
              $49<span className="text-lg text-slate-400 font-medium">/mo</span>
            </p>
            <p className="text-sm text-slate-400 mb-6">
              Up to 20 sites – unlimited visitors – all features included
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all duration-200 active:scale-[0.98] shadow-lg w-full"
            >
              Start Free Trial <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <p className="text-xs text-slate-500 mt-3">
              No credit card required · Cancel anytime
            </p>
          </div>
        </div>

        {/* Feature grid */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-white text-center mb-6">
            Everything you get — included at no extra cost
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-2 text-sm text-slate-200 bg-white/[0.10] backdrop-blur-lg rounded-xl px-4 py-3 accent-glow aurora-bg"
              >
                <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                {feature}
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 text-center mt-4">
            All features work across all your sites — no feature‑gating or add‑on fees.
          </p>
        </div>

        {/* Cost comparison table */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-white text-center mb-6">
            How SiteSafe compares on cost
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-white/10 rounded-xl overflow-hidden">
              <thead className="bg-white/[0.10]">
                <tr className="text-slate-300">
                  <th className="p-3 text-left">Feature</th>
                  <th className="p-3 text-center text-sky-300">SiteSafe</th>
                  <th className="p-3 text-center">Envoy</th>
                  <th className="p-3 text-center">SwipedOn</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {comparisons.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white/[0.06]" : ""}>
                    <td className="p-3 font-medium text-white">{row.feature}</td>
                    <td className="p-3 text-center">{renderCell(row.sitesafe)}</td>
                    <td className="p-3 text-center">{renderCell(row.envoy)}</td>
                    <td className="p-3 text-center">{renderCell(row.swipedon)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Trust badges and comparison link unchanged */}
      </div>
    </div>
  );
}