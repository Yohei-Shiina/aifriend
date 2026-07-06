# AIFriend – AI駆動 AIニュースプラットフォーム

<p align="right"><strong>日本語</strong> ・ <a href="./README.md">English</a></p>

![Project Status: Archived](https://img.shields.io/badge/Status-Archived_(PoC)-lightgrey)

**🔗 ライブデモ:** https://aifriend-dusky.vercel.app

---

## 📖 プロジェクトについて

**AIFriend** は、Generative AI を使って AI 関連のニュース記事を親しみやすい文体で生成する、小規模なフルスタック Web アプリケーションです。

ワーキングホリデー中に以下を実践するために制作しました：

- **OpenAI API** を実際のプロダクトに近い形で組み込む  
- **Next.js App Router** を使ったモダンなフルスタックアーキテクチャ  
- **ホスト型 PostgreSQL（Supabase）+ Prisma** の活用  
- **Vercel** へのデプロイと運用

本番プロダクトを目指したものではなく、AI 搭載 Web アプリを設計・実装・リリースする一連の流れを自分で示すことが目的です。

---

## 🛠 技術スタック

**フロントエンド**

- React  
- Next.js（App Router）  
- TypeScript  
- Tailwind CSS
- DaisyUI

**バックエンド / データ**

- Next.js ルートハンドラ（API エンドポイント）  
- Prisma ORM  
- PostgreSQL（Supabase でマネージド）  

**AI & メディア**

- 記事生成に OpenAI API  
- 画像生成 + 外部画像ホスティング（Cloudinary など）  

**デプロイ**

- Vercel

---

## ✨ 主な機能

- **AI による記事生成**  
  - 最近の AI / テック系ニューストピックを入力として受け取る  
  - 構造化されたプロンプトを OpenAI に送信し、タイトル・概要・Markdown 本文を受け取る  
  - 堅い報道口調ではなく、親しみやすい文体を重視

- **引用を意識したコンテンツ**  
  - プロンプトでモデルに元ソースへの言及を促す  
  - 記事末尾に「出典 / 引用」セクションを追加し、情報元を追跡できるようにする

- **DB 管理された記事**  
  - 生成記事は Prisma 経由で PostgreSQL に保存  
  - タイトル・概要・Markdown 本文・タイムスタンプ・公開ステータスを管理  
  - 公開済み記事のみをサイトに表示

- **シンプルな管理フロー**  
  - 記事生成のトリガーと既存記事の管理ができる最小限の管理画面  
  - 個人 PoC のため、シングル管理者・パブリックサインアップなしのシンプル設計

- **公開向けニュースサイト**  
  - トップページに DB から取得した最新 AI 記事を一覧表示  
  - 各記事には Markdown からレンダリングした詳細ページを提供  
  - Next.js App Router によりサーバーコンポーネントと API ロジックをクリーンに混在

---

## 💡 技術的なポイント

- **Next.js App Router**  
  - 公開ページ・管理ページ・API エンドポイントを一つのコードベースで構成  
  - データ取得・AI 呼び出し・DB 書き込みなどサーバーサイドの処理とクライアント UI コンポーネントを分離

- **Supabase（マネージド PostgreSQL）**  
  - Supabase はマネージド PostgreSQL ホストとして使用  
  - Prisma がスキーマとクエリを管理するため、特定クラウドへの依存を排除

- **実フローへの OpenAI 組み込み**  
  - プレイグラウンドから呼ぶだけでなく、完全なフローに組み込み：
    1. トピック収集 →  
    2. プロンプト構築 →  
    3. OpenAI 呼び出し →  
    4. DB 保存 →  
    5. 公開サイトへレンダリング  

---

## 📌 プロジェクトの状態

このプロジェクトは **Proof of Concept としてアーカイブ済み** です。

新機能の開発は行っていませんが、以下を示すポートフォリオとしてコードとデモを公開しています：

- Next.js を使ったフルスタックアーキテクチャへのアプローチ  
- OpenAI・Supabase などの外部サービス連携  
- 小規模 AI 搭載 Web アプリの構築・デプロイ・運用のエンドツーエンドの流れ
