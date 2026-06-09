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
} from "lucide-react";

export const metadata: Metadata = {
  title: "Features – SiteSafe",
  description:
    "Explore every SiteSafe feature: QR check‑in, mandatory policy acknowledgment, real‑time dashboard, host notifications, pre‑registration, badge printing, audit exports, multi‑site management, analytics, and REST API.",
};

const visitorFeatures = [
  { icon: QrCode, title: "QR check‑in", desc: "Each site gets its own scannable QR code. Visitors use their phone camera to open the check‑in page instantly. No typing a URL, no searching for the right form." },
  { icon: ShieldCheck, title: "Mandatory policy acknowledgment", desc: "Your safety or conduct policy appears before the sign‑in form. The visitor must check a box confirming they've read it. The acknowledgment is timestamped and stored permanently. It cannot be skipped." },
  { icon: UserPlus, title: "Pre‑registration", desc: "Add expected visitors ahead of time. When they arrive, they tap their name and sign in with one touch. Reduces wait times and eliminates data entry errors." },
  { icon: Printer, title: "Badge printing", desc: "Print visitor badges directly from the active visitor list. Great for conferences, large offices, or any workplace that needs visible identification." },
];

const managerFeatures = [
  { icon: Users, title: "Real‑time dashboard", desc: "A live view of everyone currently on site, updated every few seconds. Know exactly who is in your building without walking the floor." },
  { icon: Mail, title: "Host notifications", desc: "When a visitor selects a host, an automatic email alert is sent via Brevo. No more calling the front desk to ask if your guest has arrived." },
  { icon: Users, title: "Remote sign‑out", desc: "Sign any visitor out from your dashboard. Perfect when someone forgets to sign out or leaves early." },
  { icon: Building, title: "Multi‑site management", desc: "One account, unlimited sites. Each location has its own QR code, check‑in page, and settings. Manage everything from a single dashboard." },
];

const complianceFeatures = [
  { icon: FileDown, title: "Instant audit exports", desc: "Filter by date, host, or site, then export a complete visitor log as CSV, Excel, or PDF. Turns hours of paperwork into a 30‑second task." },
  { icon: TrendingUp, title: "Built‑in analytics", desc: "View 30‑day trend charts and total visitor counts. Export the data as CSV for your own reports. Spot patterns and plan staffing around peak check‑in times." },
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

        {/* For Visitors */}
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

        {/* For Site Managers */}
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

        {/* For Compliance */}
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