import { prisma } from "./prisma";
import crypto from "crypto";

export async function validateApiKey(request: Request): Promise<string | null> {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;

  const token = authHeader.slice(7);
  const hash = crypto.createHash("sha256").update(token).digest("hex");

  const company = await prisma.company.findFirst({
    where: { apiKeyHash: hash },
    select: { id: true },
  });

  return company?.id ?? null;
}