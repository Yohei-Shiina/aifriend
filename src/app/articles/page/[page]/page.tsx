import { notFound } from "next/navigation";

import ARTICLES_CONFIG from "@root/config/articles.json";
import prisma from "@/lib/prisma";
import { fetchPageCount, fetchArticlesByPage } from "@/lib/articleUtils";
import ArticleList from "@/components/ArticleList";
import Pagination from "@/components/Pagination";
import SectionTitle from "@/components/SectionTitle";

export default async function ArticlesPage({ params }: { params: Promise<{ page: string }> }) {
  const { page: strPage } = await params;
  const page = Number(strPage);
  const totalPages = await fetchPageCount(prisma, ARTICLES_CONFIG.articlesPerPage);
  const articles = await fetchArticlesByPage(prisma, page, ARTICLES_CONFIG.articlesPerPage);
  if (articles.length === 0) notFound();
  return (
    <div className="container mx-auto p-4 space-y-4">
      <SectionTitle title="Previous Articles" description="Check out past AI news here!" />
      <ArticleList articles={articles} />
      <Pagination totalPages={totalPages} selectedPage={page} />
    </div>
  );
}
