
import { type PrismaClient, type Article } from '@root/generated/prisma/client';

export type FetchArticleResult = (Omit<Article, 'content' | 'created_at' | 'updated_at'> & { published_at: Date })[];
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
export const sortArticlesByPublishedDateDesc = (articles: FetchArticleResult): FetchArticleResult => {
  return articles.sort((a, b) => {
    return b.published_at.getTime() - a.published_at.getTime(); // Sort in descending order
  });
};