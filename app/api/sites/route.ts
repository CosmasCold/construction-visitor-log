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

  const formData = await request.formData();
  const name = formData.get("name") as string;
  const address = formData.get("address") as string;
  let slug = (formData.get("slug") as string) || "";
  const companyId = formData.get("companyId") as string;

  if (!name || !slug || !companyId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Sanitize slug: lowercase, replace spaces and special chars with dashes
  slug = slug
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")   // replace non-alphanumeric with single dash
    .replace(/^-|-$/g, "");        // trim leading/trailing dashes

  if (!slug) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email! } });
  if (!user || user.companyId !== companyId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    await prisma.site.create({
      data: { name, address: address || null, slug, companyId },
    });
    const company = await prisma.company.findUnique({ where: { id: companyId } });
    return NextResponse.redirect(
      new URL(`/dashboard?slug=${company?.slug || ""}`, request.url)
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Site creation error:", message);
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: string }).code === "P2002"
    ) {
      return NextResponse.json(
        { error: "A site with this slug already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: "Failed to create site" }, { status: 500 });
  }
}