// app/about/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About – SiteSafe",
  description:
    "SiteSafe was built by a solo founder who wanted to create something genuinely useful for small businesses. No sales calls, flat pricing, and mandatory safety acknowledgment.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">About SiteSafe</h1>
          <p className="text-lg text-slate-400">Built by one person. Used by many.</p>
        </div>

        {/* Founder story */}
        <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-8">
          <h2 className="text-xl font-semibold text-white mb-4">The story</h2>
          <div className="space-y-4 text-sm leading-relaxed text-slate-200">
            <p>
              I wanted to build something useful. I spent a few weeks researching
              common problems in small to medium businesses—places where a simple
              piece of software could make a real difference. One theme kept
              coming up: tracking visitors.
            </p>
            <p>
              Construction sites, warehouses, offices, clinics—they all use
              paper sign‑in sheets. Those sheets get lost, ruined, or simply
              ignored. When an audit or inspection happens, the log is nowhere
              to be found. And the existing digital options? Expensive,
              per‑building pricing, mandatory sales calls, and safety
              acknowledgments that visitors could skip.
            </p>
            <p>
              So I built SiteSafe. A simple, tablet‑friendly check‑in that
              replaces the clipboard. Each site gets a QR code. Visitors scan
              it, enter their details, and must acknowledge your safety or
              conduct policy before they can proceed—no skipping allowed. You
              get a real‑time dashboard and audit‑ready exports in one click.
            </p>
            <p>
              Everything you see—the product, the website, the emails—is built
              and run by one person. No sales team, no board, no hidden fees.
              Just me, solving a problem I believe in.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6 text-center">
            <h3 className="font-semibold text-white mb-2">No sales calls. Ever.</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              You&apos;ll never be asked to book a demo or speak to a salesperson.
              Sign up, set up, and start checking in visitors.
            </p>
          </div>
          <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6 text-center">
            <h3 className="font-semibold text-white mb-2">Flat, transparent pricing</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              $49/month for unlimited sites and visitors. No per‑site fees, no
              hidden add‑ons. Cancel anytime.
            </p>
          </div>
          <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6 text-center">
            <h3 className="font-semibold text-white mb-2">Compliance first</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mandatory policy acknowledgment means every visitor confirms your
              rules. That&apos;s your proof during an audit.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-slate-900 bg-white hover:bg-slate-100 transition-all duration-200 active:scale-[0.98] shadow-lg"
          >
            Start Free Trial
          </Link>
        </div>
      </div>
    </div>
  );
}