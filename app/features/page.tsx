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
  ListChecks,
  Camera,
  Zap,
  MessageSquare,
  FileSpreadsheet,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Features – SiteSafe",
  description:
    "Explore every SiteSafe feature: QR check‑in, mandatory policy acknowledgment, real‑time dashboard, pre‑screening questions, photo capture, host notifications, pre‑registration, badge printing, audit exports, multi‑site management, analytics, integrations, and REST API.",
};

const visitorFeatures = [
  { icon: QrCode, title: "QR check‑in", desc: "Each site gets its own scannable QR code. Visitors use their phone camera to open the check‑in page instantly." },
  { icon: ShieldCheck, title: "Mandatory policy acknowledgment", desc: "Your safety or conduct policy appears before the sign‑in form. The visitor must check a box confirming they've read it. The acknowledgment is timestamped and stored permanently. It cannot be skipped." },
  { icon: ListChecks, title: "Pre‑screening questions", desc: "Add custom yes/no questions (e.g., 'Completed induction?'). Answers are stored with each visitor record and displayed in the dashboard." },
  { icon: Camera, title: "Photo capture", desc: "Take a visitor photo directly from the check‑in page. The photo is stored securely on Vercel Blob and attached to the visitor record for identification." },
  { icon: UserPlus, title: "Pre‑registration", desc: "Add expected visitors ahead of time. When they arrive, they tap their name and sign in with one touch." },
  { icon: Printer, title: "Badge printing", desc: "Print visitor badges from the active list, with photo if available. Perfect for events or security‑conscious environments." },
];

const managerFeatures = [
  { icon: Users, title: "Real‑time dashboard", desc: "A live view of everyone currently on site, updated every few seconds automatically. No manual refresh needed." },
  { icon: Mail, title: "Host notifications", desc: "When a visitor selects a host, an automatic email alert is sent via Brevo. The host knows their guest has arrived instantly." },
  { icon: Users, title: "Remote sign‑out", desc: "Sign any visitor out from your dashboard. Handy when someone forgets to sign out or leaves early." },
  { icon: Building, title: "Multi‑site management", desc: "One account, unlimited sites. Each location has its own QR code, check‑in page, and settings. Manage everything from a single dashboard." },
];

const complianceFeatures = [
  { icon: FileDown, title: "Instant audit exports", desc: "Filter by date, host, or site, then export a complete visitor log as CSV, Excel, or PDF. Pre‑screening answers and photos are included in exports." },
  { icon: TrendingUp, title: "Built‑in analytics", desc: "View 30‑day trend charts and total visitor counts. Export the data as CSV for your own reports." },
  { icon: Code, title: "REST API", desc: "Integrate SiteSafe with your own tools—Slack, HR systems, custom dashboards. Full documentation and per‑company API keys are included." },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Everything you get</h1>
          <p className="text-lg text-slate-400">All features included. No premium tiers.</p>
        </div>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-sky-400" /> For Visitors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {visitorFeatures.map((f, idx) => (
              <div key={idx} className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6 flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center">
                  <f.icon className="w-5 h-5 text-sky-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">{f.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
            <Building className="w-6 h-6 text-sky-400" /> For Site Managers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {managerFeatures.map((f, idx) => (
              <div key={idx} className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6 flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center">
                  <f.icon className="w-5 h-5 text-sky-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">{f.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-sky-400" /> For Compliance
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {complianceFeatures.map((f, idx) => (
              <div key={idx} className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6 flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center">
                  <f.icon className="w-5 h-5 text-sky-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">{f.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Integrations section */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-sky-400" /> Integrations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6 flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-sky-300" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">Slack notifications</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">Post a message in any Slack channel when a visitor signs in. Set it up in one minute from your Settings page.</p>
              </div>
            </div>
            <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6 flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5 text-sky-300" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">Google Sheets sync</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">Append new visitor records to a Google Sheet automatically with a simple Apps Script.</p>
              </div>
            </div>
            <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6 flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-sky-300" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">Zapier & Make</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">Connect SiteSafe to 5,000+ apps without writing code. Trigger workflows when a visitor signs in.</p>
              </div>
            </div>
            <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6 flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center">
                <Code className="w-5 h-5 text-sky-300" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">REST API</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">Full developer API with Bearer token auth. List sites, fetch visitors, create check‑ins programmatically.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all duration-200 active:scale-[0.98] shadow-lg"
          >
            Start Free Trial <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <p className="text-sm text-slate-400 mt-3">No credit card. No sales call.</p>
        </div>
      </div>
    </div>
  );
}