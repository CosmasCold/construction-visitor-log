// app/settings/SettingsClient.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SettingsClient({
  companyName,
  companyEmail,
  subscriptionStatus,
  hasStripeCustomer,
}: {
  companyName: string;
  companyEmail: string;
  subscriptionStatus: string;
  hasStripeCustomer: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleManageBilling() {
    setLoading(true);
    const res = await fetch("/api/settings/portal", { method: "POST" });
    if (res.ok) {
      const { url } = await res.json();
      router.push(url); // redirect to Stripe Customer Portal
    } else {
      alert("Failed to open billing portal. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
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
            <p className="text-sm text-slate-500">Subscription Status</p>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-800">
              {subscriptionStatus}
            </span>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Billing</h2>
          <p className="text-sm text-slate-600 mb-4">
            Manage your subscription, update payment methods, or cancel your plan.
          </p>
          <button
            onClick={handleManageBilling}
            disabled={loading}
            className="bg-red-600 text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-red-700 disabled:bg-red-400 transition-colors"
          >
            {loading ? "Redirecting…" : "Manage Billing"}
          </button>
        </div>
      </div>
    </div>
  );
}