import type { ReactNode } from "react";

/**
 * 疾患ページ本文用の軽量インライン装飾レンダラー。
 *   - "**強調したい文字**" → 太字(strong)
 *   - "__下線を引きたい文字__" → 下線(underline)
 * それ以外はプレーンテキストとして表示する。
 */
export default function InlineRichText({ text }: { text: string }): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|__[^_]+__)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
          return (
            <strong key={i} className="font-bold text-ink">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("__") && part.endsWith("__") && part.length > 4) {
          return (
            <span key={i} className="underline decoration-primary/60 decoration-2 underline-offset-2">
              {part.slice(2, -2)}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
