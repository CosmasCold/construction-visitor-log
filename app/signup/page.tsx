// app/signup/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!companyName.trim()) {
      setError("Company name is required.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, companyName: companyName.trim() }),
    });

    const data = await res.json();
    if (res.ok && data.url) {
      router.push(data.url);
    } else {
      setError(data.error || "Something went wrong.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-sm w-full bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Start your free trial</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white/70 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white/70 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 text-white font-medium rounded-xl px-6 py-3 text-sm transition-colors"
          >
            {loading ? "Redirecting…" : "Continue to Payment"}
          </button>
        </form>
      </div>
    </div>
  );
}