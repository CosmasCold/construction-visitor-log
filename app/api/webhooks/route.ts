import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { fireWebhook } from "@/lib/webhook";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { company: { select: { webhookUrl: true } } },
  });

  const url = user?.company?.webhookUrl;
  if (!url)
    return NextResponse.json(
      { error: "No webhook URL configured" },
      { status: 400 }
    );

  await fireWebhook(url, "test.event", {
    message: "Webhook test from SiteSafe",
  });
  return NextResponse.json({ success: true });
}