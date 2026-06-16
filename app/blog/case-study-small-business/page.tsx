import type { Metadata } from "next";
import Link from "next/link";
import BlogPostJsonLd from "@/components/BlogPostJsonLd";

export const metadata: Metadata = {
  title: "How a Small Business Chooses a Visitor Log – SiteSafe Blog",
  description:
    "A walk through how a fictional small business owner compares Envoy, SwipedOn, and SiteSafe — and why the simplest, most affordable option wins.",
};

export default function BlogPost() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-8 text-white">
        <h1 className="text-2xl font-bold tracking-tight mb-2">
          How a Small Business Chooses a Visitor Log
        </h1>
        <p className="text-sm text-slate-400 mb-6">By the SiteSafe team · 4 min read</p>

        <div className="space-y-4 text-sm leading-relaxed text-slate-200">
          <p>
            Meet Sarah. She runs a medium‑sized construction company with three
            active job sites. She’s been using paper sign‑in sheets for years,
            but after a near‑miss during an OSHA audit, she knows it’s time for
            something better.
          </p>
          <p>
            Sarah starts her search online. She finds three options:{" "}
            <strong>Envoy</strong>, <strong>SwipedOn</strong>, and{" "}
            <strong>SiteSafe</strong>. Here’s how she made her decision — and
            why it might matter for your business.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            First impressions: price and complexity
          </h2>
          <p>
            Envoy’s website looks polished, but Sarah quickly realizes she can’t
            see any pricing without booking a demo. That’s a red flag — she’s
            not interested in a sales call.
          </p>
          <p>
            SwipedOn is more transparent, but the per‑location pricing adds up
            fast. Three sites would cost more than she expected, and some
            features like pre‑registration are locked behind higher tiers.
          </p>
          <p>
            SiteSafe shows a simple price right on the landing page:{" "}
            <strong>$49/month flat</strong>. Unlimited sites, unlimited
            visitors. No per‑site fees. She can sign up in 60 seconds without a
            credit card.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            The feature that matters most
          </h2>
          <p>
            For Sarah, the must‑have is the mandatory safety briefing
            acknowledgment. Her old paper sheets had no way to enforce it, and
            she knows that’s exactly what an inspector will ask for. Both Envoy
            and SwipedOn offer a visitor sign‑in, but neither makes the safety
            acknowledgment a non‑skippable step. SiteSafe does — every single
            time.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            What she didn’t realize she needed
          </h2>
          <p>
            Sarah didn’t expect to need host notifications, but when she saw
            that SiteSafe could email a foreman when their guest arrives, she
            knew her crew would love it. SwipedOn doesn’t offer it, and Envoy
            charges extra. SiteSafe includes it for free.
          </p>
          <p>
            Pre‑registration is another surprise. Sarah can now add expected
            visitors ahead of time, so they can sign in with one tap. That saves
            her front‑desk person a lot of typing.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            The final straw: audit exports
          </h2>
          <p>
            Sarah’s biggest fear is another audit. With SiteSafe, she can export
            a complete, date‑filtered PDF in seconds. Envoy and SwipedOn both
            offer exports, but again — often in higher‑priced tiers. SiteSafe
            gives her instant CSV, Excel, and PDF without any upsell.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            Sarah’s decision
          </h2>
          <p>
            She chose SiteSafe. It cost less than half of the alternatives, gave
            her the mandatory safety acknowledgment she needed, and didn’t
            require a demo or sales call. She set up her three sites in under 10
            minutes and had a visitor checked in on the same day.
          </p>

          <p className="italic text-slate-300 mt-6">
            If you’re in the same spot as Sarah,{" "}
            <Link
              href="/signup"
              className="text-sky-400 hover:text-sky-300 transition-colors"
            >
              try SiteSafe free for 14 days
            </Link>{" "}
            — no credit card, no sales calls.
          </p>
        </div>
        <BlogPostJsonLd
          title="How a Small Business Chooses a Visitor Log"
          description="A walk through how a fictional small business owner compares Envoy, SwipedOn, and SiteSafe — and why the simplest, most affordable option wins."
          datePublished="2026-06-06"
          dateModified="2026-06-15"
          slug="case-study-small-business"
        />
      </div>
      <p className="text-sm text-slate-400 italic mt-8 pt-6 border-t border-white/10 max-w-2xl mx-auto">
        Want to make sure your visitor log survives an audit?{" "}
        <Link href="/checklist" className="text-sky-400 hover:underline">
          Grab our free 10‑point checklist
        </Link>.
      </p>
    </div>
  );
}