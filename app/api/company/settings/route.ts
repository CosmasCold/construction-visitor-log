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
        select: { id: true, name: true, webhookUrl: true },
      },
    },
  });
  if (!user?.company)
    return NextResponse.json({ error: "No company" }, { status: 400 });

  return NextResponse.json({
    name: user.company.name,
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

  const { webhookUrl, name } = await req.json();

  await prisma.company.update({
    where: { id: user.company.id },
    data: {
      webhookUrl: webhookUrl ?? undefined,
      name: name ?? undefined,
    },
  });

  return NextResponse.json({ success: true });
}