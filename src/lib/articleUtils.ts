
import { type PrismaClient, type Article } from '@root/generated/prisma/client';

import articlesConfig from "@root/config/articles.json";
const ITEMS_PER_PAGE = articlesConfig.articlesPerPage;

export type FetchArticleResult = (Omit<Article, 'content' | 'created_at' | 'updated_at'> & { published_at: Date })[];
/**
 * Fetch all published articles
 * @param prisma 
 * @returns 
 */
export const fetchArticles = async (prisma: PrismaClient): Promise<FetchArticleResult> => {
  const articles = await prisma.article.findMany({
    omit: {
      content: true,
      created_at: true,
      updated_at: true,
    }
  });
  return articles
    .filter((article) => article.published_at !== null)
    .map((article) => ({
      ...article,
      published_at: article.published_at as Date,
    }));
}

/**
 * Sort articles by published date in ascending order
 * @param articles 
 * @returns 
 */
export const sortArticlesByPublishedDateDesc = (articles: FetchArticleResult): FetchArticleResult => {
  return articles.sort((a, b) => {
    return b.published_at.getTime() - a.published_at.getTime(); // Sort in descending order
  });
};


export const fetchPageCount = async (prisma: PrismaClient): Promise<number> => {
  const count = await prisma.article.count({
    where: { published_at: { not: null } },
  });
  return Math.ceil(count / ITEMS_PER_PAGE);
}

/**
 * Fetch articles by page
 * @param prisma 
 * @param page 
 * @returns 
 */
export const fetchArticlesByPage = async (prisma: PrismaClient, page: number): Promise<FetchArticleResult> => {
  const skip = (page - 1) * ITEMS_PER_PAGE;
  const articles = await prisma.article.findMany({
    where: { published_at: { not: null, } },
    omit: {
      content: true,
      created_at: true,
      updated_at: true,
    },
    skip,
    take: ITEMS_PER_PAGE,
    orderBy: { published_at: 'desc' },

  })
  return articles.map((_) => ({ ..._, published_at: _.published_at as Date })) // Cast published_at to Date
}