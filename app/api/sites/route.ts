import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// POST – create a new site for the company
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { company: { select: { id: true } } },
  });

  const companyId = user?.company?.id;
  if (!companyId) {
    return NextResponse.json({ error: "No company" }, { status: 400 });
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
      companyId,
    },
  });

  return NextResponse.json(site, { status: 201 });
}

// OPTIONAL: you can add a GET handler here if you want to list sites, but DO NOT use `params`.
// For now, we leave it out to avoid type issues.