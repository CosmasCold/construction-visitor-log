// prisma/backup.ts
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as fs from "fs";
import * as path from "path";

const connectionString = process.env.POSTGRES_URL_NON_POOLING!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const backupDir = path.join(__dirname, "..", "backups", new Date().toISOString().replace(/[:.]/g, "-"));
  fs.mkdirSync(backupDir, { recursive: true });

  // Export each model
  const models: Record<string, unknown[]> = {
    companies: await prisma.company.findMany(),
    plans: await prisma.plan.findMany(),
    subscriptions: await prisma.subscription.findMany(),
    sites: await prisma.site.findMany(),
    visitorLogs: await prisma.visitorLog.findMany(),
    users: await prisma.user.findMany(),
    passwordResets: await prisma.passwordReset.findMany(),
  };

  for (const [name, data] of Object.entries(models)) {
    const filePath = path.join(backupDir, `${name}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`✅ Backed up ${name} – ${data.length} records`);
  }

  console.log(`\nBackup saved to ${backupDir}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());