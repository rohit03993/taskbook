const { spawnSync } = require("child_process");
const path = require("path");

require("./load-env.cjs");

const args = process.argv.slice(2);
const needsLiveDb = args[0] === "migrate" || args[0] === "db";
if (needsLiveDb && !process.env.DATABASE_URL) {
  console.error(
    "Database is not set. In .env.local fill DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD (same as Laravel), then retry.",
  );
  process.exit(1);
}
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "mysql://generate:generate@127.0.0.1:3306/generate";
}

const result = spawnSync("npx", ["prisma", ...args], {
  stdio: "inherit",
  env: process.env,
  shell: true,
  cwd: path.join(__dirname, ".."),
});

process.exit(result.status ?? 1);
