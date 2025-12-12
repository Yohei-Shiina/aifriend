
import { ArticleWithImage, ArticleWithImageForList } from '@/types/article';
import { type PrismaClient } from '@root/generated/prisma/client';

/**
 * Fetch the total number of pages
 * @param prisma 
 * @param itemsPerPage 
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
export const fetchArticles = async (prisma: PrismaClient): Promise<ArticleWithImageForList[]> => {
  const now = new Date();
  try {
    const articles = await prisma.article.findMany({
      where: {
        published_at: { lt: now },
        is_published: true
      },
      include: { image: true },
      omit: {
        content: true,
        created_at: true,
        updated_at: true,
      },
      orderBy: { published_at: 'desc' }
    });
    return articles.filter((article) => article.published_at !== null);

  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
}

/**
 * Fetch articles by page
 * @param prisma 
 * @param page 
 * @param itemsPerPage 
 * @returns 
 */
export const fetchArticlesByPage = async (prisma: PrismaClient, page: number, itemsPerPage: number): Promise<ArticleWithImage[]> => {
  const skip = (page - 1) * itemsPerPage;
  const now = new Date();
  try {
    const articles = await prisma.article.findMany({
      where: {
        published_at: { lt: now, },
        is_published: true
      },
      include: { image: true },
      skip,
      take: itemsPerPage,
      orderBy: { published_at: 'desc' },
    })
    return articles.filter((article) => article.published_at !== null);

  } catch (error) {
    console.error('Error fetching articles by page:', error);
    throw error;
  }
}

export const fetchArticleById = async (prisma: PrismaClient, id: string): Promise<ArticleWithImage | null> => {
  try {
    const article = await prisma.article.findUnique({
      where: {
        id: Number(id),
        published_at: { lt: new Date() },
        is_published: true
      },
      include: { image: true }
    });
    console.log(article);
    return article || null;

  } catch (error) {
    console.error('Error fetching article by ID:', error);
    throw error;
  }
}
