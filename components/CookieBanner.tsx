"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShow(true);
    }
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    // Reload so AnalyticsLoader picks up the new value and scripts load
    window.location.reload();
  }

  function decline() {
    localStorage.setItem("cookie-consent", "declined");
    // Reload so no tracking scripts are loaded
    window.location.reload();
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