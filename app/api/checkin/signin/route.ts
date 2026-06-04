// app/api/checkin/signin/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkinLimiter } from "@/lib/ratelimit";

export async function POST(request: Request) {
  // ---------- rate limit ----------
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const { success } = await checkinLimiter.limit(ip);
  if (!success) {
    return NextResponse.json({ error: "Too many requests. Please slow down." }, { status: 429 });
  }
  // -------------------------------

  try {
    const { fullName, company, phone, email, hostName, hostId, safetyAcknowledged, siteId } =
      await request.json();

    if (!fullName || !company || !siteId) {
      return NextResponse.json(
        { error: "Missing required fields: fullName, company, siteId" },
        { status: 400 }
      );
    }

    // Resolve host name
    let resolvedHostName = hostName || null;
    if (hostId) {
      const host = await prisma.host.findUnique({
        where: { id: hostId },
        select: { name: true, email: true },
      });
      if (host) {
        resolvedHostName = host.name;
      }
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
      },
    });

    // ---- send host notification email ----
    if (hostId) {
      const host = await prisma.host.findUnique({
        where: { id: hostId },
        select: { name: true, email: true },
      });
      if (host?.email) {
        const payload = {
          sender: { name: "SiteSafe", email: "noreply@sitesafe.app" },
          to: [{ email: host.email }],
          subject: `${visitor.fullName} has arrived`,
          htmlContent: `
            <p><strong>${visitor.fullName}</strong> from <strong>${visitor.company || "unknown"}</strong> has signed in and is waiting for you.</p>
            <p>SiteSafe visitor log</p>
          `,
        };
        await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "api-key": process.env.BREVO_API_KEY!,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }).catch((err) => console.error("Brevo email failed:", err));
      }
    }
    // ------------------------------------

    return NextResponse.json(visitor, { status: 200 });
  } catch (error) {
    console.error("Sign‑in error:", error);
    return NextResponse.json({ error: "Failed to sign in" }, { status: 500 });
  }
}