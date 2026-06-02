// app/forgot-password/reset/page.tsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) { setError("Missing reset token."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (password !== confirmPassword) { setError("Passwords do not match."); return; }

    setLoading(true);
    const res = await fetch("/api/auth/reset-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token, password }) });
    const data = await res.json();
    if (res.ok) { alert("Password reset successfully. You can now log in."); router.push("/admin/login"); }
    else { setError(data.error || "Something went wrong."); }
    setLoading(false);
  }

  if (!token) return <p className="text-rose-400 text-sm">Invalid reset link.</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input type="password" placeholder="New password (min. 8 characters)" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-white/10 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all duration-200" />
      </div>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full bg-white/10 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all duration-200" />
      </div>
      {error && <p className="text-rose-400 text-sm">{error}</p>}
      <button type="submit" disabled={loading} className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-sky-400/50 text-white font-medium tracking-wide rounded-xl px-6 py-3 text-sm transition-all duration-200 active:scale-[0.98]">
        {loading ? "Resetting…" : "Reset Password"}
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-sm w-full bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-8">
        <Link href="/admin/login" className="text-sky-400 hover:text-sky-300 text-sm inline-flex items-center gap-1 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to sign in
        </Link>
        <h2 className="text-xl font-semibold tracking-tight text-white flex items-center gap-2 mb-4">
          <Lock className="w-5 h-5 text-sky-400" /> Set new password
        </h2>
        <Suspense fallback={<p className="text-slate-400">Loading…</p>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}