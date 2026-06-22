// app/api/cron/send-trial-emails/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { midTrialEmailHtml, finalTrialEmailHtml } from "@/lib/trialEmails";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const now = new Date();

    const trialCompanies = await prisma.company.findMany({
      where: {
        trialEndsAt: { gt: now },
        subscription: null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        trialEmailSequence: true,
      },
    });

    let sentCount = 0;

    for (const company of trialCompanies) {
      const daysSinceCreation = Math.floor(
        (now.getTime() - company.createdAt.getTime()) / (1000 * 60 * 60 * 24)
      );

      const sequence = company.trialEmailSequence || [];

      // Mid‑trial email (day 6‑7)
      if (!sequence.includes("mid_trial") && daysSinceCreation >= 6 && daysSinceCreation <= 8) {
        await sendEmail({
          to: company.email,
          subject: "Your trial is halfway — here's what you can do",
          htmlContent: midTrialEmailHtml(company.name),
        });
        await prisma.company.update({
          where: { id: company.id },
          data: { trialEmailSequence: { push: "mid_trial" } },
        });
        sentCount++;
      }

      // Final reminder (day 12‑13)
      if (!sequence.includes("final") && daysSinceCreation >= 12 && daysSinceCreation <= 14) {
        await sendEmail({
          to: company.email,
          subject: "Trial ends tomorrow — subscribe to keep your data",
          htmlContent: finalTrialEmailHtml(company.name),
        });
        await prisma.company.update({
          where: { id: company.id },
          data: { trialEmailSequence: { push: "final" } },
        });
        sentCount++;
      }
    }

    return NextResponse.json({ success: true, sent: sentCount });
  } catch (error) {
    console.error("Cron error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}