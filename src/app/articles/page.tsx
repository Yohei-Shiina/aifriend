import fs from "fs";
import path from "path";

import ArticleList from "@/components/ArticleList";
import Pagination from "@/components/Pagniation";
import TitleDivider from "@/components/TitleDivider";

export default function ArticlesPage() {
  // 仮データ
  const filePath = path.join(process.cwd(), "public", "articles.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const articles = JSON.parse(jsonData);

  return (
    <main className="space-y-4">
      <TitleDivider title="すべての記事" />
      <ArticleList articles={articles} />
      <Pagination totalPages={2} />
    </main>
  );
}
