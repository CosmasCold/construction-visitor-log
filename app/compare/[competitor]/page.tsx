import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, ArrowRight, ShieldCheck, Building2, Wallet } from "lucide-react";

const competitors = {
  sine: {
    name: "Sine",
    description: "Sine is a visitor management system often used in schools and corporate offices. It offers basic check‑in but lacks mandatory safety acknowledgment and charges per site.",
    strengths: ["Basic QR check‑in", "Pre‑registration available"],
    weaknesses: [
      "No mandatory safety acknowledgment – visitors can skip it",
      "Per‑site pricing adds up quickly",
      "Limited audit export options (CSV only)",
      "Host notifications are not automatic",
      "No built‑in analytics",
      "Requires a demo for pricing",
    ],
    sitesafeWins: [
      "Mandatory, non‑skippable safety briefing",
      "Flat $49/mo – unlimited sites",
      "Instant CSV, Excel, and PDF exports",
      "Automatic host email notifications",
      "Built‑in 30‑day analytics with CSV export",
      "Transparent pricing – no demo required",
    ],
  },
  proxyclick: {
    name: "Proxyclick",
    description: "Proxyclick is an enterprise‑focused visitor management platform with complex workflows. It's powerful but often overkill for small to medium businesses.",
    strengths: ["Enterprise integrations", "Custom workflows"],
    weaknesses: [
      "Designed for large enterprises",
      "Complex setup and onboarding",
      "Pricing is not transparent (custom quote)",
      "Per‑visitor pricing model",
      "No mandatory safety acknowledgment",
    ],
    sitesafeWins: [
      "Simple, self‑serve setup in minutes",
      "Flat $49/mo – no per‑visitor fees",
      "Mandatory safety briefing built in",
      "No sales calls or custom quotes",
      "Unlimited sites and visitors",
    ],
  },
  "traction-guest": {
    name: "Traction Guest",
    description: "Traction Guest is a configurable visitor management system aimed at mid‑market and enterprise. It's highly customizable but can be expensive and time‑consuming to deploy.",
    strengths: ["Highly customizable", "Good for complex environments"],
    weaknesses: [
      "Expensive for small teams",
      "Long deployment cycles",
      "No mandatory safety acknowledgment",
      "Per‑location pricing",
      "Overwhelming feature set for basic needs",
    ],
    sitesafeWins: [
      "Ready to use in 2 minutes",
      "$49/mo flat – all features included",
      "Mandatory safety acknowledgment enforced",
      "Unlimited sites, no hidden costs",
      "No training required",
    ],
  },
  "the-receptionist": {
    name: "The Receptionist",
    description: "The Receptionist is a simple visitor check‑in tool for small offices. It's easy to use but lacks the compliance and multi‑site features growing businesses need.",
    strengths: ["Easy to use", "Good for single‑location offices"],
    weaknesses: [
      "No mandatory safety acknowledgment",
      "Single site only on basic plan",
      "Limited export options",
      "No host notifications on lower tiers",
      "No pre‑registration",
      "No API access",
    ],
    sitesafeWins: [
      "Mandatory safety briefing – audit‑proof",
      "Unlimited sites at no extra cost",
      "Full CSV, Excel, PDF exports",
      "Automatic host notifications included",
      "Pre‑registration and API access standard",
      "Flat $49/mo – no feature gating",
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(competitors).map((competitor) => ({ competitor }));
}

export async function generateMetadata({
  params,
}: {
  params: { competitor: string };
}): Promise<Metadata> {
  const comp = competitors[params.competitor as keyof typeof competitors];
  if (!comp) {
    return {
      title: "Compare SiteSafe – Smart Visitor Management",
      description: "See how SiteSafe compares to other visitor management tools.",
    };
  }
  return {
    title: `SiteSafe vs ${comp.name} – Better Visitor Management Alternative`,
    description: `Looking for a ${comp.name} alternative? SiteSafe offers mandatory safety acknowledgment, flat $49/mo pricing, unlimited sites, and no sales calls. Compare side‑by‑side.`,
  };
}

export default function CompareCompetitorPage({
  params,
}: {
  params: { competitor: string };
}) {
  const comp = competitors[params.competitor as keyof typeof competitors];

  if (!comp) {
    return (
      <div className="min-h-screen text-white text-center py-20">
        <p>Competitor not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            SiteSafe vs {comp.name}
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            {comp.description}
          </p>
        </div>

        {/* Comparison cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Competitor */}
          <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <X className="w-5 h-5 text-rose-400" />
              Where {comp.name} falls short
            </h2>
            <ul className="space-y-2">
              {comp.weaknesses.map((weakness, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <X className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  {weakness}
                </li>
              ))}
            </ul>
          </div>

          {/* SiteSafe */}
          <div className="bg-sky-500/5 backdrop-blur-md rounded-2xl border border-sky-400/20 shadow-card-raised p-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-sky-400" />
              Why teams switch to SiteSafe
            </h2>
            <ul className="space-y-2">
              {comp.sitesafeWins.map((win, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-200">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  {win}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pricing callout */}
        <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Wallet className="w-5 h-5 text-sky-400" />
            <h3 className="text-lg font-semibold text-white">
              SiteSafe: $49/month flat
            </h3>
          </div>
          <p className="text-sm text-slate-300 mb-4">
            Unlimited sites, unlimited visitors, all features included.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all duration-200 active:scale-[0.98] shadow-lg"
          >
            Start Free Trial <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <p className="text-xs text-slate-500 mt-2">No credit card required</p>
        </div>

        {/* Full comparison link */}
        <div className="text-center">
          <p className="text-sm text-slate-400">
            See the full side‑by‑side comparison with all major competitors{" "}
            <Link href="/compare" className="text-sky-400 hover:underline transition-colors font-medium">
              here
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}