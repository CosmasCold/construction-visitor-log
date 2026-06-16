import type { Metadata } from "next";
import BlogPostJsonLd from "@/components/BlogPostJsonLd";

export const metadata: Metadata = {
  title: "Why Paper Sign‑In Sheets Are a Safety Risk – SiteSafe Blog",
  description:
    "Paper logs get lost, ruined, and are illegible. Here is why a digital check‑in is safer.",
};

export default function BlogPost() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-8 text-white">
        <h1 className="text-2xl font-bold tracking-tight mb-2">
          Why Paper Sign‑In Sheets Are a Safety Risk
        </h1>
        <p className="text-sm text-slate-400 mb-6">By the SiteSafe team · 4 min read</p>

        <div className="space-y-4 text-sm leading-relaxed text-slate-200">
          <p>
            Paper sign‑in sheets seem harmless, but they’re one of the biggest
            safety risks in any workplace. Here’s why — and what to use instead.
          </p>
          <p>
            Paper is easily lost, damaged, or illegible. It can’t enforce
            safety acknowledgments, can’t send host notifications, and can’t
            be exported for an audit. In an emergency, a paper log tells you
            nothing in real time.
          </p>
          <p>
            SiteSafe replaces paper with a digital check‑in that works on any
            phone. Visitors scan a QR code, acknowledge your safety rules, and
            appear on your live dashboard. No paper, no risk.
          </p>
        </div>
        <BlogPostJsonLd
          title="Why Paper Sign‑In Sheets Are a Safety Risk"
          description="Paper logs get lost, ruined, and are illegible. Here is why a digital check‑in is safer."
          datePublished="2026-06-01"
          dateModified="2026-06-15"
          slug="paper-sign-in-sheets-safety-risk"
        />
      </div>
    </div>
  );
}