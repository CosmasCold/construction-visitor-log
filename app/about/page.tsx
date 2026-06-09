// app/about/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About – SiteSafe",
  description:
    "SiteSafe was built by a solo founder after watching a friend lose a construction audit over a paper visitor log. No sales calls, flat pricing, and mandatory safety acknowledgment.",
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
              A friend of mine runs a small construction crew. One evening, he called me in a
              panic—he had lost his visitor log the day before an OSHA audit and was trying to
              recreate weeks of entries from memory. He spent four hours scribbling names and
              dates onto a fresh sheet, knowing that if he missed even one, he would be in real
              trouble.
            </p>
            <p>
              I looked into what digital tools existed and found plenty of options. But they all
              had the same three problems: expensive per‑building pricing, mandatory sales calls,
              and safety acknowledgments that visitors could just skip. None of them were built
              for someone like my friend.
            </p>
            <p>
              So I built SiteSafe. It started as a simple tablet‑friendly check‑in for
              construction trailers. A way to scan a QR code, enter your details, and check a
              mandatory safety box before signing in. No paper, no lost records, no last‑minute
              panic before an inspection.
            </p>
            <p>
              Over time, I realized the same problem exists in warehouses, offices,
              clinics—anywhere people walk in and sign a clipboard. So I broadened SiteSafe to
              work for any workplace. It’s still just me building and supporting it.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6 text-center">
            <h3 className="font-semibold text-white mb-2">No sales calls. Ever.</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              You&apos;ll never be asked to book a demo or speak to a salesperson. Sign up, set up, and
              start checking in visitors.
            </p>
          </div>
          <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6 text-center">
            <h3 className="font-semibold text-white mb-2">Flat, transparent pricing</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              $49/month for unlimited sites and visitors. No per‑site fees, no hidden add‑ons.
              Cancel anytime.
            </p>
          </div>
          <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6 text-center">
            <h3 className="font-semibold text-white mb-2">Compliance first</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mandatory policy acknowledgment means every visitor confirms your rules. That&apos;s your
              proof during an audit.
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