// app/partners/touchdynamic/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Touch Dynamic + SiteSafe – Complete Visitor Check‑in Solution",
  description:
    "Touch Dynamic tablets paired with SiteSafe create an instant, ready‑to‑deploy visitor check‑in station. Exclusive offer for Touch Dynamic customers.",
};

export default function TouchDynamicPartnerPage() {
  return (
    <div className="min-h-screen py-16 px-4 text-white">
      <div className="max-w-3xl mx-auto text-center space-y-10">
        {/* Dual logos – now in a light container */}
        <div className="inline-flex items-center gap-6 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3">
          <Image
            src="/tdlogo.webp"
            alt="Touch Dynamic"
            width={160}
            height={40}
            className="h-8 w-auto"
          />
          <span className="text-slate-400 text-2xl font-light">+</span>
          <Image
            src="/favicon.svg"
            alt="SiteSafe"
            width={36}
            height={36}
            className="h-8 w-auto"
          />
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Your Touch Dynamic tablet, now a complete visitor check‑in station
        </h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
          Pair your Touch Dynamic hardware with SiteSafe — the flat‑$49/month
          digital check‑in platform that replaces paper sign‑in sheets with QR
          codes, mandatory safety briefings, and a real‑time dashboard.
        </p>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
          <BenefitCard
            title="Ready in minutes"
            desc="No complex setup. Open a browser, log in, and your tablet becomes a visitor check‑in kiosk."
          />
          <BenefitCard
            title="Compliance built in"
            desc="Mandatory safety acknowledgment, watchlist screening, and one‑click audit exports."
          />
          <BenefitCard
            title="Flat $49/month"
            desc="Unlimited sites, unlimited visitors. No per‑device fees, no per‑visitor charges."
          />
        </div>

        {/* CTA */}
        <div className="bg-white/[0.06] backdrop-blur-lg rounded-2xl border border-white/10 p-6 max-w-md mx-auto">
          <p className="text-sm text-slate-300 mb-2">
            <strong>Exclusive Touch Dynamic offer:</strong> start with an
            extended 30‑day free trial.
          </p>
          <p className="text-xs text-slate-400 mb-4">
            Use code <span className="text-sky-300 font-mono">TOUCHDYNAMIC30</span>{" "}
            at signup.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all duration-200 active:scale-[0.98] shadow-lg w-full"
          >
            Start free trial <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <p className="text-xs text-slate-400 mt-3">
            No credit card required · Cancel anytime
          </p>
        </div>

        {/* Footer note */}
        <p className="text-xs text-slate-500">
          Touch Dynamic and the Touch Dynamic logo are trademarks of Touch
          Dynamic, Inc. SiteSafe is an independent software provider.
        </p>
      </div>
    </div>
  );
}

function BenefitCard({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-white/[0.06] backdrop-blur-lg rounded-2xl border border-white/10 p-6 text-left">
      <CheckCircle2 className="w-5 h-5 text-sky-400 mb-2" />
      <h3 className="font-semibold text-white text-sm mb-1">{title}</h3>
      <p className="text-xs text-slate-300 leading-relaxed">{desc}</p>
    </div>
  );
}