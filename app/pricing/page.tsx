// app/pricing/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Building, Users, ShieldCheck, HeadphonesIcon as Support, TrendingUp, Code } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing – SiteSafe",
  description:
    "Simple, flat pricing for smart visitor management. $49/month, unlimited sites and visitors, no hidden fees.",
};

const features = [
  "Unlimited sites",
  "Unlimited visitors",
  "QR check‑in per site",
  "Mandatory policy acknowledgment",
  "Real‑time dashboard",
  "Host email notifications",
  "Pre‑registration",
  "Visitor badge printing",
  "Audit exports (CSV, Excel, PDF)",
  "Built‑in analytics",
  "REST API",
  "14‑day free trial",
];

export default function PricingPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Simple, flat pricing</h1>
          <p className="text-lg text-slate-400">No per‑site fees. No per‑user charges. No surprises.</p>
        </div>

        <div className="max-w-sm mx-auto">
          <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-8 text-center">
            <h2 className="text-xl font-semibold text-white mb-2">SiteSafe Pro</h2>
            <p className="text-5xl font-extrabold text-white mt-4 mb-1">$49<span className="text-lg text-slate-400 font-medium">/mo</span></p>
            <p className="text-sm text-slate-400 mb-6">Unlimited sites and visitors</p>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all duration-200 active:scale-[0.98] shadow-lg w-full"
            >
              Start Free Trial <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <p className="text-xs text-slate-500 mt-3">No credit card required</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-white text-center mb-6">Everything included</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-sm text-slate-200 bg-white/[0.04] rounded-xl px-4 py-3">
                <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-slate-400">
            See how we compare to competitors{" "}
            <Link href="/compare" className="text-sky-400 hover:underline transition-colors font-medium">
              side‑by‑side
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}