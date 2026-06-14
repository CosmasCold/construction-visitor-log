import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { company: { select: { id: true } } },
  });
  const companyId = user?.company?.id;
  if (!companyId) {
    return NextResponse.json({ error: "No company" }, { status: 400 });
  }

  const { id } = await params;   // ✅ await params

  // Ensure entry belongs to user's company
  const entry = await prisma.blocklistEntry.findFirst({
    where: { id, companyId },
  });
  if (!entry) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.blocklistEntry.delete({ where: { id } });
  return NextResponse.json({ success: true });
}