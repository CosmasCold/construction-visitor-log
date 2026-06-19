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
    include: { company: { select: { id: true, _count: { select: { sites: true } } } } },
  });

  const company = user?.company;
  if (!company) {
    return NextResponse.json({ error: "No company" }, { status: 400 });
  }

  // Enforce 20‑site limit
  const siteCount = company._count?.sites ?? 0;
  if (siteCount >= 20) {
    return NextResponse.json(
      {
        error:
          "You’ve reached the 20‑site limit for your plan. Contact us if you need more sites.",
      },
      { status: 403 }
    );
  }

  const { name, slug, address } = await req.json();
  if (!name || !slug) {
    return NextResponse.json({ error: "Name and slug required" }, { status: 400 });
  }

  const site = await prisma.site.create({
    data: {
      name,
      slug,
      address: address || null,
      companyId: company.id,
    },
  });

  return NextResponse.json(site, { status: 201 });
}