import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is not defined. Please check your .env file.");
}

const connectionString = databaseUrl.includes("?") 
  ? `${databaseUrl}&prepareCacheLength=0` 
  : `${databaseUrl}?prepareCacheLength=0`;

const adapter = new PrismaMariaDb(connectionString);

export const prisma = new PrismaClient({ adapter });
