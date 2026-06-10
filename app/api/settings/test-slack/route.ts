// app/api/settings/test-slack/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
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

  const company = await prisma.company.findUnique({
    where: { id: user.companyId },
    select: { slackWebhookUrl: true },
  });

  if (!company?.slackWebhookUrl) {
    return NextResponse.json({ error: "No Slack webhook configured" }, { status: 400 });
  }

  try {
    const res = await fetch(company.slackWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: "✅ Slack integration is working! This is a test message from SiteSafe.",
        username: "SiteSafe",
        icon_emoji: ":clipboard:",
      }),
    });

    if (res.ok) {
      return NextResponse.json({ success: true });
    } else {
      const body = await res.text();
      console.error("Slack test failed:", body);
      return NextResponse.json({ error: "Slack returned an error" }, { status: 502 });
    }
  } catch (error) {
    console.error("Slack test failed:", error);
    return NextResponse.json({ error: "Failed to send test message" }, { status: 500 });
  }
}