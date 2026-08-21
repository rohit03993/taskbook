import { PrismaClient } from "@prisma/client";
import { applyDbEnv, dbConfigured } from "./db-env";

applyDbEnv();

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export { dbConfigured };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function withDb<T>(fn: (client: PrismaClient) => Promise<T>, fallback: T): Promise<T> {
  if (!dbConfigured()) return fallback;
  try {
    return await fn(prisma);
  } catch {
    return fallback;
  }
}
