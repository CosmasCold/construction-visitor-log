import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
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