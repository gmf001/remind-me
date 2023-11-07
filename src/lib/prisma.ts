import { PrismaClient } from "@prisma/client";

const prismaClient = () => {
  return new PrismaClient();
};

type PrismaClientType = ReturnType<typeof prismaClient>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientType | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
