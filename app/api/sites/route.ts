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

  // Parse URL-encoded form data (sent by the simple HTML form)
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const address = formData.get("address") as string;
  const slug = formData.get("slug") as string;
  const companyId = formData.get("companyId") as string;

  if (!name || !slug || !companyId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Ensure the user belongs to the company they're creating the site for
  const user = await prisma.user.findUnique({ where: { email: session.user.email! } });
  if (!user || user.companyId !== companyId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const site = await prisma.site.create({
      data: {
        name,
        address: address || null,
        slug,
        companyId,
      },
    });
    return NextResponse.json(site, { status: 200 });
    } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Site creation error:", message);

    // Prisma unique constraint violation
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