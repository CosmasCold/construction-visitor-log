// app/integrations/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  Zap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Integrations – SiteSafe",
  description:
    "Connect SiteSafe with Slack, Google Sheets, Zapier, and custom tools via Webhooks and REST API.",
};

const integrations = [
  {
    name: "Slack",
    description:
      "Get real‑time notifications in Slack when a visitor checks in or when a blocklist alert fires.",
    link: "/integrations/slack",
  },
  {
    name: "Google Sheets",
    description:
      "Automatically sync visitor logs to a Google Sheet for custom reporting and sharing.",
    link: "/integrations/google-sheets",
  },
  {
    name: "Zapier",
    description:
      "Connect SiteSafe to thousands of apps. Create custom workflows without code.",
    link: "/integrations/zapier",
  },
  {
    name: "Webhooks",
    description:
      "Send real‑time events (check‑in, check‑out, blocklist hit, lockdown toggle) to any URL. Integrate with your own backend, HR tools, or anything that accepts a POST.",
    link: "/docs",
  },
  {
    name: "REST API",
    description:
      "Full REST API with Bearer token authentication. Build custom dashboards, pull visitor logs, and manage your account programmatically.",
    link: "/docs",
  },
];

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            Integrations
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Connect SiteSafe to the tools you already use. No complex setup —
            everything is included in your plan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {integrations.map((item) => (
            <div
              key={item.name}
              className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6 flex gap-4 items-start hover:bg-white/[0.08] transition-all duration-300"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-sky-300" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white text-sm">{item.name}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {item.description}
                </p>
                {item.link && (
                  <Link
                    href={item.link}
                    className="inline-flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 mt-2 transition-colors"
                  >
                    Learn more <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-slate-400">
            Need a custom integration?{" "}
            <a
              href="mailto:hello@thesift.space"
              className="text-sky-400 hover:underline transition-colors font-medium"
            >
              Contact us
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}