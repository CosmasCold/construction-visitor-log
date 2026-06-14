// app/api/checkin/signin/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkinLimiter } from "@/lib/ratelimit";

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const { success } = await checkinLimiter.limit(ip);
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please slow down." },
      { status: 429 }
    );
  }

  try {
    const {
      fullName,
      company,
      phone,
      email,
      hostName,
      hostId,
      safetyAcknowledged,
      siteId,
      answers,
      photoUrl,
    } = await request.json();

    if (!fullName || !company || !siteId) {
      return NextResponse.json(
        { error: "Missing required fields: fullName, company, siteId" },
        { status: 400 }
      );
    }

    // ── Blocklist check ────────────────────────────────────────────
    const site = await prisma.site.findUnique({
      where: { id: siteId },
      select: { name: true, companyId: true },
    });

    if (site?.companyId) {
      const blocklistMatch = await prisma.blocklistEntry.findFirst({
        where: {
          companyId: site.companyId,
          OR: [
            { type: "name", value: fullName },
            email ? { type: "email", value: email } : {},
            phone ? { type: "phone", value: phone } : {},
          ],
        },
      });

      if (blocklistMatch) {
        // ── Alert notifications ─────────────────────────────────
        const companyRecord = await prisma.company.findUnique({
          where: { id: site.companyId },
          select: {
            slackWebhookUrl: true,
            users: {
              where: { role: "company_owner" },
              select: { email: true },
            },
          },
        });

        // Slack notification
        if (companyRecord?.slackWebhookUrl) {
          const slackPayload = {
            text: `🚨 Blocked visitor attempt: *${fullName}* (${company}) tried to sign in at *${site.name}* but was flagged by the watchlist.`,
            username: "SiteSafe",
            icon_emoji: ":warning:",
          };
          fetch(companyRecord.slackWebhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(slackPayload),
          }).catch((err) => console.error("Slack blocklist alert failed:", err));
        }

        // Email notification to all company owners
        const ownerEmails = companyRecord?.users.map((u) => u.email) ?? [];
        if (ownerEmails.length > 0) {
          const emailPayload = {
            sender: { name: "SiteSafe", email: "noreply@sitesafe.app" },
            to: ownerEmails.map((email) => ({ email })),
            subject: `🚨 Blocked visitor attempt at ${site.name}`,
            htmlContent: `<p>A visitor was blocked by your watchlist:</p>
              <ul>
                <li><strong>Name:</strong> ${fullName}</li>
                <li><strong>Company:</strong> ${company}</li>
                <li><strong>Phone:</strong> ${phone || "—"}</li>
                <li><strong>Email:</strong> ${email || "—"}</li>
                <li><strong>Site:</strong> ${site.name}</li>
              </ul>
              <p>They were not allowed to sign in.</p>`,
          };
          fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
              "api-key": process.env.BREVO_API_KEY!,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(emailPayload),
          }).catch((err) => console.error("Brevo blocklist email failed:", err));
        }
        // ─────────────────────────────────────────────────────────

        return NextResponse.json(
          {
            blocked: true,
            message:
              "Your entry has been flagged. Please contact security.",
          },
          { status: 403 }
        );
      }
    }
    // ────────────────────────────────────────────────────────────────

    let resolvedHostName = hostName || null;
    if (hostId) {
      const host = await prisma.host.findUnique({
        where: { id: hostId },
        select: { name: true, email: true },
      });
      if (host) resolvedHostName = host.name;
    }

    const visitor = await prisma.visitorLog.create({
      data: {
        fullName,
        company,
        phone: phone || null,
        email: email || null,
        hostName: resolvedHostName,
        safetyAcknowledged: safetyAcknowledged || false,
        siteId,
        answers: answers || null,
        photoUrl: photoUrl || null,
      },
    });

    // ── Slack notification (normal sign‑in) ──────────────────────
    if (site) {
      const companyRecord = await prisma.company.findUnique({
        where: { id: site.companyId },
        select: { slackWebhookUrl: true },
      });
      if (companyRecord?.slackWebhookUrl) {
        const siteName = site.name;
        const slackPayload = {
          text: `🚪 New visitor: *${visitor.fullName}* from *${visitor.company || "unknown"}* just signed in at *${siteName}*${resolvedHostName ? ` (host: ${resolvedHostName})` : ""}.`,
          username: "SiteSafe",
          icon_emoji: ":clipboard:",
        };
        fetch(companyRecord.slackWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(slackPayload),
        }).catch((err) => console.error("Slack notification failed:", err));
      }
    }
    // ──────────────────────────────────────────────────────────────

    // Host email notification (unchanged)
    if (hostId) {
      const host = await prisma.host.findUnique({
        where: { id: hostId },
        select: { email: true },
      });
      if (host?.email) {
        const emailPayload = {
          sender: { name: "SiteSafe", email: "hello@sitesafe.thesift.space" },
          to: [{ email: host.email }],
          subject: `${visitor.fullName} has arrived`,
          htmlContent: `<p><strong>${visitor.fullName}</strong> from <strong>${visitor.company || "unknown"}</strong> has signed in and is waiting for you.</p>`,
        };
        fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "api-key": process.env.BREVO_API_KEY!,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailPayload),
        }).catch((err) => console.error("Brevo email failed:", err));
      }
    }

    return NextResponse.json(visitor, { status: 200 });
  } catch (error) {
    console.error("Sign‑in error:", error);
    return NextResponse.json({ error: "Failed to sign in" }, { status: 500 });
  }
}