import prisma from "@/lib/prisma";
import { fetchPageCount, fetchArticlesByPage } from "@/lib/articleUtils";

import ArticleList from "@/components/ArticleList";
import Pagination from "@/components/Pagniation";
import TitleDivider from "@/components/TitleDivider";

export default async function ArticlesPage({ params }: { params: Promise<{ page: string }> }) {
  const { page: strPage } = await params;
  const page = Number(strPage);
  const totalPageCount = await fetchPageCount(prisma);
  const articles = await fetchArticlesByPage(prisma, page);

  return (
    <main className="space-y-4">
      <TitleDivider title="すべての記事" />
      <ArticleList articles={articles} />
      <Pagination totalPages={totalPageCount} selectedPage={page} />
    </main>
  );
}
