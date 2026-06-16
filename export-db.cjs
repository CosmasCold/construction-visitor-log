const { Client } = require("pg");
const fs = require("fs");

const connectionString = "postgresql://neondb_owner:npg_jlNxDdtK8Lg7@ep-frosty-haze-aq15pykc-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

(async () => {
  const client = new Client({ connectionString });
  await client.connect();

  // Get all table names
  const tables = await client.query(`
    SELECT tablename FROM pg_tables WHERE schemaname = 'public'
  `);

  let dump = "";
  for (const { tablename } of tables.rows) {
    const { rows } = await client.query(`SELECT * FROM "${tablename}"`);
    if (rows.length === 0) continue;
    const columns = Object.keys(rows[0]);
    const values = rows.map(row =>
      `INSERT INTO "${tablename}" (${columns.map(c => `"${c}"`).join(", ")})
       VALUES (${columns.map(c => {
         const val = row[c];
         if (val === null) return 'NULL';
         if (typeof val === 'string') return `'${val.replace(/'/g, "''")}'`;
         if (val instanceof Date) return `'${val.toISOString()}'`;
         return val;
       }).join(", ")});`
    ).join("\n");
    dump += `-- Table: ${tablename}\n${values}\n\n`;
  }

  fs.writeFileSync("neon-backup.sql", dump);
  console.log("✅ Backup saved to neon-backup.sql");
  await client.end();
})();