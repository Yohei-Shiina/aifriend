import { PrismaClient } from '@root/generated/prisma/client';

type GlobalPrisma = typeof global & { _prisma?: PrismaClient };
const globalForPrisma = global as GlobalPrisma;

export const prisma =
  globalForPrisma._prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : [],
    errorFormat: 'pretty',
  });

// This is a work-around for the issue of hot reloading in Next.js
// and Prisma Client. It ensures that the Prisma Client is not
// re-initialized on every hot reload in development mode.
if (process.env.NODE_ENV !== 'production') globalForPrisma._prisma = prisma;

export { PrismaClient };
export default prisma;