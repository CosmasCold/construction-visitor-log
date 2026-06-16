import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  AlertTriangle,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Security Features – SiteSafe",
  description:
    "Watchlist screening, emergency evacuation lists, and lockdown mode — all included in the flat $49/month plan. No sales calls, no credit card required.",
};

export default function SecurityFeaturesPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
          Security features that go beyond sign‑in
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-12">
          Most visitor logs can’t answer a simple question: <em>“Who is on site
          right now?”</em> SiteSafe can — and gives you the tools to act on it.
        </p>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <FeatureCard
            icon={AlertTriangle}
            title="Emergency Evacuation List"
            desc="One click generates a PDF of every person on site — with photos, host names, and sign‑in times. Essential for fire drills and real emergencies."
          />
          <FeatureCard
            icon={ShieldCheck}
            title="Watchlist / Blocklist"
            desc="Flag names, emails, or phone numbers. Blocked visitors are stopped at check‑in and you’re alerted instantly via email, Slack, or webhook."
          />
          <FeatureCard
            icon={ShieldAlert}
            title="Lockdown Mode"
            desc="Instantly block all new check‑ins with a single toggle. Active visitors stay visible so you know exactly who was inside."
          />
        </div>

        {/* CTA */}
        <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 p-6 max-w-md mx-auto">
          <p className="text-sm text-slate-300 mb-2">
            All features included in the <strong>$49/month</strong> plan.
          </p>
          <p className="text-xs text-slate-400 mb-4">
            Unlimited sites, unlimited visitors. No per‑site fees. No sales
            calls.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all duration-200 active:scale-[0.98] shadow-lg w-full"
          >
            Start free trial <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <p className="text-xs text-slate-500 mt-3">
            No credit card required · 14‑day trial
          </p>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6 text-left">
      <div className="w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center mb-3">
        <Icon className="w-5 h-5 text-sky-300" />
      </div>
      <h3 className="font-semibold text-white text-sm mb-1">{title}</h3>
      <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}