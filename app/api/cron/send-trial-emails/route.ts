// app/api/cron/send-trial-emails/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const CRON_SECRET = process.env.CRON_SECRET!;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "cloudandclipboard@gmail.com";

export async function GET(req: NextRequest) {
  // Validate secret
  if (req.headers.get("Authorization") !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();

  // Find all companies in trial (trialEndsAt > now)
  const trialCompanies = await prisma.company.findMany({
    where: {
      trialEndsAt: { gt: now },
    },
    select: {
      id: true,
      name: true,
      email: true,
      slug: true,
      trialEmailSequence: true,
      createdAt: true,
    },
  });

  const dashboardBase = "https://sitesafe.thesift.space/dashboard?slug=";
  const settingsBase = "https://sitesafe.thesift.space/settings";

  for (const company of trialCompanies) {
    const daysSinceSignup = Math.floor(
      (now.getTime() - company.createdAt.getTime()) / (1000 * 60 * 60 * 24)
    );
    const dashboardUrl = `${dashboardBase}${company.slug}`;

    let emailHtml: string | null = null;
    let emailLabel = "";

    if (daysSinceSignup === 0 && !company.trialEmailSequence.includes("day0")) {
      emailHtml = emailDay0(company.name, dashboardUrl);
      emailLabel = "day0";
    } else if (daysSinceSignup === 2 && !company.trialEmailSequence.includes("day2")) {
      emailHtml = emailDay2(company.name, dashboardUrl);
      emailLabel = "day2";
    } else if (daysSinceSignup >= 12 && daysSinceSignup <= 13 && !company.trialEmailSequence.includes("day12")) {
      emailHtml = emailDay12(company.name, settingsBase);
      emailLabel = "day12";
    }

    if (emailHtml) {
      try {
        await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "api-key": process.env.BREVO_API_KEY!,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sender: { name: "Gabriel", email: "gabriel@cloudandclipboard.com" },
            to: [{ email: company.email }],
            bcc: [{ email: ADMIN_EMAIL }],   // ✅ you get a copy
            subject: getSubjectFor(emailLabel),
            htmlContent: emailHtml,
          }),
        });
        await prisma.company.update({
          where: { id: company.id },
          data: {
            trialEmailSequence: { push: emailLabel },
          },
        });
      } catch (err) {
        console.error(`Failed to send trial email to ${company.email}:`, err);
      }
    }
  }

  return NextResponse.json({ success: true });
}

function getSubjectFor(label: string): string {
  switch (label) {
    case "day0":
      return "Welcome to SiteSafe – let's set up your first site";
    case "day2":
      return "Export your first audit report in 1 click";
    case "day12":
      return "Your trial ends in 2 days – ready to upgrade?";
    default:
      return "SiteSafe";
  }
}

const emailDay0 = (name: string, url: string) => `
  <p>Hi ${name},</p>
  <p>Welcome to SiteSafe – your digital visitor log is ready.</p>
  <p>To get the most out of your trial, the first step is to <strong>create your first site</strong>. It takes 30 seconds and gives you a dedicated check‑in page with a QR code you can put on a tablet.</p>
  <p><a href="${url}" style="background-color:#0ea5e9; color:white; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:600;">Set up your first site</a></p>
  <p>Once your site is set up, share the check‑in link with your team and try signing in a test visitor.</p>
  <p>Any questions? Just reply to this email.</p>
  <p>– Gabriel</p>
`;

const emailDay2 = (name: string, url: string) => `
  <p>Hi ${name},</p>
  <p>Have you had a chance to try the visitor check‑in yet? If so, you've already collected some data.</p>
  <p>Now you can <strong>export an audit‑ready report</strong> in one click. Go to your dashboard, choose a date range, and download a CSV, Excel, or PDF. That's instant proof of who was on site and that they acknowledged your safety briefing.</p>
  <p><a href="${url}" style="background-color:#0ea5e9; color:white; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:600;">Export your first report</a></p>
  <p>This is the feature that saves you during inspections – give it a try.</p>
  <p>– Gabriel</p>
`;

const emailDay12 = (name: string, url: string) => `
  <p>Hi ${name},</p>
  <p>Your 14‑day free trial ends in 2 days. You've been using SiteSafe to check in visitors and stay audit‑ready – don't lose that when the trial expires.</p>
  <p>Upgrading takes one minute, and it's just $49/month for unlimited sites and visitors. No per‑site fees, no contracts.</p>
  <p><a href="${url}" style="background-color:#0ea5e9; color:white; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:600;">Upgrade your account</a></p>
  <p>If it's not a fit, no hard feelings. You can export your data at any time.</p>
  <p>– Gabriel</p>
`;