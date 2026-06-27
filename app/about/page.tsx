// app/about/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  ArrowRight,
  Users,
  DollarSign,
  FileCheck,
  Mail,
  CheckCircle2,
  Rocket,
  Heart,
  Globe,
  Zap,
  MessageSquare,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About SiteSafe — Built for Multi-Site Teams, Not Enterprise Sales",
  description:
    "SiteSafe is an independent visitor management platform for mid-sized workplaces. Flat $49/mo, no sales calls, built by a small team that cares about safety and compliance.",
  openGraph: {
    title: "About SiteSafe — Why We Built It",
    description: "No investors. No sales floor. Just a team building the visitor management tool we wished existed.",
    images: ["/og-image.png"],
  },
};

const values = [
  {
    icon: MessageSquare,
    title: "No sales calls. Ever.",
    desc: "You’ll never be asked to book a demo or speak to a salesperson. Sign up, set up, and start checking in visitors. Support is direct — you talk to the people who build the product.",
  },
  {
    icon: DollarSign,
    title: "Flat, transparent pricing",
    desc: "$49/month for up to 20 sites and unlimited visitors. No per-site fees, no hidden add-ons, no enterprise tiers. Cancel anytime in two clicks.",
  },
  {
    icon: FileCheck,
    title: "Compliance first",
    desc: "Mandatory policy acknowledgment means every visitor confirms your rules before entry. That's your proof during an audit — automatic, timestamped, and non-skippable.",
  },
];

const stats = [
  { label: "Sites managed", value: "2,400+" },
  { label: "Visitors logged", value: "180K+" },
  { label: "Average setup time", value: "3 min" },
  { label: "Support response time", value: "< 60 sec" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200">
      {/* ─── Header ─── */}
      <header className="border-b border-white/5 bg-[#0a0f1c]/90 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-sky-500 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm text-white">SiteSafe</span>
          </Link>
          <Link
            href="/"
            className="text-xs text-slate-500 hover:text-white transition-colors flex items-center gap-1"
          >
            Back to site <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        {/* ─── Hero ─── */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 mb-4">
            <Heart className="w-6 h-6 text-sky-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Built for multi-site teams,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
              not enterprise sales
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            We&apos;re a small, independent team. No outside investors, no sales floor, no hidden agenda. 
            Just a visitor management platform that works.
          </p>
        </div>

        {/* ─── Stats ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 text-center"
            >
              <p className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ─── Story ─── */}
        <section className="rounded-2xl border border-white/5 bg-white/[0.03] p-8 sm:p-10">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <Rocket className="w-5 h-5 text-sky-400" />
            Why we built SiteSafe
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-slate-300">
            <p>
              We spent months talking to facility managers, site supervisors, and office administrators. 
              One problem kept coming up: visitor logs were still paper-based, and when an audit arrived, 
              the log was nowhere to be found.
            </p>
            <p>
              The existing digital tools were either built for huge enterprises — with huge price tags, 
              mandatory demos, and 6-month sales cycles — or they lacked the compliance features that 
              real workplaces need. Like a <strong className="text-white">non-skippable safety acknowledgment</strong>.
            </p>
            <p>
              So we built SiteSafe: a compliance-ready visitor management platform for mid-sized workplaces 
              with multiple locations. Each site gets a unique QR code. Visitors scan it, fill in their details, 
              and <strong className="text-white">must</strong> confirm they&apos;ve read your safety rules — no skipping. 
              You get a real-time dashboard, instant audit exports, and security features like watchlist screening, 
              emergency evacuation lists, and lockdown mode — all standard, not upsold.
            </p>
            <p>
              We&apos;re a small, independent team. No outside investors, no sales floor, no hidden agenda. 
              That means we can keep our pricing flat, our product focused, and our support genuinely helpful.
            </p>
          </div>
        </section>

        {/* ─── Values ─── */}
        <section>
          <h2 className="text-xl font-bold text-white mb-6 text-center">
            What we believe
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 hover:bg-white/[0.06] transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center mb-4">
                  <v.icon className="w-5 h-5 text-sky-400" />
                </div>
                <h3 className="font-semibold text-white text-sm mb-2">{v.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Team / Founder Note ─── */}
        <section className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 sm:p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-sky-500/20 rounded-full blur-[80px]" />
          
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-sky-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              A note from the founder
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-xl mx-auto mb-4">
              I started SiteSafe after watching a safety manager spend 3 hours reconstructing visitor logs 
              for an auditor. Paper logs, spreadsheets, and &apos;we think he signed in around 9am&apos; — that was 
              the best she could do. I knew there had to be a better way.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed max-w-xl mx-auto mb-6">
              Our goal is simple: replace paper logs across every multi-site team that cares about safety. 
              Not with enterprise complexity. Not with per-site fees. Just a tool that works, at a price 
              that makes sense.
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <span className="font-medium text-slate-400">— Cosmas</span>
              <span>·</span>
              <span>Founder, SiteSafe</span>
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <div className="text-center">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-lg active:scale-[0.98]"
          >
            Start Free Trial <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-500">
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

        {/* ─── Contact ─── */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-8 text-center">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-5 h-5 text-sky-400" />
          </div>
          <h2 className="text-lg font-bold text-white mb-2">Questions?</h2>
          <p className="text-sm text-slate-400 mb-4 max-w-md mx-auto">
            No sales team. No call centers. Just the founder and the team, answering your email directly.
          </p>
          <a
            href="mailto:hello@thesift.space"
            className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors"
          >
            <Mail className="w-4 h-4" />
            hello@thesift.space
          </a>
        </div>
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-white/5 py-12 bg-[#070b14]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs text-slate-600">
            © 2026 SiteSafe by TheSift. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}