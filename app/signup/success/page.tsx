"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SignupSuccess() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<"loading" | "done" | "error">("loading");

  useEffect(() => {
    if (sessionId) {
      fetch(`/api/checkout/session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.companySlug) {
            // redirect to their new company dashboard
            window.location.href = `/dashboard/${data.companySlug}`;
          } else {
            setStatus("error");
          }
        });
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {status === "loading" && <p>Setting up your account…</p>}
      {status === "error" && <p>Something went wrong. Contact support.</p>}
    </div>
  );
}