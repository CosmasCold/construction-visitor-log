// app/settings/SettingsClient.tsx
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Building,
  Mail,
  CreditCard,
  BadgeCheck,
  Calendar,
  Key,
  Copy,
  RefreshCw,
  MessageSquare,
} from "lucide-react";

interface SettingsClientProps {
  companyName: string;
  companyEmail: string;
  companySlug: string;
  subscriptionStatus: string;
  planName: string;
  currentPeriodEnd: string | null;
  hasStripeCustomer: boolean;
  hasSubscription: boolean;
  isTrialing: boolean;
  apiKey?: string | null;
  slackWebhookUrl?: string | null;
}

export default function SettingsClient({
  companyName: initialCompanyName,
  companyEmail,
  companySlug,
  subscriptionStatus,
  planName,
  currentPeriodEnd,
  hasStripeCustomer,
  hasSubscription,
  isTrialing,
  apiKey: initialApiKey,
  slackWebhookUrl: initialSlackWebhook,
}: SettingsClientProps) {
  const router = useRouter();

  // Company name editing
  const [companyName, setCompanyName] = useState(initialCompanyName);
  const [nameLoading, setNameLoading] = useState(false);
  const [nameSaved, setNameSaved] = useState(false);

  // Billing
  const [loading, setLoading] = useState(false);
  const loadingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // API key
  const [apiKey, setApiKey] = useState(initialApiKey || "");
  const [keyLoading, setKeyLoading] = useState(false);
  const [keyCopied, setKeyCopied] = useState(false);

  // Slack
  const [slackWebhook, setSlackWebhook] = useState(initialSlackWebhook || "");
  const [slackSaving, setSlackSaving] = useState(false);
  const [slackTesting, setSlackTesting] = useState(false);
  const [slackSaved, setSlackSaved] = useState(false);

  // Change password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // Handlers
  async function handleSubscribe() {
    setLoading(true);
    const res = await fetch("/api/stripe/checkout", { method: "POST" });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Failed to start checkout.");
      setLoading(false);
    }
  }

  async function handleManageBilling() {
    setLoading(true);

    // Safety timeout — reset loading after 10 seconds no matter what
    loadingTimer.current = setTimeout(() => {
      setLoading(false);
      alert("The request timed out. Please try again or contact support.");
    }, 10000);

    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      clearTimeout(loadingTimer.current!); // got a response, cancel timeout

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        throw new Error(text.slice(0, 150));
      }

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Failed to open billing portal.");
        setLoading(false);
      }
    } catch (err: unknown) {
      clearTimeout(loadingTimer.current!);
      const message = err instanceof Error ? err.message : "Unknown error";
      console.error(message);
      alert("Something went wrong: " + message);
      setLoading(false);
    }
  }

  async function handleGenerateKey() {
    setKeyLoading(true);
    const res = await fetch("/api/settings/api-key", { method: "POST" });
    if (res.ok) {
      const data = await res.json();
      setApiKey(data.key);
    } else {
      alert("Failed to generate API key.");
    }
    setKeyLoading(false);
  }

  function handleCopyKey() {
    navigator.clipboard.writeText(apiKey);
    setKeyCopied(true);
    setTimeout(() => setKeyCopied(false), 2000);
  }

  async function handleSaveSlack() {
    setSlackSaving(true);
    const res = await fetch("/api/settings/slack-webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slackWebhookUrl: slackWebhook }),
    });
    if (res.ok) {
      setSlackSaved(true);
      setTimeout(() => setSlackSaved(false), 2000);
    } else {
      alert("Failed to save Slack webhook.");
    }
    setSlackSaving(false);
  }

  async function handleTestSlack() {
    setSlackTesting(true);
    const res = await fetch("/api/settings/test-slack", { method: "POST" });
    if (res.ok) {
      alert("Test message sent to Slack!");
    } else {
      alert("Failed to send test message. Check the webhook URL.");
    }
    setSlackTesting(false);
  }

  async function handleSaveName() {
    if (!companyName.trim() || companyName === initialCompanyName) return;
    setNameLoading(true);
    const res = await fetch("/api/company/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: companyName.trim() }),
    });
    if (res.ok) {
      setNameSaved(true);
      setTimeout(() => setNameSaved(false), 2000);
      router.refresh();
    } else {
      alert("Failed to update company name.");
    }
    setNameLoading(false);
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPasswordError("");
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords don't match.");
      return;
    }
    setPasswordSaving(true);
    const res = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordError("");
      alert("Password changed successfully.");
    } else {
      setPasswordError(data.error || "Failed to change password.");
    }
    setPasswordSaving(false);
  }

  const showManageBilling = hasStripeCustomer && hasSubscription;

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <Link
          href={`/dashboard?slug=${companySlug}`}
          className="text-sky-400 hover:text-sky-300 text-sm inline-flex items-center gap-1 transition-colors duration-150"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight text-white flex items-center gap-2">
          <BadgeCheck className="w-6 h-6 text-sky-400" /> Settings
        </h1>

        {/* Company info card */}
        <div className="bg-white/[0.10] backdrop-blur-lg rounded-2xl border border-white/10 shadow-card-raised p-6 space-y-4 accent-glow aurora-bg">
          <h2 className="text-lg font-semibold tracking-tight text-white">Company</h2>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Building className="w-3.5 h-3.5" /> Name
            </p>
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="flex-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              />
              <button
                onClick={handleSaveName}
                disabled={nameLoading || companyName === initialCompanyName}
                className="bg-sky-500 hover:bg-sky-600 disabled:bg-sky-400/50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                {nameSaved ? "Saved" : "Save"}
              </button>
            </div>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" /> Email
            </p>
            <p className="text-white font-medium">{companyEmail}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <CreditCard className="w-3.5 h-3.5" /> Plan
            </p>
            <p className="text-white font-medium">{planName}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Status</p>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300">
              {subscriptionStatus}
            </span>
          </div>
          {currentPeriodEnd && (
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Next billing / trial end
              </p>
              <p className="text-white font-medium text-sm">
                {new Date(currentPeriodEnd).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>

        {/* Billing card */}
        <div className="bg-white/[0.10] backdrop-blur-lg rounded-2xl border border-white/10 shadow-card-raised p-6 accent-glow aurora-bg">
          <h2 className="text-lg font-semibold tracking-tight text-white mb-2">Billing</h2>
          {showManageBilling ? (
            <>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Update your payment method, view invoices, or cancel your plan.
              </p>
              <button
                onClick={handleManageBilling}
                disabled={loading}
                className="bg-rose-600 hover:bg-rose-700 disabled:bg-rose-400/50 text-white px-6 py-2 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 active:scale-[0.98]"
              >
                {loading ? "Redirecting…" : "Manage Billing"}
              </button>
            </>
          ) : (
            <>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {isTrialing
                  ? "You are on a free trial. When ready, subscribe to keep using SiteSafe."
                  : "No active plan. Subscribe to continue using SiteSafe."}
              </p>
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="bg-sky-500 hover:bg-sky-600 disabled:bg-sky-400/50 text-white px-6 py-2 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 active:scale-[0.98]"
              >
                {loading ? "Redirecting…" : "Subscribe Now"}
              </button>
            </>
          )}
        </div>

        {/* Slack card */}
        <div className="bg-white/[0.10] backdrop-blur-lg rounded-2xl border border-white/10 shadow-card-raised p-6 space-y-4 accent-glow aurora-bg">
          <h2 className="text-lg font-semibold tracking-tight text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-sky-400" /> Slack Notifications
          </h2>
          <p className="text-sm text-slate-300">
            Receive a message in Slack every time a visitor signs in.
          </p>
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="Slack webhook URL"
              value={slackWebhook}
              onChange={(e) => setSlackWebhook(e.target.value)}
              className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all duration-200"
            />
            <button
              onClick={handleSaveSlack}
              disabled={slackSaving}
              className="bg-sky-500 hover:bg-sky-600 disabled:bg-sky-400/50 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
            >
              {slackSaved ? "Saved" : "Save"}
            </button>
          </div>
          {slackWebhook && (
            <button
              onClick={handleTestSlack}
              disabled={slackTesting}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
            >
              {slackTesting ? "Sending…" : "Send test message"}
            </button>
          )}
        </div>

        {/* API Key card */}
        <div className="bg-white/[0.10] backdrop-blur-lg rounded-2xl border border-white/10 shadow-card-raised p-6 space-y-4 accent-glow aurora-bg">
          <h2 className="text-lg font-semibold tracking-tight text-white flex items-center gap-2">
            <Key className="w-5 h-5 text-sky-400" /> API Access
          </h2>
          <p className="text-sm text-slate-300">
            Use this key to integrate SiteSafe with your own systems. Keep it secret! Keep it safe!
          </p>
          {apiKey ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-xs text-white break-all select-all">
                  {apiKey}
                </code>
                <button onClick={handleCopyKey} className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-colors">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              {keyCopied && <p className="text-xs text-emerald-400">Copied!</p>}
              <button
                onClick={handleGenerateKey}
                disabled={keyLoading}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-1"
              >
                <RefreshCw className="w-4 h-4" /> {keyLoading ? "Generating…" : "Regenerate key"}
              </button>
            </div>
          ) : (
            <button
              onClick={handleGenerateKey}
              disabled={keyLoading}
              className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-xl text-sm font-medium transition-colors inline-flex items-center gap-1"
            >
              <Key className="w-4 h-4" /> {keyLoading ? "Generating…" : "Generate API key"}
            </button>
          )}
        </div>

        {/* Change Password card */}
        <div className="bg-white/[0.10] backdrop-blur-lg rounded-2xl border border-white/10 shadow-card-raised p-6 space-y-4 accent-glow aurora-bg">
          <h2 className="text-lg font-semibold tracking-tight text-white flex items-center gap-2">
            <Key className="w-5 h-5 text-sky-400" /> Change Password
          </h2>
          <form onSubmit={handleChangePassword} className="space-y-3">
            <input
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
            />
            <input
              type="password"
              placeholder="New password (8+ chars, 1 uppercase, 1 number)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={8}
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
            />
            <p className="text-xs text-slate-400">
              Must be at least 8 characters with one uppercase letter and one number.
            </p>
            {passwordError && (
              <p className="text-rose-400 text-sm text-center">{passwordError}</p>
            )}
            <button
              type="submit"
              disabled={passwordSaving}
              className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-sky-400/50 text-white font-medium rounded-xl px-4 py-2 text-sm transition-colors"
            >
              {passwordSaving ? "Changing…" : "Update password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}