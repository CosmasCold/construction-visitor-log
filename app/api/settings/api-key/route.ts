import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { companyId: true, role: true },
  });

  if (!user || !user.companyId) {
    return NextResponse.json({ error: "No company found" }, { status: 404 });
  }

  // Generate a secure random key
  const apiKey = `ss_${crypto.randomBytes(24).toString("hex")}`;
  const apiKeyHash = crypto.createHash("sha256").update(apiKey).digest("hex");

  await prisma.company.update({
    where: { id: user.companyId },
    data: { apiKeyHash },
  });

  return NextResponse.json({ apiKey });
}