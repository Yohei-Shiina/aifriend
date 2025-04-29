import ArticleList from "@/components/ArticleList";
import Link from "next/link";

import TitleDivider from "@/components/TitleDivider";

export default function Home() {
  // 仮データ
  const articles = [
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
  ];

  return (
    <main className="space-y-4">
      <TitleDivider title="AIFriend - AIが届ける最新情報メディア" />
      <ArticleList articles={articles.slice(0, 5)} />
      <div className="flex justify-center">
        <button className="btn btn-primary">
          <Link href="/articles">すべての記事を見る</Link>
        </button>
      </div>
    </main>
  );
}
