import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";

import { FetchArticleResult } from "@/lib/articleUtils";

type ArticleListProps = {
  articles: FetchArticleResult[];
};

export default function ArticleList(props: ArticleListProps) {
  const { articles } = props;
  return (
    <>
      <div className="space-y-6">
        {articles.map((article) => (
          <Link href="#" key={article.id} className="block" aria-label={article.title}>
            <div className="card bg-base-100 w-full shadow-sm rounded-lg overflow-hidden">
              <div className="relative w-full h-50">
                <Image
                  src={article.image_url}
                  alt={article.title}
                  layout="fill" // Fill the parent container
                  objectFit="cover" // Ensure the image covers the container
                />
              </div>
              <div className="card-body">
                <time
                  className="text-xs text-base-content"
                  dateTime={article.published_at.toLocaleString()}
                >
                  {dayjs(article.published_at.toLocaleString()).format("YYYY年M月D日")}
                </time>
                <h2 className="card-title">{article.title}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
