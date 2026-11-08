import type { ReactNode } from "react";
import Link from "next/link";
import { withWbr } from "../lib/jp-break";

/**
 * ブログ本文の軽量Markdownレンダラー。
 * content/blog/*.md の "## ja" / "## en" セクション内の各段落（空行区切り）が
 * 1つの text block として渡される。その中に以下の簡易記法が含まれる場合、
 * 装飾付きで表示する（それ以外はプレーンな段落として表示）。
 *   - 行頭 "## " → 見出し(h2)
 *   - 行頭 "### " → 見出し(h3)
 *   - 行頭 "- " が連続する行 → 箇条書き(ul)
 *   - "**強調したい文字**" → 太字(strong)
 *   - "[リンク文字](/blog/slug)" → サイト内リンク
 *   - "[リンク文字](https://...)" → 外部リンク（新しいタブで開く・↗ 付き）
 *   - 行頭 "> " が連続する行 → 引用・ひと言（左に線の入った囲み）
 */

function renderInline(text: string, breakHints = false): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\((?:\/|https?:\/\/)[^)\s]*\))/g);
  return parts.map((part, i) => {
    const external = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)\s]*)\)$/);
    if (external) {
      return (
        <a
          key={i}
          href={external[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-primary-dark underline underline-offset-2"
        >
          {external[1]}
          <span aria-hidden="true" className="ml-0.5 text-xs">↗</span>
        </a>
      );
    }
    const link = part.match(/^\[([^\]]+)\]\((\/[^)\s]*)\)$/);
    if (link) {
      return (
        <Link key={i} href={link[2]} className="font-bold text-primary-dark underline underline-offset-2">
          {link[1]}
        </Link>
      );
    }
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={i} className="font-bold text-ink">
          {breakHints ? withWbr(part.slice(2, -2)) : part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{breakHints ? withWbr(part) : part}</span>;
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

  let quoteBuffer: string[] = [];
  const flushQuote = (key: string) => {
    if (quoteBuffer.length === 0) return;
    elements.push(
      <blockquote
        key={key}
        className="my-2 rounded-r-2xl border-l-4 border-primary/50 bg-accent/50 px-4 py-3 text-[15px] leading-[1.9] text-ink/85"
      >
        {quoteBuffer.map((q, j) => (
          <p key={j}>{renderInline(q)}</p>
        ))}
      </blockquote>
    );
    quoteBuffer = [];
  };

  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("> ")) {
      flushList(`list-${i}`);
      quoteBuffer.push(trimmed.slice(2));
      return;
    }
    flushQuote(`quote-${i}`);
    if (trimmed.startsWith("- ")) {
      listBuffer.push(trimmed.slice(2));
      return;
    }
    flushList(`list-${i}`);

    if (trimmed.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-lg font-bold text-ink">
          {renderInline(trimmed.slice(4), true)}
        </h3>
      );
    } else if (trimmed.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-xl font-bold text-primary-dark">
          {renderInline(trimmed.slice(3), true)}
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
  flushQuote("quote-end");

  return <div className="space-y-3">{elements}</div>;
}
