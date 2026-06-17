import type { Metadata } from "next";
import Link from "next/link";
import BlogPostJsonLd from "@/components/BlogPostJsonLd";

export const metadata: Metadata = {
  title: "The Receptionist Alternative – Flat Pricing, Unlimited Sites | SiteSafe",
  description:
    "Looking for an alternative to The Receptionist? SiteSafe offers mandatory safety acknowledgment, flat $49/mo pricing, and no per‑site fees. Compare features and pricing.",
};

export default function BlogPost() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-8 text-white">
        <h1 className="text-2xl font-bold tracking-tight mb-2">
          The Receptionist Alternative: Why SiteSafe Fits Growing Teams Better
        </h1>
        <p className="text-sm text-slate-400 mb-6">By the SiteSafe team · 5 min read</p>

        <div className="space-y-4 text-sm leading-relaxed text-slate-200">
          <p>
            The Receptionist is a simple visitor check‑in tool designed for
            small offices. It’s easy to use, but as your team grows or you
            need more sites, its limitations — single‑site plans, missing
            compliance features, and no API access — start to show.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            1. Pricing – per‑site fees vs flat $49
          </h2>
          <p>
            The Receptionist charges per location. The basic plan starts around
            $49/month for a single site. If you have three locations, you’re
            looking at $147/month or more — and some advanced features are still
            locked behind higher tiers.
          </p>
          <p>
            SiteSafe is <strong>$49/month flat</strong>. Unlimited sites, unlimited
            visitors, all features included. No per‑location fees. No hidden
            costs. Cancel anytime.
          </p>

          <div className="overflow-x-auto my-4">
            <table className="w-full text-xs border border-white/10 rounded-lg">
              <thead className="bg-white/5">
                <tr>
                  <th className="p-2 text-left">Plan</th>
                  <th className="p-2 text-left">The Receptionist</th>
                  <th className="p-2 text-left text-sky-300">SiteSafe</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="p-2">Starting price</td>
                  <td className="p-2">~$49/mo (1 site)</td>
                  <td className="p-2 text-sky-300">$49/mo (unlimited)</td>
                </tr>
                <tr>
                  <td className="p-2">Per‑site fee</td>
                  <td className="p-2">Yes</td>
                  <td className="p-2 text-sky-300">None</td>
                </tr>
                <tr>
                  <td className="p-2">Free trial</td>
                  <td className="p-2">Limited</td>
                  <td className="p-2 text-sky-300">14 days, no card</td>
                </tr>
                <tr>
                  <td className="p-2">Hidden costs</td>
                  <td className="p-2">Per‑site add‑ons</td>
                  <td className="p-2 text-sky-300">None</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            2. Feature comparison
          </h2>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-xs border border-white/10 rounded-lg">
              <thead className="bg-white/5">
                <tr>
                  <th className="p-2 text-left">Feature</th>
                  <th className="p-2 text-left">The Receptionist</th>
                  <th className="p-2 text-left text-sky-300">SiteSafe</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="p-2">Mandatory safety briefing</td>
                  <td className="p-2">Not available</td>
                  <td className="p-2 text-sky-300">Mandatory (non‑skippable)</td>
                </tr>
                <tr>
                  <td className="p-2">Watchlist / blocklist</td>
                  <td className="p-2">Not available</td>
                  <td className="p-2 text-sky-300">Included</td>
                </tr>
                <tr>
                  <td className="p-2">Emergency evacuation list</td>
                  <td className="p-2">Not available</td>
                  <td className="p-2 text-sky-300">Included (PDF with photos)</td>
                </tr>
                <tr>
                  <td className="p-2">Lockdown mode</td>
                  <td className="p-2">Not available</td>
                  <td className="p-2 text-sky-300">One‑click</td>
                </tr>
                <tr>
                  <td className="p-2">Document signing</td>
                  <td className="p-2">Not available</td>
                  <td className="p-2 text-sky-300">Included</td>
                </tr>
                <tr>
                  <td className="p-2">Webhooks</td>
                  <td className="p-2">Not available</td>
                  <td className="p-2 text-sky-300">Included</td>
                </tr>
                <tr>
                  <td className="p-2">Multi‑site management</td>
                  <td className="p-2">Per‑site fee</td>
                  <td className="p-2 text-sky-300">Unlimited, free</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            3. Who should use The Receptionist (and who should not)
          </h2>
          <p>
            The Receptionist works well for a single‑location office that only
            needs basic check‑in. If you have one front desk and a handful of
            daily visitors, it may be enough. But if you plan to add more sites
            or need compliance features like mandatory safety briefings,
            watchlists, or emergency evacuation lists, you’ll quickly outgrow it.
          </p>
          <p>
            SiteSafe is built for teams that manage multiple locations and care
            about compliance. With unlimited sites, flat pricing, and enterprise‑
            grade security features included, it’s the better long‑term solution.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            4. Try before you buy
          </h2>
          <p>
            The Receptionist offers a limited trial. SiteSafe gives you a{" "}
            <strong>14‑day free trial</strong> with full access — no credit card,
            no sales call. Set up your first site and start checking in visitors
            in under two minutes.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-sky-300">Is SiteSafe really $49/month for everything?</h3>
              <p className="text-xs text-slate-300 mt-1">
                Yes. Unlimited sites, unlimited visitors, and every feature —
                including watchlist, emergency evacuation list, lockdown, webhooks,
                and document signing. No add‑ons, no hidden costs.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-sky-300">Can I switch from The Receptionist to SiteSafe?</h3>
              <p className="text-xs text-slate-300 mt-1">
                Switching is straightforward. You can export your existing visitor
                records from The Receptionist for your own archive, then start fresh
                with SiteSafe. Set up your sites, add your hosts, and you’re
                ready to go.
              </p>
            </div>
          </div>

          <p className="italic text-slate-300 mt-6">
            Ready to switch?{" "}
            <Link href="/signup" className="text-sky-400 hover:text-sky-300 transition-colors">
              Start your free 14‑day trial
            </Link>{" "}
            — no credit card, no sales call.
          </p>
        </div>
        <BlogPostJsonLd
          title="The Receptionist Alternative: Why SiteSafe Fits Growing Teams Better"
          description="Looking for an alternative to The Receptionist? SiteSafe offers mandatory safety acknowledgment, flat $49/mo pricing, and no per‑site fees. Compare features and pricing."
          datePublished="2026-06-17"
          dateModified="2026-06-17"
          slug="the-receptionist-alternative"
        />
      </div>
      <p className="text-sm text-slate-400 italic mt-8 pt-6 border-t border-white/10 max-w-2xl mx-auto">
        Still evaluating?{" "}
        <Link href="/compare" className="text-sky-400 hover:underline">
          See the full side‑by‑side comparison
        </Link>{" "}
        with Envoy, SwipedOn, and paper logs.
      </p>
    </div>
  );
}