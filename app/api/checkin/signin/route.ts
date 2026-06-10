// app/api/checkin/signin/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkinLimiter } from "@/lib/ratelimit";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const { success } = await checkinLimiter.limit(ip);
  if (!success) {
    return NextResponse.json({ error: "Too many requests. Please slow down." }, { status: 429 });
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
      photoUrl,          // ✅ capture the photo URL
    } = await request.json();

    if (!fullName || !company || !siteId) {
      return NextResponse.json(
        { error: "Missing required fields: fullName, company, siteId" },
        { status: 400 }
      );
    }

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
        answers: answers || null,
        photoUrl: photoUrl || null,   // ✅ store the photo
      },
    });

    // (notification email code unchanged…)

    return NextResponse.json(visitor, { status: 200 });
  } catch (error) {
    console.error("Sign‑in error:", error);
    return NextResponse.json({ error: "Failed to sign in" }, { status: 500 });
  }
}