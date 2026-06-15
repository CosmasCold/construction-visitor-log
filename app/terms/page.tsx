// app/terms/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service – SiteSafe",
  description:
    "Terms of Service for SiteSafe — the smart visitor management platform.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto text-white space-y-8">
        <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
        <p className="text-sm text-slate-400">Last updated: June 15, 2026</p>

        <div className="space-y-6 text-sm leading-relaxed text-slate-200">
          <h2 className="text-lg font-semibold text-white">1. Acceptance of terms</h2>
          <p>
            By accessing or using SiteSafe, you agree to be bound by these
            Terms of Service. If you do not agree, do not use the service.
          </p>

          <h2 className="text-lg font-semibold text-white mt-8">2. Description of service</h2>
          <p>
            SiteSafe provides a digital visitor management platform that
            includes QR check‑in, safety acknowledgment, visitor logging,
            badge printing, photo capture, document signing, blocklist
            management, emergency evacuation lists, lockdown mode, and
            related features.
          </p>

          <h2 className="text-lg font-semibold text-white mt-8">3. Account registration</h2>
          <p>
            You must provide accurate and complete information when creating
            an account. You are responsible for maintaining the confidentiality
            of your login credentials and for all activities that occur under
            your account.
          </p>

          <h2 className="text-lg font-semibold text-white mt-8">4. Subscription & payment</h2>
          <p>
            SiteSafe is offered on a subscription basis. The current pricing
            is $49/month (USD) for unlimited sites and visitors. Payments are
            processed by Stripe. You may cancel at any time; cancellation
            takes effect at the end of the current billing period. No refunds
            are provided for partial months.
          </p>

          <h2 className="text-lg font-semibold text-white mt-8">5. Free trial</h2>
          <p>
            New accounts receive a 14‑day free trial. No credit card is
            required to start the trial. At the end of the trial period, you
            must add a payment method to continue using the service.
          </p>

          <h2 className="text-lg font-semibold text-white mt-8">6. Acceptable use</h2>
          <p>
            You agree not to use SiteSafe for any unlawful purpose or in
            violation of any applicable laws or regulations. You are
            responsible for the accuracy and legality of the data you collect
            from your visitors, including obtaining any necessary consent.
          </p>

          <h2 className="text-lg font-semibold text-white mt-8">7. Security features</h2>
          <p>
            SiteSafe provides security tools such as blocklists, lockdown
            mode, and emergency evacuation lists. You agree to use these
            features responsibly and in compliance with applicable laws.
            SiteSafe is not liable for any consequences arising from the
            activation or deactivation of these features.
          </p>

          <h2 className="text-lg font-semibold text-white mt-8">8. Data ownership</h2>
          <p>
            You retain ownership of all data you collect through SiteSafe,
            including visitor records, photos, signatures, and pre‑screening
            answers. SiteSafe does not claim ownership of your data. You
            grant SiteSafe a limited license to host and process your data
            solely as necessary to provide the service.
          </p>

          <h2 className="text-lg font-semibold text-white mt-8">9. Limitation of liability</h2>
          <p>
            SiteSafe is provided “as is.” We make no warranties, express or
            implied, regarding the service’s availability, accuracy, or
            suitability for a particular purpose. In no event shall SiteSafe
            be liable for any indirect, incidental, or consequential damages
            arising from your use of the service.
          </p>

          <h2 className="text-lg font-semibold text-white mt-8">10. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your account for
            violation of these terms. Upon termination, your data will be
            deleted within 30 days.
          </p>

          <h2 className="text-lg font-semibold text-white mt-8">11. Changes to these terms</h2>
          <p>
            We may update these Terms of Service from time to time. We will
            notify you of material changes via email. Continued use after
            changes take effect constitutes acceptance.
          </p>

          <h2 className="text-lg font-semibold text-white mt-8">12. Contact</h2>
          <p>
            Questions about these terms?{" "}
            <a
              href="mailto:hello@sitesafe.thesift.space"
              className="text-sky-400 hover:underline"
            >
              hello@thesift.space
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}