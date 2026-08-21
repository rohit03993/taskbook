/**
 * Same idea as Laravel .env: you create the database on the VPS,
 * then fill DB_HOST / DB_DATABASE / DB_USERNAME / DB_PASSWORD.
 * Prisma still wants DATABASE_URL internally — we build it here.
 */
export function applyDbEnv() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;

  const database = process.env.DB_DATABASE || process.env.DB_NAME || "";
  const username = process.env.DB_USERNAME || process.env.DB_USER || "";
  if (!database || !username) return "";

  const user = encodeURIComponent(username);
  const password = encodeURIComponent(process.env.DB_PASSWORD ?? "");
  const host = process.env.DB_HOST || "127.0.0.1";
  const port = process.env.DB_PORT || "3306";
  process.env.DATABASE_URL = `mysql://${user}:${password}@${host}:${port}/${database}`;
  return process.env.DATABASE_URL;
}

export function dbConfigured() {
  return Boolean(applyDbEnv());
}
