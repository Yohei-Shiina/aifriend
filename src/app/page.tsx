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
    <main className="space-y-6">
      {/* TODO: uncomment when special articles or something else are ready */}
      {/* <div className="space-y-4 mb-6">
        {articles.slice(0, 3).map((article) => {
          return (
            <div
              key={article.id}
              className="card card-side bg-base-100 shadow-sm rounded-lg overflow-hidden"
            >
              <div className="relative h-20 w-30 flex-shrink-0">
                <Image
                  src={article.image_url}
                  alt={article.image_url}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="card-body p-0 px-4">
                <h2 className="card-title">{article.title}</h2>
                <time
                  className="text-xs text-base-content"
                  dateTime={article.published_at.toLocaleString()}
                >
                  {dayjs(article.published_at.toLocaleString()).format("YYYY年M月D日")}
                </time>
              </div>
            </div>
          );
        })}
      </div> */}

      <Crousell />

      <TitleDivider title="新着記事" />
      <ArticleList articles={articles.slice(0, topArticlesCount)} />
      <div className="flex justify-center">
        <button className="btn btn-primary">
          <Link href={`${ARTICLES_PAGE_PREFIX}/1`}>すべての記事を見る</Link>
        </button>
      </div>
    </main>
  );
}
