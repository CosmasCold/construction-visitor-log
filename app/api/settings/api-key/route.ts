// app/api/settings/api-key/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { requireAuth } from "@/lib/auth-guard";

export async function POST(req: Request) {
  const { user, companyId, response } = await requireAuth(req as unknown as import("next/server").NextRequest);
  if (response) return response;

  if (!companyId) {
    return NextResponse.json({ error: "No company found" }, { status: 404 });
  }

  const apiKey = `ss_${crypto.randomBytes(24).toString("hex")}`;
  const apiKeyHash = crypto.createHash("sha256").update(apiKey).digest("hex");

  await prisma.company.update({
    where: { id: companyId },
    data: { apiKeyHash },
  });

  return NextResponse.json({ apiKey });
}