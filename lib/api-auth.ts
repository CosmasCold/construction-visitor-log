// lib/api-auth.ts
import { prisma } from "./prisma";

/**
 * Validates a Bearer token and returns the company ID if valid.
 */
export async function validateApiKey(request: Request): Promise<string | null> {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;

  const token = authHeader.slice(7);
  const company = await prisma.company.findUnique({ where: { apiKey: token } });

  return company?.id ?? null;
}