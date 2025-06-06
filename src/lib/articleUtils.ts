
import { type PrismaClient, type Article } from '@root/generated/prisma/client';

export type FetchArticleResult = (Omit<Article, 'content' | 'created_at' | 'updated_at'> & { published_at: Date });

/**
 * Fetch the total number of pages
 * @param prisma 
 * @returns 
 */
export const fetchPageCount = async (prisma: PrismaClient, itemsPerPage: number): Promise<number> => {
  const count = await prisma.article.count({
    where: { published_at: { not: null } },
  });
  return Math.ceil(count / itemsPerPage); // example: 10 articles / 4 items per page = 2.5 => rounded up to 3 pages
}

/**
 * Fetch all articles
 * @param prisma 
 * @returns 
 */
export const fetchArticles = async (prisma: PrismaClient): Promise<FetchArticleResult[]> => {
  const articles = await prisma.article.findMany({
    omit: {
      content: true,
      created_at: true,
      updated_at: true,
    },
    where: { published_at: { not: null } },
    orderBy: { published_at: 'desc' }
  });

  return articles.filter((article): article is FetchArticleResult => article.published_at !== null);
}

/**
 * Fetch articles by page
 * @param prisma 
 * @param page 
 * @returns 
 */
export const fetchArticlesByPage = async (prisma: PrismaClient, page: number, itemsPerPage: number): Promise<FetchArticleResult[]> => {
  const skip = (page - 1) * itemsPerPage;
  const articles = await prisma.article.findMany({
    where: { published_at: { not: null, } },
    omit: {
      content: true,
      created_at: true,
      updated_at: true,
    },
    skip,
    take: itemsPerPage,
    orderBy: { published_at: 'desc' },
  })
  return articles.filter((article): article is FetchArticleResult => article.published_at !== null);
}

export const fetchArticleById = async (prisma: PrismaClient, id: string) => {
  const article = await prisma.article.findUnique({
    where: { id: Number(id) },
  })

  if (!article) {
    throw new Error(`Article with id ${id} not found`);
  }

  return article
}