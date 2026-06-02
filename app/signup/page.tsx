// app/signup/page.tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { UserPlus, Building, Mail, Lock } from "lucide-react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!email.includes("@") || !email.includes(".")) newErrors.email = "Please enter a valid email address.";
    if (!companyName.trim()) newErrors.companyName = "Company name is required.";
    if (!password || password.length < 8) newErrors.password = "Password must be at least 8 characters.";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
    return newErrors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    setErrors({});
    setLoading(true);

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, companyName: companyName.trim(), password }),
    });

    const data = await res.json();
    if (res.ok && data.success) {
      const result = await signIn("credentials", { email: data.email, password: data.password, redirect: false, callbackUrl: `/dashboard?slug=${data.companySlug}` });
      if (result?.error) setErrors({ form: "Signup succeeded but login failed. Please use the sign in page." });
      else window.location.href = `/dashboard?slug=${data.companySlug}`;
    } else {
      setErrors({ form: data.error || "Signup failed." });
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-sm w-full bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-8">
        <h2 className="text-xl font-semibold tracking-tight text-white flex items-center gap-2 mb-4">
          <UserPlus className="w-5 h-5 text-sky-400" /> Create your account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full bg-white/10 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all duration-200"
            />
            {errors.companyName && <p className="text-rose-400 text-xs mt-1">{errors.companyName}</p>}
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/10 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all duration-200"
            />
            {errors.email && <p className="text-rose-400 text-xs mt-1">{errors.email}</p>}
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="password"
              placeholder="Password (min. 8 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all duration-200"
            />
            {errors.password && <p className="text-rose-400 text-xs mt-1">{errors.password}</p>}
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-white/10 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all duration-200"
            />
            {errors.confirmPassword && <p className="text-rose-400 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>
          {errors.form && <p className="text-rose-400 text-sm">{errors.form}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-sky-400/50 text-white font-medium tracking-wide rounded-xl px-6 py-3 text-sm transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            {loading ? "Creating account…" : "Start Free Trial"}
          </button>
        </form>
      </div>
    </div>
  );
}