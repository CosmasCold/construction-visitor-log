// app/page.tsx
import Link from "next/link";
import {
  ClipboardCheck,
  BarChart3,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: <ClipboardCheck className="w-6 h-6 text-sky-300" />,
    title: "Sign in visitors",
    text: "Guests enter their name, company, and acknowledge your safety or policy briefing — no paper, no hassle.",
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-sky-300" />,
    title: "Real‑time dashboard",
    text: "See who’s on‑site right now, export logs for audits, and manage multiple locations from one place.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-sky-300" />,
    title: "Stay compliant",
    text: "Digital audit trail, mandatory policy acknowledgments, and instant CSV/Excel/PDF exports keep you inspection‑ready.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen text-white">
      {/* Hero */}
      <div className="max-w-6xl mx-auto px-4 py-24 sm:py-32 sm:px-6 lg:px-8 text-center">
        <div className="bg-white/[0.05] backdrop-blur-xl rounded-3xl border border-white/10 shadow-[0_25px_50px_rgba(0,0,0,0.25)] p-10 sm:p-14">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
            <span className="text-sky-400">SiteSafe</span>
            <span className="block mt-2 text-white">Digital Visitor Log</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-slate-300 leading-relaxed">
            Replace paper sign‑in sheets with a secure, digital check‑in system that works
            for any workplace. Know who’s on site, enforce your safety or conduct policy,
            and stay audit‑ready — without the clipboard.
          </p>
          <p className="mt-4 text-sm text-slate-400">
            14‑day free trial, then $49/mo per organization. Cancel anytime.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all duration-200 active:scale-[0.98] shadow-lg"
            >
              Start Free Trial <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center px-8 py-3 border border-white/10 text-base font-medium rounded-xl text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 active:scale-[0.98]"
            >
              How it works
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

      {/* How it works */}
      <div id="how-it-works" className="max-w-6xl mx-auto px-4 py-24 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white">How SiteSafe works</h2>
          <p className="mt-4 text-lg text-slate-300">Three simple steps to replace your clipboard forever.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="text-center bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.16)] transition-shadow duration-300 p-8"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-sky-500/20 mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-white">{item.title}</h3>
              <p className="mt-2 text-slate-300 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white/[0.03] backdrop-blur-sm py-16 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">Ready to ditch the clipboard?</h2>
          <p className="mt-4 text-lg text-slate-300 leading-relaxed">
            Set up your organization in 2 minutes. Free trial, no credit card required until you decide to stay.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center mt-8 px-8 py-3 border border-transparent text-base font-medium rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all duration-200 active:scale-[0.98] shadow-lg"
          >
            Get started for free <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}