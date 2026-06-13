// components/ExitIntentPopup.tsx
"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { track } from "@vercel/analytics";

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Never show if already dismissed in this browser
    if (localStorage.getItem("exit_popup_hidden")) return;

    const handler = (e: MouseEvent) => {
      if (e.clientY <= 0 && !show) {
        setShow(true);
      }
    };

    document.addEventListener("mouseleave", handler);
    return () => document.removeEventListener("mouseleave", handler);
  }, [show]);

  function handleDismiss() {
    setShow(false);
    setDismissed(true);
    localStorage.setItem("exit_popup_hidden", "true");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/send-checklist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        track("checklist_submitted_exit_popup");
        setStatus("sent");
        setTimeout(() => {
          handleDismiss();
        }, 2000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (!show && dismissed) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-slate-900/95 border-t border-white/10 backdrop-blur-md shadow-2xl">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center gap-3 justify-between">
          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute top-2 right-3 sm:static text-slate-400 hover:text-white transition-colors"
            aria-label="Close popup"
          >
            <X className="w-5 h-5" />
          </button>

          {status === "sent" ? (
            <p className="text-emerald-400 text-sm font-medium flex-1 text-center sm:text-left">
              ✓ Checklist sent! Check your inbox.
            </p>
          ) : (
            <>
              <p className="text-sm text-white font-medium flex-1 text-center sm:text-left">
                Don&apos;t leave without your free audit checklist. 10 things inspectors look for.
              </p>
              <form onSubmit={handleSubmit} className="flex gap-2 w-full sm:w-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 sm:w-48 bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-sky-500 hover:bg-sky-600 disabled:bg-sky-400/50 text-white font-medium rounded-lg px-4 py-2 text-sm transition-colors"
                >
                  {status === "loading" ? "Sending…" : "Send"}
                </button>
              </form>
            </>
          )}

          {status === "error" && (
            <p className="text-rose-400 text-xs text-center w-full mt-1">Something went wrong. Please try again.</p>
          )}
        </div>
      </div>
    </div>
  );
}