// app/blog/best-visitor-management-systems/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, XCircle, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "12 Best Visitor Management Systems for Multi-Site Businesses (2026)",
  description:
    "Compare the top 12 visitor management systems for 2026. Find the best solution for multiple locations — starting at $49/mo for 20 sites.",
  openGraph: {
    title: "12 Best Visitor Management Systems for Multi-Site Businesses (2026)",
    description:
      "Compare the top 12 visitor management systems for 2026. Find the best solution for multiple locations — starting at $49/mo for 20 sites.",
    type: "article",
    url: "https://sitesafe.thesift.space/blog/best-visitor-management-systems",
  },
};

const tools = [
  {
    name: "SiteSafe",
    pricing: "$49/mo flat for up to 20 sites",
    bestFor:
      "Mid-sized businesses with 2-20 locations (construction, warehousing, manufacturing, schools, offices)",
    features: [
      "Single dashboard for every location",
      "QR code check-in — no hardware, no apps",
      "Mandatory safety acknowledgment — non-skippable compliance proof",
      "One-click emergency evacuation lists",
      "Watchlist screening",
      "14-day free trial, no credit card required",
    ],
    standout:
      "SiteSafe is the only platform that combines mandatory safety compliance, multi-site visibility, and flat pricing — all without forcing you through a sales demo.",
    cta: "/signup",
    ctaLabel: "Start your free trial →",
  },
  {
    name: "Envoy",
    pricing: "Custom quote (estimated $99+/site/month)",
    bestFor:
      "Large enterprises with 500+ employees, dedicated security teams, and complex workflows",
    features: [
      "Polished interface with strong integrations",
      "Enterprise SSO",
      "Dedicated account manager",
    ],
    drawbacks: [
      "Requires a mandatory sales demo before you can see pricing",
      "Per-location fees add up quickly",
      "Many features are locked behind paid add-ons",
    ],
  },
  {
    name: "SwipedOn",
    pricing: "~$39/month per location",
    bestFor: "Single-office businesses that want a simple iPad-based check-in",
    features: ["iPad-based sign-in", "Visitor badges", "Basic visitor logs"],
    drawbacks: [
      "Per-location pricing means costs multiply with every new site",
      "No mandatory safety acknowledgment",
      "Limited multi-site visibility",
    ],
  },
  {
    name: "iLobby",
    pricing: "Custom quote",
    bestFor:
      "Large enterprises with complex security needs, government watchlist screening",
    features: [
      "Advanced visitor screening",
      "Government watchlist checks",
      "Enterprise SSO",
    ],
    drawbacks: [
      "Overkill for most small and mid-sized businesses",
      "Long deployment process",
      "Custom pricing with per-visitor fees",
    ],
  },
  {
    name: "Proxyclick",
    pricing: "Custom quote",
    bestFor: "Large enterprises with dedicated security teams",
    features: [
      "Advanced security features",
      "Custom workflows",
      "Enterprise integrations",
    ],
    drawbacks: [
      "Complex to deploy",
      "Expensive",
      "Requires sales engagement to get pricing",
    ],
  },
  {
    name: "Sine",
    pricing: "~$39/month per location",
    bestFor: "Simple check-in at a single location",
    features: ["Basic check-in", "Visitor badges"],
    drawbacks: [
      "No mandatory safety acknowledgment",
      "No watchlist",
      "No emergency evacuation list",
      "Per-location pricing",
    ],
  },
  {
    name: "Traction Guest",
    pricing: "Custom quote",
    bestFor: "Enterprises that need deep customization",
    features: ["Highly customizable workflows", "Enterprise integrations"],
    drawbacks: [
      "Expensive",
      "Slow to deploy",
      "Requires sales engagement",
    ],
  },
  {
    name: "The Receptionist",
    pricing: "~$50/month per location",
    bestFor: "Single-office businesses",
    features: ["iPad-based check-in", "Visitor badges"],
    drawbacks: [
      "Gets expensive with multiple sites",
      "Limited features for multi-site management",
    ],
  },
  {
    name: "HybridHero",
    pricing: "Custom quote",
    bestFor: "Hybrid workplaces with hot-desking and meeting room booking",
    features: ["Desk booking", "Meeting room management", "Visitor check-in"],
    drawbacks: [
      "Visitor management is not the primary focus",
      "Complex for simple check-in needs",
    ],
  },
  {
    name: "Honeywell Forge",
    pricing: "Custom quote",
    bestFor:
      "Large enterprises with integrated building management needs",
    features: [
      "Building management integration",
      "Access control",
      "Visitor management",
    ],
    drawbacks: [
      "Massive overkill for most businesses",
      "Enterprise pricing",
    ],
  },
  {
    name: "Vizito",
    pricing: "€29.95/month",
    bestFor: "European businesses focused on GDPR compliance",
    features: ["GDPR-compliant check-in", "Privacy-focused design"],
    drawbacks: [
      "Limited features for multi-site management",
      "No mandatory safety acknowledgment",
    ],
  },
  {
    name: "Paper Logs",
    pricing: "~$20/year for clipboards",
    bestFor: "No one. Seriously.",
    drawbacks: [
      "No audit trail",
      "No proof of safety acknowledgment",
      "Impossible to search",
      "Emergency evacuation is a guessing game",
      "Audit failures",
      "Lost logs",
    ],
  },
];

const comparisonData = [
  {
    tool: "SiteSafe",
    pricing: "$49/mo",
    multiSite: true,
    mandatorySafety: true,
    emergencyEvac: true,
    freeTrial: "✅ 14 days",
    salesCall: false,
  },
  {
    tool: "Envoy",
    pricing: "~$99+/mo/site",
    multiSite: true,
    mandatorySafety: "❌ Add-on",
    emergencyEvac: false,
    freeTrial: false,
    salesCall: true,
  },
  {
    tool: "SwipedOn",
    pricing: "~$39/mo/site",
    multiSite: false,
    mandatorySafety: false,
    emergencyEvac: false,
    freeTrial: true,
    salesCall: false,
  },
  {
    tool: "iLobby",
    pricing: "Custom",
    multiSite: true,
    mandatorySafety: false,
    emergencyEvac: false,
    freeTrial: false,
    salesCall: true,
  },
  {
    tool: "Proxyclick",
    pricing: "Custom",
    multiSite: true,
    mandatorySafety: false,
    emergencyEvac: false,
    freeTrial: false,
    salesCall: true,
  },
  {
    tool: "Sine",
    pricing: "~$39/mo/site",
    multiSite: false,
    mandatorySafety: false,
    emergencyEvac: false,
    freeTrial: true,
    salesCall: false,
  },
  {
    tool: "Paper Logs",
    pricing: "~$20/yr",
    multiSite: false,
    mandatorySafety: false,
    emergencyEvac: false,
    freeTrial: "N/A",
    salesCall: "N/A",
  },
];

export default function BestVisitorManagementSystemsPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <article className="max-w-4xl mx-auto space-y-12 text-white">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            The 12 Best Visitor Management Systems for 2026
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Finding the right visitor management system (VMS) for your business is overwhelming. Dozens of options exist — from simple iPad check-in apps to enterprise-grade security platforms.
          </p>
          <p className="text-slate-400 max-w-2xl mx-auto">
            If you&apos;re managing multiple locations, the stakes are even higher. You need one system that works across all your sites, doesn&apos;t break the bank, and actually helps you stay compliant.
          </p>
          <p className="text-slate-300 font-medium">
            We&apos;ve analyzed the top 12 visitor management systems on the market. Here&apos;s what we found.
          </p>
        </div>

        {/* Tool list */}
        <div className="space-y-12">
          {tools.map((tool, index) => (
            <section key={index} className="glass-card p-6 sm:p-8 space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="text-sky-400">{index + 1}.</span> {tool.name}
                {index === 0 && (
                  <span className="bg-sky-500/20 text-sky-300 text-xs font-semibold px-2 py-0.5 rounded-full">
                    Best for Multi‑Site
                  </span>
                )}
              </h2>
              <p className="text-sm text-slate-300">
                <strong>Pricing:</strong> {tool.pricing}
              </p>
              <p className="text-sm text-slate-300">
                <strong>Best for:</strong> {tool.bestFor}
              </p>

              {tool.features && (
                <div>
                  <h3 className="text-sm font-semibold text-sky-400 uppercase tracking-wider mb-2">
                    Key Features
                  </h3>
                  <ul className="space-y-1 list-disc pl-5 text-sm text-slate-300">
                    {tool.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}

              {tool.drawbacks && (
                <div>
                  <h3 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-2">
                    Drawbacks
                  </h3>
                  <ul className="space-y-1 list-disc pl-5 text-sm text-slate-400">
                    {tool.drawbacks.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              )}

              {tool.standout && (
                <p className="text-sm text-slate-200 italic border-l-2 border-sky-400 pl-3">
                  <strong>Why it stands out:</strong> {tool.standout}
                </p>
              )}

              {tool.cta && (
                <Link
                  href={tool.cta}
                  className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-xl px-6 py-2.5 text-sm transition-all shadow-lg cta-pulse mt-2"
                >
                  {tool.ctaLabel} <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </section>
          ))}
        </div>

        {/* Comparison Table */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Comparison Table</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border border-white/10 rounded-xl overflow-hidden">
              <thead className="bg-white/5">
                <tr className="text-slate-300">
                  <th className="p-3">Tool</th>
                  <th className="p-3">Pricing</th>
                  <th className="p-3">Multi‑Site</th>
                  <th className="p-3">Mandatory Safety</th>
                  <th className="p-3">Emergency Evac</th>
                  <th className="p-3">Free Trial</th>
                  <th className="p-3">Sales Call Required</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="text-slate-400 hover:bg-white/[0.03] transition-colors">
                    <td className="p-3 font-medium text-white">{row.tool}</td>
                    <td className="p-3">{row.pricing}</td>
                    <td className="p-3">{renderBoolean(row.multiSite)}</td>
                    <td className="p-3">{renderBoolean(row.mandatorySafety)}</td>
                    <td className="p-3">{renderBoolean(row.emergencyEvac)}</td>
                    <td className="p-3">{typeof row.freeTrial === "string" ? row.freeTrial : renderBoolean(row.freeTrial)}</td>
                    <td className="p-3">{typeof row.salesCall === "string" ? row.salesCall : renderBoolean(row.salesCall)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* How to Choose */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">How to Choose the Right Visitor Management System</h2>
          <p className="text-slate-300">Ask yourself these questions:</p>
          <ol className="list-decimal pl-5 space-y-4 text-slate-300">
            <li>
              <strong>How many sites do you manage?</strong> If you have 2-20 sites, you need a platform that doesn&apos;t charge per location. SiteSafe and enterprise tools handle multi-site, but only SiteSafe does it at a flat rate.
            </li>
            <li>
              <strong>Do you need mandatory safety acknowledgment?</strong> If you&apos;re in construction, manufacturing, warehousing, or any industry where visitors must acknowledge safety rules, this is non-negotiable. Most tools treat this as optional or don&apos;t offer it at all. SiteSafe makes it mandatory.
            </li>
            <li>
              <strong>What&apos;s your budget?</strong> If you&apos;re a mid-sized business, enterprise tools like Envoy, iLobby, and Proxyclick will be out of reach. SiteSafe is built specifically for your budget.
            </li>
            <li>
              <strong>Do you want to talk to sales?</strong> If you want to see pricing and try a product without a 45-minute demo, SiteSafe is your only option.
            </li>
          </ol>
        </section>

        {/* Bottom Line */}
        <section className="glass-card p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold">The Bottom Line</h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            For multi-site businesses that need compliance, visibility, and predictable pricing,{" "}
            <strong className="text-white">SiteSafe is the clear winner</strong>. It&apos;s the only platform that combines mandatory safety acknowledgment, real-time multi-site visibility, and flat $49/month pricing — all without forcing you through a sales demo.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-xl px-8 py-3 text-sm transition-all shadow-lg cta-pulse"
          >
            Start your 14-day free trial <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        {/* Back to blog */}
        <div className="text-center pt-8">
          <Link href="/blog" className="text-slate-400 hover:text-white text-sm transition-colors">
            ← Back to blog
          </Link>
        </div>
      </article>
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