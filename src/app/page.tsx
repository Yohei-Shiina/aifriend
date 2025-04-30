import fs from "fs";
import path from "path";
import Link from "next/link";

import ArticleList from "@/components/ArticleList";
import TitleDivider from "@/components/TitleDivider";

export default async function Home() {
  // 仮データ
  const filePath = path.join(process.cwd(), "public", "articles.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const articles = JSON.parse(jsonData);

  return (
    <main className="space-y-4">
      <TitleDivider title="新着記事" />
      <ArticleList articles={articles.slice(0, 5)} />
      <div className="flex justify-center">
        <button className="btn btn-primary">
          <Link href="/articles">すべての記事を見る</Link>
        </button>
      </div>
    </main>
  );
}
