import Link from "next/link";

import { ARTICLES_PAGE_PREFIX } from "@root/config/routes";
import prisma from "@/lib/prisma";
import { fetchArticles } from "@/lib/articleUtils";
import ArticleList from "@/components/ArticleList";
import TitleDivider from "@/components/TitleDivider";
import Crousell from "@/components/Crousell";

import articlesConfig from "@root/config/articles.json";
const topArticlesCount = articlesConfig.topArticlesCount;

export default async function Home() {
  const articles = await fetchArticles(prisma);

  return (
    <main className="space-y-4">
      <TitleDivider title="新着記事" />
      <Crousell />
      <ArticleList articles={articles.slice(0, topArticlesCount)} />
      <div className="flex justify-center">
        <button className="btn btn-primary">
          <Link href={`${ARTICLES_PAGE_PREFIX}/1`}>すべての記事を見る</Link>
        </button>
      </div>
    </main>
  );
}
