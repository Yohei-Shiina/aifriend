import Image from "next/image";
import prisma from "@/lib/prisma";
import { fetchArticles } from "@/lib/articleUtils";

export default async function Crousell() {
  const articles = await fetchArticles(prisma);
  return (
    <div className="carousel w-full">
      {articles.slice(0, 4).map((article, index, _articles) => {
        const itemLey = index;
        const itemId = index + 1;
        const prev = index === 0 ? _articles.length : index;
        const next = index === _articles.length - 1 ? 1 : index + 2;
        return (
          <div
            key={itemLey}
            id={`slide${itemId}`}
            className="carousel-item relative h-60 w-full rounded-lg overflow-hidden"
          >
            <Image src={article.image_url} alt="thumbnail_image" layout="fill" objectFit="cover" />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href={`#slide${prev}`} className="btn btn-circle">
                ❮
              </a>
              <a href={`#slide${next}`} className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
