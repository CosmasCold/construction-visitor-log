// app/compare/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Compare SiteSafe – Smart Visitor Management",
  description:
    "See how SiteSafe compares to Envoy, SwipedOn, and paper visitor logs. QR check‑in, mandatory safety acknowledgment, real‑time dashboard, flat pricing.",
};

const rows = [
  {
    feature: "QR check‑in",
    sitesafe: "✅",
    envoy: "✅",
    swipedon: "✅",
    paper: "❌",
  },
  {
    feature: "Mandatory safety acknowledgment",
    sitesafe: "✅ (cannot skip)",
    envoy: "❌ (optional)",
    swipedon: "❌",
    paper: "❌",
  },
  {
    feature: "Host email notification",
    sitesafe: "✅ (Brevo, automatic)",
    envoy: "✅ (paid add‑on)",
    swipedon: "❌",
    paper: "❌",
  },
  {
    feature: "Pre‑registration",
    sitesafe: "✅",
    envoy: "✅ (paid)",
    swipedon: "✅ (paid)",
    paper: "❌",
  },
  {
    feature: "Visitor badge printing",
    sitesafe: "✅",
    envoy: "✅",
    swipedon: "✅",
    paper: "❌",
  },
  {
    feature: 'Real‑time "on site" dashboard',
    sitesafe: "✅ (every few seconds)",
    envoy: "✅",
    swipedon: "✅",
    paper: "❌",
  },
  {
    feature: "Remote sign‑out",
    sitesafe: "✅",
    envoy: "✅",
    swipedon: "✅",
    paper: "❌",
  },
  {
    feature: "Audit exports (CSV/Excel/PDF)",
    sitesafe: "✅ (instant, filterable)",
    envoy: "✅ (paid tier)",
    swipedon: "✅ (basic)",
    paper: "❌ (manual retyping)",
  },
  {
    feature: "Analytics (trend chart, totals)",
    sitesafe: "✅ (30‑day, export CSV)",
    envoy: "✅ (premium)",
    swipedon: "❌",
    paper: "❌",
  },
  {
    feature: "REST API",
    sitesafe: "✅ (full docs, Bearer auth)",
    envoy: "✅ (enterprise)",
    swipedon: "❌",
    paper: "❌",
  },
  {
    feature: "Multi‑site management",
    sitesafe: "✅ (unlimited, free)",
    envoy: "✅ (per‑site fee)",
    swipedon: "✅ (per‑site fee)",
    paper: "❌",
  },
  {
    feature: "Free trial (no credit card)",
    sitesafe: "✅ (14 days)",
    envoy: "❌ (requires card/demo)",
    swipedon: "❌ (requires card)",
    paper: "N/A",
  },
  {
    feature: "Sales calls required?",
    sitesafe: "❌ (never)",
    envoy: "✅ (demo required)",
    swipedon: "✅ (demo often required)",
    paper: "N/A",
  },
  {
    feature: "Pricing model",
    sitesafe: "$49/month flat, unlimited",
    envoy: "$99+/month + per‑site fees",
    swipedon: "$39+/month + per‑location fees",
    paper: "~$20/year for clipboards",
  },
  {
    feature: "Hidden costs",
    sitesafe: "None",
    envoy: "Per‑visitor fees for some features",
    swipedon: "Extra for pre‑reg, API",
    paper: "Lost time, audit risk, fines",
  },
];

export default function ComparePage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
          How SiteSafe compares
        </h1>
        <p className="text-sm text-slate-400 mb-8">
          SiteSafe vs Envoy, SwipedOn, and paper visitor logs.
        </p>

        {/* Table */}
        <div className="overflow-x-auto bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-400">
                <th className="p-4 text-left font-medium">Feature</th>
                <th className="p-4 text-left font-medium text-sky-300">SiteSafe</th>
                <th className="p-4 text-left font-medium">Envoy</th>
                <th className="p-4 text-left font-medium">SwipedOn</th>
                <th className="p-4 text-left font-medium">Paper Log</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.03] transition-colors">
                  <td className="p-4 font-medium text-white">{row.feature}</td>
                  <td className="p-4 text-sky-300">{row.sitesafe}</td>
                  <td className="p-4">{row.envoy}</td>
                  <td className="p-4">{row.swipedon}</td>
                  <td className="p-4 text-slate-500">{row.paper}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-sm text-slate-500 mt-6 text-center">
          Want to see for yourself?{" "}
          <Link href="/signup" className="text-sky-400 hover:text-sky-300 transition-colors">
            Start a free trial
          </Link>
          {" "}or{" "}
          <Link href="/docs" className="text-sky-400 hover:text-sky-300 transition-colors">
            explore the API
          </Link>.
        </p>
      </div>
    </div>
  );
}