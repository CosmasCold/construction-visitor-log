import type { Metadata } from "next";
import Link from "next/link";
import BlogPostJsonLd from "@/components/BlogPostJsonLd";

export const metadata: Metadata = {
  title: "SwipedOn Alternative – Flat Pricing, No Per‑Location Fees | SiteSafe",
  description:
    "Looking for a SwipedOn alternative? SiteSafe offers unlimited sites for a flat $49/mo, mandatory safety acknowledgment, host notifications, and a free 14‑day trial.",
};

export default function BlogPost() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-8 text-white">
        <h1 className="text-2xl font-bold tracking-tight mb-2">
          SwipedOn Alternative: Why SiteSafe Is a Better Fit for Multi‑Site Teams
        </h1>
        <p className="text-sm text-slate-400 mb-6">By the SiteSafe team · 5 min read</p>

        <div className="space-y-4 text-sm leading-relaxed text-slate-200">
          <p>
            SwipedOn is a popular visitor management tool, but its pricing model —
            per‑location fees and locked features — often surprises growing teams.
            If you’re managing multiple sites or just want a straightforward
            alternative, SiteSafe might be exactly what you need.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            1. Truly unlimited sites for one price
          </h2>
          <p>
            SwipedOn charges per location. If you have three sites, your monthly
            bill triples. SiteSafe gives you unlimited sites for a flat{" "}
            <strong>$49/month</strong>. Whether you operate one office or twenty
            construction yards, you pay the same.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            2. Host notifications included (paid add‑on in SwipedOn)
          </h2>
          <p>
            When a visitor selects their host, SiteSafe automatically emails that
            person — no extra configuration, no extra cost. SwipedOn either
            doesn’t offer this or gates it behind a higher‑priced plan.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            3. Mandatory safety briefing — compliance built‑in
          </h2>
          <p>
            Neither SwipedOn nor most competitors enforce a safety acknowledgment
            before sign‑in. SiteSafe does. It’s a non‑skippable step that every
            visitor must complete, which is a lifesaver during audits.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            4. No sales calls, no credit card required
          </h2>
          <p>
            You can test SiteSafe for 14 days without ever talking to a salesperson
            or entering payment details. If you’ve been burned by pushy demos,
            you’ll appreciate how simple our sign‑up is.
          </p>

          <p className="italic text-slate-300 mt-6">
            See how SiteSafe stacks up side‑by‑side with SwipedOn, Envoy, and
            paper logs.{" "}
            <Link
              href="/compare"
              className="text-sky-400 hover:text-sky-300 transition-colors"
            >
              View the full comparison
            </Link>.
          </p>
        </div>
        <BlogPostJsonLd
          title="SwipedOn Alternative: Why SiteSafe Is a Better Fit for Multi‑Site Teams"
          description="Looking for a SwipedOn alternative? SiteSafe offers unlimited sites for a flat $49/mo, mandatory safety acknowledgment, host notifications, and a free 14‑day trial."
          datePublished="2026-06-13"
          dateModified="2026-06-15"
          slug="swipedon-alternative"
        />
      </div>
      <p className="text-sm text-slate-400 italic mt-8 pt-6 border-t border-white/10 max-w-2xl mx-auto">
        Ready to make the switch?{" "}
        <Link href="/signup" className="text-sky-400 hover:underline">
          Start your free 14‑day trial
        </Link>.
      </p>
    </div>
  );
}