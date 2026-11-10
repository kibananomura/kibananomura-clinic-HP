# ブログ原稿の書き方

このフォルダの `.md` ファイル1つが、ブログ記事1本に対応します。
ファイル名がそのまま記事のURL（slug）になります。
例）`kibana-no-namae.md` → `/blog/kibana-no-namae`

## 新しい記事を追加する

1. このフォルダに新しい `.md` ファイルを作る（ファイル名は英数字とハイフンのみ推奨）
2. 下のテンプレートをコピーして中身を書く
3. 保存する（開発サーバー起動中なら自動的にサイトへ反映されます）

```markdown
---
date: 2026.06.03
cover: /blog/画像ファイル名.png
coverPosition: object-top
category_ja: カテゴリ名
category_en: Category name
title_ja: 記事タイトル
title_en: Post title
excerpt_ja: 記事一覧に出す要約文
excerpt_en: Summary shown on the list page
---

## ja

1つ目の段落。

2つ目の段落。

![画像のキャプション](/blog/画像ファイル名.png)

3つ目の段落。

## en

First paragraph.

Second paragraph.
```

## 既存記事を直す

該当する `.md` ファイルをそのまま編集して保存するだけです。
段落は空行で区切ってください（改行だけでは段落が分かれません）。

## 画像

`public/blog/` フォルダに画像ファイルを置き、`cover:` や本文中の `![キャプション](/blog/ファイル名.png)` で参照します。

## frontmatter（`---` で囲まれた部分）の項目

| 項目 | 必須 | 説明 |
| --- | --- | --- |
| `date` | ○ | `YYYY.MM.DD` 形式。記事の並び順（古い→新しい）に使われます |
| `cover` | ○ | 一覧・記事上部に出るカバー画像のパス |
| `coverPosition` | - | 画像の表示位置を微調整したいときだけ指定（例: `object-top`） |
| `category_ja` / `category_en` | ○ | カテゴリ表示 |
| `title_ja` / `title_en` | ○ | タイトル |
| `excerpt_ja` / `excerpt_en` | ○ | 一覧ページに出る要約文。**1行で途中まで（line-clamp）表示されるため、冒頭文で興味を引く内容にすること。** 結論や核心を要約の最後に置かず、最初の一文（表示される1行分）で読みたくなる引っかかりを作る。 |

## 反映のしくみ（開発者向けメモ）

`npm run dev` の起動時、およびこのフォルダ内のファイルを保存するたびに、
`scripts/gen-blog.mjs` が自動的に `app/lib/blog-data.generated.ts` を作り直します。
`npm run build`（本番ビルド）の前にも自動実行されます（`prebuild`）。
手動で再生成したいときは `npm run blog:gen` を実行してください。

`app/lib/blog-data.generated.ts` は自動生成ファイルなので、直接編集しないでください。

## 記事どうしのリンク

本文中に `[リンク文字](/blog/記事のslug)` と書くと、サイト内リンクになります（`/` で始まるサイト内のパスのみ対応）。
例: `[肺NTM症の記事](/blog/hai-ntm-sho)`

## カテゴリ

使用中のカテゴリ：健康・予防の話（Health and prevention）／診療で大切にしていること（What I value in care）／診療所づくり（Building the clinic）／院長の歩み（The director's journey）。表示順は app/blog/BlogPageClient.tsx の CATEGORY_ORDER。

## サブ分類（健康・予防の話）

`category_ja: 健康・予防の話` の記事は、frontmatter に次の2行を加えるとサブ分類で絞り込めるようになります（任意）。

```
subcategory_ja: 胃腸・消化器
subcategory_en: Stomach & digestion
```

使用中のサブ分類：感染症・ワクチン（Infections & vaccines）／胃腸・消化器（Stomach & digestion）／肺・呼吸器・アレルギー（Lungs, breathing & allergies）／血圧（Blood pressure）／コレステロール・尿酸（Cholesterol & uric acid）／糖尿病・生活習慣病（Diabetes & lifestyle diseases）／食事・運動（Diet & exercise）／健診・検査（Checkups & tests）／足・腰・けが（Feet, back & injuries）／男性の健康（Men's health）。1つのサブ分類に3本以上がそろうように分ける（1〜2本の分類は作らず、近いものにまとめる）。表示順は app/blog/BlogPageClient.tsx の SUBCATEGORY_ORDER。

未公開の原稿（ストック）は content/blog-stock/ に置く。frontmatter の date の朝5時（日本時間）に自動で公開される（予約公開。くわしくは content/blog-stock/README.md）。

## 関連する院長ブログ（記事末尾）

frontmatter に `related: [slug, slug]` を書くと、記事の末尾に「関連する院長ブログ」として並ぶ。本文中の /blog/〇〇 へのリンクと、逆向き（相手が自分を挙げている場合）も自動で加わる。つながりが少ない記事は、同じ分類の新しい記事で補う。相手がまだストックにある場合は「近日公開」としてタイトルだけ予告する。
表示順は `app/blog/BlogPageClient.tsx` の `SUBCATEGORY_ORDER` で管理しています。

## 参考にした資料（sources）

記事の信頼性を示すため、根拠にしたガイドライン・論文・公的資料を frontmatter に書くと、記事の最後に「参考にした資料」として表示される（任意）。

```yaml
sources:
  - label: "日本高血圧学会「高血圧管理・治療ガイドライン2025」"
    url: "https://www.jpnsh.jp/guideline.html"
  - label: "日本アレルギー学会「喘息予防・管理ガイドライン2024」"   # URLがなければ label だけでよい
```

URLは実際に開けることを確かめてから書く。論文は https://doi.org/… の形にする。
