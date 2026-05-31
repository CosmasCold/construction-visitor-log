// app/privacy/page.tsx
export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20 text-slate-800">
        <h1 className="text-2xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-sm text-slate-500 mb-8">Last updated: June 1, 2026</p>

        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="font-semibold text-base mb-2">1. Information We Collect</h2>
            <p>
              When you use SiteSafe, we collect information you provide directly: company name, email address, visitor names, company affiliations, phone numbers (optional), and host names. We also collect payment information via Stripe (we do not store full credit card details).
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base mb-2">2. How We Use Information</h2>
            <p>
              We use the collected information to provide and improve the Service, process payments, communicate with you, and ensure the security of the platform.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base mb-2">3. Data Sharing</h2>
            <p>
              We do not sell or rent your personal data. We may share information with third‑party service providers (e.g., Stripe for payments, Neon for database hosting) solely for the purpose of delivering the Service.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base mb-2">4. Data Retention</h2>
            <p>
              Visitor log data is retained for the duration of your subscription. Upon account termination, we will delete your data within 30 days unless otherwise required by law.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base mb-2">5. Cookies</h2>
            <p>
              SiteSafe uses essential cookies for authentication and session management. We do not use tracking cookies for advertising.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base mb-2">6. Security</h2>
            <p>
              We implement industry‑standard security measures to protect your data. However, no method of electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base mb-2">7. Your Rights</h2>
            <p>
              You may request access to, correction of, or deletion of your personal data at any time by contacting us. You may also export your visitor logs directly from the admin dashboard.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base mb-2">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of significant changes via email or through the Service.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base mb-2">9. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at{" "}
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