import type { Metadata } from "next";
import Link from "next/link";
import BlogPostJsonLd from "@/components/BlogPostJsonLd";

export const metadata: Metadata = {
  title: "SiteSafe vs Envoy vs SwipedOn vs Paper Logs – SiteSafe Blog",
  description:
    "An honest side‑by‑side comparison of digital visitor log solutions, including pricing, features, and hidden costs.",
};

export default function BlogPost() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-8 text-white">
        <h1 className="text-2xl font-bold tracking-tight mb-2">
          SiteSafe vs Envoy vs SwipedOn vs Paper Logs
        </h1>
        <p className="text-sm text-slate-400 mb-6">By the SiteSafe team · 5 min read</p>

        <div className="space-y-4 text-sm leading-relaxed text-slate-200">
          <p>
            Choosing a visitor management system? We put SiteSafe, Envoy,
            SwipedOn, and the classic paper log side‑by‑side so you can see
            exactly how they compare on pricing, compliance, and everyday use.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">Pricing</h2>
          <p>
            <strong>SiteSafe:</strong> $49/month flat, unlimited sites.<br/>
            <strong>Envoy:</strong> $99+/month plus per‑site fees.<br/>
            <strong>SwipedOn:</strong> $39+/month plus per‑location fees.<br/>
            <strong>Paper logs:</strong> Almost free — until an audit.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">Mandatory safety acknowledgment</h2>
          <p>
            Only SiteSafe makes safety briefings a non‑skippable step. Envoy
            offers it as an option; SwipedOn doesn’t offer it at all.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">Host notifications</h2>
          <p>
            SiteSafe includes automatic host email alerts. Envoy charges extra.
            SwipedOn does not provide this feature.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">Pre‑registration</h2>
          <p>
            SiteSafe includes it. Envoy and SwipedOn gate it behind higher‑priced
            plans.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">Badge printing</h2>
          <p>All three digital systems offer badge printing. Paper logs can’t.</p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">Real‑time dashboard</h2>
          <p>
            All three digital systems have dashboards. SiteSafe refreshes every
            few seconds.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">Audit exports</h2>
          <p>
            SiteSafe provides instant CSV, Excel, and PDF. Envoy’s exports are
            in paid tiers; SwipedOn’s are basic.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">Sales calls</h2>
          <p>
            SiteSafe never requires a demo. Envoy and SwipedOn often require
            one before you can see pricing.
          </p>

          <p className="italic text-slate-300 mt-6">
            See the full comparison on our{" "}
            <Link href="/compare" className="text-sky-400 hover:text-sky-300 transition-colors">
              side‑by‑side page
            </Link>.
          </p>
        </div>
        <BlogPostJsonLd
          title="SiteSafe vs Envoy vs SwipedOn vs Paper Logs"
          description="An honest side‑by‑side comparison of digital visitor log solutions, including pricing, features, and hidden costs."
          datePublished="2026-06-04"
          dateModified="2026-06-15"
          slug="sitesafe-vs-envoy-swipedon-paper"
        />
      </div>
    </div>
  );
}