import Image from "next/image";
import prisma from "@/lib/prisma";
import { fetchArticles } from "@/lib/articleUtils";

export default async function Crousell() {
  const articles = await fetchArticles(prisma);
  return (
    <>
      <div className="carousel w-full">
        {articles.slice(0, 4).map((article, index) => {
          const itemKey = index;
          const itemId = index + 1;
          return (
            <div key={itemKey} id={`item${itemId}`} className="carousel-item h-50 w-full relative">
              <Image
                src={article.image_url}
                layout="fill"
                objectFit="cover"
                alt="thumbnail_image"
              />
            </div>
          );
        })}
      </div>
      <div className="flex w-full justify-center gap-2 py-2">
        {articles.slice(0, 4).map((article, index) => {
          const itemKey = index;
          const itemId = index + 1;
          return (
            <a key={itemKey} href={`#item${itemId}`} className="btn btn-xs">
              {itemId}
            </a>
          );
        })}
      </div>
    </>
  );
}
