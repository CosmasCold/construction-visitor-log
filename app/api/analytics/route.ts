// app/api/analytics/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireSiteAccess } from "@/lib/auth-guard";

export async function GET(req: NextRequest) {
  const { user, companyId, response } = await requireAuth(req);
  if (response) return response;

  // Super admin can access any company (optional — remove if you don't have super_admin)
  const isSuperAdmin = user.role === "super_admin";

  const { searchParams } = req.nextUrl;
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const siteId = searchParams.get("siteId");

  // If siteId provided, verify user owns it
  if (siteId && !isSuperAdmin) {
    const denied = await requireSiteAccess(siteId, companyId!);
    if (denied) return denied;
  }

  // Default: last 30 days
  let startDate: Date;
  let endDate: Date;

  if (from) {
    startDate = new Date(from);
    startDate.setHours(0, 0, 0, 0);
  } else {
    startDate = new Date();
    startDate.setDate(startDate.getDate() - 29);
    startDate.setHours(0, 0, 0, 0);
  }

  if (to) {
    endDate = new Date(to);
    endDate.setHours(23, 59, 59, 999);
  } else {
    endDate = new Date();
    endDate.setHours(23, 59, 59, 999);
  }

  const where: Record<string, unknown> = {
    signedInAt: {
      gte: startDate,
      lte: endDate,
    },
  };

  if (siteId) {
    where.siteId = siteId;
  } else if (companyId && !isSuperAdmin) {
    where.site = { companyId };
  }

  const logs = await prisma.visitorLog.findMany({
    where,
    select: { signedInAt: true },
    orderBy: { signedInAt: "asc" },
  });

  // Aggregate by day
  const dailyCounts: Record<string, number> = {};
  const cursor = new Date(startDate);
  while (cursor <= endDate) {
    const key = cursor.toISOString().slice(0, 10);
    dailyCounts[key] = 0;
    cursor.setDate(cursor.getDate() + 1);
  }

  logs.forEach((log) => {
    const key = log.signedInAt.toISOString().slice(0, 10);
    if (dailyCounts[key] !== undefined) dailyCounts[key]++;
  });

  return NextResponse.json({
    labels: Object.keys(dailyCounts),
    data: Object.values(dailyCounts),
  });
}