// app/integrations/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Zap,
  FileSpreadsheet,
  Webhook,
  Code,
  Mail,
  MessageSquare,
  GitBranch,
  Star,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Integrations — SiteSafe Visitor Management",
  description:
    "Connect SiteSafe with Slack, Google Sheets, Zapier, and custom tools via Webhooks and REST API. All included in the flat $49/mo plan.",
  openGraph: {
    title: "SiteSafe Integrations — Slack, Zapier, Google Sheets & API",
    description: "No-code and developer integrations included. Webhooks, REST API, Slack alerts, and more.",
    images: ["/og-image.png"],
  },
};

const integrations = [
  {
    name: "Slack",
    tagline: "Real-time visitor alerts in your team channel",
    description:
      "Get instant Slack notifications when a visitor checks in, checks out, or triggers a blocklist alert. Your security team knows immediately — no manual checking required.",
    link: "/integrations/slack",
    icon: MessageSquare,
    badge: "No-code",
    features: ["Check-in alerts", "Blocklist warnings", "Lockdown notifications", "Custom channel routing"],
  },
  {
    name: "Google Sheets",
    tagline: "Auto-sync visitor logs for custom reporting",
    description:
      "Every check-in, check-out, and pre-screening answer automatically syncs to a Google Sheet. Build custom dashboards, share with stakeholders, or archive for compliance.",
    link: "/integrations/google-sheets",
    icon: FileSpreadsheet,
    badge: "No-code",
    features: ["Real-time sync", "Filtered exports", "Custom columns", "Shareable reports"],
  },
  {
    name: "Zapier",
    tagline: "Connect to 5,000+ apps without writing code",
    description:
      "Trigger workflows from visitor events. Add checked-in visitors to your CRM, send welcome emails, create support tickets, or update project management tools automatically.",
    link: "/integrations/zapier",
    icon: Zap,
    badge: "No-code",
    features: ["5,000+ app connections", "Event-based triggers", "Multi-step workflows", "No developer needed"],
  },
  {
    name: "Webhooks",
    tagline: "Real-time events to any URL",
    description:
      "Send check-in, check-out, blocklist hit, and lockdown events to any endpoint. Build custom workflows, sync with your HR system, or trigger internal alerts.",
    link: "/docs",
    icon: Webhook,
    badge: "Developer",
    features: ["JSON payloads", "Event filtering", "Retry logic", "Signature verification"],
  },
  {
    name: "REST API",
    tagline: "Full programmatic access to your data",
    description:
      "Bearer token authentication, JSON responses, and comprehensive endpoints. Pull visitor logs, manage sites, export data, and build custom dashboards.",
    link: "/docs",
    icon: Code,
    badge: "Developer",
    features: ["Bearer token auth", "CSV/Excel/PDF exports", "Site management", "Visitor CRUD"],
  },
];

export default function IntegrationsPage() {
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
            <Link href="/features" className="text-xs text-slate-500 hover:text-white transition-colors">
              Features
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
            <GitBranch className="w-3.5 h-3.5" />
            All included — no add-ons, no upsells
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Connect SiteSafe to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
              everything you use
            </span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Slack alerts, Google Sheets sync, Zapier workflows, webhooks, and a full REST API. 
            Every integration is included in the flat $49/mo plan.
          </p>
        </div>

        {/* ─── Integration Cards ─── */}
        <div className="space-y-6">
          {integrations.map((item, i) => (
            <div
              key={item.name}
              className="group rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/10 overflow-hidden transition-all duration-300"
            >
              <div className="p-6 sm:p-8">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Left: Icon + Badge */}
                  <div className="flex items-start gap-4 lg:w-64 flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-sky-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-white">{item.name}</h3>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                          item.badge === "No-code" 
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}>
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-sm text-sky-400">{item.tagline}</p>
                    </div>
                  </div>

                  {/* Middle: Description */}
                  <div className="flex-1">
                    <p className="text-sm text-slate-300 leading-relaxed mb-4">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.features.map((feature, j) => (
                        <span
                          key={j}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-xs text-slate-400"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: CTA */}
                  <div className="lg:w-40 flex-shrink-0 flex lg:justify-end">
                    <Link
                      href={item.link}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-all group-hover:border-white/20"
                    >
                      {item.badge === "No-code" ? "Set up" : "View docs"}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ─── No-Code vs Developer ─── */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">No-code integrations</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Slack, Google Sheets, and Zapier work out of the box. No developer needed. 
              Connect your accounts in the dashboard and start receiving data in minutes.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Setup time: under 5 minutes
            </div>
          </div>

          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-8">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
              <Code className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Developer tools</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Webhooks and REST API for custom integrations. Bearer token auth, JSON payloads, 
              comprehensive documentation. Build exactly what your team needs.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Full API docs at /docs
            </div>
          </div>
        </div>

        {/* ─── CTA ─── */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-sky-500/20 rounded-full blur-[80px]" />
          
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              All integrations included
            </h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              No per-integration fees. No enterprise tiers. Every tool above is included in the flat $49/mo plan for up to 20 sites.
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
                href="/docs"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-slate-300 border border-white/10 hover:bg-white/5 transition-all"
              >
                Browse API Docs
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

        {/* ─── Custom Integration ─── */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-8 text-center">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-5 h-5 text-sky-400" />
          </div>
          <h2 className="text-lg font-bold text-white mb-2">
            Need a custom integration?
          </h2>
          <p className="text-sm text-slate-400 mb-4 max-w-md mx-auto">
            We build custom integrations for enterprise teams. Tell us what you need and we&apos;ll scope it.
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
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-xs text-slate-600">
            © 2026 SiteSafe by TheSift. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}