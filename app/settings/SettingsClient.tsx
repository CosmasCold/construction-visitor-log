// app/settings/SettingsClient.tsx
"use client";

import { useState } from "react";
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
}

export default function SettingsClient({
  companyName,
  companyEmail,
  companySlug,
  subscriptionStatus,
  planName,
  currentPeriodEnd,
  hasStripeCustomer,
  hasSubscription,
  isTrialing,
  apiKey: initialApiKey,
}: SettingsClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(initialApiKey || "");
  const [keyLoading, setKeyLoading] = useState(false);
  const [keyCopied, setKeyCopied] = useState(false);

  async function handleSubscribe() {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: companyEmail, companyName }),
    });
    if (res.ok) {
      const { url } = await res.json();
      router.push(url);
    } else {
      alert("Failed to start subscription. Please try again.");
    }
    setLoading(false);
  }

  async function handleManageBilling() {
    setLoading(true);
    const res = await fetch("/api/settings/portal", { method: "POST" });
    if (res.ok) {
      const { url } = await res.json();
      router.push(url);
    } else {
      alert("Failed to open billing portal. Please try again.");
    }
    setLoading(false);
  }

  async function handleGenerateKey() {
    setKeyLoading(true);
    const res = await fetch("/api/settings/api-key", { method: "POST" });
    if (res.ok) {
      const data = await res.json();
      setApiKey(data.apiKey);
    } else {
      alert("Failed to generate API key.");
    }
    setKeyLoading(false);
  }

  function handleCopyKey() {
    navigator.clipboard.writeText(apiKey).then(() => {
      setKeyCopied(true);
      setTimeout(() => setKeyCopied(false), 2000);
    });
  }

  const showManageBilling = hasStripeCustomer && hasSubscription;
  const showSubscribe = !showManageBilling;

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

        {/* Company info */}
        <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6 space-y-4">
          <h2 className="text-lg font-semibold tracking-tight text-white">
            Company
          </h2>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Building className="w-3.5 h-3.5" /> Name
            </p>
            <p className="text-white font-medium">{companyName}</p>
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
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Status
            </p>
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

        {/* Billing */}
        <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6">
          <h2 className="text-lg font-semibold tracking-tight text-white mb-2">
            Billing
          </h2>
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

        {/* API Key */}
        <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6 space-y-4">
          <h2 className="text-lg font-semibold tracking-tight text-white flex items-center gap-2">
            <Key className="w-5 h-5 text-sky-400" /> API Access
          </h2>
          <p className="text-sm text-slate-300">
            Use this key to integrate SiteSafe with your own systems. Keep it
            secret!
          </p>
          {apiKey ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-xs text-white break-all select-all">
                  {apiKey}
                </code>
                <button
                  onClick={handleCopyKey}
                  className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              {keyCopied && (
                <p className="text-xs text-emerald-400">Copied to clipboard!</p>
              )}
              <button
                onClick={handleGenerateKey}
                disabled={keyLoading}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-1"
              >
                <RefreshCw className="w-4 h-4" />
                {keyLoading ? "Generating…" : "Regenerate key"}
              </button>
            </div>
          ) : (
            <button
              onClick={handleGenerateKey}
              disabled={keyLoading}
              className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-xl text-sm font-medium transition-colors inline-flex items-center gap-1"
            >
              <Key className="w-4 h-4" />
              {keyLoading ? "Generating…" : "Generate API key"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}