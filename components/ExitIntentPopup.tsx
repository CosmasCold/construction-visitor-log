"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only fire if the mouse leaves the top of the page (exit intent)
      if (e.clientY <= 0 && !show) {
        setShow(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [show, dismissed]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
        <h3 className="text-xl font-semibold text-white mb-2">
          Wait! Grab the free audit checklist before you go.
        </h3>
        <p className="text-sm text-slate-300 mb-6">
          10 things an inspector checks in any visitor log — and exactly how to
          fix each one. Printable PDF, no sign‑up required.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/checklist"
            className="bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-xl px-6 py-3 text-sm transition-all duration-200"
            onClick={() => setShow(false)}
          >
            Send me the checklist
          </Link>
          <button
            onClick={() => {
              setShow(false);
              setDismissed(true);
            }}
            className="text-slate-400 hover:text-white text-sm transition-colors duration-150"
          >
            No thanks, I’m not interested
          </button>
        </div>
      </div>
    </div>
  );
}