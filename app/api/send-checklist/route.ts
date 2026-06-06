// app/api/send-checklist/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const checklistUrl = `${req.nextUrl.origin}/checklist`;

  const payload = {
    sender: { name: "SiteSafe", email: "hello@sitesafe.thesift.space" },
    to: [{ email }],
    subject: "Your Visitor Log Audit Checklist",
    htmlContent: `
      <p>Hi,</p>
      <p>Here is the visitor log audit checklist you requested:</p>
      <p><a href="${checklistUrl}" style="background-color:#0ea5e9;color:#ffffff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">Open Checklist</a></p>
      <p>You can also print it directly from the page.</p>
      <p>– SiteSafe</p>
    `,
  };

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("BREVO_API_KEY is not set");
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    console.error("Brevo send failed:", await res.text());
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}