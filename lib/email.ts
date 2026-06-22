// lib/email.ts
export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  // If no API key is set, log the reset URL to console (development fallback)
  if (!process.env.BREVO_API_KEY) {
    console.log("📧 Password reset link (no email provider configured):", resetUrl);
    return;
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: "SiteSafe",
        email: "noreply@sitesafe.app",
      },
      to: [{ email }],
      subject: "Reset your SiteSafe password",
      htmlContent: `
        <p>You requested a password reset for your SiteSafe account.</p>
        <p><a href="${resetUrl}">Click here to reset your password</a></p>
        <p>This link expires in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Brevo email error:", error);
    throw new Error("Failed to send email");
  }
}

// Generic email sender — use for any transactional email
export async function sendEmail({
  to,
  subject,
  htmlContent,
}: {
  to: string;
  subject: string;
  htmlContent: string;
}) {
  if (!process.env.BREVO_API_KEY) {
    console.log(`📧 Email to ${to} (no provider): ${subject}`);
    return;
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: "SiteSafe",
        email: process.env.BREVO_SENDER_EMAIL || "noreply@sitesafe.app",
      },
      to: [{ email: to }],
      subject,
      htmlContent,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Brevo email error:", error);
    throw new Error("Failed to send email");
  }
}