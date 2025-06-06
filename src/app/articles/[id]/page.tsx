import Image from "next/image";
import prisma from "@/lib/prisma";
import { fetchArticleById } from "@/lib/articleUtils";
import Markdown from "@/components/Markdown";

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const article = await fetchArticleById(prisma, id);

  return (
    <div className="container mx-auto max-w-3xl py-4">
      <div className="relative aspect-16/9 mb-6">
        <Image src={article.image_url} alt="" layout="fill" objectFit="cover" />
      </div>
      <div className="p-4">
        <Markdown content={article.content} />
      </div>
    </div>
  );
}
