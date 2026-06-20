import type { Metadata } from "next";
import Link from "next/link";
import BlogPostJsonLd from "@/components/BlogPostJsonLd";

export const metadata: Metadata = {
  title: "Why We Capped Our Plan at 20 Sites – SiteSafe Blog",
  description:
    "SiteSafe recently changed from unlimited sites to a 20‑site cap on the $49/month plan. Here’s why we made the change and what it means for our customers.",
};

export default function BlogPost() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white/[0.10] backdrop-blur-lg rounded-2xl border border-white/10 shadow-card-raised p-8 text-white accent-glow aurora-bg">
        <h1 className="text-2xl font-bold tracking-tight mb-2">
          Why We Capped Our Plan at 20 Sites
        </h1>
        <p className="text-sm text-slate-400 mb-6">By the SiteSafe team · 3 min read</p>

        <div className="space-y-4 text-sm leading-relaxed text-slate-200">
          <p>
            When we launched SiteSafe, we offered “unlimited sites” for $49/month.
            It felt generous. It made the pricing page look simple. But over time,
            we realized it wasn’t honest — and it wasn’t sustainable.
          </p>
          <p>
            The truth is, SiteSafe is built for mid‑sized workplaces with
            multiple locations. Construction companies with a handful of job sites.
            Warehouse chains with a dozen distribution centers. School districts
            with five or six campuses. Those are the teams that get the most value
            from our compliance features, our real‑time dashboards, and our flat,
            no‑sales‑call pricing.
          </p>
          <p>
            What we’re <em>not</em> built for is a stadium with 100 check‑in
            points, or a logistics hub with a rotating cast of thousands of daily
            visitors. And “unlimited sites” was a signal that we were trying to be
            everything to everyone — which we’re not.
          </p>
          <p>
            So we changed it. The plan now includes <strong>up to 20 sites</strong>{" "}
            for the same $49/month. For the vast majority of our customers, that’s
            more than enough. If someone needs more, we’ll have a conversation —
            not a sales pitch, just an honest chat about what they need and whether
            SiteSafe is the right fit.
          </p>
          <p>
            At the same time, we updated our positioning. The homepage no longer
            says “the digital check‑in for any workplace.” It now says exactly
            what we do: <strong>compliance‑ready visitor management for mid‑sized
            workplaces with multiple locations.</strong> That’s who we’re for.
            That’s what we’re good at.
          </p>
          <p>
            We’d rather be a great product for a specific audience than a mediocre
            product for everyone.
          </p>
          <p>
            If you’re a facility manager, safety officer, or site supervisor
            managing multiple locations, give SiteSafe a try. The 14‑day trial is
            free, no credit card required, and no sales calls.
          </p>

          <p className="italic text-slate-300 mt-6">
            <Link href="/signup" className="text-sky-400 hover:text-sky-300 transition-colors">
              Start your free 14‑day trial of SiteSafe
            </Link>{" "}
            — no credit card, no sales call.
          </p>
        </div>
        <BlogPostJsonLd
          title="Why We Capped Our Plan at 20 Sites"
          description="SiteSafe recently changed from unlimited sites to a 20‑site cap on the $49/month plan. Here’s why we made the change and what it means for our customers."
          datePublished="2026-06-19"
          dateModified="2026-06-19"
          slug="capped-plan-20-sites"
        />
      </div>
    </div>
  );
}