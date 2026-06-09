// app/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import ChecklistForm from "@/components/ChecklistForm";
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
  DollarSign,
  ArrowRight,
  Play,
} from "lucide-react";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://sitesafe.thesift.space",
  },
};

const features = [
  { icon: QrCode, title: "QR check‑in", desc: "Each site gets a unique QR code. Scan, sign, done." },
  { icon: ShieldCheck, title: "Mandatory safety briefing", desc: "Visitor cannot skip acknowledgment. Compliance proof." },
  { icon: Users, title: "Real‑time dashboard", desc: "See who's on site right now – updated every few seconds." },
  { icon: Mail, title: "Host notifications", desc: "Visitor selects a host; automatic email alert (via Brevo)." },
  { icon: UserPlus, title: "Pre‑registration", desc: "Add expected visitors for one‑tap sign‑in." },
  { icon: Printer, title: "Badge printing", desc: "Print visitor badges from the active list." },
  { icon: FileDown, title: "Audit exports", desc: "CSV, Excel, PDF – filtered by date, host, or company." },
  { icon: Building, title: "Multi‑site", desc: "One account, unlimited sites. Each with its own settings." },
  { icon: TrendingUp, title: "Analytics", desc: "30‑day trend chart, total visitors, export CSV." },
  { icon: Code, title: "REST API", desc: "Connect to Slack, HR tools, or custom dashboards." },
  { icon: DollarSign, title: "Flat $49/mo", desc: "No per‑site or per‑user fees. Cancel anytime." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen text-white">
      {/* Hero */}
      <div className="max-w-6xl mx-auto px-4 py-24 sm:py-32 sm:px-6 lg:px-8 text-center">
        <div className="bg-white/[0.05] backdrop-blur-xl rounded-3xl border border-white/10 shadow-card-raised p-10 sm:p-14">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            <span className="text-sky-400">SiteSafe</span>
            <span className="block mt-2 text-white">Smart visitor management</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            for construction sites, warehouses, and offices.
          </p>
          <p className="mt-4 text-base text-slate-400 max-w-2xl mx-auto">
            QR check‑in. Real‑time dashboard. Audit‑ready exports. No sales calls ever.
          </p>
          <p className="mt-3 inline-flex items-center gap-1.5 bg-sky-500/10 border border-sky-400/30 rounded-full px-4 py-1.5 text-sm text-sky-300 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            14‑day free trial – no credit card required
          </p>

          {/* Single primary CTA */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all duration-200 active:scale-[0.98] shadow-lg"
            >
              Start Free Trial <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <div className="flex items-center gap-4 text-sm">
              <a href="#features" className="text-slate-400 hover:text-white transition-colors duration-150">
                See what&apos;s included ↓
              </a>
              <span className="text-slate-600">·</span>
              <Link href="/admin/login" className="text-slate-400 hover:text-white transition-colors duration-150">
                Sign in
              </Link>
            </div>
          </div>

          {/* Demo video */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src="https://www.youtube.com/embed/5PKa8e84RJ4"
                title="SiteSafe demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded-xl border border-white/10"
              />
            </div>
            <p className="text-xs text-slate-500 mt-2 flex items-center justify-center gap-1">
              <Play className="w-3 h-3" /> 2‑minute overview
            </p>
          </div>
        </div>
      </div>

      {/* Trust badges – social proof */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="flex flex-wrap justify-center gap-6">
          <a
            href="https://saasdb.net"
            rel="dofollow"
            className="inline-flex flex-col items-center gap-1 text-center"
          >
            <img
              src="https://saasdb.net/badge/featured-dark.svg"
              alt="Featured on SaasDB"
              className="h-12 w-auto sm:h-14"
            />
            <span className="text-xs text-slate-400">Featured on SaasDB</span>
          </a>
          <a
            href="https://fazier.com/launches/sitesafe.thesift.space"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-col items-center gap-1 text-center"
          >
            <img
              src="https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=launched&theme=light"
              width={120}
              alt="Fazier badge"
            />
            <span className="text-xs text-slate-400">Launched on Fazier</span>
          </a>
        </div>
      </div>

      {/* Problem section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-12">
        <p className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          Last month, a contractor lost his visitor log the day before an OSHA audit. He spent four hours recreating it from memory.
        </p>
        <p className="mt-4 text-lg text-sky-400 font-semibold">
          That doesn&apos;t happen with SiteSafe.
        </p>
      </div>

      {/* Features grid */}
      <div id="features" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <h2 className="text-3xl font-bold tracking-tight text-white text-center mb-12">
          Everything you get
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6 flex gap-4 items-start hover:shadow-card-raised transition-shadow duration-300"
            >
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
      </div>

      {/* Testimonial */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-8 text-center">
          <blockquote className="text-lg text-slate-200 italic leading-relaxed">
            I used to lose paper visitor logs all the time. With SiteSafe, I finally have a system I can trust – and I can pull up an audit report in seconds.
          </blockquote>
          <p className="mt-4 text-sm text-slate-400">
            – Matteus, Multi-Site Manager
          </p>
        </div>
      </div>

      {/* ROI benefit */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 text-center">
        <p className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          SiteSafe pays for itself if it saves you just two hours of audit prep per month.
        </p>
        <p className="mt-2 text-slate-400">
          Most users save five hours or more.
        </p>
      </div>

      {/* Comparison card */}
      <div className="max-w-2xl mx-auto mb-12 px-4">
        <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-5 text-center">
          <p className="text-sm text-slate-300">
            See how SiteSafe compares to Envoy, SwipedOn, and paper logs{" "}
            <Link href="/compare" className="text-sky-400 hover:underline transition-colors font-medium">
              side‑by‑side
            </Link>.
          </p>
        </div>
      </div>

      {/* Checklist lead capture */}
      <div className="max-w-2xl mx-auto px-4 pb-16">
        <ChecklistForm />
      </div>

      {/* Developer / API quick mention */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="flex justify-center">
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 bg-white/[0.04] backdrop-blur-md rounded-xl border border-white/5 px-4 py-3 text-sm text-slate-400 hover:text-white transition-colors duration-150"
          >
            <Code className="w-4 h-4 text-sky-400" />
            Developers: REST API available – integrate SiteSafe with your own tools
          </Link>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-white/[0.03] backdrop-blur-sm py-16 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Start your 14‑day free trial
          </h2>
          <p className="mt-3 text-lg text-slate-400">
            No credit card. No sales call. Trial starts instantly.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center mt-8 px-8 py-3 border border-transparent text-base font-medium rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all duration-200 active:scale-[0.98] shadow-lg"
          >
            Try SiteSafe free <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}