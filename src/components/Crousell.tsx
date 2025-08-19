import Image from "next/image";
import prisma from "@/lib/prisma";
import { fetchArticles } from "@/lib/articleUtils";

export default async function Crousell() {
  try {
    const articles = await fetchArticles(prisma);

    if (!articles || articles.length === 0) {
      return (
        <div className="carousel w-full">
          <div className="carousel-item relative h-60 w-full rounded-lg overflow-hidden bg-base-200 flex items-center justify-center">
            <p className="text-base-content">No articles available</p>
          </div>
        </div>
      );
    }

    return (
      <div className="carousel w-full">
        {articles.slice(0, 3).map((article, index, _articles) => {
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
              <Image
                src={article.image_url || "/img_not_found.png"}
                alt={article.title || "Article thumbnail"}
                fill
                className="object-cover"
              />
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
  } catch (error) {
    console.error("Error loading carousel articles:", error);
    return (
      <div className="carousel w-full">
        <div className="carousel-item relative h-60 w-full rounded-lg overflow-hidden bg-base-200 flex items-center justify-center">
          <p className="text-base-content">Failed to load articles</p>
        </div>
      </div>
    );
  }
}
