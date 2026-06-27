// app/security/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Server,
  Eye,
  CreditCard,
  Cookie,
  ArrowRight,
  CheckCircle2,
  Mail,
  BadgeCheck,
  AlertTriangle,
  Zap,
  Globe,
  KeyRound,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Security & Compliance — SiteSafe Visitor Management",
  description:
    "SiteSafe security: TLS 1.3 encryption, SOC 2 Type II infrastructure, GDPR/LGPD ready, PCI DSS compliant payments via Stripe, hashed API keys, no third-party trackers.",
  openGraph: {
    title: "SiteSafe Security & Compliance",
    description: "Enterprise-grade security for visitor data. Encryption, compliance, and zero tracking.",
    images: ["/og-image.png"],
  },
};

const sections = [
  {
    icon: Lock,
    title: "Encryption in transit and at rest",
    description:
      "All data transmitted between your browser and SiteSafe is encrypted using TLS 1.3 (HTTPS). Our database, hosted on Neon, encrypts data at rest and is accessible only through secure, authenticated connections.",
    badge: "AES-256",
  },
  {
    icon: Server,
    title: "Infrastructure security",
    description:
      "SiteSafe is hosted on Vercel, which provides DDoS protection, a global CDN, and automatic security updates. Our database runs on Neon, a serverless PostgreSQL platform with built-in failover and daily backups.",
    badge: "SOC 2 Type II",
  },
  {
    icon: Eye,
    title: "GDPR and LGPD ready",
    description:
      "We comply with the EU General Data Protection Regulation (GDPR) and Brazil's Lei Geral de Proteção de Dados (LGPD). We only collect the data necessary to provide the service, and you can request deletion of your data at any time.",
    badge: "Compliant",
  },
  {
    icon: CreditCard,
    title: "Payment processing",
    description:
      "All payments are handled by Stripe, a PCI DSS Level 1 certified payment processor. SiteSafe never stores or processes your credit card details directly.",
    badge: "PCI DSS Level 1",
  },
  {
    icon: Cookie,
    title: "No third-party trackers",
    description:
      "SiteSafe uses only essential cookies for authentication. We do not use advertising cookies, analytics trackers, or any third-party tracking scripts that follow your visitors across the web.",
    badge: "Privacy First",
  },
  {
    icon: KeyRound,
    title: "API security",
    description:
      "API access is secured with per-company Bearer tokens generated from your Settings page. Keys are hashed before storage and can be rotated at any time. Rate limiting is enforced on public endpoints to prevent abuse.",
    badge: "Bearer Auth",
  },
];

const trustBadges = [
  { label: "TLS 1.3", desc: "Latest encryption standard" },
  { label: "SOC 2 Type II", desc: "Infrastructure compliance" },
  { label: "PCI DSS", desc: "Payment security" },
  { label: "GDPR Ready", desc: "EU data protection" },
  { label: "LGPD Ready", desc: "Brazil data protection" },
  { label: "Daily Backups", desc: "Automatic disaster recovery" },
];

export default function SecurityPage() {
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16">
        {/* ─── Hero ─── */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-4">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Security &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">
              Compliance
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            We take the security of your visitor data seriously. Enterprise-grade protection 
            without enterprise complexity.
          </p>
        </div>

        {/* ─── Trust Badges ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {trustBadges.map((badge, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/5 bg-white/[0.03] p-4 text-center hover:bg-white/[0.06] transition-all"
            >
              <p className="text-sm font-bold text-white mb-0.5">{badge.label}</p>
              <p className="text-[11px] text-slate-500">{badge.desc}</p>
            </div>
          ))}
        </div>

        {/* ─── Security Sections ─── */}
        <div className="grid sm:grid-cols-2 gap-5">
          {sections.map((section, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-white/5 bg-white/[0.03] p-6 hover:bg-white/[0.06] hover:border-white/10 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-emerald-500/10 transition-colors">
                  <section.icon className="w-5 h-5 text-slate-300 group-hover:text-emerald-400 transition-colors" />
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-medium text-emerald-400 uppercase tracking-wider">
                  {section.badge}
                </span>
              </div>
              <h3 className="font-semibold text-white text-sm mb-2">{section.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{section.description}</p>
            </div>
          ))}
        </div>

        {/* ─── Data Handling ─── */}
        <section className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-emerald-500/10 rounded-full blur-[80px]" />
          
          <div className="relative">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              What we don&apos;t do
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "We don't sell your visitor data to third parties",
                "We don't use behavioral advertising trackers",
                "We don't store credit card information (Stripe handles this)",
                "We don't access your data without explicit permission",
                "We don't train AI models on your visitor records",
                "We don't share data with law enforcement without legal obligation",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-sky-500/20 rounded-full blur-[80px]" />
          
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Security that doesn&apos;t slow you down
            </h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              Start your free trial and see how enterprise-grade security feels when it&apos;s built into every feature by default.
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
                href="/audit"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-xl text-slate-300 border border-white/10 hover:bg-white/5 transition-all"
              >
                Run Security Audit
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

        {/* ─── Contact ─── */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-8 text-center">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-5 h-5 text-sky-400" />
          </div>
          <h2 className="text-lg font-bold text-white mb-2">Security questions?</h2>
          <p className="text-sm text-slate-400 mb-4 max-w-md mx-auto">
            We can provide a security questionnaire, compliance documentation, or a call with our team. No sales pitch.
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