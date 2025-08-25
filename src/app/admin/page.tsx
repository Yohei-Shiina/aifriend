import AdminClient from "./AdminClient";
import { prisma } from "@/lib/prisma";
import { deleteArticles } from "./action";

export default async function AdminPage() {
  // get all articles
  const articles = await prisma.article.findMany({
    where: {
      is_published: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return <AdminClient articles={articles} onDeleteArticlesHandler={deleteArticles} />;
}
