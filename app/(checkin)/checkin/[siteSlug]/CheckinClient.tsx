// app/checkin/[siteSlug]/CheckinClient.tsx
"use client";

import { useState, useEffect, FormEvent } from "react";

type ActiveVisitor = {
  id: string;
  fullName: string;
  company: string;
  signedInAt: string;
};

export default function CheckinClient({
  siteId,
  siteName,
  safetyBriefing,
}: {
  siteId: string;
  siteName: string;
  safetyBriefing: string;
}) {
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [hostName, setHostName] = useState("");
  const [safetyAcknowledged, setSafetyAcknowledged] = useState(false);
  const [activeVisitors, setActiveVisitors] = useState<ActiveVisitor[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchActiveVisitors() {
      const res = await fetch(`/api/checkin/${siteId}/active`);
      if (res.ok) {
        const data = await res.json();
        setActiveVisitors(data);
      }
    }
    fetchActiveVisitors();
    const interval = setInterval(fetchActiveVisitors, 5000);
    return () => clearInterval(interval);
  }, [siteId]);

  async function handleSignIn(e: FormEvent) {
    e.preventDefault();
    if (!fullName || !company) {
      alert("Full name and company are required.");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/checkin/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName,
        company,
        phone: phone || null,
        email: email || null,
        hostName: hostName || null,
        safetyAcknowledged,
        siteId,
      }),
    });
    if (res.ok) {
      alert("Signed in successfully.");
      setFullName("");
      setCompany("");
      setPhone("");
      setEmail("");
      setHostName("");
      setSafetyAcknowledged(false);
      const refresh = await fetch(`/api/checkin/${siteId}/active`);
      if (refresh.ok) setActiveVisitors(await refresh.json());
    } else {
      alert("Sign‑in failed.");
    }
    setLoading(false);
  }

  async function handleSignOut(id: string) {
    const res = await fetch("/api/checkin/signout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      const refresh = await fetch(`/api/checkin/${siteId}/active`);
      if (refresh.ok) setActiveVisitors(await refresh.json());
    } else {
      alert("Sign‑out failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4 bg-slate-950/60">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white">{siteName}</h1>
          <p className="text-slate-400 text-sm mt-1">Visitor sign‑in</p>
        </div>

        {/* Safety briefing */}
        <div className="bg-sky-500/10 backdrop-blur-md rounded-2xl border-l-4 border-sky-400 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-sky-300 mb-1">Safety Briefing</h2>
          <p className="text-sm text-slate-200 leading-relaxed">{safetyBriefing}</p>
        </div>

        {/* Sign‑in form */}
        <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-6">
          <form onSubmit={handleSignIn} className="space-y-4">
            <input
              type="text"
              placeholder="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-transparent transition-all duration-200"
            />
            <input
              type="text"
              placeholder="Company / Trade"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-transparent transition-all duration-200"
            />
            <input
              type="tel"
              placeholder="Phone (optional)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-transparent transition-all duration-200"
            />
            <input
              type="email"
              placeholder="Email (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-transparent transition-all duration-200"
            />
            <input
              type="text"
              placeholder="Host name (optional)"
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-transparent transition-all duration-200"
            />

            <label className="flex items-start gap-2 text-sm text-slate-200">
              <input
                type="checkbox"
                checked={safetyAcknowledged}
                onChange={(e) => setSafetyAcknowledged(e.target.checked)}
                required
                className="mt-0.5 h-4 w-4 rounded border-slate-600 bg-white/10 text-sky-500 focus:ring-sky-500/50"
              />
              <span>I have read and understand the site safety briefing.</span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-sky-400/50 text-white font-medium tracking-wide rounded-xl px-6 py-3 text-sm transition-all duration-200 active:scale-[0.98]"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>

        {/* Active visitors */}
        <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-200">Currently on Site</h2>
            <span className="inline-flex items-center justify-center min-w-[24px] h-6 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold px-2">
              {activeVisitors.length}
            </span>
          </div>
          {activeVisitors.length === 0 ? (
            <p className="text-sm text-slate-400 italic">No active visitors</p>
          ) : (
            <ul className="divide-y divide-white/5">
              {activeVisitors.map((v) => (
                <li key={v.id} className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-white">{v.fullName}</p>
                    <p className="text-xs text-slate-400">{v.company}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      In since {new Date(v.signedInAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  <button
                    onClick={() => handleSignOut(v.id)}
                    className="self-start sm:self-center inline-flex items-center rounded-xl border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/20 transition-all duration-200 active:scale-[0.98]"
                  >
                    Sign out
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="text-center text-xs text-slate-500">Secure digital log – replaces paper forms</p>
      </div>
    </div>
  );
}