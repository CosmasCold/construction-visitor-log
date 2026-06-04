import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkinLimiter } from "@/lib/ratelimit";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const { success } = await checkinLimiter.limit(ip);
  if (!success) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  try {
    const { expectedVisitorId, safetyAcknowledged, siteId } = await request.json();

    const expected = await prisma.expectedVisitor.findUnique({ where: { id: expectedVisitorId } });
    if (!expected || expected.siteId !== siteId) {
      return NextResponse.json({ error: "Invalid visitor" }, { status: 400 });
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
        safetyAcknowledged: safetyAcknowledged || false,
        siteId,
        hostName: undefined, // we don't have hostName, but we could look up host if hostId is set
      },
    });

    return NextResponse.json(visitor, { status: 200 });
  } catch (error) {
    console.error("Quick sign‑in error:", error);
    return NextResponse.json({ error: "Failed to sign in" }, { status: 500 });
  }
}