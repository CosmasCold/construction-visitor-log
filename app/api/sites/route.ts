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
    include: { company: { select: { id: true } } },
  });

  const company = user?.company;
  if (!company) {
    return NextResponse.json({ error: "No company" }, { status: 400 });
  }

  // Enforce 20‑site limit
  const siteCount = await prisma.site.count({
    where: { companyId: company.id },
  });

  if (siteCount >= 20) {
    return NextResponse.json(
      {
        error:
          "You’ve reached the 20‑site limit for your plan. Contact us if you need more sites.",
      },
      { status: 403 }
    );
  }

  // Accept both JSON and form‑encoded data
  let name: string, slug: string, address: string | undefined;

  const contentType = req.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const body = await req.json();
    name = body.name;
    slug = body.slug;
    address = body.address;
  } else {
    const form = await req.formData();
    name = form.get("name") as string;
    slug = form.get("slug") as string;
    address = form.get("address") as string || undefined;
    // companyId is sent from the form but we already have the company from the session
  }

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