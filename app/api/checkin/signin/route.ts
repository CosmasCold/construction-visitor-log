// app/api/checkin/signin/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkinLimiter } from "@/lib/ratelimit";
import { fireWebhook } from "@/lib/webhook";

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
        // Alert notifications
        const companyRecord = await prisma.company.findUnique({
          where: { id: site.companyId },
          select: {
            slackWebhookUrl: true,
            webhookUrl: true,
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
          }).catch((err) =>
            console.error("Slack blocklist alert failed:", err)
          );
        }

        // Email notification to company owners
        const ownerEmails = companyRecord?.users.map((u) => u.email) ?? [];
        if (ownerEmails.length > 0) {
          const emailPayload = {
            sender: {
              name: "SiteSafe",
              email: "hello@sitesafe.thesift.space",
            },
            to: ownerEmails.map((email) => ({ email })),
            subject: `Blocked visitor attempt at ${site.name}`,
            htmlContent: `
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
                        <td style="padding:24px 20px;font-size:15px;line-height:1.6;color:#334155;">
                          <p style="margin:0 0 16px;">A visitor was <strong>blocked by your watchlist</strong> and not allowed to sign in.</p>
                          <table role="presentation" cellpadding="8" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;width:100%;margin-bottom:16px;">
                            <tr><td style="color:#334155;font-weight:600;">Name</td><td style="color:#0f172a;">${fullName}</td></tr>
                            <tr><td style="color:#334155;font-weight:600;">Company</td><td style="color:#0f172a;">${company}</td></tr>
                            <tr><td style="color:#334155;font-weight:600;">Phone</td><td style="color:#0f172a;">${phone || "—"}</td></tr>
                            <tr><td style="color:#334155;font-weight:600;">Email</td><td style="color:#0f172a;">${email || "—"}</td></tr>
                            <tr><td style="color:#334155;font-weight:600;">Site</td><td style="color:#0f172a;">${site.name}</td></tr>
                          </table>
                          <p style="margin:0 0 16px;">No further action is required — the visitor was denied entry. If this was a mistake, you can remove the entry from your dashboard.</p>
                          <p style="margin:0;">– SiteSafe</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="background-color:#f8fafc;padding:16px 20px;text-align:center;border-top:1px solid #e2e8f0;">
                          <p style="font-size:12px;color:#94a3b8;margin:0;">
                            &copy; 2026 SiteSafe &nbsp;·&nbsp;
                            <a href="https://sitesafe.thesift.space/terms" style="color:#94a3b8;text-decoration:underline;">Terms</a> &nbsp;·&nbsp;
                            <a href="https://sitesafe.thesift.space/privacy" style="color:#94a3b8;text-decoration:underline;">Privacy</a>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>
            `,
          };
          fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
              "api-key": process.env.BREVO_API_KEY!,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(emailPayload),
          }).catch((err) =>
            console.error("Brevo blocklist email failed:", err)
          );
        }

        // Fire webhook for blocklist hit
        if (companyRecord?.webhookUrl) {
          fireWebhook(companyRecord.webhookUrl, "blocklist.hit", {
            fullName,
            company,
            siteName: site.name,
            matchedEntry: blocklistMatch.value,
          });
        }

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

    // Resolve host name
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
        select: { slackWebhookUrl: true, webhookUrl: true },
      });
      if (companyRecord?.slackWebhookUrl) {
        const slackPayload = {
          text: `🚪 New visitor: *${visitor.fullName}* from *${visitor.company || "unknown"}* just signed in at *${site.name}*${resolvedHostName ? ` (host: ${resolvedHostName})` : ""}.`,
          username: "SiteSafe",
          icon_emoji: ":clipboard:",
        };
        fetch(companyRecord.slackWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(slackPayload),
        }).catch((err) => console.error("Slack notification failed:", err));
      }

      // Fire webhook for checkin.created
      if (companyRecord?.webhookUrl) {
        fireWebhook(companyRecord.webhookUrl, "checkin.created", {
          visitorId: visitor.id,
          fullName: visitor.fullName,
          company: visitor.company,
          siteName: site.name,
          signedInAt: visitor.signedInAt,
        });
      }
    }

    // Host email notification (unchanged)
    if (hostId) {
      const host = await prisma.host.findUnique({
        where: { id: hostId },
        select: { email: true },
      });
      if (host?.email) {
        const emailPayload = {
          sender: {
            name: "SiteSafe",
            email: "hello@sitesafe.thesift.space",
          },
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
    return NextResponse.json(
      { error: "Failed to sign in" },
      { status: 500 }
    );
  }
}