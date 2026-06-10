// app/integrations/zapier/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zapier & Make Integration – SiteSafe",
  description: "Connect SiteSafe to 5,000+ apps using Zapier or Make – no code required.",
};

export default function ZapierIntegration() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-8 text-white">
        <h1 className="text-2xl font-bold tracking-tight mb-2">Zapier & Make Integration</h1>
        <p className="text-sm text-slate-400 mb-8">
          Connect SiteSafe to 5,000+ apps without writing code.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-3">Step 1 – Get your API key</h2>
        <p className="text-sm text-slate-300">
          In SiteSafe, go to <strong>Settings</strong> and copy your API key.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-3">Step 2 – Create a Zap in Zapier</h2>
        <ol className="list-decimal list-inside text-sm text-slate-300 space-y-2">
          <li>Choose <strong>Schedule</strong> as the trigger (e.g., every 15 minutes).</li>
          <li>Add an action – search for <strong>Webhooks by Zapier</strong> and choose <strong>GET</strong>.</li>
          <li>
            Set the URL to <code className="bg-white/10 px-1 rounded text-xs">https://sitesafe.thesift.space/api/v1/visitors</code>
          </li>
          <li>
            Under <strong>Headers</strong>, add:
            <ul className="list-disc list-inside ml-4 mt-1 text-xs text-slate-400">
              <li><code>Authorization: Bearer YOUR_API_KEY</code></li>
              <li><code>Content-Type: application/json</code></li>
            </ul>
          </li>
          <li>Test the step – you should see your visitor data.</li>
          <li>Add any other action (e.g., Google Sheets, Slack, email) using the visitor data.</li>
        </ol>

        <h2 className="text-lg font-semibold mt-6 mb-3">Step 3 – Turn on your Zap</h2>
        <p className="text-sm text-slate-300">
          Your Zap will now run on schedule and pull new visitors into your chosen apps.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-3">Need help?</h2>
        <p className="text-sm text-slate-300">
          Check the <a href="/docs" className="text-sky-400 hover:underline">API docs</a> or email us at{" "}
          <a href="mailto:cloudandclipboard@gmail.com" className="text-sky-400 hover:underline">cloudandclipboard@gmail.com</a>.
        </p>
      </div>
    </div>
  );
}