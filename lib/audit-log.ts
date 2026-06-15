import { prisma } from "@/lib/prisma";

export async function auditLog(
  companyId: string,
  userEmail: string,
  action: string,
  details?: Record<string, unknown>
) {
  await prisma.analyticsEvent.create({
    data: {
      name: `audit.${action}`,
      data: {
        companyId,
        userEmail,
        ...details,
      },
    },
  });
}