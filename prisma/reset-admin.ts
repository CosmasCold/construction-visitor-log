// prisma/reset-admin.ts
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const connectionString = process.env.POSTGRES_URL_NON_POOLING!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = "admin@example.com";   // <-- Change to your desired admin email
  const password = "StrongPassword123"; // <-- Change to your desired password
  const hash = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where: { email },
    update: { passwordHash: hash, role: "super_admin" },
    create: { email, passwordHash: hash, role: "super_admin" },
  });

  console.log(`✅ Admin user ready:`);
  console.log(`   Email:    ${user.email}`);
  console.log(`   Password: ${password}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());