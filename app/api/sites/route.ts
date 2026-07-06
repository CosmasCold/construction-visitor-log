// app/api/sites/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-guard";

export async function POST(req: NextRequest) {
  const { user, companyId, response } = await requireAuth(req);
  if (response) return response;

  if (!companyId) {
    return NextResponse.json({ error: "No company" }, { status: 400 });
  }

  // Enforce 20-site limit
  const siteCount = await prisma.site.count({
    where: { companyId },
  });

  if (siteCount >= 20) {
    return NextResponse.json(
      {
        error:
          "You've reached the 20-site limit for your plan. Contact us if you need more sites.",
      },
      { status: 403 }
    );
  }

  // Accept both JSON and form-encoded data
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
    address = (form.get("address") as string) || undefined;
  }

  if (!name || !slug) {
    return NextResponse.json({ error: "Name and slug required" }, { status: 400 });
  }

  // Reject if body tries to set companyId to something else
  const body = await req.clone().json().catch(() => ({}));
  if (body.companyId && body.companyId !== companyId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
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