// app/about/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About – SiteSafe",
  description:
    "SiteSafe is built by a small, independent team obsessed with making visitor management simple, flat‑priced, and audit‑ready for every workplace.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            About SiteSafe
          </h1>
          <p className="text-lg text-slate-400">
            We believe visitor management should be simple, affordable, and actually
            help you pass an audit.
          </p>
        </div>

        {/* Story */}
        <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-8">
          <h2 className="text-xl font-semibold text-white mb-4">Our story</h2>
          <div className="space-y-4 text-sm leading-relaxed text-slate-200">
            <p>
              We spent months talking to facility managers, site supervisors, and
              office administrators. One problem kept coming up: visitor logs were
              still paper‑based, and when an audit arrived, the log was nowhere to
              be found.
            </p>
            <p>
              The existing digital tools were either built for huge enterprises
              (with huge price tags and mandatory demos) or lacked the
              compliance features that real workplaces need—like a non‑skippable
              safety acknowledgment.
            </p>
            <p>
              So we built SiteSafe: a digital check‑in that replaces the clipboard.
              Each site gets a unique QR code. Visitors scan it, fill in their
              details, and <strong>must</strong> confirm they’ve read your safety
              rules—no skipping. You get a real‑time dashboard, instant audit
              exports, and a system that actually helps you stay compliant.
            </p>
            <p>
              We’re a small, independent team. No outside investors, no sales
              floor, no hidden agenda. That means we can keep our pricing flat,
              our product focused, and our support genuinely helpful.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6 text-center">
            <h3 className="font-semibold text-white mb-2">No sales calls. Ever.</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              You’ll never be asked to book a demo or speak to a salesperson.
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
              rules. That’s your proof during an audit.
            </p>
          </div>
        </div>

        {/* CTA */}
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