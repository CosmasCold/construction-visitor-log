// app/api/v1/sites/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateApiKey } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  const companyId = await validateApiKey(req);
  if (!companyId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sites = await prisma.site.findMany({
    where: { companyId },
    select: {
      id: true,
      name: true,
      slug: true,
      address: true,
      safetyBriefingText: true,
    },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(sites);
}