// app/api/sites/[siteId]/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ siteId: string }> }
) {
  const { siteId } = await params;
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const site = await prisma.site.findUnique({ where: { id: siteId } });
  if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (session.user.role !== "super_admin") {
    const user = await prisma.user.findUnique({ where: { email: session.user.email! } });
    if (!user || user.companyId !== site.companyId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  await prisma.visitorLog.deleteMany({ where: { siteId } });
  await prisma.site.delete({ where: { id: siteId } });
  return NextResponse.json({ success: true });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ siteId: string }> }
) {
  const { siteId } = await params;
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const site = await prisma.site.findUnique({ where: { id: siteId } });
  if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (session.user.role !== "super_admin") {
    const user = await prisma.user.findUnique({ where: { email: session.user.email! } });
    if (!user || user.companyId !== site.companyId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  const body = await request.json();
  const { name, slug, address, safetyBriefingText, questions } = body;

  // Sanitize slug if changed
  let newSlug = slug || site.slug;
  newSlug = newSlug
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  if (!newSlug) return NextResponse.json({ error: "Invalid slug" }, { status: 400 });

  // Validate questions: must be an array of strings
  const finalQuestions = Array.isArray(questions)
    ? questions.filter((q: unknown) => typeof q === "string" && q.trim().length > 0)
    : site.questions;

  const updated = await prisma.site.update({
    where: { id: siteId },
    data: {
      name: name ?? site.name,
      slug: newSlug,
      address: address ?? site.address,
      safetyBriefingText: safetyBriefingText ?? site.safetyBriefingText,
      questions: finalQuestions,            // ✅ store the questions
    },
  });

  return NextResponse.json(updated);
}