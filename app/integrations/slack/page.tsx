// app/integrations/slack/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  MessageSquare,
  Zap,
  Bell,
  Users,
  Lock,
  Mail,
  Copy,
  Check,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Slack Integration — SiteSafe Visitor Management",
  description:
    "Get real-time visitor check-in alerts, blocklist warnings, and lockdown notifications in Slack. Set up in 2 minutes, no code required.",
  openGraph: {
    title: "SiteSafe Slack Integration — Real-Time Visitor Alerts",
    description: "Instant Slack notifications for check-ins, blocklist hits, and lockdown mode. No code required.",
    images: ["/og-image.png"],
  },
};

const steps = [
  {
    number: "01",
    title: "Create a Slack webhook",
    description:
      "In Slack, go to Settings & administration → Manage apps → Incoming Webhooks. Create a new webhook and choose the channel where you want notifications. Copy the webhook URL.",
    icon: MessageSquare,
    tip: "Pro tip: Create a dedicated #visitors channel so alerts don't clutter your main channels.",
  },
  {
    number: "02",
    title: "Paste it in SiteSafe",
    description:
      "Go to Settings in your SiteSafe dashboard, scroll to Slack Notifications, paste the URL, and click Save. That's it — no code, no developers, no IT ticket.",
    icon: Zap,
    tip: "You can add multiple webhooks if different sites need different channels.",
  },
  {
    number: "03",
    title: "Test it live",
    description:
      "Click Send test message in Settings. You should see a message appear in your Slack channel. Then sign in a visitor — a notification will arrive instantly.",
    icon: CheckCircle2,
    tip: "Test with a real check-in to see the full notification with visitor name, company, and host.",
  },
];

const notificationTypes = [
  {
    icon: Bell,
    title: "Check-in alerts",
    description: "Instant notification when any visitor signs in, with name, company, and host.",
  },
  {
    icon: Lock,
    title: "Blocklist warnings",
    description: "Immediate alert if a flagged visitor attempts to check in at any site.",
  },
  {
    icon: Users,
    title: "Lockdown notifications",
    description: "Alert sent to security team when lockdown mode is activated or deactivated.",
  },
];

export default function SlackIntegration() {
  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200">
      {/* ─── Header ─── */}
      <header className="border-b border-white/5 bg-[#0a0f1c]/90 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-sky-500 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm text-white">SiteSafe</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/integrations" className="text-xs text-slate-500 hover:text-white transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Integrations
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16">
        {/* ─── Hero ─── */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-medium mb-6">
            <MessageSquare className="w-3.5 h-3.5" />
            No-code integration · Setup in 2 minutes
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Get visitor alerts{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
              in Slack — instantly
            </span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Know the moment a visitor checks in, a blocked person attempts entry, or lockdown mode is triggered. 
            No code required. No developers needed.
          </p>
        </div>

        {/* ─── What You Get ─── */}
        <section>
          <h2 className="text-xl font-bold text-white mb-6 text-center">
            What you&apos;ll receive in Slack
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {notificationTypes.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 hover:bg-white/[0.06] transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-sky-400" />
                </div>
                <h3 className="font-semibold text-white text-sm mb-2">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Setup Steps ─── */}
        <section>
          <h2 className="text-xl font-bold text-white mb-8 text-center">
            Set up in 3 steps
          </h2>
          <div className="space-y-6">
            {steps.map((step, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 sm:p-8 hover:bg-white/[0.06] transition-all"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-sky-400">{step.number}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed mb-3">
                      {step.description}
                    </p>
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-sky-500/5 border border-sky-500/10">
                      <Zap className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-sky-300">{step.tip}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Slack Message Preview ─── */}
        <section className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-sky-500/20 rounded-full blur-[80px]" />
          
          <div className="relative">
            <h2 className="text-lg font-bold text-white mb-6 text-center">
              What the notification looks like
            </h2>
            
            {/* Fake Slack message */}
            <div className="max-w-md mx-auto rounded-lg bg-[#1a1d21] border border-white/10 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 bg-[#1a1d21] border-b border-white/5">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs text-slate-400">#visitors</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-sky-500 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">SiteSafe</p>
                    <p className="text-xs text-slate-300 mt-1">
                      <span className="text-emerald-400 font-medium">● New visitor</span> at <strong className="text-white">Headquarters</strong>
                    </p>
                    <div className="mt-2 p-2 rounded bg-white/5 text-xs text-slate-300 space-y-1">
                      <p><span className="text-slate-500">Name:</span> Sarah Johnson</p>
                      <p><span className="text-slate-500">Company:</span> Acme Corp</p>
                      <p><span className="text-slate-500">Host:</span> Marcus Chen</p>
                      <p><span className="text-slate-500">Time:</span> 2:34 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-xs text-slate-500 text-center mt-4">
              Actual notification includes visitor photo and safety briefing status.
            </p>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-sky-500/20 rounded-full blur-[80px]" />
          
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to get Slack alerts?
            </h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              Start your free trial, connect Slack in 2 minutes, and never miss a visitor check-in again.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-lg active:scale-[0.98]"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-slate-300 border border-white/10 hover:bg-white/5 transition-all"
              >
                Try Live Demo
              </Link>
            </div>
            
            <div className="mt-4 flex items-center justify-center gap-6 text-xs text-slate-500">
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
        </div>

        {/* ─── Other Integrations ─── */}
        <div className="text-center">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
            More integrations
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/integrations/google-sheets"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/5 bg-white/[0.03] text-sm text-slate-300 hover:bg-white/[0.06] transition-all"
            >
              Google Sheets
            </Link>
            <Link
              href="/integrations/zapier"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/5 bg-white/[0.03] text-sm text-slate-300 hover:bg-white/[0.06] transition-all"
            >
              Zapier
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/5 bg-white/[0.03] text-sm text-slate-300 hover:bg-white/[0.06] transition-all"
            >
              REST API
            </Link>
          </div>
        </div>

        {/* ─── Support ─── */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-8 text-center">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-5 h-5 text-sky-400" />
          </div>
          <h2 className="text-lg font-bold text-white mb-2">Need help with setup?</h2>
          <p className="text-sm text-slate-400 mb-4 max-w-md mx-auto">
            We can walk you through the Slack webhook setup in under 5 minutes. No sales pitch.
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