// app/signup/success/SignupSuccessClient.tsx
"use client";

import { useEffect, useState } from "react";

export default function SignupSuccessClient() {
  // Read session_id once from the URL
  const [sessionId] = useState(() => {
    if (typeof window === "undefined") return null;
    const params = new URLSearchParams(window.location.search);
    return params.get("session_id");
  });

  // If sessionId is missing, immediately set error state – no effect needed
  const [error, setError] = useState(!sessionId);

  useEffect(() => {
    if (!sessionId) return; // error already set by initial state

    fetch(`/api/checkout/session?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.companySlug) {
          window.location.href = `/dashboard/${data.companySlug}`;
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true));
  }, [sessionId]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium">Something went wrong</p>
          <p className="text-sm text-slate-500 mt-2">
            Please contact support. Your payment may have succeeded but account setup failed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Setting up your account…</p>
    </div>
  );
}