import Image from "next/image";
import { notFound } from "next/navigation";

import prisma from "@/lib/prisma";
import { fetchArticleById } from "@/lib/articleUtils";
import Markdown from "@/components/Markdown";
import TextGradient from "@/components/TextGradient";

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await fetchArticleById(prisma, id);

  if (!article) notFound();

  return (
    <div className="container mx-auto max-w-3xl bg-base-100">
      <h1 className="text-2xl md:text-4xl py-15 px-2 text-center">
        <TextGradient from="from-primary" via="via-secondary" to="to-accent" text={article.title} />
      </h1>
      <div className="relative aspect-16/9 mb-6">
        <Image
          src={article.image?.secure_url || "/img_not_found.png"}
          alt={article.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4 md:px-4">
        <Markdown content={article.content} />
      </div>
    </div>
  );
}
