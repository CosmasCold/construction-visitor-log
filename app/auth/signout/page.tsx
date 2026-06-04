// app/auth/signout/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { ArrowLeft } from "lucide-react";

export default function SignOutPage() {
  const router = useRouter();
  const callbackUrl = new URLSearchParams(window.location.search).get("callbackUrl") || "/";

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-sm w-full bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-8 text-center">
        <h2 className="text-xl font-semibold text-white mb-2">Sign out?</h2>
        <p className="text-sm text-slate-400 mb-6">
          Are you sure you want to sign out of SiteSafe?
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => router.push("/")}
            className="px-5 py-2 rounded-xl text-sm font-medium bg-white/10 text-white hover:bg-white/20 border border-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 inline mr-1" />
            Cancel
          </button>
          <button
            onClick={() => signOut({ callbackUrl })}
            className="px-5 py-2 rounded-xl text-sm font-medium bg-rose-600 text-white hover:bg-rose-700 transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}