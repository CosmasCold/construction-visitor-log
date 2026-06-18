"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SettingsClient() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [originalName, setOriginalName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/company/settings")
      .then((res) => res.json())
      .then((data) => {
        setCompanyName(data.name || "");
        setOriginalName(data.name || "");
      })
      .catch(() => setMessage("Failed to load settings."));
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!companyName.trim() || companyName === originalName) return;
    setLoading(true);
    setMessage("");
    const res = await fetch("/api/company/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: companyName.trim() }),
    });
    if (res.ok) {
      setOriginalName(companyName);
      setMessage("Company name updated.");
      router.refresh();
    } else {
      setMessage("Failed to update.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised p-8 text-white">
        <h1 className="text-2xl font-bold tracking-tight mb-6">Settings</h1>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Company name
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
            />
          </div>
          {message && (
            <p
              className={`text-sm ${
                message.includes("Failed") ? "text-rose-400" : "text-emerald-400"
              }`}
            >
              {message}
            </p>
          )}
          <button
            type="submit"
            disabled={loading || companyName === originalName}
            className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-sky-400/50 text-white font-medium rounded-xl px-6 py-3 text-sm transition-all"
          >
            {loading ? "Saving…" : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}