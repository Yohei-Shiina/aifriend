
import { type PrismaClient, type Article } from '@root/generated/prisma/client';

export type FetchArticleResult = (Omit<Article, 'content' | 'created_at' | 'updated_at'> & { published_at: Date });

/**
 * Fetch the total number of pages
 * @param prisma 
 * @returns 
 */
export const fetchPageCount = async (prisma: PrismaClient, itemsPerPage: number): Promise<number> => {
  const now = new Date();
  try {
    const count = await prisma.article.count({
      where: {
        published_at: { lt: now },
        is_published: true
      },
    });
    return Math.ceil(count / itemsPerPage); // example: 10 articles / 4 items per page = 2.5 => rounded up to 3 pages

  } catch (error) {
    console.error('Error fetching page count:', error);
    throw error;
  }
}

/**
 * Fetch all articles
 * @param prisma 
 * @returns 
 */
export const fetchArticles = async (prisma: PrismaClient): Promise<FetchArticleResult[]> => {
  const now = new Date();
  try {
    const articles = await prisma.article.findMany({
      omit: {
        content: true,
        created_at: true,
        updated_at: true,
      },
      where: {
        published_at: { lt: now },
        is_published: true
      },
      orderBy: { published_at: 'desc' }
    });
    return articles.filter((article): article is FetchArticleResult => article.published_at !== null);

  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
}

/**
 * Fetch articles by page
 * @param prisma 
 * @param page 
 * @returns 
 */
export const fetchArticlesByPage = async (prisma: PrismaClient, page: number, itemsPerPage: number): Promise<FetchArticleResult[]> => {
  const skip = (page - 1) * itemsPerPage;
  const now = new Date();
  try {
    const articles = await prisma.article.findMany({
      where: {
        published_at: { lt: now, },
        is_published: true
      },
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

  } catch (error) {
    console.error('Error fetching articles by page:', error);
    throw error;
  }
}

export const fetchArticleById = async (prisma: PrismaClient, id: string): Promise<Article | null> => {
  try {
    const article = await prisma.article.findUnique({
      where: {
        id: Number(id),
        published_at: { lt: new Date() },
        is_published: true
      },
    });
    return article || null;

  } catch (error) {
    console.error('Error fetching article by ID:', error);
    throw error;
  }
}
