// app/api/v1/visitors/[visitorId]/signout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateApiKey } from "@/lib/api-auth";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ visitorId: string }> }
) {
  const companyId = await validateApiKey(req);
  if (!companyId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { visitorId } = await params;

  const visitor = await prisma.visitorLog.findUnique({
    where: { id: visitorId },
    include: { site: { select: { companyId: true } } },
  });
  if (!visitor || visitor.site.companyId !== companyId) {
    return NextResponse.json({ error: "Visitor not found" }, { status: 404 });
  }

  const updated = await prisma.visitorLog.update({
    where: { id: visitorId },
    data: { signedOutAt: new Date() },
  });

  return NextResponse.json(updated);
}