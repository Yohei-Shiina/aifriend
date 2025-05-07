import prisma from "@/lib/prisma";
import { fetchArticles, sortArticlesByPublishedDateDesc } from "@/lib/articleUtils";

import ArticleList from "@/components/ArticleList";
import Pagination from "@/components/Pagniation";
import TitleDivider from "@/components/TitleDivider";

export default async function ArticlesPage() {
  const articles = sortArticlesByPublishedDateDesc(await fetchArticles(prisma));
  return (
    <main className="space-y-4">
      <TitleDivider title="すべての記事" />
      <ArticleList articles={articles} />
      <Pagination totalPages={2} />
    </main>
  );
}
