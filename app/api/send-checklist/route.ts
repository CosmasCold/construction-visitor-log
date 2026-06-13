// app/api/send-checklist/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  try {
    await prisma.checklistRequest.create({ data: { email } });
  } catch (error) {
    console.error("Failed to store checklist request:", error);
  }

  const checklistUrl = `${req.nextUrl.origin}/checklist`;

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"></head>
    <body style="margin:0;padding:0;background-color:#f1f5f9;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;padding:20px;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.04);">
              <!-- Logo (favicon) -->
              <tr>
                <td style="padding:16px 20px 0;text-align:center;">
                  <img src="https://sitesafe.thesift.space/favicon.svg" alt="SiteSafe" style="height:36px;width:auto;display:block;margin:0 auto;" />
                </td>
              </tr>
              <!-- OG Image -->
              <tr>
                <td style="padding:0;">
                  <img src="https://sitesafe.thesift.space/og-image.png" alt="SiteSafe – smart visitor management" style="width:100%;height:auto;display:block;border:none;" />
                </td>
              </tr>
              <tr>
                <td style="padding:24px 20px;font-size:15px;line-height:1.6;color:#334155;">
                  <p style="margin:0 0 16px;">Hi,</p>
                  <p style="margin:0 0 16px;">Here is the visitor log audit checklist you requested.</p>
                  <p style="margin:0 0 24px;">
                    <a href="${checklistUrl}" target="_blank" style="background-color:#0ea5e9;color:#ffffff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;">Open Checklist</a>
                  </p>
                  <p style="margin:0 0 16px;">You can also print it directly from the page.</p>
                  <p style="margin:0;">– SiteSafe</p>
                </td>
              </tr>
              <tr>
                <td style="background-color:#f8fafc;padding:16px 20px;text-align:center;border-top:1px solid #e2e8f0;">
                  <p style="font-size:12px;color:#94a3b8;margin:0;">
                    &copy; 2026 SiteSafe &nbsp;·&nbsp;
                    <a href="https://sitesafe.thesift.space/terms" style="color:#94a3b8;text-decoration:underline;">Terms</a> &nbsp;·&nbsp;
                    <a href="https://sitesafe.thesift.space/privacy" style="color:#94a3b8;text-decoration:underline;">Privacy</a> &nbsp;·&nbsp;
                    <a href="mailto:cloudandclipboard@gmail.com" style="color:#94a3b8;text-decoration:underline;">Contact</a>
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
    sender: { name: "SiteSafe", email: "hello@sitesafe.thesift.space" },
    to: [{ email }],
    subject: "Your Visitor Log Audit Checklist",
    htmlContent,
  };

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("BREVO_API_KEY is not set");
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