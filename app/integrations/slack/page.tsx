// app/integrations/slack/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Slack Integration – SiteSafe",
  description: "Get visitor notifications in Slack with a simple webhook setup.",
};

export default function SlackIntegration() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-8 text-white">
        <h1 className="text-2xl font-bold tracking-tight mb-2">Slack Integration</h1>
        <p className="text-sm text-slate-400 mb-8">
          Receive a message in Slack every time a visitor signs in.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-3">Step 1 – Create a Slack webhook</h2>
        <p className="text-sm text-slate-300">
          In Slack, go to <strong>Settings & administration → Manage apps → Incoming Webhooks</strong>. Create a new webhook and choose the channel where you want notifications. Copy the webhook URL.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-3">Step 2 – Paste it in SiteSafe</h2>
        <p className="text-sm text-slate-300">
          Go to <Link href="/settings" className="text-sky-400 hover:underline">Settings</Link> in your SiteSafe dashboard, scroll to <strong>Slack Notifications</strong>, paste the URL, and click Save.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-3">Step 3 – Test it</h2>
        <p className="text-sm text-slate-300">
          Click <strong>Send test message</strong> in Settings. You should see a message appear in your Slack channel. Then sign in a visitor – a notification will arrive instantly.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-3">Need help?</h2>
        <p className="text-sm text-slate-300">
          Email us at{" "}
          <a href="mailto:cloudandclipboard@gmail.com" className="text-sky-400 hover:underline">cloudandclipboard@gmail.com</a>.
        </p>
      </div>
    </div>
  );
}