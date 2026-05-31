// app/terms/page.tsx
export default function TermsPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20 text-slate-800">
        <h1 className="text-2xl font-bold mb-6">Terms of Service</h1>
        <p className="text-sm text-slate-500 mb-8">Last updated: June 1, 2026</p>

        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="font-semibold text-base mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing or using SiteSafe (“the Service”), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base mb-2">2. Description of Service</h2>
            <p>
              SiteSafe provides a digital construction visitor log that allows companies to manage site check‑ins, safety briefings, and audit trails. The Service is provided on a subscription basis.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base mb-2">3. User Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You must provide accurate and complete information when creating an account.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base mb-2">4. Payment and Billing</h2>
            <p>
              Paid plans are billed monthly or annually via Stripe. You agree to pay all fees associated with your chosen plan. Failure to pay may result in suspension or termination of your account.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base mb-2">5. Acceptable Use</h2>
            <p>
              You may not use the Service for any unlawful purpose or in a way that violates the rights of others. You are responsible for the data you collect and store through the Service.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base mb-2">6. Limitation of Liability</h2>
            <p>
              SiteSafe is provided “as is” without warranties of any kind. We shall not be liable for any damages arising from the use or inability to use the Service.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base mb-2">7. Termination</h2>
            <p>
              We reserve the right to suspend or terminate accounts that violate these Terms. You may cancel your subscription at any time through your account settings.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base mb-2">8. Changes to Terms</h2>
            <p>
              We may update these Terms from time to time. Continued use of the Service after changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base mb-2">9. Contact</h2>
            <p>
              For questions about these Terms, please contact us at{" "}
              <a href="mailto:cloudandclipboard@gmail.com" className="text-sky-600 underline">
                cloudandclipboard@gmail.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}