// app/api/account/delete/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-guard";
import { prisma } from "@/lib/prisma";
import { del } from "@vercel/blob";

export async function DELETE(req: NextRequest) {
  const { user, companyId, response } = await requireAuth(req);
  if (response) return response;

  if (!companyId) {
    return NextResponse.json({ error: "No company" }, { status: 400 });
  }

  try {
    // Get all photo URLs before deleting records
    const visitorLogs = await prisma.visitorLog.findMany({
      where: { site: { companyId } },
      select: { photoUrl: true },
    });

    // Delete photos from Vercel Blob
    for (const log of visitorLogs) {
      if (log.photoUrl) {
        try {
          await del(log.photoUrl);
        } catch (e) {
          console.error("Failed to delete blob:", log.photoUrl, e);
        }
      }
    }

    // Delete all company data in transaction (respect foreign keys)
    await prisma.$transaction([
      prisma.visitorLog.deleteMany({ where: { site: { companyId } } }),
      prisma.expectedVisitor.deleteMany({ where: { site: { companyId } } }),
      prisma.host.deleteMany({ where: { site: { companyId } } }),
      prisma.site.deleteMany({ where: { companyId } }),
      prisma.blocklistEntry.deleteMany({ where: { companyId } }),
      prisma.passwordReset.deleteMany({ where: { email: user.email } }),
      prisma.user.deleteMany({ where: { companyId } }),
      prisma.company.delete({ where: { id: companyId } }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Account deletion error:", error);
    return NextResponse.json(
      { error: "Failed to delete account. Please contact support." },
      { status: 500 }
    );
  }
}