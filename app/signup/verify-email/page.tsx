import Link from "next/link";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md text-white text-center">
        <h1 className="text-2xl font-bold mb-2">Check your inbox</h1>
        <p className="text-slate-400 mb-4">
          We sent a verification link to your email. It usually arrives in 1‑2 minutes.
        </p>
        <p className="text-xs text-slate-500">
          <Link href="/admin/login" className="text-sky-400 hover:underline">
            Sign in
          </Link>{" "}
          once you’ve verified your account.
        </p>
      </div>
    </div>
  );
}