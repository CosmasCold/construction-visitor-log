// app/integrations/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { MessageSquare, FileSpreadsheet, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Integrations – SiteSafe",
  description: "Connect SiteSafe with Slack, Google Sheets, Zapier, and more.",
};

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Integrations</h1>
        <p className="text-sm text-slate-400 mb-8">Connect SiteSafe with the tools you already use.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Link href="/integrations/slack" className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6 hover:shadow-card-raised transition-shadow">
            <MessageSquare className="w-6 h-6 text-sky-400 mb-3" />
            <h3 className="text-lg font-semibold text-white">Slack</h3>
            <p className="text-xs text-slate-400 mt-1">Get visitor notifications in Slack channels.</p>
          </Link>
          <Link href="/integrations/google-sheets" className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6 hover:shadow-card-raised transition-shadow">
            <FileSpreadsheet className="w-6 h-6 text-sky-400 mb-3" />
            <h3 className="text-lg font-semibold text-white">Google Sheets</h3>
            <p className="text-xs text-slate-400 mt-1">Auto‑sync visitors to a spreadsheet.</p>
          </Link>
          <Link href="/integrations/zapier" className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6 hover:shadow-card-raised transition-shadow">
            <Zap className="w-6 h-6 text-sky-400 mb-3" />
            <h3 className="text-lg font-semibold text-white">Zapier & Make</h3>
            <p className="text-xs text-slate-400 mt-1">Connect to 5,000+ apps with no code.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}