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
| `excerpt_ja` / `excerpt_en` | ○ | 一覧ページに出る要約文 |

## 反映のしくみ（開発者向けメモ）

`npm run dev` の起動時、およびこのフォルダ内のファイルを保存するたびに、
`scripts/gen-blog.mjs` が自動的に `app/lib/blog-data.generated.ts` を作り直します。
`npm run build`（本番ビルド）の前にも自動実行されます（`prebuild`）。
手動で再生成したいときは `npm run blog:gen` を実行してください。

`app/lib/blog-data.generated.ts` は自動生成ファイルなので、直接編集しないでください。
