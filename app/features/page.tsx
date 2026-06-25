// app/features/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  QrCode,
  ShieldCheck,
  Users,
  Mail,
  UserPlus,
  Printer,
  FileDown,
  Building,
  TrendingUp,
  Code,
  ArrowRight,
  CheckCircle2,
  Camera,
  ListChecks,
  Zap,
  AlertTriangle,
  FileText,
  ShieldAlert,
  Lock,
  DoorClosed,
  BadgeCheck,
  Flame,
  Star,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Features — SiteSafe Visitor Management",
  description:
    "QR check-in, safety briefings, watchlist screening, lockdown mode, emergency evacuation lists, audit exports, and more. All included for $49/mo across 20 sites.",
  openGraph: {
    title: "Features — SiteSafe Visitor Management",
    description: "Everything you need to replace paper logs across 20 sites. Flat $49/mo.",
    images: ["/dash.png"],
  },
};

const featureGroups = [
  {
    outcome: "Check visitors in — securely and instantly",
    icon: BadgeCheck,
    items: [
      { 
        icon: QrCode, 
        title: "QR check-in", 
        desc: "Each site gets a unique QR code. Visitors scan with their phone camera and sign in through their browser — no app download, no clipboard, no friction.",
        highlight: "Under 10 seconds"
      },
      { 
        icon: Camera, 
        title: "Photo capture", 
        desc: "Auto-capture visitor photos at check-in. Stored securely with their record and printed on badges so security knows exactly who is on site.",
        highlight: "Instant ID"
      },
      { 
        icon: ShieldCheck, 
        title: "Mandatory safety briefing", 
        desc: "Every visitor must acknowledge your safety rules before entry. Non-skippable, time-stamped, and audit-ready. Compliance proof is automatic.",
        highlight: "100% compliance"
      },
      { 
        icon: ListChecks, 
        title: "Pre-screening questions", 
        desc: "Ask custom yes/no questions before entry. Block visitors who answer 'yes' to risk questions. Answers stored with the log for full traceability.",
        highlight: "Risk filtering"
      },
      { 
        icon: ShieldAlert, 
        title: "Watchlist & blocklist", 
        desc: "Flag names, emails, or phone numbers. Blocked visitors are stopped at check-in and you get instant alerts via email, Slack, or webhook.",
        highlight: "Real-time alerts"
      },
      { 
        icon: FileText, 
        title: "Digital document signing", 
        desc: "Require NDAs, waivers, or policies before entry. Visitors sign directly on the check-in screen with their finger or stylus. Stored forever.",
        highlight: "Legally binding"
      },
    ],
  },
  {
    outcome: "Know who is on site — and keep them safe",
    icon: Users,
    items: [
      { 
        icon: Users, 
        title: "Real-time dashboard", 
        desc: "See exactly who is on site right now across all locations. Auto-refreshes every few seconds. Filter by site, host, or date range.",
        highlight: "Live data"
      },
      { 
        icon: Mail, 
        title: "Host notifications", 
        desc: "Hosts get automatic email alerts when their visitor arrives. No more missed connections or front desk calls.",
        highlight: "Via Brevo"
      },
      { 
        icon: UserPlus, 
        title: "Pre-registration", 
        desc: "Add expected visitors ahead of time. They sign in with one tap — no typing, no delays at the front desk or gate.",
        highlight: "One-tap entry"
      },
      { 
        icon: Printer, 
        title: "Badge printing", 
        desc: "Print visitor badges with photo directly from the dashboard or check-in page. Compact, professional, and secure.",
        highlight: "Instant badges"
      },
      { 
        icon: Lock, 
        title: "Lockdown mode", 
        desc: "One click blocks all new check-ins and flags the site. Security knows exactly who was inside and who tried to enter.",
        highlight: "Emergency ready"
      },
      { 
        icon: AlertTriangle, 
        title: "Emergency evacuation list", 
        desc: "One click generates a PDF of everyone on site — names, hosts, photos, and sign-in times. Essential for drills and real emergencies.",
        highlight: "12 seconds"
      },
    ],
  },
  {
    outcome: "Pass audits without the panic",
    icon: FileDown,
    items: [
      { 
        icon: FileDown, 
        title: "One-click exports", 
        desc: "Export filtered visitor logs in CSV, Excel, or PDF. Includes pre-screening answers, signatures, photos, and timestamps.",
        highlight: "Audit-ready"
      },
      { 
        icon: TrendingUp, 
        title: "Built-in analytics", 
        desc: "30-day trend charts, visitor totals by site, peak hour analysis, and CSV export. Understand traffic patterns at a glance.",
        highlight: "Trend insights"
      },
      { 
        icon: Building, 
        title: "Multi-site management", 
        desc: "Up to 20 sites under one account. Each site gets its own QR code, hosts, settings, and visitor log. Switch in one click.",
        highlight: "One account"
      },
    ],
  },
  {
    outcome: "Connect to your existing tools",
    icon: Zap,
    items: [
      { 
        icon: Code, 
        title: "REST API", 
        desc: "Full REST API with Bearer token authentication. Connect SiteSafe to your HR tools, Slack, custom dashboards, or anything else.",
        highlight: "Developer-first"
      },
      { 
        icon: Zap, 
        title: "Webhooks", 
        desc: "Send real-time events — check-in, check-out, blocklist hits — to any URL. Build custom workflows in minutes.",
        highlight: "Real-time"
      },
      { 
        icon: Zap, 
        title: "Built-in integrations", 
        desc: "Slack notifications, Google Sheets sync, and Zapier support come standard. No extra configuration needed.",
        highlight: "No-code"
      },
    ],
  },
];

const allFeatures = featureGroups.flatMap(g => g.items);
const totalFeatures = allFeatures.length;

export default function FeaturesPage() {
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
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-lg text-slate-900 bg-white hover:bg-slate-100 transition-all active:scale-95"
            >
              Start free trial
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        
        {/* ─── Hero ─── */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-medium mb-6">
            <Flame className="w-3.5 h-3.5" />
            {totalFeatures} features included — no add-ons, no upsells
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Everything you need to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
              replace paper logs
            </span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            No per-feature pricing. No enterprise tiers. Every tool below is included in the flat $49/month plan for up to 20 sites.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] active:scale-[0.98]"
            >
              Start Free Trial <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-slate-300 border border-white/10 hover:bg-white/5 transition-all"
            >
              Try Live Demo
            </Link>
          </div>
          <p className="mt-4 text-xs text-slate-500 flex items-center justify-center gap-4">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> No credit card
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 14-day trial
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Cancel anytime
            </span>
          </p>
        </div>

        {/* ─── Feature Grid ─── */}
        <div className="space-y-20">
          {featureGroups.map((group, groupIdx) => (
            <section key={groupIdx}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center">
                  <group.icon className="w-5 h-5 text-sky-400" />
                </div>
                <h2 className="text-xl font-bold text-white">{group.outcome}</h2>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="group h-full rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/10 p-6 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-sky-500/10 transition-colors">
                        <item.icon className="w-5 h-5 text-slate-300 group-hover:text-sky-400 transition-colors" />
                      </div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-medium text-sky-400 uppercase tracking-wider">
                        {item.highlight}
                      </span>
                    </div>
                    <h3 className="font-semibold text-white text-sm mb-2">{item.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* ─── Pricing Anchor ─── */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-sky-500/20 rounded-full blur-[80px]" />
          
          <div className="relative">
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-sm text-slate-400 ml-2">4.9/5 on G2</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              One price. All features. No surprises.
            </h2>
            <p className="text-lg text-slate-400 max-w-xl mx-auto mb-8">
              Most visitor management tools charge per site or per feature. We think that&apos;s unfair to multi-location teams.
            </p>
            
            <div className="flex items-baseline justify-center gap-1 mb-8">
              <span className="text-5xl sm:text-6xl font-extrabold text-white">$49</span>
              <span className="text-xl text-slate-400">/mo</span>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-3 max-w-lg mx-auto mb-8 text-left">
              {[
                "Unlimited visitors across all sites",
                "QR codes for every location",
                "Photo capture & badge printing",
                "Audit exports (CSV, Excel, PDF)",
                "Watchlist & lockdown mode",
                "Digital document signing",
                "REST API & webhooks",
                "Live chat support (< 60 sec)",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
            
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-lg active:scale-[0.98]"
            >
              Start my free 14-day trial
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <p className="mt-3 text-xs text-slate-500">
              No credit card required. Cancel anytime.
            </p>
          </div>
        </div>

        {/* ─── FAQ Teaser ─── */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-white mb-3">Questions?</h2>
          <p className="text-sm text-slate-400 mb-4">
            Everything is covered in our FAQ — no sales call needed.
          </p>
          <Link
            href="/#faq"
            className="inline-flex items-center gap-1 text-sm text-sky-400 hover:text-sky-300 transition-colors"
          >
            View FAQ <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-white/5 py-12 bg-[#070b14]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-slate-600">
            © 2026 SiteSafe by TheSift. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}