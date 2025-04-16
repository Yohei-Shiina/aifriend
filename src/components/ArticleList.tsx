import Image from "next/image";
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
      <div className="space-y-4">
        {articles.map((article) => (
          <div key={article.id} className="shadow-sm">
            <div className="flex flex-row gap-1">
              <div className="relative aspect-16/9 w-3/7 cursor-pointer">
                <Image
                  src={article.image}
                  alt="article image"
                  layout="fill" // Fill the parent container
                  objectFit="cover" // Ensure the image covers the container
                />
              </div>
              <div className="flex flex-col gap-1 w-4/7">
                <p className="text-sm">{article.title}</p>
                <time className="text-sm" dateTime={article.date}>
                  {dayjs(article.date).format("YYYY年M月D日")}
                </time>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
