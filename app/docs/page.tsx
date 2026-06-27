// app/docs/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  ArrowRight,
  Code,
  Terminal,
  Key,
  Globe,
  AlertTriangle,
  Mail,
  Copy,
  CheckCircle2,
  Zap,
  FileText,
  Lock,
  ChevronRight,
} from "lucide-react";
import CodeBlock from "./CodeBlock";

export const metadata: Metadata = {
  title: "API Documentation — SiteSafe REST API",
  description:
    "Integrate SiteSafe with your own tools using our REST API. Bearer token auth, JSON responses, webhooks. Manage sites, visitors, and exports programmatically.",
  openGraph: {
    title: "SiteSafe API Documentation",
    description: "REST API for visitor management. Bearer token auth, webhooks, JSON responses.",
    images: ["/og-image.png"],
  },
};

const endpoints = [
  {
    method: "GET",
    methodColor: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    path: "/sites",
    description: "Returns all sites belonging to your company.",
    example: `curl -H "Authorization: Bearer YOUR_KEY" \\
     https://sitesafe.thesift.space/api/v1/sites`,
    response: `[
  {
    "id": "cmp_abc123",
    "name": "Headquarters",
    "slug": "headquarters",
    "address": "123 Main St",
    "safetyBriefingText": "Please sign in..."
  }
]`,
  },
  {
    method: "GET",
    methodColor: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    path: "/visitors",
    description: "Returns visitor logs, optionally filtered by site or date range.",
    params: [
      { name: "siteId", desc: "Filter by site ID" },
      { name: "from", desc: "Start date (YYYY-MM-DD)" },
      { name: "to", desc: "End date (YYYY-MM-DD)" },
    ],
    example: `curl -H "Authorization: Bearer YOUR_KEY" \\
     "https://sitesafe.thesift.space/api/v1/visitors?from=2026-06-01&to=2026-06-30"`,
  },
  {
    method: "POST",
    methodColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    path: "/visitors",
    description: "Creates a new visitor record (simulates a check-in). The site must belong to your company.",
    body: [
      { name: "fullName", required: true },
      { name: "company", required: true },
      { name: "siteId", required: true },
      { name: "phone", required: false },
      { name: "email", required: false },
      { name: "hostName", required: false },
      { name: "safetyAcknowledged", required: false, type: "boolean" },
    ],
    example: `curl -X POST \\
  -H "Authorization: Bearer YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"fullName":"Jane Doe","company":"Acme","siteId":"cmp_abc123"}' \\
  https://sitesafe.thesift.space/api/v1/visitors`,
  },
  {
    method: "POST",
    methodColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    path: "/visitors/{visitorId}/signout",
    description: "Signs out an existing visitor. The visitor must belong to your company.",
    example: `curl -X POST \\
  -H "Authorization: Bearer YOUR_KEY" \\
  https://sitesafe.thesift.space/api/v1/visitors/cmp_abc123/signout`,
  },
];

const errors = [
  { code: "401", label: "Unauthorized", desc: "Missing or invalid API key" },
  { code: "400", label: "Bad Request", desc: "Missing required fields" },
  { code: "404", label: "Not Found", desc: "Resource not found or access denied" },
  { code: "429", label: "Rate Limited", desc: "Rate limit exceeded (future)" },
];

export default function DocsPage() {
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
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-lg text-slate-900 bg-white hover:bg-slate-100 transition-all active:scale-95"
            >
              Get API key
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16">
        {/* ─── Hero ─── */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 mb-4">
            <Code className="w-6 h-6 text-sky-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            API Documentation
          </h1>
          <p className="text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            Integrate SiteSafe with your own tools using our REST API. Bearer token authentication, 
            JSON responses, and webhooks for real-time events.
          </p>
        </div>

        {/* ─── Quick Start ─── */}
        <section className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-sky-500/20 rounded-full blur-[80px]" />
          
          <div className="relative">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-sky-400" />
              Quick Start
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                  <Key className="w-4 h-4 text-sky-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">1. Get your API key</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Generate your company&apos;s API key in the{" "}
                    <Link href="/admin/login" className="text-sky-400 hover:text-sky-300 transition-colors">
                      Settings
                    </Link>{" "}
                    page of your SiteSafe dashboard. Keys are hashed and scoped to your account.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-4 h-4 text-sky-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">2. Authenticate</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-2">
                    Include your key in the Authorization header:
                  </p>
                  <CodeBlock code={`Authorization: Bearer ss_your_api_key_here`} />
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-4 h-4 text-sky-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">3. Base URL</h3>
                  <CodeBlock code={`https://sitesafe.thesift.space/api/v1`} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Endpoints ─── */}
        <section>
          <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-sky-400" />
            Endpoints
          </h2>

          <div className="space-y-8">
            {endpoints.map((ep, i) => (
              <div
                key={i}
                id={ep.path.replace(/\//g, "-").replace(/{|}/g, "")}
                className="rounded-2xl border border-white/5 bg-white/[0.03] overflow-hidden scroll-mt-24"
              >
                <div className="bg-white/[0.02] border-b border-white/5 px-6 py-4 flex flex-wrap items-center gap-3">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-lg border text-xs font-mono font-bold uppercase ${ep.methodColor}`}>
                    {ep.method}
                  </span>
                  <code className="text-sm text-white font-mono">{ep.path}</code>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-sm text-slate-300 leading-relaxed">{ep.description}</p>

                  {ep.params && (
                    <div>
                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Query Parameters</h4>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {ep.params.map((p, j) => (
                          <div key={j} className="flex items-center gap-2 text-xs">
                            <code className="px-1.5 py-0.5 rounded bg-white/5 text-sky-400 font-mono">{p.name}</code>
                            <span className="text-slate-400">{p.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {ep.body && (
                    <div>
                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Body Fields</h4>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {ep.body.map((b, j) => (
                          <div key={j} className="flex items-center gap-2 text-xs">
                            <code className={`px-1.5 py-0.5 rounded font-mono ${b.required ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-slate-400'}`}>
                              {b.name}
                            </code>
                            <span className="text-slate-500">{b.required ? "required" : "optional"}{b.type ? ` · ${b.type}` : ""}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Example Request</h4>
                    <CodeBlock code={ep.example} />
                  </div>

                  {ep.response && (
                    <details className="group">
                      <summary className="flex items-center gap-2 text-xs text-sky-400 cursor-pointer hover:text-sky-300 transition-colors mb-2">
                        <ChevronRight className="w-3.5 h-3.5 group-open:rotate-90 transition-transform" />
                        Example Response
                      </summary>
                      <CodeBlock code={ep.response} />
                    </details>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Errors ─── */}
        <section>
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            Errors
          </h2>
          <p className="text-sm text-slate-400 mb-4">
            The API returns standard HTTP status codes. A JSON body with an <code className="px-1.5 py-0.5 rounded bg-white/5 text-slate-300 font-mono text-xs">error</code> field is included for failures.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {errors.map((err, i) => (
              <div key={i} className="rounded-xl border border-white/5 bg-white/[0.03] p-4 flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 text-xs font-bold flex-shrink-0">
                  {err.code}
                </span>
                <div>
                  <p className="text-sm font-medium text-white">{err.label}</p>
                  <p className="text-xs text-slate-400">{err.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Webhooks Teaser ─── */}
        <section className="rounded-2xl border border-white/5 bg-white/[0.03] p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white mb-2">Webhooks</h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Send real-time events (check-in, check-out, blocklist hits) to any URL. 
                Configure webhook endpoints in your dashboard Settings.
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors"
              >
                Get API access <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Support ─── */}
        <section className="rounded-2xl border border-white/5 bg-white/[0.03] p-8 text-center">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-5 h-5 text-sky-400" />
          </div>
          <h2 className="text-lg font-bold text-white mb-2">Need help?</h2>
          <p className="text-sm text-slate-400 mb-4 max-w-md mx-auto">
            Questions about authentication, rate limits, or custom integrations? 
            We typically respond within 24 hours.
          </p>
          <a
            href="mailto:hello@thesift.space"
            className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors"
          >
            <Mail className="w-4 h-4" />
            hello@thesift.space
          </a>
        </section>
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
