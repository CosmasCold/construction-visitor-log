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