// components/ChecklistForm.tsx
"use client";

import { useState } from "react";

export default function ChecklistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

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
        setEmail("");
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-6 text-center">
      <h3 className="text-lg font-semibold text-white mb-2">
        Free Visitor Log Audit Checklist
      </h3>
      <p className="text-sm text-slate-300 mb-4">
        10 things an inspector checks in any visitor log. Get the printable PDF delivered to your inbox.
      </p>

      {status === "sent" ? (
        <p className="text-emerald-400 text-sm font-medium">Checklist sent! Check your inbox.</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-64 bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all duration-200"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600 disabled:bg-sky-400/50 text-white font-medium rounded-xl px-6 py-3 text-sm transition-all duration-200 active:scale-[0.98]"
          >
            {status === "loading" ? "Sending…" : "Send me the checklist"}
          </button>
          {status === "error" && (
            <p className="text-rose-400 text-sm">Something went wrong. Please try again.</p>
          )}
        </form>
      )}
    </div>
  );
}