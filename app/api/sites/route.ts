// app/api/sites/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "company_owner") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, address, slug, companyId } = await request.json();

  const user = await prisma.user.findUnique({ where: { email: session.user.email! } });
  if (!user || user.companyId !== companyId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const site = await prisma.site.create({
    data: { name, address, slug, companyId },
  });

  return NextResponse.json(site, { status: 200 });
}