// prisma/backfill-slugs.ts
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.POSTGRES_URL_NON_POOLING!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const companies = await prisma.company.findMany({ where: { slug: "" } });
  for (const c of companies) {
    const newSlug = c.name.toLowerCase().replace(/\s+/g, "-") + "-" + Math.random().toString(36).substring(2, 6);
    await prisma.company.update({ where: { id: c.id }, data: { slug: newSlug } });
    console.log(`Updated ${c.name} → ${newSlug}`);
  }
  console.log("Done.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());