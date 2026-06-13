import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What Inspectors Look for in a Visitor Log – SiteSafe Guide",
  description:
    "A complete guide to what OSHA, HSE, and local safety inspectors check when reviewing a visitor log. Includes a free 10‑point checklist you can download.",
};

export default function BlogPost() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-8 text-white">
        <h1 className="text-2xl font-bold tracking-tight mb-2">
          What Inspectors Look for in a Visitor Log
        </h1>
        <p className="text-sm text-slate-400 mb-6">By the SiteSafe team · 6 min read</p>

        <div className="space-y-4 text-sm leading-relaxed text-slate-200">
          <p>
            Whether you’re facing an OSHA audit, a local fire marshal, or an
            internal safety review, your visitor log is one of the first
            things they’ll ask for. Here’s exactly what they check — and how
            to make sure you’re ready.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            1. Is every visitor recorded?
          </h2>
          <p>
            Gaps are the number one red flag. Inspectors will compare the log
            against known visitors (like deliveries or contractors) and look
            for missing entries. A digital system that forces check‑in before
            entry eliminates this problem.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            2. Are sign‑in and sign‑out times accurate?
          </h2>
          <p>
            Hand‑written times are often estimates. Inspectors prefer
            time‑stamped digital records. They’ll also look for anyone who
            signed in but never signed out — a potential safety issue.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            3. Was the safety briefing acknowledged?
          </h2>
          <p>
            This is the big one. If your site requires hard hats, high‑vis
            vests, or specific behavior rules, you must prove that every
            visitor was informed. A mandatory digital acknowledgment (with a
            timestamp) is the gold standard.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            4. Can you quickly filter and export the data?
          </h2>
          <p>
            Inspectors won’t wait for you to search through a binder. They
            expect a filtered report (by date, by site, by host) within
            minutes. CSV, Excel, or PDF exports are ideal.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            5. Is the host clearly identified?
          </h2>
          <p>
            For many sites, every visitor must have a designated host. The
            log should show who they were meeting and ideally notify that
            host automatically.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            6. Are there any pre‑screening questions?
          </h2>
          <p>
            Some inspectors want to see that visitors were asked about recent
            illness, site‑specific hazards, or other safety concerns before
            entering.
          </p>

          <p className="italic text-slate-300 mt-6">
            Get the full 10‑point checklist in a printable PDF.{" "}
            <a
              href="/checklist"
              className="text-sky-400 hover:text-sky-300 transition-colors"
            >
              Download it free here
            </a>.
          </p>
        </div>
      </div>
      <p className="text-sm text-slate-400 italic mt-8 pt-6 border-t border-white/10 max-w-2xl mx-auto">
        Want a system that handles all of this automatically?{" "}
        <a href="/signup" className="text-sky-400 hover:underline">
          Start your free trial of SiteSafe
        </a>.
      </p>
    </div>
  );
}