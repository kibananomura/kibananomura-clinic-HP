import type { ReactNode } from "react";

/**
 * 本文中の重要箇所を目立たせるための、軽量インライン記法パーサー。
 * 既存のプレーンテキストに対して、以下の簡易記法だけを装飾して描画する
 * （改行・見出し・箇条書きは扱わない。段落単位のMarkdownはBlogRichTextを使用）。
 *   - "**強調したい文字**" → 太字(strong)
 *   - "__下線を引きたい文字__" → 下線(underline)
 * 記法が含まれない場合は、元のテキストをそのまま返す。
 */
export default function InlineRichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|__[^_]+__)/g);
  const nodes: ReactNode[] = parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={i} className="font-bold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("__") && part.endsWith("__") && part.length > 4) {
      return (
        <span key={i} className="underline decoration-primary/50 underline-offset-2">
          {part.slice(2, -2)}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
  return <>{nodes}</>;
}
