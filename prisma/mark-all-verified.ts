import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.POSTGRES_URL_NON_POOLING!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.user.updateMany({
    data: { verified: true },
  });
  console.log("All existing users marked as verified.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());