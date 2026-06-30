import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkinLimiter } from "@/lib/ratelimit";
import { fireWebhook } from "@/lib/webhook";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const { success } = await checkinLimiter.limit(ip);
  if (!success) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  try {
    const { expectedVisitorId, safetyAcknowledged, siteId, signatureUrl } = await request.json();

    // ── Lockdown check ─────────────────────────────────────────────
    const site = await prisma.site.findUnique({
      where: { id: siteId },
      select: { id: true, name: true, companyId: true, lockdownEnabled: true },
    });

    if (!site) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 });
    }

    if (site.lockdownEnabled) {
      return NextResponse.json(
        { error: "This site is currently in lockdown. Please contact security." },
        { status: 403 }
      );
    }

    const expected = await prisma.expectedVisitor.findUnique({ where: { id: expectedVisitorId } });
    if (!expected || expected.siteId !== siteId) {
      return NextResponse.json({ error: "Invalid visitor" }, { status: 400 });
    }

    // ── Blocklist check (name only — expected visitors don't have email/phone) ──
    if (site.companyId) {
      const blocklistMatch = await prisma.blocklistEntry.findFirst({
        where: {
          companyId: site.companyId,
          type: "name",
          value: expected.name,
        },
      });

      if (blocklistMatch) {
        return NextResponse.json(
          {
            blocked: true,
            message: "Your entry has been flagged. Please contact security.",
          },
          { status: 403 }
        );
      }
    }

    // Mark as signed in
    await prisma.expectedVisitor.update({
      where: { id: expectedVisitorId },
      data: { status: "signed_in" },
    });

    // Create the actual visitor log
    const visitor = await prisma.visitorLog.create({
      data: {
        fullName: expected.name,
        company: expected.company,
        phone: null,
        email: null,
        safetyAcknowledged: safetyAcknowledged || false,
        siteId,
        signatureUrl: signatureUrl || null,
      },
    });

    // ── Notifications ──────────────────────────────────────────────
    const companyRecord = await prisma.company.findUnique({
      where: { id: site.companyId },
      select: { slackWebhookUrl: true, webhookUrl: true },
    });

    if (companyRecord?.slackWebhookUrl) {
      const slackPayload = {
        text: ` Quick sign-in: *${visitor.fullName}* from *${visitor.company || "unknown"}* just signed in at *${site.name}*.`,
        username: "SiteSafe",
        icon_emoji: ":clipboard:",
      };
      fetch(companyRecord.slackWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(slackPayload),
      }).catch((err) => console.error("Slack notification failed:", err));
    }

    if (companyRecord?.webhookUrl) {
      fireWebhook(companyRecord.webhookUrl, "checkin.created", {
        visitorId: visitor.id,
        fullName: visitor.fullName,
        company: visitor.company,
        siteName: site.name,
        signedInAt: visitor.signedInAt,
      });
    }

    return NextResponse.json(visitor, { status: 200 });
  } catch (error) {
    console.error("Quick sign‑in error:", error);
    return NextResponse.json({ error: "Failed to sign in" }, { status: 500 });
  }
}