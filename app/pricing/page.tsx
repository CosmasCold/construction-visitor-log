// app/pricing/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, DollarSign, ShieldCheck, CreditCard, PhoneOff } from "lucide-react";

export const metadata: Metadata = {
  title: "Visitor Management Pricing — $49/mo for 20 Sites | SiteSafe",
  description:
    "Transparent visitor management pricing. $49/month flat for up to 20 sites. No per-location fees. 14-day free trial. No sales calls.",
  openGraph: {
    title: "Visitor Management Pricing — $49/mo for 20 Sites | SiteSafe",
    description:
      "Transparent visitor management pricing. $49/month flat for up to 20 sites. No per-location fees. 14-day free trial. No sales calls.",
    url: "https://sitesafe.thesift.space/pricing",
  },
};

const featureCategories = [
  {
    category: "Check-in",
    items: [
      "QR check-in per site",
      "Mandatory policy acknowledgment",
      "Photo capture",
      "Pre-screening questions",
      "Watchlist / blocklist",
    ],
  },
  {
    category: "Management",
    items: [
      "Real-time dashboard",
      "Host email notifications",
      "Pre-registration",
      "Badge printing",
      "Lockdown mode",
      "Emergency evacuation list",
    ],
  },
  {
    category: "Compliance & Export",
    items: [
      "Audit exports (CSV, Excel, PDF)",
      "Multi-site management",
      "Analytics",
      "Digital document signing",
    ],
  },
  {
    category: "Integrations",
    items: ["REST API", "Webhooks", "Slack", "Google Sheets", "Zapier"],
  },
];

const comparisonData = [
  { feature: "10 sites", siteSafe: "$49", envoy: "~$1,200", swipedOn: "~$720" },
  { feature: "20 sites", siteSafe: "$49", envoy: "~$2,400", swipedOn: "~$1,440" },
  {
    feature: "Mandatory safety briefings",
    siteSafe: "✅ Included",
    envoy: "❌ Add-on",
    swipedOn: "❌ Not available",
  },
  {
    feature: "Sales call required",
    siteSafe: "❌ Never",
    envoy: "✅ Always",
    swipedOn: "❌ No",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-16 text-white">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Simple, Flat Pricing for Multi-Site Teams
          </h1>
          <p className="text-xl text-slate-300 font-semibold">
            Up to 20 sites. Unlimited visitors. No per-site fees. No surprises.
          </p>
        </div>

        {/* Main pricing card */}
        <div className="glass-card gradient-border p-8 sm:p-10 text-center space-y-6">
          <h2 className="text-2xl font-bold">SiteSafe Pro</h2>
          <p className="text-5xl font-extrabold text-sky-400">$49<span className="text-2xl text-slate-400">/month</span></p>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>Up to 20 sites</li>
            <li>Unlimited visitors</li>
            <li>All features included</li>
            <li>14-day free trial</li>
            <li>No credit card required</li>
            <li>Cancel anytime</li>
          </ul>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-xl px-8 py-3 text-sm transition-all shadow-lg cta-pulse"
          >
            Start My Free Trial <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Feature table */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-center">
            Everything you get — included at no extra cost
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featureCategories.map((cat) => (
              <div key={cat.category} className="glass-card p-6 space-y-3">
                <h3 className="text-lg font-semibold text-sky-300">{cat.category}</h3>
                <ul className="space-y-1">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 text-center">
            All features work across all your sites — no feature-gating or add-on fees.
          </p>
        </section>

        {/* Comparison table */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-center">How SiteSafe compares on cost</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-white/10 rounded-xl">
              <thead className="bg-white/5">
                <tr className="text-slate-300">
                  <th className="p-3 text-left">Feature</th>
                  <th className="p-3 text-left">SiteSafe</th>
                  <th className="p-3 text-left">Envoy</th>
                  <th className="p-3 text-left">SwipedOn</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {comparisonData.map((row, i) => (
                  <tr key={i} className="text-slate-400 hover:bg-white/[0.03]">
                    <td className="p-3 font-medium text-slate-200">{row.feature}</td>
                    <td className="p-3 font-semibold text-white">{row.siteSafe}</td>
                    <td className="p-3">{row.envoy}</td>
                    <td className="p-3">{row.swipedOn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-300 text-center">
            The math is simple: SiteSafe saves you thousands of dollars compared to per-site pricing — and gives you more features.
          </p>
        </section>

        {/* Testimonial */}
        <section className="glass-card p-8 text-center space-y-4">
          <blockquote className="text-lg italic text-slate-200">
            “SiteSafe replaced our messy paper logs across 8 sites with a single dashboard. Setup took 3 minutes.”
          </blockquote>
          <p className="text-sm text-slate-400">— Marcus, Facilities Director</p>
        </section>

        {/* Final CTA */}
        <section className="text-center space-y-6">
          <h2 className="text-2xl font-bold">Start your 14-day free trial</h2>
          <p className="text-slate-300">No credit card. No sales call. Trial starts instantly.</p>
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