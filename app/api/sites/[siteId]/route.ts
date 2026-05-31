// app/api/sites/[siteId]/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ siteId: string }> }
) {
  const { siteId } = await params;
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const site = await prisma.site.findUnique({ where: { id: siteId } });
  if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Allow super admins or the company owner of this site
  if (session.user.role === "super_admin") {
    // allowed
  } else if (session.user.role === "company_owner") {
    const user = await prisma.user.findUnique({ where: { email: session.user.email! } });
    if (!user || user.companyId !== site.companyId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  } else {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Delete visitors first, then the site
  await prisma.visitorLog.deleteMany({ where: { siteId } });
  await prisma.site.delete({ where: { id: siteId } });

  return NextResponse.json({ success: true });
}