// app/forgot-password/page.tsx
"use client";

import { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/forgot-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
    if (res.ok) setSent(true);
    else { const data = await res.json(); setError(data.error || "Something went wrong."); }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-sm w-full bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-8">
        <Link href="/admin/login" className="text-sky-400 hover:text-sky-300 text-sm inline-flex items-center gap-1 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to sign in
        </Link>
        <h2 className="text-xl font-semibold tracking-tight text-white flex items-center gap-2 mb-4">
          <Mail className="w-5 h-5 text-sky-400" /> Reset your password
        </h2>
        {sent ? (
          <p className="text-sm text-slate-300">If that email address is registered, you will receive a password reset link shortly.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/10 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all duration-200"
              />
            </div>
            {error && <p className="text-rose-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-sky-400/50 text-white font-medium tracking-wide rounded-xl px-6 py-3 text-sm transition-all duration-200 active:scale-[0.98]"
            >
              {loading ? "Sending…" : "Send Reset Link"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}