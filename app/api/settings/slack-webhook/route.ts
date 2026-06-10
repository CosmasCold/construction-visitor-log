// app/api/settings/slack-webhook/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { companyId: true },
  });
  if (!user?.companyId) {
    return NextResponse.json({ error: "No company found" }, { status: 404 });
  }

  const { slackWebhookUrl } = await request.json();
  await prisma.company.update({
    where: { id: user.companyId },
    data: { slackWebhookUrl },
  });

  return NextResponse.json({ success: true });
}