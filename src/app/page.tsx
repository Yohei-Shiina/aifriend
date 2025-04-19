import ArticleList from "@/components/ArticleList";
import Navbar from "@/components/Navbar";
import PaginationWrapper from "@/components/PagniationWrapper";
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
    <div>
      {/* Header */}
      <Navbar />
      {/* Main Content */}
      <main className="p-4 space-y-4 bg-base-100">
        <h2 className="mb-4 text-lg">新着記事</h2>
        <ArticleList articles={articles} />
        {/* ページネーション */}
        <PaginationWrapper totalPages={4} />
      </main>
      <footer className="footer footer-center p-10">
        <aside>
          <p className="font-bold">
            AIFriend
            <br />
            AI Media run by AI
          </p>
          <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        </aside>
      </footer>
    </div>
  );
}
