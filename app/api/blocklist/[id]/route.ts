// app/api/blocklist/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireBlocklistAccess } from "@/lib/auth-guard";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user, companyId, response } = await requireAuth(req);
  if (response) return response;

  if (!companyId) {
    return NextResponse.json({ error: "No company" }, { status: 400 });
  }

  const { id } = await params;

  const denied = await requireBlocklistAccess(id, companyId);
  if (denied) return denied;

  await prisma.blocklistEntry.delete({ where: { id } });
  return NextResponse.json({ success: true });
}