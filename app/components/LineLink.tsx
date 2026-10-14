import type { AnchorHTMLAttributes, ReactNode } from "react";
import { LINE_URL } from "../lib/site-config";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode };

/**
 * LINE公式アカウントへのリンク。app/lib/site-config.ts の LINE_URL が
 * 一元管理元で、未設定の場合はリンク切れ・デッドエンドを避けるため
 * 「開設準備中」の案内を表示するspanに自動で切り替わる。
 * 既存の <a href="https://line.me/..."> をそのまま置き換えて使う。
 */
export default function LineLink({ children, className = "", ...rest }: Props) {
  if (!LINE_URL) {
    return (
      <span
        className={`${className} cursor-not-allowed opacity-60`}
        aria-disabled="true"
        title="現在LINE公式アカウントを開設準備中です（近日公開予定）"
      >
        {children}
      </span>
    );
  }

  return (
    <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
      {children}
    </a>
  );
}
