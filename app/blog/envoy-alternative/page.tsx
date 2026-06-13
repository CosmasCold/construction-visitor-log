import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Envoy Alternative – Why SiteSafe Is the Better Choice for Small Teams",
  description:
    "Looking for an Envoy alternative? SiteSafe offers mandatory safety acknowledgment, flat $49/mo pricing, no sales calls, and a 14‑day free trial.",
};

export default function BlogPost() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-8 text-white">
        <h1 className="text-2xl font-bold tracking-tight mb-2">
          Envoy Alternative: Why SiteSafe Is the Better Choice for Small Teams
        </h1>
        <p className="text-sm text-slate-400 mb-6">By the SiteSafe team · 5 min read</p>

        <div className="space-y-4 text-sm leading-relaxed text-slate-200">
          <p>
            Envoy is a well‑known visitor management platform, but if you’re a
            small or mid‑sized business, you’ve probably hit a wall: mandatory
            demos, per‑site fees, and features locked behind expensive tiers.
            That’s exactly why we built SiteSafe — to give you a faster, cheaper,
            and more compliance‑focused alternative.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            1. You can see our pricing in 3 seconds
          </h2>
          <p>
            Envoy doesn’t show pricing on their website. You have to book a demo
            and talk to a sales rep just to get a number. SiteSafe shows it right
            on the landing page: <strong>$49/month flat</strong>. Unlimited
            sites, unlimited visitors. No hidden fees, no per‑location
            surcharges.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            2. Mandatory safety acknowledgment (Envoy can’t do this)
          </h2>
          <p>
            For construction sites, warehouses, and any workplace with safety
            protocols, the most critical feature is a <strong>non‑skippable
            safety briefing</strong>. Envoy’s visitor check‑in allows safety
            acknowledgment, but it’s optional — visitors can skip it. SiteSafe
            makes it mandatory, every single time. That’s the kind of proof an
            inspector expects to see.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            3. No per‑site fees (Envoy charges extra)
          </h2>
          <p>
            Envoy’s pricing is per‑location, which adds up quickly for companies
            with multiple job sites or offices. SiteSafe gives you unlimited
            sites at no extra cost. One account, one flat price, every site
            you operate.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            4. You can start instantly — no sales call
          </h2>
          <p>
            SiteSafe doesn’t require a demo, a credit card, or a phone call. You
            can create an account and have a QR check‑in code live in under two
            minutes. If you’re evaluating Envoy and tired of waiting, give us a
            try right now.
          </p>

          <p className="italic text-slate-300 mt-6">
            Ready to switch?{" "}
            <a
              href="/signup"
              className="text-sky-400 hover:text-sky-300 transition-colors"
            >
              Start your free 14‑day trial
            </a>{" "}
            — no credit card, no sales call.
          </p>
        </div>
      </div>
      <p className="text-sm text-slate-400 italic mt-8 pt-6 border-t border-white/10 max-w-2xl mx-auto">
        Want to make sure your visitor log survives an audit?{" "}
        <a href="/checklist" className="text-sky-400 hover:underline">
          Grab our free 10‑point checklist
        </a>.
      </p>
    </div>
  );
}