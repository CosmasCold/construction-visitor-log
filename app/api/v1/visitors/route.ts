// app/api/v1/visitors/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateApiKey } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  const companyId = await validateApiKey(req);
  if (!companyId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = req.nextUrl;
  const siteId = url.searchParams.get("siteId");
  const from = url.searchParams.get("from");
  const to = url.searchParams.get("to");

  const where: Record<string, unknown> = {
    site: { companyId },
  };
  if (siteId) where.siteId = siteId;
  if (from || to) {
    where.signedInAt = {};
    if (from) (where.signedInAt as Record<string, unknown>).gte = new Date(from);
    if (to) (where.signedInAt as Record<string, unknown>).lte = new Date(to);
  }

  const visitors = await prisma.visitorLog.findMany({
    where,
    orderBy: { signedInAt: "desc" },
    select: {
      id: true,
      fullName: true,
      company: true,
      phone: true,
      email: true,
      hostName: true,
      safetyAcknowledged: true,
      signedInAt: true,
      signedOutAt: true,
      siteId: true,
    },
  });

  return NextResponse.json(visitors);
}

export async function POST(req: NextRequest) {
  const companyId = await validateApiKey(req);
  if (!companyId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { fullName, company, phone, email, hostName, safetyAcknowledged, siteId } = body;

  if (!fullName || !company || !siteId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Verify the site belongs to the company
  const site = await prisma.site.findUnique({ where: { id: siteId }, select: { companyId: true } });
  if (!site || site.companyId !== companyId) {
    return NextResponse.json({ error: "Site not found or access denied" }, { status: 404 });
  }

  const visitor = await prisma.visitorLog.create({
    data: {
      fullName,
      company,
      phone: phone || null,
      email: email || null,
      hostName: hostName || null,
      safetyAcknowledged: safetyAcknowledged || false,
      siteId,
    },
  });

  return NextResponse.json(visitor, { status: 201 });
}