"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";

export default function AnalyticsLoader() {
  const [consent, setConsent] = useState<"accepted" | "declined" | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("cookie-consent");
    if (stored === "accepted" || stored === "declined") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setConsent(stored as "accepted" | "declined");
    } else {
      // No consent yet – do nothing, banner will show
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setConsent(null);
    }
  }, []);

  // Only load tracking scripts if explicitly accepted
  if (consent !== "accepted") return null;

  return (
    <>
      <Analytics />
      <Script
        src="https://analytics.ahrefs.com/analytics.js"
        data-key="0KWpb4lQa7ZMwscJ/c+npA"
        strategy="afterInteractive"
      />
      <Script src="/crisp-init.js" strategy="lazyOnload" />
    </>
  );
}