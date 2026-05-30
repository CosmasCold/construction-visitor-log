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

  const site = await prisma.site.upsert({
    where: { slug: "main-site" },
    update: {},
    create: {
      slug: "main-site",
      name: "Main Construction Site",
      address: "123 Builders Ave",
      safetyBriefingText:
        "Hard hat, high-vis vest, and safety glasses are mandatory. Stay in designated walkways.",
    },
  });

  const passwordHash = await bcrypt.hash(superPassword, 12);
  await prisma.user.upsert({
    where: { email: superEmail },
    update: {},
    create: {
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