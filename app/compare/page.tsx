// app/compare/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, XCircle, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "SiteSafe vs Envoy vs SwipedOn vs Paper Logs — Comparison (2026)",
  description:
    "See how SiteSafe compares to Envoy, SwipedOn, and paper logs. Feature-by-feature comparison with transparent pricing — $49/mo for 20 sites.",
  openGraph: {
    title: "SiteSafe vs Envoy vs SwipedOn vs Paper Logs — Comparison (2026)",
    description:
      "See how SiteSafe compares to Envoy, SwipedOn, and paper logs. Feature-by-feature comparison with transparent pricing — $49/mo for 20 sites.",
    url: "https://sitesafe.thesift.space/compare",
  },
};

const comparisonData = [
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
];

const savingsTable = [
  { sites: 1, envoy: "~$99/mo", swipedOn: "~$39/mo", siteSafe: "$49/mo" },
  { sites: 5, envoy: "~$600/mo", swipedOn: "~$360/mo", siteSafe: "$49/mo" },
  { sites: 10, envoy: "~$1,200/mo", swipedOn: "~$720/mo", siteSafe: "$49/mo" },
  { sites: 20, envoy: "~$2,400/mo", swipedOn: "~$1,440/mo", siteSafe: "$49/mo" },
];

const whySiteSafe = [
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
];

export default function ComparePage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-12 text-white">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            SiteSafe vs the Alternatives
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A side-by-side look at how SiteSafe compares to Envoy, SwipedOn, and the classic paper log.
          </p>
        </div>

        {/* Feature Comparison Table */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Feature Comparison</h2>
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-sm text-left">
              <thead className="bg-white/5">
                <tr className="text-slate-300">
                  <th className="p-3 font-medium">Feature</th>
                  <th className="p-3 font-medium text-sky-400">SiteSafe</th>
                  <th className="p-3 font-medium">Envoy</th>
                  <th className="p-3 font-medium">SwipedOn</th>
                  <th className="p-3 font-medium">Paper Log</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {comparisonData.map((row, idx) => (
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
          <h2 className="text-2xl font-bold">How much would you save?</h2>
          <p className="text-slate-400 text-sm">
            Move the slider to match your number of sites.
          </p>
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-sm text-left">
              <thead className="bg-white/5">
                <tr className="text-slate-300">
                  <th className="p-3 font-medium">Number of Sites</th>
                  <th className="p-3 font-medium">Envoy (est.)</th>
                  <th className="p-3 font-medium">SwipedOn (est.)</th>
                  <th className="p-3 font-medium text-sky-400">SiteSafe</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {savingsTable.map((row, idx) => (
                  <tr key={idx} className="text-slate-400 hover:bg-white/[0.03] transition-colors">
                    <td className="p-3 font-medium text-slate-200">{row.sites} site{row.sites > 1 ? 's' : ''}</td>
                    <td className="p-3">{row.envoy}</td>
                    <td className="p-3">{row.swipedOn}</td>
                    <td className="p-3 font-semibold text-white">{row.siteSafe}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-300 text-center">
            The math is simple. SiteSafe saves you thousands of dollars compared to per-site pricing — and gives you more features.
          </p>
        </section>

        {/* Why Choose SiteSafe */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Why Choose SiteSafe?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whySiteSafe.map((point, idx) => (
              <div key={idx} className="glass-card p-5 space-y-2">
                <h3 className="font-semibold text-white text-sm">{point.title}</h3>
                <p className="text-xs text-slate-400">{point.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center space-y-6">
          <h2 className="text-2xl font-bold">Start Your Free Trial Today</h2>
          <p className="text-slate-300">14-day free trial. No credit card. No sales call.</p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-xl px-8 py-3 text-sm transition-all shadow-lg cta-pulse"
          >
            Start My Free Trial <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-slate-500">
            Don’t leave without your free audit checklist.{" "}
            <Link href="/audit" className="text-sky-400 hover:underline">
              Download the 10-point checklist →
            </Link>
          </p>
        </section>
      </div>
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