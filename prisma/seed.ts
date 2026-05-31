// prisma/seed.ts
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const connectionString = process.env.POSTGRES_URL_NON_POOLING!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const superEmail = process.env.SUPER_ADMIN_EMAIL || "admin@example.com";
  const superPassword = process.env.SUPER_ADMIN_PASSWORD || "changeme";

  await prisma.plan.upsert({
  where: { stripePriceId: "price_placeholder" },
  update: {},
  create: {
    name: "Pro Monthly",
    stripePriceId: "price_placeholder",
    maxSites: 10,
    features: ["unlimited_visitors", "export_csv_excel"],
  },
});

  const passwordHash = await bcrypt.hash(superPassword, 12);
  await prisma.user.create({
    data: {
      email: superEmail,
      passwordHash,
      role: "super_admin",
    },
  });

  console.log("Seed complete. Super admin:", superEmail);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());