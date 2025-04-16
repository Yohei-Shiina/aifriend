import ArticleList from "../components/ArticleList";

export default function Home() {
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
  ];
  return (
    <>
      {/* Header */}
      <header className="shadow-sm">
        <div className="navbar">
          <a className="btn btn-ghost text-xl">AIFriend</a>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        <h2 className="text-lg mb-4">記事一覧</h2>
        <ArticleList articles={articles} />
      </main>
      <footer>footer</footer>
    </>
  );
}
