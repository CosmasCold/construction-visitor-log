"use client";

import { useState } from "react";
import Link from "next/link";

function getInitialConsent(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("cookie-consent");
}

export default function CookieBanner() {
  const [show, setShow] = useState(() => !getInitialConsent());

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
  }

  function decline() {
    localStorage.setItem("cookie-consent", "declined");
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 rounded-xl border border-white/10 bg-[#0f172a]/95 backdrop-blur-md p-5 shadow-2xl">
      <p className="text-sm text-slate-300 mb-3">
        We use cookies for authentication and analytics. See our{" "}
        <Link href="/privacy" className="text-sky-400 hover:text-sky-300 underline">
          Privacy Policy
        </Link>
        .
      </p>
      <div className="flex gap-2">
        <button
          onClick={accept}
          className="flex-1 bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium rounded-lg px-4 py-2 transition-colors"
        >
          Accept
        </button>
        <button
          onClick={decline}
          className="flex-1 bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium rounded-lg px-4 py-2 transition-colors border border-white/10"
        >
          Decline
        </button>
      </div>
    </div>
  );
}