// app/glossary/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Visitor Management Glossary – SiteSafe",
  description:
    "Clear definitions of common visitor management, safety, and compliance terms. Understand digital check‑in, mandatory safety acknowledgment, pre‑registration, and more.",
};

const terms = [
  {
    term: "Visitor Log",
    definition:
      "A record of every person entering a facility. Typically includes name, company, host, time in/out, and safety acknowledgment. Digital logs are searchable and audit‑ready; paper logs are easily lost or damaged.",
    links: [{ href: "/blog/osha-inspector-visitor-log", text: "What an OSHA inspector looks for" }],
  },
  {
    term: "Digital Visitor Management System",
    definition:
      "Software that replaces paper sign‑in sheets with a tablet or kiosk. It automates check‑in, enforces safety rules, and provides real‑time dashboards and exportable reports.",
    links: [{ href: "/features", text: "SiteSafe features" }],
  },
  {
    term: "QR Check‑in",
    definition:
      "A contactless check‑in method where visitors scan a unique QR code with their phone to launch the sign‑in form. No app install required.",
    links: [{ href: "/#features", text: "How QR check‑in works" }],
  },
  {
    term: "Mandatory Safety Acknowledgment",
    definition:
      "A non‑skippable step during check‑in that requires visitors to confirm they have read and understood the facility’s safety rules. Essential for compliance and audit protection.",
    links: [{ href: "/blog/what-inspectors-look-for-in-visitor-log", text: "What inspectors check" }],
  },
  {
    term: "Pre‑registration",
    definition:
      "Adding expected visitors ahead of time so they can sign in with one tap. Reduces wait times and front‑desk workload.",
    links: [{ href: "/#features", text: "Pre‑registration feature" }],
  },
  {
    term: "Host Notification",
    definition:
      "Automatic email (and optionally SMS) sent to the person being visited as soon as their guest arrives. Keeps the host informed without manual calls or texts.",
    links: [{ href: "/integrations", text: "Integrations that support notifications" }],
  },
  {
    term: "Visitor Badge Printing",
    definition:
      "Printing a label or card that includes the visitor’s name, photo, host, and check‑in time. Improves on‑site identification and security.",
    links: [{ href: "/#features", text: "Badge printing feature" }],
  },
  {
    term: "Audit Export",
    definition:
      "The ability to export all visitor records in a structured format (CSV, Excel, PDF), filterable by date, site, or host. Critical during safety inspections.",
    links: [{ href: "/blog/cost-of-failed-safety-audit", text: "Cost of a failed audit" }],
  },
  {
    term: "Real‑time Dashboard",
    definition:
      "A live view showing who is currently on site, refreshed automatically every few seconds. Helps with emergency evacuation headcounts and overall situational awareness.",
    links: [{ href: "/#features", text: "Dashboard feature" }],
  },
  {
    term: "REST API",
    definition:
      "A programmatic interface that lets other software (HR tools, Slack, custom dashboards) access visitor data. SiteSafe offers a fully documented REST API with Bearer token authentication.",
    links: [{ href: "/docs", text: "API documentation" }],
  },
  {
    term: "Contactless Check‑in",
    definition:
      "A check‑in method that doesn’t require touching shared surfaces. QR codes, NFC, or personal device check‑ins reduce germ transmission and speed up entry.",
    links: [{ href: "/#features", text: "How SiteSafe enables contactless check‑in" }],
  },
  {
    term: "Photo Capture",
    definition:
      "Taking a visitor’s photo at the moment of check‑in, stored with their log entry. Photos can be printed on badges and improve on‑site security.",
    links: [{ href: "/#features", text: "Photo capture feature" }],
  },
  {
    term: "Multi‑site Management",
    definition:
      "Managing multiple physical locations from a single online account. SiteSafe offers unlimited sites with individual settings, all for a flat monthly price.",
    links: [{ href: "/pricing", text: "Pricing model" }],
  },
  {
    term: "Compliance",
    definition:
      "Adherence to regulations, industry standards, or internal policies. In visitor management, compliance often means having a complete, unalterable, and exportable visitor log.",
    links: [{ href: "/security", text: "SiteSafe security and compliance" }],
  },
  {
    term: "Safety Briefing",
    definition:
      "A set of rules and guidelines that visitors must review and acknowledge. Common on construction sites, in warehouses, and in manufacturing plants.",
    links: [{ href: "/blog/what-inspectors-look-for-in-visitor-log", text: "Why safety briefings matter" }],
  },
  {
    term: "Visitor Screening",
    definition:
      "Asking pre‑entry questions (e.g., health symptoms, security checks) and storing the answers with the visitor record.",
    links: [{ href: "/#features", text: "Pre‑screening questions feature" }],
  },
  {
    term: "Sign‑in / Sign‑out",
    definition:
      "The process of recording entry and exit timestamps. Digital systems automate this, creating an accurate timeline of who was on site and when.",
    links: [{ href: "/compare", text: "How SiteSafe compares on timestamps" }],
  },
  {
    term: "Paper Log",
    definition:
      "A physical clipboard or notebook used to record visitors. Prone to loss, illegibility, and alteration—and impossible to export quickly during an audit.",
    links: [{ href: "/blog/paper-sign-in-sheets-safety-risk", text: "Why paper logs are a risk" }],
  },
  {
    term: "SaaS (Software as a Service)",
    definition:
      "A software delivery model where the application is hosted online and accessed via a web browser. No installation, automatic updates, and usually a subscription pricing model.",
    links: [],
  },
  {
    term: "API Key",
    definition:
      "A unique string used to authenticate requests to an API. SiteSafe uses hashed API keys to protect data when integrating with external tools.",
    links: [{ href: "/docs", text: "API authentication" }],
  },
];

export default function GlossaryPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
          Visitor Management Glossary
        </h1>
        <p className="text-sm text-slate-400 mb-8">
          Clear definitions of the most important terms in modern visitor
          management, safety, and compliance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {terms.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6"
            >
              <h2 className="text-base font-semibold text-sky-300 mb-2">
                {item.term}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-3">
                {item.definition}
              </p>
              {item.links.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {item.links.map((link, li) => (
                    <Link
                      key={li}
                      href={link.href}
                      className="text-xs text-sky-400 hover:text-sky-300 transition-colors"
                    >
                      {link.text} →
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-500 mt-12 text-center">
          Learn more about how SiteSafe implements these concepts at{" "}
          <Link href="/features" className="text-sky-400 hover:underline">
            /features
          </Link>.
        </p>
      </div>
    </div>
  );
}