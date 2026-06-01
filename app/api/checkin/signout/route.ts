// app/api/checkin/signout/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkinLimiter } from "@/lib/ratelimit";

export async function POST(request: Request) {
  // ---------- rate limit ----------
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const { success } = await checkinLimiter.limit(ip);
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please slow down." },
      { status: 429 }
    );
  }
  // -------------------------------

  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Missing visitor ID" }, { status: 400 });
    }

    const updated = await prisma.visitorLog.update({
      where: { id },
      data: { signedOutAt: new Date() },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Sign‑out error:", error);
    return NextResponse.json({ error: "Failed to sign out" }, { status: 500 });
  }
}