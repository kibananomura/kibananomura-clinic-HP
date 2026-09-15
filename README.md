# きばなクリニック 公式サイト（KIBANA CLINIC）

宮崎市熊野に2027年秋開院予定の内科・外科クリニック「きばなクリニック」の公式サイト（Homeページ）。

「まちの保健室」のような温かさをコンセプトに、清潔感と親しみやすさを両立したデザインです。

## 技術スタック

- **Next.js 14**（App Router）
- **TypeScript**
- **Tailwind CSS**（カスタムカラーパレット）
- **Framer Motion**（スクロール連動フェードイン）
- **next/font**（Noto Sans JP + DM Sans）

## カラーパレット

| 役割    | カラー    |
| ------- | --------- |
| Primary | `#5B9B5A` |
| Surface | `#FFFFFF` |
| Accent  | `#F0F7EE` |
| Text    | `#1A2B1A` |
| Muted   | `#6B7B6B` |

## セットアップ

```bash
cd apps/clinic-gantt
npm install
npm run dev      # 開発サーバー (http://localhost:3000)
npm run build    # 本番ビルド
npm run start    # 本番サーバー
npm run lint     # ESLint
```

リポジトリ直下から起動する場合:

```bash
npm run dev      # apps/clinic-gantt を自動で起動
```

### 開発サーバーについて

`npm run dev` は起動前に `.next` キャッシュを削除し、**Turbopack** で開発サーバーを起動します（Webpack の HMR キャッシュ破損による `Cannot find module './xxx.js'` エラーを防ぐため）。

Turbopack で問題がある場合のみ `npm run dev:webpack` を使ってください。

## ページ構成（`app/page.tsx`）

1. **Hero** — ファーストビュー（メインコピー / LINE登録CTA / 診療案内アコーディオン）
2. **Mission** — 理念「私たちの約束」＋ビジョン引用
3. **Features** — 選ばれる4つの理由（診療時間ミニ表付き）
4. **Director** — 院長 野村信介 紹介
5. **Services** — 診療案内（保険 / 自費 / 診療時間表）
6. **Access** — アクセス・開院情報
7. **RegisterCTA** — 開院情報登録（LINE）
8. **Footer**

## 差し替えが必要な箇所（開院準備時）

- LINE公式アカウントURL（`LineButton` / `Header` の `#register` リンク）
- 院長写真（`DirectorPortrait` のイラストプレースホルダー）
- Google マップ埋め込み（`Access` のプレースホルダー）
- 電話番号・SNSリンク（`Footer`）

## アクセシビリティ / UX 配慮

- すべての装飾SVGに `aria-hidden`、意味を持つ図に `alt` / `aria-label`
- `prefers-reduced-motion` に対応（アニメーション抑制）
- 診療時間表はモバイルでも横スクロール不要の7列グリッド
- 「水曜午後」「CT完備」「地元在住」を全体で反復
- 建設中のため「予約はまだできません」を控えめなバナーで常時表示
