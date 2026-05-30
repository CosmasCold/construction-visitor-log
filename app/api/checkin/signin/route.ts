import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { fullName, company, phone, email, hostName, safetyAcknowledged, siteId } = await request.json();

  if (!fullName || !company || !siteId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const visitor = await prisma.visitorLog.create({
    data: {
      fullName,
      company,
      phone,
      email,
      hostName,
      safetyAcknowledged,
      siteId,  // ✅ must be here
    },
  });

  return NextResponse.json(visitor, { status: 200 });
}