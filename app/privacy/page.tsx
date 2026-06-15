// app/privacy/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy – SiteSafe",
  description:
    "SiteSafe privacy policy. How we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto text-white space-y-8">
        <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="text-sm text-slate-400">Last updated: June 15, 2026</p>

        <div className="space-y-6 text-sm leading-relaxed text-slate-200">
          <h2 className="text-lg font-semibold text-white">1. Information we collect</h2>
          <p>
            When you use SiteSafe, we collect the information you provide
            directly: your name, email address, company name, and payment
            details (processed securely by Stripe — we never see your full
            card number).
          </p>
          <p>
            When visitors sign in at your sites, we collect the information
            they provide: full name, company, phone number (optional), email
            address (optional), host name, safety acknowledgment, pre‑screening
            answers, and visitor photos (if enabled).
          </p>

          <h3 className="text-md font-semibold text-white mt-4">Visitor photos</h3>
          <p>
            When a site enables photo capture, visitor photos are taken during
            check‑in and stored securely on Vercel Blob Storage. Photos are
            deleted when the visitor record is deleted. Photos are not shared,
            sold, or processed for any purpose other than identification and
            badge printing.
          </p>

          <h3 className="text-md font-semibold text-white mt-4">Signatures</h3>
          <p>
            When a site enables document signing, visitor signatures are collected
            as digital images and stored with the visitor record. Signatures are
            deleted alongside the visitor record when it is removed. Signatures
            are not used for any other purpose.
          </p>

          <h3 className="text-md font-semibold text-white mt-4">Blocklist entries</h3>
          <p>
            Site owners may add names, email addresses, or phone numbers to a
            blocklist. These entries are stored in the database and are only used
            to compare against new visitor check‑ins. Blocklist data is not
            shared, sold, or processed for any other purpose.
          </p>

          <h2 className="text-lg font-semibold text-white mt-8">2. How we use your information</h2>
          <p>
            We use your account information to provide the SiteSafe service:
            to create and manage your account, send you service‑related emails,
            and process payments. We use visitor data solely to provide the
            check‑in and visitor management features you have enabled. We do
            not mine, sell, or advertise based on your data.
          </p>

          <h2 className="text-lg font-semibold text-white mt-8">3. Data storage & security</h2>
          <p>
            All data is stored on secure servers provided by Vercel and Neon
            (PostgreSQL). Data is encrypted in transit using SSL and at rest.
            We implement strict Content Security Policies and HSTS to protect
            against common web attacks.
          </p>

          <h2 className="text-lg font-semibold text-white mt-8">4. Data retention & deletion</h2>
          <p>
            Visitor records are retained for as long as your account is active.
            You can delete individual visitor records or entire sites at any
            time from your dashboard. When a visitor record is deleted, all
            associated data (including photos and signatures) is permanently
            removed. If you cancel your account, all your data will be deleted
            within 30 days.
          </p>

          <h2 className="text-lg font-semibold text-white mt-8">5. Third‑party services</h2>
          <p>
            We use the following third‑party services to operate SiteSafe:
            Stripe (payment processing), Brevo (transactional email),
            and Vercel (hosting and analytics). Each of these services has its
            own privacy policy. We do not use third‑party advertising trackers.
          </p>

          <h2 className="text-lg font-semibold text-white mt-8">6. Your rights</h2>
          <p>
            Depending on your jurisdiction, you may have the right to access,
            correct, or delete your personal data, or to object to or restrict
            certain processing. To exercise these rights, contact us at
            hello@sitesafe.thesift.space. We will respond within 30 days.
          </p>

          <h2 className="text-lg font-semibold text-white mt-8">7. Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will
            notify you of any material changes by email or via a notice on our
            website. Continued use of SiteSafe after changes take effect
            constitutes acceptance of the updated policy.
          </p>

          <h2 className="text-lg font-semibold text-white mt-8">8. Contact</h2>
          <p>
            If you have questions about this Privacy Policy, contact us at:{" "}
            <a
              href="mailto:hello@thesift.space"
              className="text-sky-400 hover:underline"
            >
              hello@sitesafe.thesift.space
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}