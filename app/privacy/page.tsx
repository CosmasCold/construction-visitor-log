// app/privacy/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ArrowRight, Mail, Lock, Database, Eye, Trash2, ExternalLink, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — SiteSafe",
  description:
    "How SiteSafe collects, uses, and protects your data. GDPR, LGPD, and SOC 2 compliant visitor management.",
};

const sections = [
  {
    id: "collect",
    icon: Eye,
    title: "What we collect",
    content: (
      <>
        <p className="mb-4">
          When you create a SiteSafe account, we collect your name, email address, company name, and payment details. 
          Payment processing is handled entirely by Stripe — we never see or store your full card number.
        </p>
        <p className="mb-4">
          When visitors check in at your sites, we store the data you choose to collect: full name, company, phone (optional), 
          email (optional), host name, safety acknowledgment, pre-screening answers, photos, and digital signatures.
        </p>
        <div className="space-y-3">
          <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
            <h4 className="text-sm font-medium text-white mb-1 flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-sky-400" /> Visitor Photos
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Stored on Vercel Blob Storage. Deleted when the visitor record is deleted. Never shared, sold, or used for any purpose other than identification and badge printing.
            </p>
          </div>
          <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
            <h4 className="text-sm font-medium text-white mb-1 flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-sky-400" /> Digital Signatures
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Stored with the visitor record. Deleted alongside the record when removed. Not used for any other purpose.
            </p>
          </div>
          <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
            <h4 className="text-sm font-medium text-white mb-1 flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-sky-400" /> Blocklist Entries
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Names, emails, or phone numbers added to your watchlist. Only used to compare against new check-ins. Never shared or sold.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "use",
    icon: Lock,
    title: "How we use your data",
    content: (
      <p>
        We use your account information to provide the SiteSafe service: creating and managing your account, 
        sending service-related emails, and processing payments. We use visitor data solely to power the 
        check-in and visitor management features you enable. We do not mine, sell, or advertise based on your data. 
        Period.
      </p>
    ),
  },
  {
    id: "security",
    icon: Database,
    title: "Data storage & security",
    content: (
      <>
        <p className="mb-4">
          All data is stored on secure servers provided by Vercel and Neon (PostgreSQL). 
          Data is encrypted in transit using SSL/TLS and at rest using AES-256.
        </p>
        <div className="flex flex-wrap gap-2">
          {["SSL/TLS Encryption", "AES-256 at Rest", "Content Security Policy", "HSTS", "SOC 2 Type II Infrastructure"].map((tag) => (
            <span key={tag} className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-medium text-slate-400">
              {tag}
            </span>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "retention",
    icon: Trash2,
    title: "Data retention & deletion",
    content: (
      <p>
        Visitor records are retained for as long as your account is active. You can delete individual visitor 
        records or entire sites at any time from your dashboard. When a visitor record is deleted, all associated 
        data — including photos and signatures — is permanently removed. If you cancel your account, all data 
        is deleted within 30 days.
      </p>
    ),
  },
  {
    id: "third-party",
    icon: ExternalLink,
    title: "Third-party services",
    content: (
      <>
        <p className="mb-4">
          We use the following services to operate SiteSafe. Each has its own privacy policy:
        </p>
        <div className="space-y-2">
          {[
            { name: "Stripe", purpose: "Payment processing", url: "https://stripe.com/privacy" },
            { name: "Brevo", purpose: "Transactional email", url: "https://www.brevo.com/legal/privacypolicy/" },
            { name: "Vercel", purpose: "Hosting and analytics", url: "https://vercel.com/legal/privacy-policy" },
            { name: "Neon", purpose: "PostgreSQL database hosting", url: "https://neon.tech/privacy" },
          ].map((service) => (
            <a
              key={service.name}
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all group"
            >
              <div>
                <p className="text-sm font-medium text-white">{service.name}</p>
                <p className="text-xs text-slate-500">{service.purpose}</p>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 transition-colors" />
            </a>
          ))}
        </div>
        <p className="mt-4 text-xs text-slate-500">
          We do not use third-party advertising trackers or analytics that follow users across the web.
        </p>
      </>
    ),
  },
  {
    id: "rights",
    icon: ShieldCheck,
    title: "Your rights",
    content: (
      <>
        <p className="mb-4">
          Depending on your jurisdiction, you may have the right to access, correct, or delete your personal data, 
          or to object to or restrict certain processing.
        </p>
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
          <p className="text-xs text-emerald-300 leading-relaxed">
            <strong>LGPD (Brazil):</strong> If you are located in Brazil, you have additional rights under the 
            Lei Geral de Proteção de Dados. We respond to all requests in compliance with LGPD guidelines.
          </p>
        </div>
        <p className="mt-4">
          To exercise your rights, contact us at{" "}
          <a href="mailto:hello@thesift.space" className="text-sky-400 hover:underline">
            hello@thesift.space
          </a>. We respond within 30 days.
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
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
            <Lock className="w-6 h-6 text-sky-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-500">
            Last updated: June 16, 2026
          </p>
        </div>

        {/* ─── Quick Trust Bar ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
          {[
            { label: "Encryption", value: "AES-256", icon: Lock },
            { label: "Compliance", value: "LGPD Ready", icon: ShieldCheck },
            { label: "Infrastructure", value: "SOC 2 Type II", icon: Database },
            { label: "Response Time", value: "Within 30 Days", icon: Mail },
          ].map((item, i) => (
            <div key={i} className="rounded-xl border border-white/5 bg-white/[0.03] p-4 text-center">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mx-auto mb-2">
                <item.icon className="w-4 h-4 text-sky-400" />
              </div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium mb-1">{item.label}</p>
              <p className="text-xs font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div>

        {/* ─── Sections ─── */}
        <div className="space-y-8">
          {sections.map((section, idx) => (
            <section
              key={section.id}
              id={section.id}
              className="rounded-xl border border-white/5 bg-white/[0.03] overflow-hidden"
            >
              <div className="bg-white/[0.02] border-b border-white/5 px-6 py-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center">
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

          {/* Changes & Contact */}
          <section className="rounded-xl border border-white/5 bg-white/[0.03] overflow-hidden">
            <div className="bg-white/[0.02] border-b border-white/5 px-6 py-4">
              <h2 className="text-sm font-semibold text-white">7. Changes to this policy</h2>
            </div>
            <div className="p-6 text-sm text-slate-300 leading-relaxed">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes 
                by email or via a notice on our website. Continued use of SiteSafe after changes take effect 
                constitutes acceptance of the updated policy.
              </p>
            </div>
          </section>

          <section className="rounded-xl border border-sky-500/20 bg-sky-500/5 p-8 text-center">
            <h2 className="text-sm font-semibold text-white mb-2">Questions about your data?</h2>
            <p className="text-xs text-slate-400 mb-4 max-w-md mx-auto">
              We&apos;re transparent about how we handle your information. If anything here is unclear, just ask.
            </p>
            <a
              href="mailto:hello@thesift.space"
              className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors"
            >
              <Mail className="w-4 h-4" /> hello@thesift.space
            </a>
          </section>
        </div>
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-white/5 py-8 bg-[#070b14]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs text-slate-600">
            © 2026 SiteSafe by TheSift. Your data belongs to you.
          </p>
        </div>
      </footer>
    </div>
  );
}