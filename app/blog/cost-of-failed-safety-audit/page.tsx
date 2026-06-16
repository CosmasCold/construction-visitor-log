import type { Metadata } from "next";
import BlogPostJsonLd from "@/components/BlogPostJsonLd";

export const metadata: Metadata = {
  title: "The Real Cost of a Failed Safety Audit – SiteSafe Blog",
  description:
    "Fines are just the start. A failed audit can cost contracts, reputation, and months of work.",
};

export default function BlogPost() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-8 text-white">
        <h1 className="text-2xl font-bold tracking-tight mb-2">
          The Real Cost of a Failed Safety Audit
        </h1>
        <p className="text-sm text-slate-400 mb-6">By the SiteSafe team · 5 min read</p>

        <div className="space-y-4 text-sm leading-relaxed text-slate-200">
          <p>
            A failed safety audit doesn’t just mean a fine. It can mean
            contract losses, increased insurance premiums, and months of
            corrective work. Here’s what’s really at stake.
          </p>
          <p>
            One of the first things an inspector checks is the visitor log.
            If it’s incomplete, illegible, or missing safety acknowledgments,
            you start at a disadvantage.
          </p>
          <p>
            A digital visitor management system like SiteSafe eliminates that
            risk by making every record mandatory, time‑stamped, and exportable
            in seconds.
          </p>
        </div>
        <BlogPostJsonLd
          title="The Real Cost of a Failed Safety Audit"
          description="Fines are just the start. A failed audit can cost contracts, reputation, and months of work."
          datePublished="2026-06-03"
          dateModified="2026-06-15"
          slug="cost-of-failed-safety-audit"
        />
      </div>
    </div>
  );
}