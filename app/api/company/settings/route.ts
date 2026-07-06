// app/api/company/settings/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-guard";

export async function GET(req: NextRequest) {
  const { user, companyId, response } = await requireAuth(req);
  if (response) return response;

  if (!companyId) {
    return NextResponse.json({ error: "No company" }, { status: 400 });
  }

  const company = await prisma.company.findUnique({
    where: { id: companyId },
    select: { name: true, webhookUrl: true },
  });

  if (!company) {
    return NextResponse.json({ error: "No company" }, { status: 400 });
  }

  return NextResponse.json({
    name: company.name,
    webhookUrl: company.webhookUrl || "",
  });
}

export async function PUT(req: NextRequest) {
  const { user, companyId, response } = await requireAuth(req);
  if (response) return response;

  if (!companyId) {
    return NextResponse.json({ error: "No company" }, { status: 400 });
  }

  const { webhookUrl, name } = await req.json();

  await prisma.company.update({
    where: { id: companyId },
    data: {
      webhookUrl: webhookUrl ?? undefined,
      name: name ?? undefined,
    },
  });

  return NextResponse.json({ success: true });
}