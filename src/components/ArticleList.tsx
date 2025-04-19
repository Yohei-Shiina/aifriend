import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";

type ArticleListProps = {
  articles: {
    id: number;
    title: string;
    image: string;
    date: string;
  }[];
};

export default function ArticleList(props: ArticleListProps) {
  const { articles } = props;
  return (
    <>
      <div className="space-y-2">
        {articles.map((article) => (
          <Link href="#" key={article.id} className="block" aria-label={article.title}>
            <div className="flex flex-row gap-1">
              <div className="relative aspect-16/9 w-3/7">
                <Image
                  src={article.image}
                  alt=""
                  layout="fill" // Fill the parent container
                  objectFit="cover" // Ensure the image covers the container
                />
              </div>
              <div className="flex flex-col gap-1 w-4/7 p-1">
                <h2 className="text-sm line-clamp-3" aria-hidden="true">
                  {article.title}
                </h2>
                <time className="text-xs text-base-content" dateTime={article.date}>
                  {dayjs(article.date).format("YYYY年M月D日")}
                </time>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
