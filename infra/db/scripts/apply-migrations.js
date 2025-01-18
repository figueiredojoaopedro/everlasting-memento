import { Pool } from "pg";
import fs from "fs";
import path from "path";

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
});

const applyMigrations = async () => {
  const appliedMigrations = await pool.query(
    "SELECT filename FROM migration_log;"
  );
  const appliedFiles = new Set(
    appliedMigrations.rows.map((row) => row.filename)
  );

  const migrationsDir = path.join(__dirname, "../migrations");
  console.log("teste migrationsDir", migrationsDir);
  const files = fs.readdirSync(migrationsDir).sort();

  for (const file of files) {
    if (!appliedFiles.has(file)) {
      const sql = fs.readFileSync(path.join(migrationsDir, file), "utf-8");
      await pool.query(sql);
      await pool.query("INSERT INTO migration_log (filename) VALUES ($1);", [
        file,
      ]);

      console.info(`Applied migration: ${file}`);
    }
  }
  await pool.end();
};

export default applyMigrations;
