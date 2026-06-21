// app/faq/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions – SiteSafe",
  description:
    "Answers to common questions about SiteSafe, including setup, trials, billing, security, integrations, and more.",
};

const faqs = [
  {
    q: "What is SiteSafe?",
    a: "SiteSafe is a smart visitor management platform that replaces paper sign‑in sheets with a simple, tablet‑friendly digital check‑in. Every location gets a unique QR code. Visitors scan it, enter their details, and must acknowledge your safety or conduct policy before they can proceed. A live dashboard shows exactly who is on site right now, updated every few seconds. It's built for construction sites, warehouses, offices, and any workplace that needs to track visitors.",
  },
  {
    q: "How do I set up my first site?",
    a: "After signing up, you land on your company dashboard. Click '+ New Site', give your site a name and a short URL slug (like 'lobby'), and optionally an address. Click 'Create'. Your site is ready immediately, and you can start checking in visitors.",
  },
  {
    q: "Can I have multiple sites under one company?",
    a: "Yes. You can create as many sites as you need – one for each location, building, or floor. They all share the same company subscription and can be managed from a single dashboard.",
  },
  {
    q: "How does the free trial work?",
    a: "Your 14‑day free trial starts the moment you create your account. No credit card is required. You have full access to all features during the trial. When the trial ends, you'll need to subscribe to continue using SiteSafe.",
  },
  {
    q: "What happens when my trial ends?",
    a: "A banner at the top of your dashboard shows the remaining days. When the trial ends, you'll need to subscribe. Your data stays safe and will be available again as soon as you subscribe.",
  },
  {
    q: "How does the mandatory safety acknowledgment work?",
    a: "Your safety or conduct policy appears before the sign‑in form. The visitor must check a box confirming they've read it. The acknowledgment is timestamped and stored permanently. It cannot be skipped. This provides compliance proof during audits.",
  },
  {
    q: "What are pre‑screening questions?",
    a: "You can add custom yes/no questions that visitors must answer before signing in (e.g., 'Completed induction?'). The answers are stored with each visitor record and appear in the dashboard and exports.",
  },
  {
    q: "Can I take visitor photos at check‑in?",
    a: "Yes. The check‑in page can use the device's camera to capture a photo. The photo is stored securely on Vercel Blob and attached to the visitor record. It appears in the dashboard and on printed badges.",
  },
  {
    q: "How does the real‑time dashboard work?",
    a: "The dashboard shows who is currently on site and updates automatically every few seconds. You don't need to refresh the page. You can also sign any visitor out remotely from the dashboard.",
  },
  {
    q: "Can site managers sign visitors out remotely?",
    a: "Yes. From the dashboard, click 'Sign out' next to any active visitor. They will be signed out immediately, and their record will show the departure time.",
  },
  {
    q: "How do hosts get notified when a visitor signs in?",
    a: "Edit a site, add a host (name + email) in the 'Hosts' section, and save. When a visitor signs in and selects that host from the dropdown, an automatic email notification is sent to the host.",
  },
  {
    q: "Can I pre‑register expected visitors?",
    a: "Yes. In the site edit modal, add expected visitors with their name and company. On the check‑in page, they'll appear in a list for one‑tap sign‑in. This saves time at busy entrances.",
  },
  {
    q: "How does badge printing work?",
    a: "After a visitor signs in, you can print a badge directly from the active visitors list on the check‑in page. The badge includes the visitor's name, company, host, and photo (if captured). The printed badge is formatted as a compact 4×3‑inch label.",
  },
  {
    q: "What export options are available?",
    a: "You can export your visitor log as CSV, Excel, or PDF. Exports include all visitor data (name, company, phone, host, sign‑in/sign‑out times, safety acknowledgment, pre‑screening answers, and photo URL if available). You can filter by date range before exporting.",
  },
  {
    q: "Does SiteSafe have analytics?",
    a: "Yes. The analytics page shows a 30‑day trend chart of visitor counts, plus the total number of visitors in the period. You can also export the analytics data as a CSV file.",
  },
  {
    q: "What integrations does SiteSafe support?",
    a: "SiteSafe integrates with Slack (notifications when a visitor signs in), Google Sheets (auto‑sync visitor records via Apps Script), and Zapier/Make (connect to 5,000+ apps without coding). There's also a full REST API for custom integrations.",
  },
  {
    q: "How do I set up Slack notifications?",
    a: "In SiteSafe Settings, scroll to 'Slack Notifications', paste your Slack incoming webhook URL, and click Save. You can send a test message to confirm it works. After that, every check‑in will post a message in your chosen Slack channel.",
  },
  {
    q: "How does the Google Sheets sync work?",
    a: "We provide a short Google Apps Script that you paste into your Google Sheet. It uses your SiteSafe API key to fetch visitors and append them to the sheet automatically. See the Integrations page for step‑by‑step instructions.",
  },
  {
    q: "How does the REST API work?",
    a: "Every company can generate an API key from the Settings page. The API lets you list sites, fetch visitors, create check‑ins, and sign visitors out programmatically. Full documentation is available at /docs.",
  },
  {
    q: "Is my visitor data secure?",
    a: "Yes. All data is encrypted in transit (HTTPS) and at rest. Your visitor logs are stored in a secure, access‑controlled database (Neon). Photographs are stored on Vercel Blob with public access restricted to your account. Payments are processed by Stripe (PCI DSS Level 1). We do not use third‑party tracking cookies.",
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
    q: "What does $49/month include?",
    a: "Everything. Unlimited sites, unlimited visitors, all features (QR check‑in, mandatory acknowledgment, pre‑screening, photo capture, host notifications, badge printing, audit exports, analytics, integrations, REST API). No per‑site or per‑user fees. Cancel anytime.",
  },
  {
    q: "Do I need a credit card for the free trial?",
    a: "No. The 14‑day trial is completely free. No credit card required. No sales calls, ever.",
  },
  {
    q: "How do I share the check‑in link with my team?",
    a: "On the dashboard, each site card shows its unique URL. Click the copy icon to copy the link, or click the QR code icon to display a scannable code. Share the link or print the QR code for your entrance.",
  },
  {
    q: "Can visitors sign themselves out?",
    a: "Yes. The check‑in page shows a list of all active visitors. Next to each name is a 'Sign out' button – anyone can tap it to sign out. Site managers can also sign visitors out remotely from the dashboard.",
  },
  {
    q: "Where can I see updates and new features?",
    a: "Check the Changelog page for a complete list of recent updates. We ship frequently and document everything there.",
  },
  {
    q: "How do I get help?",
    a: "You can chat with us directly using the Crisp chat bubble on the site, or email us at cloudandclipboard@gmail.com. We usually respond within a few hours.",
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
              className="bg-white/[0.06] backdrop-blur-lg rounded-2xl border border-white/10 shadow-card-raised group"
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