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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/articles/${article.id}`}
            className="card bg-base-100 shadow-sm rounded-lg overflow-hidden"
            aria-label={article.title}
          >
            <div className="relative w-full h-50">
              <Image
                src={article.image_url}
                alt={article.title}
                layout="fill" // Fill the parent container
                objectFit="cover" // Ensure the image covers the container
              />
            </div>
            <div className="card-body p-6">
              <time
                className="text-xs text-base-content"
                dateTime={article.published_at.toLocaleString()}
              >
                {dayjs(article.published_at.toLocaleString()).format("YYYY年M月D日")}
              </time>
              <h2 className="card-title">{article.title}</h2>
              <p className="text-sm line-clamp-2">
                Revolutionary AI techniques are improving diagnostic accuracy in radiology
                departments worldwide.Revolutionary AI techniques are improving diagnostic accuracy
                in radiology departments worldwide.Revolutionary AI techniques are improving
                diagnostic accuracy in radiology departments worldwide.
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
