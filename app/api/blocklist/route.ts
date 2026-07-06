// app/api/blocklist/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-guard";

export async function POST(req: NextRequest) {
  const { user, companyId, response } = await requireAuth(req);
  if (response) return response;

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
  const { user, companyId, response } = await requireAuth(_req);
  if (response) return response;

  if (!companyId) {
    return NextResponse.json({ error: "No company" }, { status: 400 });
  }

  const entries = await prisma.blocklistEntry.findMany({
    where: { companyId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(entries);
}