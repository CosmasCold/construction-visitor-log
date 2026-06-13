import { NextRequest, NextResponse } from "next/server";

const BREVO_API_KEY = process.env.BREVO_API_KEY!;
const BREVO_SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || "cloudandclipboard@gmail.com";
const BREVO_SENDER_NAME = process.env.BREVO_SENDER_NAME || "SiteSafe";

export async function POST(request: NextRequest) {
  try {
    const { email, score, answers } = await request.json();

    if (!email || score === undefined) {
      return NextResponse.json({ success: false, error: "Missing email or score" }, { status: 400 });
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
        "You're doing everything right! Keep maintaining your audit‑ready records.",
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

    // Build HTML email
    const htmlContent = `
    <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: auto; background: #0f172a; color: #e2e8f0; padding: 24px; border-radius: 12px;">
      <h2 style="color: white; margin-bottom: 8px;">Your Visitor Log Audit Results</h2>
      <p style="color: #94a3b8; margin-bottom: 24px;">Thanks for taking the SiteSafe self‑audit. Here’s your personalised report.</p>
      
      <div style="background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 24px;">
        <div style="font-size: 40px; font-weight: bold; color: white;">${score}/10</div>
        <div style="font-size: 16px; font-weight: 600; color: ${color}; margin-top: 4px;">${ratingText}</div>
      </div>
      
      <h3 style="color: white; margin-bottom: 8px;">Next steps to improve</h3>
      <ul style="color: #cbd5e1; padding-left: 20px; line-height: 1.6; margin-bottom: 24px;">
        ${nextSteps.map((step) => `<li style="margin-bottom: 6px;">${step}</li>`).join("")}
      </ul>
      
      <p style="color: #94a3b8; margin-bottom: 20px;">SiteSafe automatically fixes all 10 audit points — mandatory safety acknowledgment, real‑time dashboard, instant exports, and more.</p>
      
      <a href="https://sitesafe.thesift.space/signup" style="display: inline-block; background: white; color: #0f172a; font-weight: 600; padding: 12px 24px; border-radius: 8px; text-decoration: none;">Start free trial →</a>
      
      <p style="color: #64748b; font-size: 12px; margin-top: 32px;">No credit card · No sales call · Cancel anytime</p>
    </div>`;

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: BREVO_SENDER_NAME, email: BREVO_SENDER_EMAIL },
        to: [{ email }],
        subject: `Your SiteSafe Audit Score: ${score}/10 – ${ratingText}`,
        htmlContent,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Brevo error:", error);
      return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Audit report email error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}