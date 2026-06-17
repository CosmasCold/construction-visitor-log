import type { Metadata } from "next";
import Link from "next/link";
import BlogPostJsonLd from "@/components/BlogPostJsonLd";

export const metadata: Metadata = {
  title: "What Inspectors Look for in a Visitor Log – SiteSafe Guide",
  description:
    "From mandatory safety acknowledgments to time‑stamped records, here's exactly what OSHA and safety inspectors check when they review your visitor log. Includes a free 10‑point self‑audit.",
};

export default function BlogPost() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-8 text-white">
        <h1 className="text-2xl font-bold tracking-tight mb-2">
          What Inspectors Look for in a Visitor Log
        </h1>
        <p className="text-sm text-slate-400 mb-6">By the SiteSafe team · 7 min read</p>

        <div className="space-y-4 text-sm leading-relaxed text-slate-200">
          <p>
            Whether you’re facing an OSHA audit, a local fire marshal, or an
            internal safety review, your visitor log is one of the first
            documents they’ll examine. A complete, well‑structured log can
            make the difference between a quick inspection and a costly
            citation. Here’s exactly what they check — and how to make sure
            your log is ready.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            1. Is every visitor recorded?
          </h2>
          <p>
            <strong>Yes — inspectors look for complete records.</strong> Gaps
            are the number one red flag. They will compare the log against
            known visitors (deliveries, contractors, scheduled guests) and
            note any missing entries. A digital system that requires all
            fields before a visitor can complete check‑in eliminates this
            problem entirely.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            2. Are sign‑in and sign‑out times accurate?
          </h2>
          <p>
            <strong>Inspectors expect precise, time‑stamped records.</strong>
            Hand‑written times are often estimates at best. Digital records
            with automatic timestamps are considered far more reliable.
            Inspectors will also check for anyone still on site — a visitor
            who signed in but never signed out is a potential safety
            liability.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            3. Was the safety briefing acknowledged?
          </h2>
          <p>
            <strong>Proof of safety acknowledgment is non‑negotiable.</strong>
            If your site requires hard hats, high‑vis vests, or specific
            behavioral rules, you must prove that every visitor was informed.
            A mandatory digital acknowledgment with a timestamp is the gold
            standard — and exactly what an inspector expects to see.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            4. Can you quickly filter and export the data?
          </h2>
          <p>
            <strong>Yes, rapid exports are critical.</strong> Inspectors won’t
            wait while you search through a binder. They expect a filtered
            report — by date, site, or host — within minutes. CSV, Excel, and
            PDF exports are ideal, and a digital system should generate them
            in one click.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            5. Is the host clearly identified?
          </h2>
          <p>
            <strong>Every visitor should have a designated host.</strong> The
            log must show who they were meeting. Automatic host notifications
            are a plus because they prove the host was aware their guest had
            arrived. This is especially important in larger facilities where
            visitors may be unescorted.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            6. Are pre‑screening questions included?
          </h2>
          <p>
            <strong>Pre‑screening adds an extra layer of compliance.</strong>
            Many inspectors want to see that visitors were asked about recent
            illness, site‑specific hazards, or other safety concerns before
            entering. Customizable yes/no questions that are stored with the
            visitor record provide a clear audit trail.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            7. Are visitor photos captured?
          </h2>
          <p>
            <strong>Photos strengthen identification and security.</strong>
            While not always required, a visitor photo attached to the log
            entry shows that you take identification seriously. It also helps
            with badge printing and emergency evacuation headcounts.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            8. Does the log support document signing?
          </h2>
          <p>
            <strong>NDAs, waivers, and policies need signatures.</strong>
            If your workplace requires visitors to sign legal documents,
            having those signatures stored digitally with the visitor record
            is far more reliable than a paper form that can be lost.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            How to prepare in 60 seconds
          </h2>
          <p>
            The fastest way to see if your visitor log would pass an
            inspection is to take a quick self‑audit. Our free 10‑point
            visitor log self‑audit scores your current process against the
            exact criteria inspectors use.
          </p>

          <p className="italic text-slate-300 mt-6">
            <Link href="/audit" className="text-sky-400 hover:text-sky-300 transition-colors">
              Take the free visitor log self‑audit →
            </Link>
          </p>

          <p className="mt-4">
            Or, if you want a system that handles all of this automatically,{" "}
            <Link href="/signup" className="text-sky-400 hover:text-sky-300 transition-colors">
              start a free 14‑day trial of SiteSafe
            </Link>{" "}
            — no credit card, no sales call.
          </p>
        </div>
        <BlogPostJsonLd
          title="What Inspectors Look for in a Visitor Log"
          description="From mandatory safety acknowledgments to time‑stamped records, here's exactly what OSHA and safety inspectors check when they review your visitor log. Includes a free 10‑point self‑audit."
          datePublished="2026-06-13"
          dateModified="2026-06-17"
          slug="what-inspectors-look-for-in-visitor-log"
        />
      </div>
      <p className="text-sm text-slate-400 italic mt-8 pt-6 border-t border-white/10 max-w-2xl mx-auto">
        Not sure where your visitor log stands?{" "}
        <Link href="/audit" className="text-sky-400 hover:underline">
          Take our free 10‑point visitor log self‑audit
        </Link>{" "}
        — no sign‑up required.
      </p>
    </div>
  );
}