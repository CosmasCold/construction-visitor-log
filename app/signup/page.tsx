// app/signup/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!email.includes("@") || !email.includes(".")) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!companyName.trim()) {
      newErrors.companyName = "Company name is required.";
    }
    if (!password || password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    return newErrors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        companyName: companyName.trim(),
        password,
      }),
    });

    const data = await res.json();
    if (res.ok && data.url) {
      router.push(data.url);
    } else {
      setErrors({ form: data.error || "Something went wrong." });
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-sm w-full bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Create your account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Company name */}
          <div>
            <input
              type="text"
              placeholder="Company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white/70 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white/70 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password (min. 8 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white/70 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Confirm password */}
          <div>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white/70 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          {errors.form && <p className="text-red-500 text-sm">{errors.form}</p>}

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