// app/api/send-audit-report/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, score } = await request.json();

  if (!email || score === undefined) {
    return NextResponse.json({ error: "Missing email or score" }, { status: 400 });
  }

  let ratingText = "High risk";
  let color = "#ef4444";
  let nextSteps = [
    "Switch to a digital visitor log immediately.",
    "Make safety briefings mandatory and non‑skippable.",
    "Set up automatic timestamps for all entries.",
  ];
  if (score >= 7 && score <= 9) {
    ratingText = "Almost there";
    color = "#0ea5e9";
    nextSteps = [
      "Add host notifications so the person being visited knows instantly.",
      "Enable pre‑registration so expected visitors can sign in with one tap.",
      "Consider capturing visitor photos for added security.",
    ];
  } else if (score === 10) {
    ratingText = "Fully covered";
    color = "#10b981";
    nextSteps = [
      "You’re doing everything right! Keep maintaining your audit‑ready records.",
      "Share your success with a badge on your website (included in the audit page).",
      "Explore our REST API to integrate with your other tools.",
    ];
  } else if (score <= 3) {
    nextSteps = [
      "Switch to a digital visitor log immediately.",
      "Make safety briefings mandatory and non‑skippable.",
      "Set up automatic timestamps for all entries.",
      "Ensure you can export filtered reports quickly.",
    ];
  } else if (score <= 6) {
    ratingText = "Moderate risk";
    color = "#f59e0b";
    nextSteps = [
      "Upgrade to a digital log that enforces safety acknowledgment.",
      "Add host notifications and pre‑registration.",
      "Test your ability to export a date‑filtered report in under 60 seconds.",
    ];
  }

  const nextStepsHtml = nextSteps
    .map((step) => `<li style="margin-bottom:8px;">${step}</li>`)
    .join("");

  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head><meta charset="UTF-8"></head>
  <body style="margin:0;padding:0;background-color:#f1f5f9;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;padding:20px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.04);">
            <tr>
              <td style="padding:16px 20px 0;text-align:center;">
                <img src="https://sitesafe.thesift.space/favicon.svg" alt="SiteSafe" style="height:36px;width:auto;display:block;margin:0 auto;" />
              </td>
            </tr>
            <tr>
              <td style="padding:0;">
                <img src="https://sitesafe.thesift.space/og-image.png" alt="SiteSafe – smart visitor management" style="width:100%;height:auto;display:block;border:none;" />
              </td>
            </tr>
            <tr>
              <td style="padding:24px 20px;font-size:15px;line-height:1.6;color:#334155;">
                <p style="margin:0 0 16px;">Hi,</p>
                <p style="margin:0 0 16px;">Here are your <strong>SiteSafe self‑audit results</strong>.</p>
                <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:20px;text-align:center;margin-bottom:24px;">
                  <div style="font-size:40px;font-weight:bold;color:#0f172a;">${score}/10</div>
                  <div style="font-size:18px;font-weight:600;color:${color};margin-top:4px;">${ratingText}</div>
                </div>
                <p style="margin:0 0 12px;">Based on your answers, here are the next steps to strengthen your visitor log:</p>
                <ul style="padding-left:20px;margin:0 0 24px;color:#334155;">
                  ${nextStepsHtml}
                </ul>
                <p style="margin:0 0 16px;">
                  <a href="https://sitesafe.thesift.space/audit" target="_blank" style="color:#0ea5e9;font-weight:600;">Retake the audit</a> anytime, or 
                  <a href="https://sitesafe.thesift.space/signup" target="_blank" style="color:#0ea5e9;font-weight:600;">start a free trial</a> to fix everything automatically.
                </p>
                <p style="margin:0;">– SiteSafe</p>
              </td>
            </tr>
            <tr>
              <td style="background-color:#f8fafc;padding:16px 20px;text-align:center;border-top:1px solid #e2e8f0;">
                <p style="font-size:12px;color:#94a3b8;margin:0;">
                  &copy; 2026 SiteSafe &nbsp;·&nbsp;
                  <a href="https://sitesafe.thesift.space/terms" style="color:#94a3b8;text-decoration:underline;">Terms</a> &nbsp;·&nbsp;
                  <a href="https://sitesafe.thesift.space/privacy" style="color:#94a3b8;text-decoration:underline;">Privacy</a> &nbsp;·&nbsp;
                  <a href="mailto:hello@sitesafe.thesift.space" style="color:#94a3b8;text-decoration:underline;">Contact</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;

  const payload = {
    sender: { name: "SiteSafe", email: "hello@sitesafe.thesift.space" }, // ✅ verified sender
    to: [{ email }],
    subject: `Your SiteSafe Audit Score: ${score}/10 – ${ratingText}`,
    htmlContent,
  };

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    console.error("Brevo send failed:", await res.text());
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}