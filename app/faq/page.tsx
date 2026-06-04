// app/faq/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions – SiteSafe",
  description:
    "Answers to common questions about the SiteSafe digital visitor log, including setup, trials, billing, security, and the API.",
};

const faqs = [
  {
    q: "How do I set up my first site?",
    a: "After signing up, you'll land on your company dashboard. Click the '+ New Site' button, give your site a name, a short URL slug (like 'lobby'), and optionally an address. Click 'Create' – you're ready to start checking in visitors.",
  },
  {
    q: "Can I have multiple sites under one company?",
    a: "Yes. You can create as many sites as you need – one for each location, office, or floor. They all share the same company subscription and can be managed from a single dashboard.",
  },
  {
    q: "How does the free trial work?",
    a: "Your 14‑day free trial starts the moment you create your account. No credit card is required. You have full access to all features during the trial.",
  },
  {
    q: "What happens when my trial ends?",
    a: "When the trial ends, you'll need to subscribe to continue using SiteSafe. Until then, a banner at the top of your dashboard shows the remaining days. Your data is safe and will be available again as soon as you subscribe.",
  },
  {
    q: "Can I change the safety briefing text?",
    a: "Absolutely. Click 'Edit' next to any site, update the safety briefing field, and save. The new text appears immediately on the check‑in page.",
  },
  {
    q: "How do hosts get notified when a visitor signs in?",
    a: "Edit a site, add a host (name + email) in the 'Hosts' section, and save. When a visitor signs in and selects that host from the dropdown, an email notification is sent automatically.",
  },
  {
    q: "What do the export options (CSV, Excel, PDF) include?",
    a: "Exports include every visitor record visible on your dashboard – name, company, phone, host, sign‑in/sign‑out times, and safety acknowledgment status. They reflect the currently selected date range, so you get exactly what you need for audits or reports.",
  },
  {
    q: "How do I share the check‑in link with my team?",
    a: "On the dashboard, each site card shows its unique URL (e.g. /checkin/lobby). Click the copy icon next to it, or click the QR code icon to display a scannable code. Share the link or print the QR code for your entrance.",
  },
  {
    q: "Can visitors sign themselves out?",
    a: "Yes. The check‑in page shows a list of all active visitors. Next to each name is a 'Sign out' button – anyone can tap it to sign out. Site managers can also sign visitors out remotely from the dashboard.",
  },
  {
    q: "How does the QR code work?",
    a: "Every site has a unique QR code that links directly to its check‑in page. Display the code on a tablet or print it, and visitors can scan it with their phone to open the sign‑in form on their own device. You can view and download the QR code from the site card on your dashboard.",
  },
  {
    q: "Is my visitor data secure?",
    a: "Yes. All data is encrypted in transit (HTTPS) and at rest. Your visitor logs are stored in a secure, access‑controlled database. Only users with your company credentials can view your data. We never share or sell your information.",
  },
  {
    q: "How do I subscribe after the trial?",
    a: "Go to Settings → click 'Subscribe Now'. You'll be taken to our secure Stripe checkout. Once your payment is confirmed, your subscription becomes active immediately and the trial banner disappears.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Your subscription can be cancelled at any time from the Stripe Customer Portal (accessible via Settings → Manage Billing). If you cancel, you'll still have access until the end of your current billing period.",
  },
  {
    q: "What's the API for and how do I get started?",
    a: "The REST API lets you integrate SiteSafe with your own tools – HR systems, dashboards, Slack, and more. Generate your API key in Settings, then head to our API docs for example requests. You can list sites, fetch visitors, create check‑ins, and sign visitors out programmatically.",
  },
];

export default function FaqPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-slate-400 mb-8">
          Quick answers to common questions about SiteSafe.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised group"
            >
              <summary className="px-6 py-4 text-white font-medium cursor-pointer list-none flex items-center justify-between">
                <span>{faq.q}</span>
                <svg
                  className="w-4 h-4 text-sky-400 transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-sm text-slate-300 leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>

        <p className="text-sm text-slate-500 mt-8 text-center">
          Still have questions?{" "}
          <a
            href="mailto:cloudandclipboard@gmail.com"
            className="text-sky-400 hover:text-sky-300 transition-colors"
          >
            Contact us
          </a>
          .
        </p>
      </div>
    </div>
  );
}