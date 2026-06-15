import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      company: {
        select: { id: true, webhookUrl: true },
      },
    },
  });
  if (!user?.company)
    return NextResponse.json({ error: "No company" }, { status: 400 });

  return NextResponse.json({
    webhookUrl: user.company.webhookUrl || "",
  });
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { company: { select: { id: true } } },
  });
  if (!user?.company)
    return NextResponse.json({ error: "No company" }, { status: 400 });

  const { webhookUrl } = await req.json();

  await prisma.company.update({
    where: { id: user.company.id },
    data: { webhookUrl: webhookUrl ?? undefined },
  });

  return NextResponse.json({ success: true });
}