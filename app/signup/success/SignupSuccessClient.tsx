// app/signup/success/SignupSuccessClient.tsx
"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";

export default function SignupSuccessClient() {
  const [sessionId] = useState(() => {
    if (typeof window === "undefined") return null;
    const params = new URLSearchParams(window.location.search);
    return params.get("session_id");
  });

  const [error, setError] = useState(!sessionId);
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    if (!sessionId) return;

    // First, get company slug and password from our verification endpoint
    fetch(`/api/checkout/session?session_id=${sessionId}`)
      .then((res) => res.json())
      .then(async (data) => {
        if (data.companySlug && data.email && data.passwordPlain) {
          // Auto‑login with credentials
          const result = await signIn("credentials", {
            email: data.email,
            password: data.passwordPlain,
            redirect: false,
          });

          if (result?.error) {
            setError(true);
          } else {
            // Redirect to dashboard
            window.location.href = `/dashboard/${data.companySlug}`;
          }
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
            Your account may have been created. Please contact support if you need immediate access.
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