const fs = require("fs");
const path = require("path");

function loadEnvFile(file) {
  try {
    const raw = fs.readFileSync(file, "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq < 1) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    /* missing file is fine */
  }
}

const root = path.join(__dirname, "..");
loadEnvFile(path.join(root, ".env"));
loadEnvFile(path.join(root, ".env.local"));

if (!process.env.DATABASE_URL) {
  const database = process.env.DB_DATABASE || process.env.DB_NAME;
  const username = process.env.DB_USERNAME || process.env.DB_USER;
  if (database && username) {
    const user = encodeURIComponent(username);
    const password = encodeURIComponent(process.env.DB_PASSWORD || "");
    const host = process.env.DB_HOST || "127.0.0.1";
    const port = process.env.DB_PORT || "3306";
    process.env.DATABASE_URL = `mysql://${user}:${password}@${host}:${port}/${database}`;
  }
}
