import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fireWebhook } from "@/lib/webhook";

export async function POST(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "Visitor ID is required" }, { status: 400 });
    }

    const visitor = await prisma.visitorLog.update({
      where: { id },
      data: { signedOutAt: new Date() },
      include: {
        site: { select: { name: true, companyId: true } },
      },
    });

    if (visitor.site?.companyId) {
      const company = await prisma.company.findUnique({
        where: { id: visitor.site.companyId },
        select: { webhookUrl: true },
      });

      if (company?.webhookUrl) {
        fireWebhook(company.webhookUrl, "checkout.created", {
          visitorId: visitor.id,
          fullName: visitor.fullName,
          company: visitor.company,
          siteName: visitor.site.name,
          signedOutAt: visitor.signedOutAt,
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Sign‑out error:", error);
    return NextResponse.json({ error: "Failed to sign out" }, { status: 500 });
  }
}