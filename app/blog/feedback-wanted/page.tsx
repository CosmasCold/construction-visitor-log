import type { Metadata } from "next";
import BlogPostJsonLd from "@/components/BlogPostJsonLd";

export const metadata: Metadata = {
  title: "Help Us Improve SiteSafe – Feedback Wanted",
  description:
    "We built a simple digital visitor log and need your honest feedback to make it better.",
};

export default function BlogPost() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-8 text-white">
        <h1 className="text-2xl font-bold tracking-tight mb-2">
          Help Us Improve SiteSafe – Feedback Wanted
        </h1>
        <p className="text-sm text-slate-400 mb-6">By the SiteSafe team · 2 min read</p>

        <div className="space-y-4 text-sm leading-relaxed text-slate-200">
          <p>
            We built SiteSafe because we believe visitor management should be
            simple, affordable, and actually help you pass an audit.
          </p>
          <p>
            But we’re still learning. If you’ve tried SiteSafe — even just for
            a few minutes — we’d love to hear what worked and what didn’t.
          </p>
          <p>
            What features are you missing? What felt confusing? What would
            make you recommend it to a colleague?
          </p>
          <p>
            Send your thoughts to{" "}
            <a href="mailto:hello@sitesafe.thesift.space" className="text-sky-400 hover:text-sky-300 transition-colors">
              hello@sitesafe.thesift.space
            </a>. No form, no survey — just a direct line to the team.
          </p>
        </div>
        <BlogPostJsonLd
          title="Help Us Improve SiteSafe – Feedback Wanted"
          description="We built a simple digital visitor log and need your honest feedback to make it better."
          datePublished="2026-06-04"
          dateModified="2026-06-15"
          slug="feedback-wanted"
        />
      </div>
    </div>
  );
}