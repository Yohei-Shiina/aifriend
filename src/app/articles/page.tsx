import ArticleList from "@/components/ArticleList";
import Pagination from "@/components/Pagniation";
import TitleDivider from "@/components/TitleDivider";

type Article = {
  id: number;
  title: string;
  image: string;
  date: string;
};

export default function ArticlesPage() {
  // 仮データ
  const articles: Article[] = [
    {
      id: 1,
      title: "AIが記事を書くAIメディアが今話題に？実際にAIに記事を書かせてみた！",
      image: "/randomImage1.webp",
      date: new Date().toLocaleString(),
    },
    {
      id: 2,
      title: "ほげ電機、DXイノベーションアカデミーを設立　2万人のDX人財確保を目指す",
      image: "/randomImage1.webp",
      date: new Date().toLocaleString(),
    },
    {
      id: 3,
      title: "おすすめクラウド型ホゲ管理システム（IDaaS）比較10選！特徴も解説",
      image: "/randomImage1.webp",
      date: new Date().toLocaleString(),
    },
    {
      id: 4,
      title:
        "AIが記事を書くAIメディアが今話題に？実際にAIに記事を書かせてみた！AIが記事を書くAIメディアが今話題に？実際にAIに記事を書かせてみた！",
      image: "/randomImage1.webp",
      date: new Date().toLocaleString(),
    },
    {
      id: 5,
      title: "ほげ電機、DXイノベーションアカデミーを設立　2万人のDX人財確保を目指す",
      image: "/randomImage1.webp",
      date: new Date().toLocaleString(),
    },
    {
      id: 6,
      title: "おすすめクラウド型ホゲ管理システム（IDaaS）比較10選！特徴も解説",
      image: "/randomImage1.webp",
      date: new Date().toLocaleString(),
    },
    {
      id: 7,
      title: "AIが記事を書くAIメディアが今話題に？実際にAIに記事を書かせてみた！",
      image: "/randomImage1.webp",
      date: new Date().toLocaleString(),
    },
    {
      id: 8,
      title: "ほげ電機、DXイノベーションアカデミーを設立　2万人のDX人財確保を目指す",
      image: "/randomImage1.webp",
      date: new Date().toLocaleString(),
    },
    {
      id: 9,
      title:
        "AIが記事を書くAIメディアが今話題に？実際にAIに記事を書かせてみた！AIが記事を書くAIメディアが今話題に？実際にAIに記事を書かせてみた！",
      image: "/randomImage1.webp",
      date: new Date().toLocaleString(),
    },
    {
      id: 10,
      title: "ほげ電機、DXイノベーションアカデミーを設立　2万人のDX人財確保を目指す",
      image: "/randomImage1.webp",
      date: new Date().toLocaleString(),
    },
    {
      id: 11,
      title: "おすすめクラウド型ホゲ管理システム（IDaaS）比較10選！特徴も解説",
      image: "/randomImage1.webp",
      date: new Date().toLocaleString(),
    },
    {
      id: 12,
      title: "おすすめクラウド型ホゲ管理システム（IDaaS）比較10選！特徴も解説",
      image: "/randomImage1.webp",
      date: new Date().toLocaleString(),
    },
  ];

  return (
    <main className="space-y-4">
      <TitleDivider title="すべての記事" />
      <ArticleList articles={articles} />
      <Pagination totalPages={2} />
    </main>
  );
}
