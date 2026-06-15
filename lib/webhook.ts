import { createHmac } from "crypto";

export async function fireWebhook(
  url: string,
  event: string,
  data: Record<string, unknown>
) {
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event,
        data,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (err) {
    console.error("Webhook failed:", err);
  }
}

// Signed webhook – use when a company has a webhook secret configured
export async function fireSignedWebhook(
  url: string,
  event: string,
  data: Record<string, unknown>,
  secret: string
) {
  const payload = JSON.stringify({
    event,
    data,
    timestamp: new Date().toISOString(),
  });

  const signature = createHmac("sha256", secret)
    .update(payload)
    .digest("hex");

  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-SiteSafe-Signature": `sha256=${signature}`,
      },
      body: payload,
    });
  } catch (err) {
    console.error("Signed webhook failed:", err);
  }
}