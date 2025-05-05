import { PrismaClient } from '@root/generated/prisma/client';

const prisma = new PrismaClient();

async function main() {
  const articles = await prisma.articles.findMany()
  console.log(articles)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })