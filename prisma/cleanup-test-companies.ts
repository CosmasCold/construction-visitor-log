// prisma/cleanup-test-companies.ts
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.POSTGRES_URL_NON_POOLING!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Delete ALL companies (use with caution – only run if you want a clean slate)
  // You can add a where clause to keep the super admin or a specific company.
  await prisma.company.deleteMany({});
  console.log("Deleted all companies. The database is clean.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());