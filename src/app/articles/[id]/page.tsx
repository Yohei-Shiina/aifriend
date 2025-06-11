import Image from "next/image";
import { notFound } from "next/navigation";

import prisma from "@/lib/prisma";
import { fetchArticleById } from "@/lib/articleUtils";
import Markdown from "@/components/Markdown";

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await fetchArticleById(prisma, id);

  if (!article) notFound();

  return (
    <div className="container mx-auto max-w-3xl py-4">
      <div className="relative aspect-16/9 mb-6">
        <Image src={article.image_url} alt="" layout="fill" objectFit="cover" />
      </div>
      <div className="p-4">
        <h1 className="text-xl md:text-4xl font-bold mb-6">{article.title}</h1>
        <Markdown content={article.content} />
      </div>
    </div>
  );
}
