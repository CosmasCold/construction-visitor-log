import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { name, data } = await req.json();
    await prisma.analyticsEvent.create({
      data: { name, data: data || undefined },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics log error:", error);
    return NextResponse.json({ error: "Failed to log event" }, { status: 500 });
  }
}