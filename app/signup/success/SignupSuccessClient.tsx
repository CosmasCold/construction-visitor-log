// app/signup/success/SignupSuccessClient.tsx
"use client";

import { useEffect, useState } from "react";

export default function SignupSuccessClient() {
  // Read session_id once from the URL (no hook, no Suspense)
  const [sessionId] = useState(() => {
    if (typeof window === "undefined") return null;
    const params = new URLSearchParams(window.location.search);
    return params.get("session_id");
  });

  // Initial status: error if sessionId is missing, otherwise loading
  const [status, setStatus] = useState<"loading" | "done" | "error">(
    sessionId ? "loading" : "error"
  );

  useEffect(() => {
    if (!sessionId) return; // already in error state, nothing to do

    fetch(`/api/checkout/session?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.companySlug) {
          window.location.href = `/dashboard/${data.companySlug}`;
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {status === "loading" && <p>Setting up your account…</p>}
      {status === "error" && <p>Something went wrong. Contact support.</p>}
    </div>
  );
}