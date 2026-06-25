// app/terms/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ArrowRight, Mail, FileText, Scale, Calendar, AlertTriangle, CheckCircle2, Lock, Database, CreditCard, User, Ban, RefreshCw, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service — SiteSafe",
  description:
    "Terms of Service for SiteSafe — the smart visitor management platform for multi-site teams.",
};

const sections = [
  {
    id: "acceptance",
    icon: CheckCircle2,
    title: "Acceptance of terms",
    content: (
      <p>
        By accessing or using SiteSafe, you agree to be bound by these Terms of Service. 
        If you do not agree, do not use the service.
      </p>
    ),
  },
  {
    id: "description",
    icon: FileText,
    title: "Description of service",
    content: (
      <p>
        SiteSafe provides a digital visitor management platform that includes QR check-in, 
        safety acknowledgment, visitor logging, badge printing, photo capture, document signing, 
        blocklist management, emergency evacuation lists, lockdown mode, and related features.
      </p>
    ),
  },
  {
    id: "account",
    icon: User,
    title: "Account registration",
    content: (
      <p>
        You must provide accurate and complete information when creating an account. 
        You are responsible for maintaining the confidentiality of your login credentials 
        and for all activities that occur under your account.
      </p>
    ),
  },
  {
    id: "subscription",
    icon: CreditCard,
    title: "Subscription & payment",
    content: (
      <>
        <p className="mb-3">
          SiteSafe is offered on a subscription basis. The current pricing is $49/month (USD) 
          for unlimited sites and visitors. Payments are processed by Stripe.
        </p>
        <p>
          You may cancel at any time; cancellation takes effect at the end of the current billing period. 
          No refunds are provided for partial months.
        </p>
      </>
    ),
  },
  {
    id: "trial",
    icon: Calendar,
    title: "Free trial",
    content: (
      <p>
        New accounts receive a 14-day free trial. No credit card is required to start the trial. 
        At the end of the trial period, you must add a payment method to continue using the service.
      </p>
    ),
  },
  {
    id: "use",
    icon: AlertTriangle,
    title: "Acceptable use",
    content: (
      <p>
        You agree not to use SiteSafe for any unlawful purpose or in violation of any applicable laws 
        or regulations. You are responsible for the accuracy and legality of the data you collect from 
        your visitors, including obtaining any necessary consent.
      </p>
    ),
  },
  {
    id: "security",
    icon: Lock,
    title: "Security features",
    content: (
      <p>
        SiteSafe provides security tools such as blocklists, lockdown mode, and emergency evacuation lists. 
        You agree to use these features responsibly and in compliance with applicable laws. 
        SiteSafe is not liable for any consequences arising from the activation or deactivation of these features.
      </p>
    ),
  },
  {
    id: "ownership",
    icon: Database,
    title: "Data ownership",
    content: (
      <p>
        You retain ownership of all data you collect through SiteSafe, including visitor records, 
        photos, signatures, and pre-screening answers. SiteSafe does not claim ownership of your data. 
        You grant SiteSafe a limited license to host and process your data solely as necessary to provide the service.
      </p>
    ),
  },
  {
    id: "liability",
    icon: Scale,
    title: "Limitation of liability",
    content: (
      <p>
        SiteSafe is provided -as is.- We make no warranties, express or implied, regarding the service&apos;s 
        availability, accuracy, or suitability for a particular purpose. In no event shall SiteSafe be liable 
        for any indirect, incidental, or consequential damages arising from your use of the service.
      </p>
    ),
  },
  {
    id: "law",
    icon: Scale,
    title: "Governing law",
    content: (
      <p>
        These Terms shall be governed by and construed in accordance with the laws of the United States 
        and the State of New York, without regard to its conflict of law provisions. 
        For customers located in Brazil, we also comply with applicable LGPD requirements.
      </p>
    ),
  },
  {
    id: "termination",
    icon: Ban,
    title: "Termination",
    content: (
      <p>
        We reserve the right to suspend or terminate your account for violation of these terms. 
        Upon termination, your data will be deleted within 30 days.
      </p>
    ),
  },
  {
    id: "changes",
    icon: RefreshCw,
    title: "Changes to these terms",
    content: (
      <p>
        We may update these Terms of Service from time to time. We will notify you of material changes 
        via email. Continued use after changes take effect constitutes acceptance.
      </p>
    ),
  },
  {
    id: "contact",
    icon: MessageSquare,
    title: "Contact",
    content: (
      <p>
        Questions about these terms?{" "}
        <a href="mailto:hello@thesift.space" className="text-sky-400 hover:text-sky-300 transition-colors underline underline-offset-2">
          hello@thesift.space
        </a>
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200">
      {/* ─── Header ─── */}
      <header className="border-b border-white/5 bg-[#0a0f1c]/90 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-sky-500 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm text-white">SiteSafe</span>
          </Link>
          <Link
            href="/"
            className="text-xs text-slate-500 hover:text-white transition-colors flex items-center gap-1"
          >
            Back to site <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* ─── Hero ─── */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 mb-4">
            <Scale className="w-6 h-6 text-sky-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Terms of Service
          </h1>
          <p className="text-sm text-slate-500">
            Last updated: June 16, 2026
          </p>
        </div>

        {/* ─── Quick Summary ─── */}
        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-6 mb-12">
          <h2 className="text-sm font-semibold text-white mb-4">At a glance</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "14-day free trial, no credit card required",
              "$49/month flat rate, cancel anytime",
              "You own your data, we just host it",
              "Stripe handles all payment processing",
              "30-day data deletion after cancellation",
              "LGPD compliant for Brazilian customers",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Sections ─── */}
        <div className="space-y-6">
          {sections.map((section, idx) => (
            <section
              key={section.id}
              id={section.id}
              className="rounded-xl border border-white/5 bg-white/[0.03] overflow-hidden scroll-mt-24"
            >
              <div className="bg-white/[0.02] border-b border-white/5 px-6 py-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                  <section.icon className="w-4 h-4 text-sky-400" />
                </div>
                <h2 className="text-sm font-semibold text-white">
                  {idx + 1}. {section.title}
                </h2>
              </div>
              <div className="p-6 text-sm text-slate-300 leading-relaxed">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        {/* ─── Contact CTA ─── */}
        <div className="mt-12 rounded-xl border border-sky-500/20 bg-sky-500/5 p-8 text-center">
          <h2 className="text-sm font-semibold text-white mb-2">Questions about these terms?</h2>
          <p className="text-xs text-slate-400 mb-4 max-w-md mx-auto">
            We&apos;re happy to clarify anything. No legal jargon required — just ask.
          </p>
          <a
            href="mailto:hello@thesift.space"
            className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors"
          >
            <Mail className="w-4 h-4" /> hello@thesift.space
          </a>
        </div>
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-white/5 py-8 bg-[#070b14]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs text-slate-600">
            © 2026 SiteSafe by TheSift. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}