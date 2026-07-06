// app/api/checkin/[siteId]/active/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ siteId: string }> }
) {
  try {
    const { siteId } = await params;

    const active = await prisma.visitorLog.findMany({
      where: {
        siteId,
        signedOutAt: null,
      },
      orderBy: { signedInAt: "desc" },
      select: {
        id: true,
        fullName: true,
        company: true,
        hostName: true,
        signedInAt: true,
        photoUrl: true,   // ← ADDED
      },
    });

    return NextResponse.json(active);
  } catch (error) {
    console.error("Failed to fetch active visitors:", error);
    return NextResponse.json(
      { error: "Failed to fetch active visitors" },
      { status: 500 }
    );
  }
}