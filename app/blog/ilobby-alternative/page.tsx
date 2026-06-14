import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "iLobby Alternative – Simpler Visitor Management for Small Teams | SiteSafe",
  description:
    "Looking for an iLobby alternative? SiteSafe offers a simpler check‑in flow, mandatory safety acknowledgment, flat $49/mo pricing, and a free trial.",
};

export default function BlogPost() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-8 text-white">
        <h1 className="text-2xl font-bold tracking-tight mb-2">
          iLobby Alternative: Why SiteSafe Is the Simpler Choice
        </h1>
        <p className="text-sm text-slate-400 mb-6">By the SiteSafe team · 5 min read</p>

        <div className="space-y-4 text-sm leading-relaxed text-slate-200">
          <p>
            iLobby is built for large enterprises with complex needs. But if
            you’re a construction company, warehouse, or small office, you
            probably don’t need visitor screening against government watchlists
            or enterprise SSO. You need fast check‑in, compliance proof, and a
            price that makes sense.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            1. Faster setup — no heavy configuration
          </h2>
          <p>
            iLobby requires a deployment process that can take days or weeks.
            SiteSafe is self‑serve: you create an account, name your first site,
            and you have a working QR code in under two minutes.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            2. Mandatory safety acknowledgment
          </h2>
          <p>
            iLobby focuses on visitor screening, not safety compliance. SiteSafe
            was built for workplaces where safety briefings are mandatory. Our
            check‑in flow makes the safety acknowledgment a non‑skippable step,
            giving you a clean audit trail.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            3. Flat pricing — no per‑visitor fees
          </h2>
          <p>
            iLobby’s pricing is custom‑quote, and often includes per‑visitor
            charges for advanced screening. SiteSafe charges a flat{" "}
            <strong>$49/month</strong> for unlimited visitors across all your
            sites.
          </p>

          <h2 className="text-lg font-semibold tracking-tight text-white mt-6">
            4. Built for small teams, not just enterprises
          </h2>
          <p>
            Our entire product is designed for companies with 1‑50 employees. You
            get pre‑registration, badge printing, host notifications, and audit
            exports without the enterprise overhead. And you can try it free for
            14 days.
          </p>

          <p className="italic text-slate-300 mt-6">
            See if SiteSafe fits your workflow.{" "}
            <a
              href="/signup"
              className="text-sky-400 hover:text-sky-300 transition-colors"
            >
              Start your free trial
            </a>{" "}
            — no credit card, no sales call.
          </p>
        </div>
      </div>
      <p className="italic text-slate-300 mt-6">
  Check the full feature‑by‑feature{" "}
  <a
    href="/compare"
    className="text-sky-400 hover:text-sky-300 transition-colors"
  >
    comparison
  </a>{" "}
  to see how SiteSafe matches up.
</p>
    </div>
  );
}