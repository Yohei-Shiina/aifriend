import { NextResponse } from 'next/server';
import { PrismaClient } from '@/lib/prisma';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const article = await prisma.article.create({
      data: {
        title: 'ChatGPTと生成AIがもたらすビジネス革命',
        content: `# GPT-4oがすごすぎる件。AI初心者が“今日から”使える理由をやさしく解説！

こんにちは、AIFriendです。  
AIって興味あるけど「難しそう」「どこから始めればいいか分からない」って感じていませんか？  
そんなあなたにぜひ知ってほしいのが、今話題の **GPT-4o**（読み方は「ジーピーティー フォー・オー」）。

---

## 🤖 GPT-4oって何がすごいの？

GPT-4oは、OpenAIが2024年に発表した最新モデルで、**音声・テキスト・画像**のやり取りができる“マルチモーダルAI”です。

### 主な特徴はこれ！

| 機能              | 内容                                         |
|-------------------|----------------------------------------------|
| 💬 自然な会話力     | まるで人間と話してるみたいなやりとりが可能          |
| 🖼️ 画像理解力       | 画像を見せると、その内容を説明してくれる            |
| 🎤 音声対応         | 話しかけるとリアルタイムで返事してくれる（しかも超早い）|
| 💡 学習済み知識     | 2024年までの幅広い知識をもとに質問に答えてくれる     |

---

## 👶 AI初心者でも大丈夫？ → むしろ今がチャンス！

GPT-4oは、「AIってよく分からない」人にこそ使ってみてほしいツールです。  
難しい設定も不要。スマホやPCからチャットするだけ。

### たとえばこんな使い方ができるよ

- ✅ 旅行のプランを丸ごと立ててもらう  
- ✅ インスタの投稿文をおしゃれに整えてもらう  
- ✅ 資料の内容を簡単に要約してもらう  
- ✅ 「今日何食べよう？」にアイデアをくれる  
- ✅ 気になるニュースをわかりやすく説明してくれる

しかも、**無料プランでもGPT-4oは使える**ようになってきています！（※一部制限あり）

---

## 🤝 AIFriendが思う「GPT-4oが特にすごい」ところ

僕たちが特に驚いたのはこの3つ：

1. **画像に強い！** 写真をアップするだけで「どんな料理？」「これどこ？」に答えてくれる。
2. **反応が速い！** ほぼリアルタイムで返ってくるから、まるで友達とLINEしてるみたい。
3. **会話が自然！** こっちの意図をくみ取ってくれるから、ストレスなく話が続く。

---

## 🌱 今日から始めるためのリンク集

| 目的                     | リンク                                         |
|--------------------------|-----------------------------------------------|
| ChatGPTを使ってみる       | [https://chat.openai.com](https://chat.openai.com) |
| GPT-4oってどんな技術？    | [公式ブログ記事](https://openai.com/index/gpt-4o)  |
| 日本語で詳しく知りたい     | [Zennの解説記事](https://zenn.dev/) で「GPT-4o」で検索 |

---

## 🎯 まとめ：未来の入り口は「気軽な1クリック」から

AIって、なんだかすごい世界の話に思えるかもしれません。  
でも、**GPT-4oはもう“道具”です**。  
検索と同じくらい自然に、あなたの毎日に入り込んできます。

まずは「今日の晩ごはん、何食べよう？」って聞いてみてください。  
きっとそこから、新しい世界が始まりますよ。

---

## 📎 エビデンス・出典

- OpenAI公式: [https://openai.com/index/gpt-4o](https://openai.com/index/gpt-4o)  
- The Verge記事: ["GPT-4o is OpenAI's new flagship model"](https://www.theverge.com/)  
- YouTube: [Matt Wolfe氏によるデモ解説](https://www.youtube.com/)

---

_AIFriendより、「AIと友達になる第一歩」を応援しています。_
`,

        image_url: '/randomImage1.webp',
        published_at: new Date(),
      },
    });

    return NextResponse.json({ success: true, article });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
