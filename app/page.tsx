// app/page.tsx
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
  DollarSign,
  ArrowRight,
} from "lucide-react";

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

const benefits = [
  { icon: ShieldCheck, text: "Replace the clipboard forever" },
  { icon: Users, text: "Know exactly who's on site" },
  { icon: FileDown, text: "Stay compliant without effort" },
  { icon: DollarSign, text: "No‑risk trial, no‑hassle pricing" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen text-white">
      {/* Hero */}
      <div className="max-w-6xl mx-auto px-4 py-24 sm:py-32 sm:px-6 lg:px-8 text-center">
        <div className="bg-white/[0.05] backdrop-blur-xl rounded-3xl border border-white/10 shadow-card-raised p-10 sm:p-14">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            <span className="text-sky-400">SiteSafe</span>
            <span className="block mt-2 text-white">Digital visitor log</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            for construction sites, warehouses, and offices.
          </p>
          <p className="mt-4 text-base text-slate-400 max-w-2xl mx-auto">
            QR check‑in. Real‑time dashboard. Audit‑ready exports. No sales calls.
          </p>
          <p className="mt-3 inline-flex items-center gap-1.5 bg-sky-500/10 border border-sky-400/30 rounded-full px-4 py-1.5 text-sm text-sky-300 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            14‑day free trial – no credit card required
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all duration-200 active:scale-[0.98] shadow-lg"
            >
              Start Free Trial <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center justify-center px-8 py-3 border border-white/10 text-base font-medium rounded-xl text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 active:scale-[0.98]"
            >
              What&apos;s included
            </a>
            <Link
              href="/admin/login"
              className="inline-flex items-center justify-center px-8 py-3 border border-white/10 text-base font-medium rounded-xl text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 active:scale-[0.98]"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>

      {/* Problem section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-24">
        <p className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Paper logs get lost. Safety briefings get skipped. Audits become a scramble.
        </p>
        <p className="mt-4 text-lg text-sky-400 font-semibold">
          SiteSafe fixes that.
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

      {/* Benefits section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="text-center bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-sky-500/20 mb-3">
                <b.icon className="w-5 h-5 text-sky-300" />
              </div>
              <p className="text-sm font-medium text-white">{b.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-white/[0.03] backdrop-blur-sm py-16 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Start your 14‑day free trial
          </h2>
          <p className="mt-3 text-lg text-slate-400">
            No credit card. No sales call.
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