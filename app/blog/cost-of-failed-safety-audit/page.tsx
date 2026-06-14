// app/blog/cost-of-failed-safety-audit/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Real Cost of a Failed Safety Audit – SiteSafe Blog",
  description:
    "OSHA fines are just the start. A failed audit can cost contracts, reputation, and months of work.",
};

export default function BlogPost() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-8 text-white">
        <h1 className="text-2xl font-bold tracking-tight mb-2">
          The Real Cost of a Failed Safety Audit
        </h1>
        <p className="text-sm text-slate-400 mb-6">By the SiteSafe team · 3 min read</p>

        <div className="space-y-4 text-sm leading-relaxed text-slate-200">
          <p>
            Most contractors think of a failed safety audit as a headache. It is much more than that.
            It is a direct hit to your wallet, your reputation, and in the worst cases, your ability
            to work at all.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            The numbers do not lie
          </h2>
          <p>
            OSHA penalties are not trivial. As of 2026, a serious violation can cost over $16,000 —
            per instance. A willful or repeated violation can exceed $165,000. And those are just the
            fines. They do not include the cost of a shutdown, the legal fees, or the insurance
            premium hike that follows.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">The hidden costs</h2>
          <p>Beyond the fines, a failed audit can:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Shut down your site for days or weeks while you fix the findings</li>
            <li>Get you removed from approved contractor lists for future projects</li>
            <li>Damage your relationship with the general contractor or owner</li>
            <li>Trigger a workers comp audit that finds even more gaps</li>
          </ul>
          <p>
            One failed inspection can cascade into months of cleanup and lost revenue.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            The easiest violation to avoid
          </h2>
          <p>
            Among the most common safety audit findings is poor documentation. Missing sign‑in records.
            Incomplete safety briefings. No proof that visitors were told about site hazards. These are
            all paperwork problems — and they are all 100% preventable.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            How to bulletproof your paperwork
          </h2>
          <p>
            The simplest fix is to move your visitor log off paper and onto a tablet. A digital
            check‑in captures every required field, timestamps every entry, and locks the safety
            acknowledgment behind a mandatory checkbox. When the inspector asks, you do not go digging
            through a filing cabinet. You press Export PDF and hand them a clean, complete record.
          </p>

          <p>
            <strong className="text-white">SiteSafe</strong> was built exactly for this — a digital
            visitor log that is as simple as paper, but actually reliable. It takes 30 seconds to set
            up, runs on any tablet or phone, and gives you instant audit‑ready exports.
          </p>

          <p className="mt-6 italic text-slate-300">
            Do not wait for an inspection to find the gaps.{" "}
            <a href="/signup" className="text-sky-400 hover:text-sky-300 transition-colors duration-150">
              Try SiteSafe free for 14 days
            </a>{" "}
            — no credit card needed.
          </p>
        </div>
      </div>
      <p className="text-sm text-slate-400 italic mt-8 pt-6 border-t border-white/10">
  Want to make sure your visitor log survives an audit?{" "}
  <a href="/checklist" className="text-sky-400 hover:underline">
    Grab our free 10‑point checklist
  </a>.
  <p className="text-sm text-slate-400 italic mt-8 pt-6 border-t border-white/10 max-w-2xl mx-auto">
  How much is your paper log really costing you?{" "}
  <a href="/roi-calculator" className="text-sky-400 hover:underline">
    Use our free cost calculator
  </a>.
</p>
</p>
    </div>
  );
}