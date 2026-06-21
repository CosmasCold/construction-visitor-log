// app/signup/SignupClient.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import {
  ArrowRight,
  Rocket,
  ShieldCheck,
  CreditCard,
  PhoneOff,
  MessageCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { logEvent } from "@/lib/analytics";

export default function SignupClient() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Password strength helper
  const getPasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.match(/[a-z]/)) score++;
    if (pwd.match(/[A-Z]/)) score++;
    if (pwd.match(/[0-9]/)) score++;
    if (pwd.match(/[^a-zA-Z0-9]/)) score++;
    return Math.min(score, 4);
  };

  const passwordStrength = getPasswordStrength(password);
  const strengthLabels = ["Weak", "Weak", "Okay", "Good", "Strong"];
  const strengthColors = [
    "bg-red-400",
    "bg-red-400",
    "bg-yellow-400",
    "bg-blue-400",
    "bg-green-400",
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // 1. Create the account
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Signup failed. Please try again.");
      setLoading(false);
      return;
    }

    // Track successful signup
    logEvent("signup_completed");

    // 2. Immediately sign the new user in
    const signInResult = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (signInResult?.error) {
      setError("Account created but sign in failed. Please sign in manually.");
      setLoading(false);
      return;
    }

    // 3. Go to the dashboard
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
        {/* ===== LEFT: Form ===== */}
        <div className="w-full md:w-1/2 bg-white/[0.10] backdrop-blur-lg rounded-2xl border border-white/10 shadow-card-raised p-8 text-white accent-glow aurora-bg">
          <h1 className="text-2xl font-bold tracking-tight text-center mb-2">
            Set up your first site in 2 minutes
          </h1>
          <p className="text-sm text-slate-400 text-center mb-6">
            14‑day trial · No credit card · No sales call
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
            />

            {/* Password with toggle */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password (8+ chars, 1 uppercase, 1 number)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Password Strength */}
            {password.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${strengthColors[passwordStrength]}`}
                    style={{ width: `${(passwordStrength / 4) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-slate-400 whitespace-nowrap">
                  {strengthLabels[passwordStrength]}
                </span>
              </div>
            )}

            {error && (
              <p className="text-rose-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-sky-400/50 text-white font-medium rounded-xl px-6 py-3 text-sm transition-all flex items-center justify-center gap-2 cta-pulse"
            >
              {loading ? "Creating account…" : "Start My Free Trial"}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>

            {/* Divider + Google button */}
            <div className="flex items-center gap-4 my-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-slate-500">or</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="w-full flex items-center justify-center gap-2 bg-white text-slate-800 font-medium rounded-xl px-6 py-3 text-sm hover:bg-slate-100 transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>

            {/* Trust Signals */}
            <div className="flex justify-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" /> SSL encrypted
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5 text-sky-400" /> No card required
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <PhoneOff className="w-3.5 h-3.5 text-sky-400" /> No sales calls
              </span>
            </div>
          </form>

          <p className="text-xs text-slate-500 text-center mt-4">
            Already have an account?{" "}
            <Link href="/admin/login" className="text-sky-400 hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        {/* ===== RIGHT: Value Sidebar ===== */}
        <div className="hidden md:flex md:w-1/2 bg-white/[0.10] backdrop-blur-lg rounded-2xl border border-white/10 p-8 text-white flex-col justify-between accent-glow aurora-bg">
          <div>
            <Rocket className="w-10 h-10 text-sky-400 mb-4" />
            <h2 className="text-xl font-bold mb-2">In 2 minutes, you&apos;ll:</h2>

            <ul className="space-y-4 mt-6">
              <li className="flex items-start gap-3">
                <span className="bg-sky-500/20 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 text-sky-400">
                  1
                </span>
                <span className="text-sm text-slate-300">
                  Create your <strong className="text-white">first location</strong>{" "}
                  <span className="text-slate-500 text-xs">(e.g., Houston Warehouse)</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-sky-500/20 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 text-sky-400">
                  2
                </span>
                <span className="text-sm text-slate-300">
                  <strong className="text-white">Your QR code is live</strong>{" "}
                  <span className="text-slate-500 text-xs">— visitors scan it with their phone</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-sky-500/20 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 text-sky-400">
                  3
                </span>
                <span className="text-sm text-slate-300">
                  <strong className="text-white">Start tracking</strong> visitors instantly{" "}
                  <span className="text-slate-500 text-xs">from your dashboard</span>
                </span>
              </li>
            </ul>

            {/* Testimonial */}
            <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/5">
              <p className="text-sm font-light italic text-slate-300">
                We have 8 locations and used to rely on paper logs at each site.
                SiteSafe gives me a single dashboard across all of them. I can see
                who&apos;s on site at any location in seconds.
              </p>
              <p className="text-xs font-medium mt-2 text-slate-400">
                – Marcus, Director of Facilities – TX
              </p>
            </div>
          </div>

          <div className="mt-6 text-xs text-slate-500 border-t border-white/5 pt-4 flex items-center gap-1.5">
            <MessageCircle className="w-3.5 h-3.5 text-sky-400" /> Questions?{" "}
            <a href="mailto:hello@thesift.space" className="text-sky-400 hover:underline">
              hello@thesift.space
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}