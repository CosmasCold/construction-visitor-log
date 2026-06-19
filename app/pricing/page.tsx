// app/pricing/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ReviewBadges from "@/components/ReviewBadges";
import { CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";

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

export default function PricingPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
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
          <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-8 text-center">
            <h2 className="text-xl font-semibold text-white mb-2">
              SiteSafe Pro
            </h2>
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

        {/* Everything you get */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-white text-center mb-6">
            Everything you get — included at no extra cost
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-2 text-sm text-slate-200 bg-white/[0.04] rounded-xl px-4 py-3"
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

        {/* FAQ about limit */}
        <div className="max-w-2xl mx-auto bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 p-6 text-center">
          <h3 className="text-lg font-semibold text-white mb-2">
            What if I need more than 20 sites?
          </h3>
          <p className="text-sm text-slate-300">
            If your organization has more than 20 locations, reach out to us.
            We’ll work with you on a custom plan that fits your needs — same flat
            philosophy, no sales games.
          </p>
        </div>

        {/* Trust badges */}
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-slate-400 text-center mb-4">
            Trusted by workplaces everywhere
          </p>
          <div className="flex flex-wrap justify-center gap-4 items-center">
            <a
              href="https://saasdb.net"
              rel="noopener noreferrer"
              className="inline-flex flex-col items-center gap-1 text-center"
            >
              <Image
                src="https://saasdb.net/badge/featured-dark.svg"
                alt="Featured on SaasDB"
                width={120}
                height={44}
                unoptimized
                className="h-10 w-auto"
              />
              <span className="text-xs text-slate-400">Featured on SaasDB</span>
            </a>
            <a
              href="https://fazier.com/launches/sitesafe.thesift.space"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-col items-center gap-1 text-center"
            >
              <Image
                src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=launched&theme=light"
                alt="Launched on Fazier"
                width={100}
                height={34}
                unoptimized
                className="h-8 w-auto"
              />
              <span className="text-xs text-slate-400">Launched on Fazier</span>
            </a>
            <a
              href="https://www.saashub.com/sitesafe-by-thesift?utm_source=badge&utm_campaign=badge&utm_content=sitesafe-by-thesift&badge_variant=dark&badge_kind=approved"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-col items-center gap-1 text-center"
            >
              <Image
                src="https://cdn-b.saashub.com/img/badges/approved-dark.png?v=1"
                alt="SiteSafe approved on SaaS Hub"
                width={120}
                height={40}
                unoptimized
                className="h-8 w-auto"
              />
              <span className="text-xs text-slate-400">Featured on SaaS Hub</span>
            </a>
            <ReviewBadges />
          </div>
        </div>

        {/* Comparison link */}
        <div className="text-center">
          <p className="text-sm text-slate-400">
            See how we compare to competitors{" "}
            <Link
              href="/compare"
              className="text-sky-400 hover:underline transition-colors font-medium"
            >
              side‑by‑side
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}