// app/signup/verify-email/page.tsx
import Link from "next/link";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-sm w-full bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-8 text-center">
        <h2 className="text-xl font-semibold text-white mb-2">Check your email</h2>
        <p className="text-sm text-slate-300 mb-4">
          We sent a verification link to your email address. Click the link to activate your account.
        </p>
        <Link
          href="/admin/login"
          className="text-sky-400 hover:text-sky-300 text-sm transition-colors"
        >
          Back to sign in
        </Link>
      </div>
    </div>
  );
}