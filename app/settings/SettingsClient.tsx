// app/settings/SettingsClient.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SettingsClient({
  companyName,
  companyEmail,
  companySlug,
  subscriptionStatus,
  planName,
  currentPeriodEnd,
  hasStripeCustomer,
  isTrialing,
}: {
  companyName: string;
  companyEmail: string;
  companySlug: string;
  subscriptionStatus: string;
  planName: string;
  currentPeriodEnd: string | null;
  hasStripeCustomer: boolean;
  isTrialing: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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

  // Determine which billing button to show
  const showManageBilling = !!hasStripeCustomer && subscriptionStatus !== "inactive";
  const showSubscribe = !showManageBilling; // includes trial users and expired

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <Link
          href={`/dashboard?slug=${companySlug}`}
          className="text-sky-400 hover:text-sky-300 text-sm inline-flex items-center gap-1"
        >
          ← Back to Dashboard
        </Link>
        <h1 className="text-2xl font-semibold text-white">Settings</h1>

        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-800">Company</h2>
          <div>
            <p className="text-sm text-slate-500">Name</p>
            <p className="text-slate-800 font-medium">{companyName}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Email</p>
            <p className="text-slate-800 font-medium">{companyEmail}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Plan</p>
            <p className="text-slate-800 font-medium">{planName}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Status</p>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-800">
              {subscriptionStatus}
            </span>
          </div>
          {currentPeriodEnd && (
            <div>
              <p className="text-sm text-slate-500">Next billing / trial end date</p>
              <p className="text-slate-800 font-medium text-sm">
                {new Date(currentPeriodEnd).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-2">Billing</h2>
          {showManageBilling ? (
            <>
              <p className="text-sm text-slate-600 mb-4">
                Update your payment method, view invoices, or cancel your plan.
              </p>
              <button
                onClick={handleManageBilling}
                disabled={loading}
                className="bg-red-600 text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-red-700 disabled:bg-red-400 transition-colors"
              >
                {loading ? "Redirecting…" : "Manage Billing"}
              </button>
            </>
          ) : (
            <>
              <p className="text-sm text-slate-600 mb-4">
                {isTrialing
                  ? "You are on a free trial. When ready, subscribe to keep using SiteSafe."
                  : "No active plan. Subscribe to continue using SiteSafe."}
              </p>
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="bg-sky-600 text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-sky-700 disabled:bg-sky-400 transition-colors"
              >
                {loading ? "Redirecting…" : "Subscribe Now"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}