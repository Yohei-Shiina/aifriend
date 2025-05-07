import Link from "next/link";

import prisma from "@/lib/prisma";
import { fetchArticles, sortArticlesByPublishedDateDesc } from "@/lib/articleUtils";
import ArticleList from "@/components/ArticleList";
import TitleDivider from "@/components/TitleDivider";

export default async function Home() {
  const articles = sortArticlesByPublishedDateDesc(await fetchArticles(prisma));

  return (
    <main className="space-y-4">
      <TitleDivider title="新着記事" />
      <ArticleList articles={articles.slice(0, 5)} />
      <div className="flex justify-center">
        <button className="btn btn-primary">
          <Link href="/articles">すべての記事を見る</Link>
        </button>
      </div>
    </main>
  );
}
