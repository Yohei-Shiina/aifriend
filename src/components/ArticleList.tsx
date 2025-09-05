import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";

import { ArticleWithImageForList } from "@/types/article";
import TextGradient from "./TextGradient";

type ArticleListProps = {
  articles: ArticleWithImageForList[];
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
                src={article.image?.secure_url || "/img_not_found.png"}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="card-body p-6">
              <time
                className="text-sm text-neutral"
                dateTime={article.published_at!.toLocaleString()}
              >
                {dayjs(article.published_at!.toLocaleString()).format("YYYY年M月D日")}
              </time>
              <h2 className="card-title">
                <TextGradient
                  from="from-primary"
                  via="via-secondary"
                  to="to-accent"
                  text={article.title}
                />
              </h2>
              <p className="text-sm line-clamp-2 text-neutral">{article.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
