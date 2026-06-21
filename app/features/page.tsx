// app/features/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
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
} from "lucide-react";

export const metadata: Metadata = {
  title: "Features – SiteSafe",
  description:
    "Explore all SiteSafe features: QR check‑in, mandatory safety briefing, watchlist screening, emergency evacuation list, lockdown mode, webhooks, and more.",
};

const featureGroups = [
  {
    category: "Check‑in",
    items: [
      { icon: QrCode, title: "QR check‑in", desc: "Each site gets a unique QR code. Visitors scan it with their phone and sign in instantly — no app download, no clipboard." },
      { icon: ShieldCheck, title: "Mandatory safety briefing", desc: "Every visitor must acknowledge your safety rules before they can enter. Non‑skippable, time‑stamped, and audit‑ready." },
      { icon: Camera, title: "Photo capture", desc: "Take a visitor photo at check‑in. Stored securely with their record and printed on badges for extra security." },
      { icon: ListChecks, title: "Pre‑screening questions", desc: "Ask custom yes/no questions before entry. Answers are stored with the visitor log for full compliance." },
      { icon: ShieldCheck, title: "Watchlist / Blocklist", desc: "Flag names, emails, or phone numbers. Blocked visitors are stopped at check‑in, and you’re alerted instantly via email, Slack, or webhook." },
      { icon: FileText, title: "Digital document signing", desc: "Require visitors to sign NDAs, waivers, or policies directly on the check‑in screen. Signatures are stored for audit." },
    ],
  },
  {
    category: "Management & Safety",
    items: [
      { icon: Users, title: "Real‑time dashboard", desc: "See exactly who is on site right now — auto‑refreshes every few seconds. Filter by site, host, or date." },
      { icon: Mail, title: "Host notifications", desc: "Your team gets an automatic email when their visitor arrives. No more calling the front desk." },
      { icon: UserPlus, title: "Pre‑registration", desc: "Add expected visitors ahead of time. They sign in with one tap — no typing required." },
      { icon: Printer, title: "Badge printing", desc: "Print visitor badges (with photo) directly from the dashboard or check‑in page. Compact label format." },
      { icon: ShieldAlert, title: "Lockdown mode", desc: "Instantly block all new check‑ins and flag the site as locked down. Security knows exactly who was inside." },
      { icon: AlertTriangle, title: "Emergency evacuation list", desc: "One click generates a PDF of every person currently on site, including names, hosts, and photos. Essential for drills and real emergencies." },
    ],
  },
  {
    category: "Compliance & Exports",
    items: [
      { icon: FileDown, title: "Audit exports", desc: "Export filtered visitor logs in CSV, Excel, or PDF. Include pre‑screening answers and signatures." },
      { icon: TrendingUp, title: "Built‑in analytics", desc: "30‑day trend chart, visitor totals, and CSV export. Understand traffic patterns at a glance." },
      { icon: Building, title: "Multi‑site management", desc: "Up to 20 sites under one account. Each site has its own QR code, hosts, and settings — all for one flat price." },
    ],
  },
  {
    category: "Integrations & Developer Tools",
    items: [
      { icon: Code, title: "REST API", desc: "Full REST API with Bearer token authentication. Connect SiteSafe to your HR tools, Slack, custom dashboards, or anything else." },
      { icon: Zap, title: "Webhooks", desc: "Send real‑time events (check‑in, check‑out, blocklist hits) to any URL. Integrate with Zapier, Google Sheets, or your own backend." },
      { icon: Zap, title: "Built‑in integrations", desc: "Slack notifications, Google Sheets sync, and Zapier support come standard. No extra configuration needed." },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            Everything you get, for up to 20 sites
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            A complete visitor management system built for mid‑sized workplaces — all
            features included in the flat $49/month plan.
          </p>
        </div>

        {featureGroups.map((group) => (
          <div key={group.category}>
            <h2 className="text-xl font-semibold text-sky-300 mb-5 text-center sm:text-left">
              {group.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {group.items.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/[0.10] backdrop-blur-lg rounded-2xl border border-white/10 shadow-card-raised p-6 flex gap-4 items-start hover:bg-white/[0.14] transition-all duration-300 aurora-bg feature-card-hover"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-sky-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center pt-8">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all duration-200 active:scale-[0.98] shadow-lg"
          >
            Start Free Trial <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <p className="text-xs text-slate-500 mt-3">
            No credit card required · 14‑day trial · Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
}