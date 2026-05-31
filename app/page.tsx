// app/page.tsx
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-slate-800">SiteSafe Visitor Log</h1>
      <p className="mt-3 text-slate-600 max-w-md text-center">
        Replace paper logs with a digital check‑in for every construction site. 
        Free 14‑day trial, then $29/mo per company (unlimited sites).
      </p>
      <Link
        href="/signup"
        className="mt-8 bg-amber-500 hover:bg-amber-600 text-white font-medium px-8 py-3 rounded-xl transition-colors"
      >
        Start Free Trial
      </Link>
    </div>
  );
}