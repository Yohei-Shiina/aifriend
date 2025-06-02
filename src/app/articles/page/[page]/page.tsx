import articlesConfig from "@root/config/articles.json";

import prisma from "@/lib/prisma";
import { fetchPageCount, fetchArticlesByPage } from "@/lib/articleUtils";

import ArticleList from "@/components/ArticleList";
import Pagination from "@/components/Pagniation";
import SectionTitle from "@/components/SectionTitle";

const ITEMS_PER_PAGE = articlesConfig.articlesPerPage;

export default async function ArticlesPage({ params }: { params: Promise<{ page: string }> }) {
  const { page: strPage } = await params;
  const page = Number(strPage);
  const totalPages = await fetchPageCount(prisma, ITEMS_PER_PAGE);
  const articles = await fetchArticlesByPage(prisma, page, ITEMS_PER_PAGE);

  return (
    <main className="space-y-6">
      <SectionTitle title="すべての記事" description="過去のAIニュースはここから見てみよう！" />
      <ArticleList articles={articles} />
      <Pagination totalPages={totalPages} selectedPage={page} />
    </main>
  );
}
