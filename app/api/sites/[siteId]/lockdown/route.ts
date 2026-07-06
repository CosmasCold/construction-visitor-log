// app/api/sites/[siteId]/lockdown/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireSiteAccess } from "@/lib/auth-guard";

async function handler(
  req: NextRequest,
  { params }: { params: Promise<{ siteId: string }> }
) {
  const { user, companyId, response } = await requireAuth(req);
  if (response) return response;

  const { siteId } = await params;

  const denied = await requireSiteAccess(siteId, companyId!);
  if (denied) return denied;

  const { lockdownEnabled } = await req.json();

  const updated = await prisma.site.update({
    where: { id: siteId },
    data: { lockdownEnabled },
  });

  return NextResponse.json({ lockdownEnabled: updated.lockdownEnabled });
}

export { handler as PUT, handler as POST };