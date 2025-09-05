import { PrismaClient } from "@/app/generated/prisma";

const prismaClientSingleton = () => {
  return new PrismaClient({
    __internal: {
      usePreparedStatements: false, // disable prepared statements
    },
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

