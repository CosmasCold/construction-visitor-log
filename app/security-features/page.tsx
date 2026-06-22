import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  AlertTriangle,
  ShieldAlert,
  FileText,
  ArrowRight,
} from "lucide-react";
import SecurityVideo from "./SecurityVideo";

export const metadata: Metadata = {
  title: "Security Features – SiteSafe",
  description:
    "Emergency evacuation lists, watchlist screening, lockdown mode, and digital document signing — all included in the flat $49/month plan. No sales calls, no credit card required.",
};

const features = [
  {
    icon: AlertTriangle,
    title: "Emergency Evacuation List",
    description:
      "A one‑click PDF with photos, host names, and sign‑in times for every person currently on site. Built for fire drills, real emergencies, and proving compliance to inspectors. You’ll never have to guess who’s inside during a crisis.",
    bullet: "One‑click · Photos included · PDF download",
  },
  {
    icon: ShieldCheck,
    title: "Watchlist / Blocklist",
    description:
      "Flag unwanted visitors by name, email, or phone number. If a flagged person tries to check in, they are stopped immediately — and you receive an instant alert via email, Slack, or webhook. No one slips through.",
    bullet: "Instant alerts · Stops check‑in · Multiple flag types",
  },
  {
    icon: ShieldAlert,
    title: "Lockdown Mode",
    description:
      "Block all new check‑ins with a single toggle. Security knows exactly who was on site when lockdown started — active visitors stay visible while new entries are denied. One click to end it and resume normal operations.",
    bullet: "One‑click activation · Full visibility · No data loss",
  },
  {
    icon: FileText,
    title: "Digital Document Signing",
    description:
      "Require visitors to sign NDAs, waivers, or safety policies right on the check‑in screen. Signatures are stored with the visitor record and included in audit exports — no paper, no scanning, no lost forms.",
    bullet: "NDAs & waivers · Stored for audit · No paper",
  },
];

export default function SecurityFeaturesPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
          Security features that go beyond sign‑in
        </h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-4">
          Most visitor logs can’t answer a simple question:{" "}
          <em>“Who is on site right now — and what can you do about it?”</em>
        </p>
        <p className="text-sm text-slate-400 max-w-xl mx-auto mb-8">
          SiteSafe answers that question and gives you the tools to act on it —
          whether it’s a drill, a real emergency, or an unwanted visitor.
        </p>

        {/* Video */}
        <div className="mb-12">
          <SecurityVideo />
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white/[0.06] backdrop-blur-lg rounded-2xl border border-white/10 shadow-card-raised p-6 text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center mb-3">
                <f.icon className="w-5 h-5 text-sky-300" />
              </div>
              <h3 className="font-semibold text-white text-sm mb-1">
                {f.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                {f.description}
              </p>
              <span className="text-xs text-sky-300">{f.bullet}</span>
            </div>
          ))}
        </div>

        {/* Pricing & CTA */}
        <div className="bg-white/[0.06] backdrop-blur-lg rounded-2xl border border-white/10 p-6 max-w-md mx-auto">
          <p className="text-sm text-slate-200 mb-2">
            All security features are included in the{" "}
            <strong className="text-white">$49/month</strong> plan.
          </p>
          <p className="text-xs text-slate-400 mb-4">
            Up to 20 sites · Unlimited visitors · No per‑site fees · No sales
            calls
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all duration-200 active:scale-[0.98] shadow-lg w-full"
          >
            Start free trial <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <p className="text-xs text-slate-400 mt-3">
            No credit card required · 14‑day trial
          </p>
        </div>

        <p className="text-xs text-slate-400 mt-8">
          Still evaluating?{" "}
          <Link
            href="/audit"
            className="text-sky-400 hover:underline transition-colors"
          >
            Take our free 10‑point visitor log self‑audit
          </Link>{" "}
          — no sign‑up needed.
        </p>
      </div>
    </div>
  );
}