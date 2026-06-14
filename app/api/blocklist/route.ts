import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
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

  const { value, type, note } = await req.json();
  if (!value || !type || !["name", "email", "phone"].includes(type)) {
    return NextResponse.json({ error: "Invalid entry" }, { status: 400 });
  }

  const entry = await prisma.blocklistEntry.create({
    data: { companyId, value, type, note: note || null },
  });

  return NextResponse.json(entry);
}

export async function GET(_req: NextRequest) {
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

  const entries = await prisma.blocklistEntry.findMany({
    where: { companyId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(entries);
}