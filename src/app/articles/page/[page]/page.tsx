import articlesConfig from "@root/config/articles.json";

import prisma from "@/lib/prisma";
import { fetchPageCount, fetchArticlesByPage } from "@/lib/articleUtils";

import ArticleList from "@/components/ArticleList";
import Pagination from "@/components/Pagniation";
import TitleDivider from "@/components/TitleDivider";

const ITEMS_PER_PAGE = articlesConfig.articlesPerPage;

export default async function ArticlesPage({ params }: { params: Promise<{ page: string }> }) {
  const { page: strPage } = await params;
  const page = Number(strPage);
  const totalPages = await fetchPageCount(prisma, ITEMS_PER_PAGE);
  const articles = await fetchArticlesByPage(prisma, page, ITEMS_PER_PAGE);

  return (
    <main className="space-y-4">
      <TitleDivider title="すべての記事" />
      <ArticleList articles={articles} />
      <Pagination totalPages={totalPages} selectedPage={page} />
    </main>
  );
}
