// app/faq/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | SiteSafe",
  description:
    "Common questions about SiteSafe — pricing, features, security, and more. $49/month for up to 20 sites, 14‑day free trial, no credit card.",
};

const faqs = [
  {
    question: "What is SiteSafe?",
    answer:
      "SiteSafe is a modern visitor management system designed for mid‑sized workplaces with multiple locations. It replaces paper logs with QR code check‑in, mandatory safety briefings, real‑time dashboards, and audit‑ready exports — all for a flat $49/month.",
  },
  {
    question: "How does the 14‑day free trial work?",
    answer:
      "When you sign up, you get full access to all features for 14 days — no credit card required. At the end of the trial, you can choose to subscribe or your account will simply expire. No automatic charges.",
  },
  {
    question: "What happens when the trial ends?",
    answer:
      "You’ll receive a notification that your trial has ended. To continue using SiteSafe, you can add a payment method in your account settings. All your data is retained.",
  },
  {
    question: "Is there a limit on the number of visitors?",
    answer:
      "No. The $49/month plan includes unlimited visitors across all your sites. The only limit is the number of sites — up to 20 sites per account.",
  },
  {
    question: "Can I use SiteSafe on a single site?",
    answer:
      "Absolutely. Many customers use SiteSafe for just one location. The flat pricing still applies — $49/month for up to 20 sites, whether you have 1 or 20.",
  },
  {
    question: "What features are included?",
    answer:
      "Every feature we offer is included: QR check‑in, mandatory safety acknowledgment, photo capture, pre‑screening questions, watchlist/blocklist, real‑time dashboard, host notifications, badge printing, lockdown mode, emergency evacuation list, audit exports (CSV/Excel/PDF), analytics, REST API, webhooks, and document signing. No add‑ons or hidden fees.",
  },
  {
    question: "Do I need special hardware?",
    answer:
      "No. Visitors scan a QR code with their phone to check in. You can also print QR codes for each site if you prefer a physical sign. No iPad or kiosk required.",
  },
  {
    question: "Is SiteSafe secure?",
    answer:
      "Yes. All data is encrypted in transit and at rest. We use SSL encryption, and our authentication system is built on industry‑standard practices. SiteSafe is GDPR/LGPD ready. We do not sell or share your data.",
  },
  {
    question: "Can I export my data?",
    answer:
      "Yes. You can export visitor logs as CSV, Excel, or PDF at any time. Exports can be filtered by date, host, or company — ideal for audits and compliance.",
  },
  {
    question: "What is the emergency evacuation list?",
    answer:
      "It’s a one‑click PDF that lists every person currently signed in across all your sites. In an emergency, you know exactly who is on site — without searching through paper logs.",
  },
  {
    question: "Does SiteSafe offer a REST API?",
    answer:
      "Yes. We provide a full REST API and webhooks so you can integrate SiteSafe with your own tools like Slack, HR systems, or custom dashboards. Documentation is available at /docs.",
  },
  {
    question: "How do I get support?",
    answer:
      "Support is available via email at hello@thesift.space. We typically respond within 24 hours. There’s no sales team — just direct help from the people who build the product.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. You can cancel your subscription at any time from your account settings. There are no long‑term contracts or cancellation fees.",
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-12 text-white">
        {/* Header */}
        <div className="text-center space-y-4">
          <HelpCircle className="w-12 h-12 text-sky-400 mx-auto" />
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Everything you need to know about SiteSafe — from pricing to
            security. If you don’t find your answer here,{" "}
            <a
              href="mailto:hello@thesift.space"
              className="text-sky-400 hover:underline"
            >
              reach out to us
            </a>
            .
          </p>
        </div>

        {/* FAQ items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="glass-card p-5 space-y-2">
              <h2 className="font-semibold text-white text-sm">{faq.question}</h2>
              <p className="text-xs text-slate-400 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-xl px-8 py-3 text-sm transition-all shadow-lg cta-pulse"
          >
            Start your free trial <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-slate-500">
            Still have questions?{" "}
            <a
              href="mailto:hello@thesift.space"
              className="text-sky-400 hover:underline"
            >
              Email us
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}