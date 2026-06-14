import { track } from "@vercel/analytics";

export function logEvent(name: string, data?: Record<string, unknown>) {
  // Vercel Analytics
  track(name, data);

  // Internal database log (fire and forget)
  fetch("/api/analytics/log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, data }),
  }).catch(() => {});
}