// app/pricing/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  DollarSign,
  ShieldCheck,
  CreditCard,
  PhoneOff,
  Star,
  Zap,
  Lock,
  Users,
  Building,
  TrendingUp,
  FileText,
  AlertTriangle,
  ChevronRight,
  BadgeCheck,
  Flame,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Visitor Management Pricing — $49/mo Flat for 20 Sites | SiteSafe",
  description:
    "Transparent visitor management pricing. $49/month flat for up to 20 sites, unlimited visitors. No per-location fees. 14-day free trial, no credit card, no sales calls.",
  alternates: {
    canonical: "https://sitesafe.thesift.space/pricing",
  },
  openGraph: {
    title: "Visitor Management Pricing — $49/mo Flat for 20 Sites | SiteSafe",
    description:
      "Transparent visitor management pricing. $49/month flat for up to 20 sites. No per-location fees. 14-day free trial.",
    url: "https://sitesafe.thesift.space/pricing",
    images: [
      {
        url: "https://sitesafe.thesift.space/og-image.png",
        width: 1200,
        height: 630,
        alt: "SiteSafe Pricing — $49/mo for 20 Sites",
      },
    ],
  },
};

const featureCategories = [
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
];

const comparisonData = [
  { feature: "5 sites", siteSafe: "$49", envoy: "~$600", swipedOn: "~$360", savings: "$551+" },
  { feature: "10 sites", siteSafe: "$49", envoy: "~$1,200", swipedOn: "~$720", savings: "$671+" },
  { feature: "15 sites", siteSafe: "$49", envoy: "~$1,800", swipedOn: "~$1,080", savings: "$1,031+" },
  { feature: "20 sites", siteSafe: "$49", envoy: "~$2,400", swipedOn: "~$1,440", savings: "$1,391+" },
  {
    feature: "Mandatory safety briefings",
    siteSafe: "✅ Included",
    envoy: "❌ Add-on / not available",
    swipedOn: "❌ Not available",
    savings: "—",
  },
  {
    feature: "Lockdown mode",
    siteSafe: "✅ Included",
    envoy: "❌ Not available",
    swipedOn: "❌ Not available",
    savings: "—",
  },
  {
    feature: "Sales call required",
    siteSafe: "❌ Never",
    envoy: "✅ Always",
    swipedOn: "❌ No",
    savings: "—",
  },
  {
    feature: "Setup time",
    siteSafe: "3 minutes",
    envoy: "Days to weeks",
    swipedOn: "Hours",
    savings: "—",
  },
];

const trustBadges = [
  "No credit card required",
  "Cancel in 2 clicks",
  "Setup in 3 minutes",
  "No sales calls ever",
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200">
      {/* ─── Header ─── */}
      <header className="border-b border-white/5 bg-[#0a0f1c]/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-sky-500 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm text-white">SiteSafe</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-xs text-slate-500 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/features" className="text-xs text-slate-500 hover:text-white transition-colors">
              Features
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-lg text-slate-900 bg-white hover:bg-slate-100 transition-all active:scale-95"
            >
              Start free trial
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-20">
        {/* ─── Hero ─── */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
            <Flame className="w-3.5 h-3.5" />
            Save $1,000+/year vs. per-site pricing
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            One price.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
              20 sites. No surprises.
            </span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Most visitor management tools charge per site. We think that&apos;s unfair to multi-location teams. 
            Flat $49/mo. Unlimited visitors. Every feature included.
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
                SiteSafe Pro
              </p>
              
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="text-6xl sm:text-7xl font-extrabold text-white">$49</span>
                <span className="text-xl text-slate-400">/mo</span>
              </div>
              
              <p className="text-sm text-slate-400 mb-8">
                Billed monthly. No annual contract.
              </p>

              <div className="space-y-3 text-left max-w-sm mx-auto mb-8">
                {[
                  "Up to 20 sites",
                  "Unlimited visitors",
                  "All features included",
                  "14-day free trial",
                  "No credit card required",
                  "Cancel anytime",
                ].map((item, i) => (
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
                Start My Free Trial
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] text-slate-500">
                {trustBadges.map((badge, i) => (
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
              Everything included — no add-ons
            </h2>
            <p className="text-slate-400">
              Every feature below works across all 20 sites. No upsells, no enterprise tiers.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {featureCategories.map((cat, i) => (
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
              The real cost of per-site pricing
            </h2>
            <p className="text-slate-400">
              Compare SiteSafe&apos;s flat rate to what you&apos;d pay with per-location pricing.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/[0.03] border-b border-white/5">
                    <th className="p-4 text-left text-xs text-slate-500 uppercase tracking-wider font-semibold">Scenario</th>
                    <th className="p-4 text-left text-xs text-emerald-400 uppercase tracking-wider font-semibold">SiteSafe</th>
                    <th className="p-4 text-left text-xs text-slate-500 uppercase tracking-wider font-semibold">Envoy</th>
                    <th className="p-4 text-left text-xs text-slate-500 uppercase tracking-wider font-semibold">SwipedOn</th>
                    <th className="p-4 text-left text-xs text-sky-400 uppercase tracking-wider font-semibold">Your Savings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {comparisonData.map((row, i) => (
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
            Envoy and SwipedOn pricing based on public per-location rates. Actual costs may vary.
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
            We were paying $89/site with our old provider. With 8 locations, that was $712/month. 
            SiteSafe is $49 for all 20 sites. The math was obvious.
          </blockquote>
          <div className="text-center">
            <p className="text-sm font-semibold text-white">David Park</p>
            <p className="text-xs text-slate-500">Operations Manager, Apex Logistics</p>
            <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <DollarSign className="w-3 h-3" />
              Saved $7,956/year
            </div>
          </div>
        </section>

        {/* ─── FAQ Teaser ─── */}
        <section className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-6 text-center">
            Common questions
          </h2>
          <div className="space-y-4">
            {[
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
            ].map((faq, i) => (
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
            More questions?{" "}
            <Link href="/faq" className="text-sky-400 hover:text-sky-300 transition-colors">
              View full FAQ →
            </Link>
          </p>
        </section>

        {/* ─── Final CTA ─── */}
        <section className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-sky-500/20 rounded-full blur-[80px]" />
          
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Start saving today
            </h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              14-day free trial. No credit card. No sales call. See why 200+ teams switched from per-site pricing.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-lg active:scale-[0.98]"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-slate-300 border border-white/10 hover:bg-white/5 transition-all"
              >
                Try Live Demo
              </Link>
            </div>
            
            <div className="mt-4 flex items-center justify-center gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> No credit card
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 14 days free
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Cancel anytime
              </span>
            </div>
          </div>
        </section>

        {/* ─── Audit CTA ─── */}
        <div className="text-center">
          <p className="text-sm text-slate-400">
            Not sure if you&apos;re ready to switch?{" "}
            <Link href="/audit" className="text-sky-400 hover:text-sky-300 transition-colors">
              Run our free 60-second visitor log audit →
            </Link>
          </p>
        </div>
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-white/5 py-12 bg-[#070b14]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-xs text-slate-600">
            © 2026 SiteSafe by TheSift. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}