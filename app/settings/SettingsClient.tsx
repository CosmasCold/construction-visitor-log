// app/settings/SettingsClient.tsx
"use client";

import { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  ShieldCheck,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Globe,
} from "lucide-react";

interface SettingsClientProps {
  companyName: string;
  companyEmail: string;
  companySlug: string;
  locale: "en" | "pt";
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
  locale: initialLocale,
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
  const searchParams = useSearchParams();
  const region = searchParams.get("region") || "usd";

  // Company name editing
  const [companyName, setCompanyName] = useState(initialCompanyName);
  const [nameLoading, setNameLoading] = useState(false);
  const [nameSaved, setNameSaved] = useState(false);

  // Locale
  const [locale, setLocale] = useState<"en" | "pt">(initialLocale);
  const [localeSaving, setLocaleSaving] = useState(false);
  const [localeSaved, setLocaleSaved] = useState(false);

  // Billing
  const [loading, setLoading] = useState(false);
  const loadingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // API key
  const [apiKey, setApiKey] = useState(initialApiKey || "");
  const [keyLoading, setKeyLoading] = useState(false);
  const [keyCopied, setKeyCopied] = useState(false);
  const [showKey, setShowKey] = useState(false);

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

  // ── Handlers ───────────────────────────────────────────

  async function handleSaveLocale() {
    if (locale === initialLocale) return;
    setLocaleSaving(true);
    const res = await fetch("/api/company/locale", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale }),
    });
    if (res.ok) {
      setLocaleSaved(true);
      setTimeout(() => setLocaleSaved(false), 2000);
      window.location.reload();
    } else {
      alert("Failed to save language preference.");
    }
    setLocaleSaving(false);
  }

  async function handleSubscribe() {
    setLoading(true);
    loadingTimer.current = setTimeout(() => {
      setLoading(false);
      alert("The request timed out. Please try again.");
    }, 10000);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: companyEmail, region }),
      });
      clearTimeout(loadingTimer.current!);

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Failed to start checkout.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to start checkout.");
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

  async function handleManageBilling() {
    setLoading(true);
    loadingTimer.current = setTimeout(() => {
      setLoading(false);
      alert("The request timed out. Please try again.");
    }, 10000);

    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      clearTimeout(loadingTimer.current!);

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Failed to open billing portal.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to open billing portal.");
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

  const statusColor = isTrialing 
    ? "bg-amber-500/10 text-amber-400 border-amber-500/20" 
    : hasSubscription 
      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      : "bg-slate-500/10 text-slate-400 border-slate-500/20";

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-200">
      <header className="border-b border-white/5 bg-[#0a0f1c]/90 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-sky-500 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm text-white">SiteSafe</span>
          </Link>
          <Link
            href={`/dashboard?slug=${companySlug}`}
            className="text-xs text-slate-500 hover:text-white transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-3 h-3" /> Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1">Settings</h1>
          <p className="text-xs text-slate-500">Manage your company, billing, and integrations</p>
        </div>

        {/* Language Card */}
        <section className="rounded-xl border border-white/5 bg-white/[0.03] overflow-hidden">
          <div className="bg-white/[0.02] border-b border-white/5 px-6 py-3 flex items-center gap-2">
            <Globe className="w-4 h-4 text-sky-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Language</h2>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-xs text-slate-500 leading-relaxed">
              Choose your preferred dashboard language.
            </p>
            <div>
              <label className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1.5 block">Dashboard Language</label>
              <select
                value={locale}
                onChange={(e) => setLocale(e.target.value as "en" | "pt")}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
              >
                <option value="en" className="bg-[#0f172a]">English</option>
                <option value="pt" className="bg-[#0f172a]">Português (Brasil)</option>
              </select>
            </div>
            <button
              onClick={handleSaveLocale}
              disabled={localeSaving || locale === initialLocale}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-[0.98] ${
                localeSaved 
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                  : "bg-sky-500 hover:bg-sky-600 text-white disabled:bg-white/5 disabled:text-slate-600"
              }`}
            >
              {localeSaved ? "Saved" : localeSaving ? "Saving…" : "Save Language"}
            </button>
          </div>
        </section>

        {/* Company Card */}
        <section className="rounded-xl border border-white/5 bg-white/[0.03] overflow-hidden">
          <div className="bg-white/[0.02] border-b border-white/5 px-6 py-3 flex items-center gap-2">
            <Building className="w-4 h-4 text-sky-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Company</h2>
          </div>
          <div className="p-6 space-y-5">
            <div>
              <label className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1.5 block">Company Name</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
                />
                <button
                  onClick={handleSaveName}
                  disabled={nameLoading || companyName === initialCompanyName}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-[0.98] ${
                    nameSaved 
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                      : "bg-sky-500 hover:bg-sky-600 text-white disabled:bg-white/5 disabled:text-slate-600"
                  }`}
                >
                  {nameSaved ? "Saved" : nameLoading ? "Saving…" : "Save"}
                </button>
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1.5 block">Email</label>
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/5 border border-white/10">
                <Mail className="w-4 h-4 text-slate-600" />
                <span className="text-sm text-white">{companyEmail}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1.5 block">Plan</label>
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/5 border border-white/10">
                  <CreditCard className="w-4 h-4 text-slate-600" />
                  <span className="text-sm text-white">{planName}</span>
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1.5 block">Status</label>
                <span className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border ${statusColor}`}>
                  <BadgeCheck className="w-3.5 h-3.5" />
                  {subscriptionStatus}
                </span>
              </div>
            </div>

            {currentPeriodEnd && (
              <div>
                <label className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1.5 block">
                  {isTrialing ? "Trial ends" : "Next billing"}
                </label>
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/5 border border-white/10">
                  <Calendar className="w-4 h-4 text-slate-600" />
                  <span className="text-sm text-white">
                    {new Date(currentPeriodEnd).toLocaleDateString(undefined, { 
                      weekday: 'short', 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Billing Card */}
        <section className="rounded-xl border border-white/5 bg-white/[0.03] overflow-hidden">
          <div className="bg-white/[0.02] border-b border-white/5 px-6 py-3 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-sky-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Billing</h2>
          </div>
          <div className="p-6">
            {showManageBilling ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-300">Manage payment methods, invoices, or cancel your plan.</p>
                  <p className="text-xs text-slate-500 mt-1">You will be redirected to Stripe&apos;s secure portal.</p>
                </div>
                <button
                  onClick={handleManageBilling}
                  disabled={loading}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-[0.98] flex-shrink-0"
                >
                  {loading ? "Redirecting…" : "Manage Billing"}
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-300">
                    {isTrialing 
                      ? "Your trial is active. Subscribe to keep using SiteSafe after it ends." 
                      : "No active subscription. Subscribe to continue using SiteSafe."}
                  </p>
                  {isTrialing && currentPeriodEnd && (
                    <p className="text-xs text-amber-400 mt-1 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> 
                      Trial ends {new Date(currentPeriodEnd).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleSubscribe}
                  disabled={loading}
                  className="bg-sky-500 hover:bg-sky-600 disabled:bg-sky-500/30 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-[0.98] flex-shrink-0"
                >
                  {loading ? "Redirecting…" : "Subscribe Now"}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Slack Card */}
        <section className="rounded-xl border border-white/5 bg-white/[0.03] overflow-hidden">
          <div className="bg-white/[0.02] border-b border-white/5 px-6 py-3 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-sky-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Slack Notifications</h2>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-xs text-slate-500 leading-relaxed">
              Get a Slack message every time a visitor checks in. Paste your incoming webhook URL below.
            </p>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://hooks.slack.com/services/..."
                value={slackWebhook}
                onChange={(e) => setSlackWebhook(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
              />
              <button
                onClick={handleSaveSlack}
                disabled={slackSaving}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-[0.98] ${
                  slackSaved 
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                    : "bg-sky-500 hover:bg-sky-600 text-white disabled:bg-white/5 disabled:text-slate-600"
                }`}
              >
                {slackSaved ? "Saved" : slackSaving ? "Saving…" : "Save"}
              </button>
            </div>
            {slackWebhook && (
              <button
                onClick={handleTestSlack}
                disabled={slackTesting}
                className="text-xs text-slate-500 hover:text-sky-400 transition-colors flex items-center gap-1.5"
              >
                {slackTesting ? (
                  <>Sending test…</>
                ) : (
                  <><MessageSquare className="w-3 h-3" /> Send test message</>
                )}
              </button>
            )}
          </div>
        </section>

        {/* API Key Card */}
        <section className="rounded-xl border border-white/5 bg-white/[0.03] overflow-hidden">
          <div className="bg-white/[0.02] border-b border-white/5 px-6 py-3 flex items-center gap-2">
            <Key className="w-4 h-4 text-sky-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">API Access</h2>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-xs text-slate-500 leading-relaxed">
              Use this key to connect SiteSafe to your own tools. Keep it secret.
            </p>

            {apiKey ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <code className={`block w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs font-mono break-all select-all ${!showKey ? "text-slate-600" : "text-white"}`}>
                      {showKey ? apiKey : "•".repeat(apiKey.length)}
                    </code>
                  </div>
                  <button
                    onClick={() => setShowKey(!showKey)}
                    className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                    title={showKey ? "Hide key" : "Show key"}
                  >
                    {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={handleCopyKey}
                    className={`p-2.5 rounded-lg transition-colors ${
                      keyCopied 
                        ? "bg-emerald-500/10 text-emerald-400" 
                        : "bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
                    }`}
                    title="Copy to clipboard"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                {keyCopied && (
                  <p className="text-xs text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Copied to clipboard
                  </p>
                )}
                <button
                  onClick={handleGenerateKey}
                  disabled={keyLoading}
                  className="text-xs text-slate-500 hover:text-rose-400 transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw className={`w-3 h-3 ${keyLoading ? "animate-spin" : ""}`} />
                  {keyLoading ? "Generating…" : "Regenerate key (invalidates the old one)"}
                </button>
              </div>
            ) : (
              <button
                onClick={handleGenerateKey}
                disabled={keyLoading}
                className="bg-sky-500 hover:bg-sky-600 disabled:bg-sky-500/30 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-[0.98] inline-flex items-center gap-2"
              >
                <Key className="w-4 h-4" />
                {keyLoading ? "Generating…" : "Generate API Key"}
              </button>
            )}
          </div>
        </section>

        {/* Password Card */}
        <section className="rounded-xl border border-white/5 bg-white/[0.03] overflow-hidden">
          <div className="bg-white/[0.02] border-b border-white/5 px-6 py-3 flex items-center gap-2">
            <Lock className="w-4 h-4 text-sky-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Change Password</h2>
          </div>
          <div className="p-6">
            <form onSubmit={handleChangePassword} className="space-y-3">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1.5 block">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1.5 block">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={8}
                  placeholder="8+ chars, 1 uppercase, 1 number"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1.5 block">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
                />
              </div>

              {passwordError && (
                <div className="rounded-lg bg-rose-500/10 border border-rose-500/20 p-3 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-rose-300">{passwordError}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={passwordSaving}
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-lg px-4 py-2.5 text-sm transition-all active:scale-[0.98]"
              >
                {passwordSaving ? "Updating…" : "Update Password"}
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}