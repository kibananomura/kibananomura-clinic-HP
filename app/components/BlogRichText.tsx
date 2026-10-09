import type { ReactNode } from "react";

/**
 * ブログ本文の軽量Markdownレンダラー。
 * content/blog/*.md の "## ja" / "## en" セクション内の各段落（空行区切り）が
 * 1つの text block として渡される。その中に以下の簡易記法が含まれる場合、
 * 装飾付きで表示する（それ以外はプレーンな段落として表示）。
 *   - 行頭 "## " → 見出し(h2)
 *   - 行頭 "### " → 見出し(h3)
 *   - 行頭 "- " が連続する行 → 箇条書き(ul)
 *   - "**強調したい文字**" → 太字(strong)
 */

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={i} className="font-bold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function BlogRichText({ text }: { text: string }) {
  const lines = text.split("\n");
  const elements: ReactNode[] = [];
  let listBuffer: string[] = [];

  const flushList = (key: string) => {
    if (listBuffer.length === 0) return;
    elements.push(
      <ul key={key} className="list-disc space-y-1.5 pl-5">
        {listBuffer.map((item, i) => (
          <li key={i} className="text-[15px] leading-[1.9] text-ink/80">
            {renderInline(item)}
          </li>
        ))}
      </ul>
    );
    listBuffer = [];
  };

  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("- ")) {
      listBuffer.push(trimmed.slice(2));
      return;
    }
    flushList(`list-${i}`);

    if (trimmed.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-lg font-bold text-ink">
          {renderInline(trimmed.slice(4))}
        </h3>
      );
    } else if (trimmed.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-xl font-bold text-primary-dark">
          {renderInline(trimmed.slice(3))}
        </h2>
      );
    } else if (trimmed.length > 0) {
      elements.push(
        <p key={i} className="text-[15px] leading-[1.95] text-ink/80">
          {renderInline(trimmed)}
        </p>
      );
    }
  });
  flushList("list-end");

  return <div className="space-y-3">{elements}</div>;
}
