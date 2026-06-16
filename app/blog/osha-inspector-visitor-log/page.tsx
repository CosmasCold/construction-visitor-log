import type { Metadata } from "next";
import BlogPostJsonLd from "@/components/BlogPostJsonLd";

export const metadata: Metadata = {
  title: "What an OSHA Inspector Actually Looks For in a Visitor Log – SiteSafe Blog",
  description:
    "A complete visitor log can make or break an inspection. Here is what inspectors check.",
};

export default function BlogPost() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-8 text-white">
        <h1 className="text-2xl font-bold tracking-tight mb-2">
          What an OSHA Inspector Actually Looks For in a Visitor Log
        </h1>
        <p className="text-sm text-slate-400 mb-6">By the SiteSafe team · 5 min read</p>

        <div className="space-y-4 text-sm leading-relaxed text-slate-200">
          <p>
            When an OSHA inspector arrives, one of the first documents they’ll
            ask for is your visitor log. Here’s exactly what they check:
          </p>
          <ul className="space-y-2 text-slate-200">
            <li>• Complete names, companies, and times for every visitor</li>
            <li>• Proof that safety briefings were acknowledged</li>
            <li>• Accurate sign‑in and sign‑out times</li>
            <li>• Host identification</li>
            <li>• The ability to quickly filter and export records</li>
          </ul>
          <p>
            A digital system like SiteSafe automates all of this, turning an
            inspection from a stressful event into a non‑issue.
          </p>
        </div>
        <BlogPostJsonLd
          title="What an OSHA Inspector Actually Looks For in a Visitor Log"
          description="A complete visitor log can make or break an inspection. Here is what inspectors check."
          datePublished="2026-06-02"
          dateModified="2026-06-15"
          slug="osha-inspector-visitor-log"
        />
      </div>
    </div>
  );
}