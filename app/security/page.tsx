// app/security/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, Server, Eye, CreditCard, Cookie } from "lucide-react";

export const metadata: Metadata = {
  title: "Security – SiteSafe",
  description:
    "SiteSafe security practices. SSL encryption, GDPR and LGPD ready, Stripe payments, no third‑party trackers.",
};

const sections = [
  {
    icon: Lock,
    title: "Encryption in transit and at rest",
    description:
      "All data transmitted between your browser and SiteSafe is encrypted using TLS 1.3 (HTTPS). Our database, hosted on Neon, encrypts data at rest and is accessible only through secure, authenticated connections.",
  },
  {
    icon: Server,
    title: "Infrastructure security",
    description:
      "SiteSafe is hosted on Vercel, which provides DDoS protection, a global CDN, and automatic security updates. Our database runs on Neon, a serverless PostgreSQL platform with built‑in failover and daily backups.",
  },
  {
    icon: Eye,
    title: "GDPR and LGPD ready",
    description:
      "We comply with the EU General Data Protection Regulation (GDPR) and Brazil's Lei Geral de Proteção de Dados (LGPD). We only collect the data necessary to provide the service, and you can request deletion of your data at any time by contacting us.",
  },
  {
    icon: CreditCard,
    title: "Payment processing",
    description:
      "All payments are handled by Stripe, a PCI DSS Level 1 certified payment processor. SiteSafe never stores or processes your credit card details directly.",
  },
  {
    icon: Cookie,
    title: "No third‑party trackers",
    description:
      "SiteSafe uses only a single essential cookie for authentication. We do not use advertising cookies, analytics trackers, or any third‑party tracking scripts.",
  },
  {
    icon: ShieldCheck,
    title: "API security",
    description:
      "API access is secured with per‑company Bearer tokens generated from your Settings page. Keys are hashed before storage and can be rotated at any time. Rate limiting is enforced on public endpoints to prevent abuse.",
  },
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Security</h1>
        <p className="text-sm text-slate-400 mb-8">
          We take the security of your visitor data seriously.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {sections.map((section) => (
            <div
              key={section.title}
              className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <section.icon className="w-5 h-5 text-sky-400" />
                <h3 className="font-semibold text-white text-sm">{section.title}</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{section.description}</p>
            </div>
          ))}
        </div>

        <p className="text-sm text-slate-400 mt-8 text-center">
          Questions about security?{" "}
          <a href="mailto:cloudandclipboard@gmail.com" className="text-sky-400 hover:underline transition-colors">
            Contact us
          </a>.
        </p>
      </div>
    </div>
  );
}