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
    <div
      className="min-h-screen flex items-center justify-center py-10 px-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white drop-shadow-md">{siteName}</h1>
          <p className="text-white/80 text-sm mt-1">Visitor sign‑in</p>
        </div>

        {/* Safety briefing – glass card with sky accent */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border-l-4 border-sky-400 p-5 shadow-xl">
          <h2 className="text-sm font-semibold text-sky-300 uppercase tracking-wide mb-1">
            Safety Briefing
          </h2>
          <p className="text-sm text-slate-200 leading-relaxed">{safetyBriefing}</p>
        </div>

        {/* Sign‑in form – glass card */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 p-6 shadow-2xl">
          <form onSubmit={handleSignIn} className="space-y-5">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full rounded-xl bg-white/80 border border-white/60 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400/60 focus:bg-white"
              />
              <input
                type="text"
                placeholder="Company / Trade"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
                className="w-full rounded-xl bg-white/80 border border-white/60 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400/60 focus:bg-white"
              />
              <input
                type="tel"
                placeholder="Phone (optional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl bg-white/80 border border-white/60 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400/60 focus:bg-white"
              />
              <input
                type="email"
                placeholder="Email (optional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl bg-white/80 border border-white/60 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400/60 focus:bg-white"
              />
              <input
                type="text"
                placeholder="Host name (optional)"
                value={hostName}
                onChange={(e) => setHostName(e.target.value)}
                className="w-full rounded-xl bg-white/80 border border-white/60 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400/60 focus:bg-white"
              />
            </div>

            <label className="flex items-start gap-2 text-sm text-slate-800">
              <input
                type="checkbox"
                checked={safetyAcknowledged}
                onChange={(e) => setSafetyAcknowledged(e.target.checked)}
                required
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-sky-500 focus:ring-sky-400"
              />
              <span>I have read and understand the site safety briefing.</span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 text-white font-semibold rounded-xl px-6 py-3 text-sm transition-colors shadow-md"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>

        {/* Active visitors – glass card */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">
              Currently on Site
            </h2>
            <span className="inline-flex items-center justify-center min-w-[24px] h-6 rounded-full bg-sky-100 text-sky-800 text-xs font-bold px-2">
              {activeVisitors.length}
            </span>
          </div>
          {activeVisitors.length === 0 ? (
            <p className="text-sm text-slate-500 italic">No active visitors</p>
          ) : (
            <ul className="divide-y divide-white/30">
              {activeVisitors.map((v) => (
                <li
                  key={v.id}
                  className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-800">{v.fullName}</p>
                    <p className="text-xs text-slate-500">{v.company}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      In since{" "}
                      {new Date(v.signedInAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => handleSignOut(v.id)}
                    className="self-start sm:self-center inline-flex items-center rounded-xl border border-white/50 bg-white/40 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-white/70 transition-colors"
                  >
                    Sign out
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="text-center text-xs text-white/70">Secure digital log – replaces paper forms</p>
      </div>
    </div>
  );
}