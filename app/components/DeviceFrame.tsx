"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useSite } from "../lib/site";

const DESKTOP_WIDTH = 1280;
const DESKTOP_HEIGHT = 860;

/**
 * PC表示／スマホ表示のプレビュー枠。
 * 実際のレイアウト（Tailwindの sm:/xl: ブレークポイント）はビューポート幅で
 * 判定されるため、幅を縮める・広げるだけの枠では正しい表示にならない。
 * そこで端末幅の iframe で同じページを読み込み、本物の幅でレンダリングさせる。
 *
 * - スマホ表示: 390px 幅の iframe をスマホ実機・PCどちらでも表示
 * - PC表示: 1280px 幅の iframe を、実際の画面に収まるよう縮小表示
 *   （xl以上の画面で見ている場合は、素の children をそのまま表示して二重の枠を避ける）
 */
export default function DeviceFrame({ children }: { children: ReactNode }) {
  const { device, deviceTouched, t } = useSite();
  const pathname = usePathname();
  const embedSrc = `${pathname}?view=embed`;
  const desktopContainerRef = useRef<HTMLDivElement>(null);
  const [desktopScale, setDesktopScale] = useState(1);

  useEffect(() => {
    if (device !== "desktop" || !deviceTouched) return;
    const el = desktopContainerRef.current;
    if (!el) return;

    const update = () => {
      const available = el.clientWidth;
      setDesktopScale(available > 0 ? Math.min(1, available / DESKTOP_WIDTH) : 1);
    };
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [device, deviceTouched]);

  if (device === "mobile") {
    return (
      <div className="flex min-h-screen items-start justify-center bg-ink/10 p-4 sm:p-8">
        <div className="relative flex h-[min(844px,calc(100vh-2rem))] w-[390px] max-w-full flex-col overflow-hidden rounded-[2.75rem] border-[10px] border-ink/85 bg-surface shadow-2xl">
          <iframe
            key={embedSrc}
            src={embedSrc}
            title={t.common.previewBadge}
            className="min-h-0 w-full flex-1 border-0"
          />
        </div>
      </div>
    );
  }

  // device === "desktop"
  // トグルを一度も操作していない（＝初期状態のまま）なら、これまでどおり
  // 実際の画面幅に応じたレスポンシブ表示をそのまま出す。
  if (!deviceTouched) {
    return <>{children}</>;
  }

  return (
    <>
      {/* xl以上の実画面なら、素のページをそのまま表示（枠なし） */}
      <div className="hidden xl:contents">{children}</div>

      {/* xl未満の実画面（スマホ・タブレット）で「PC表示」を選んだ場合は、
          PC幅の iframe を画面に収まるよう縮小表示する */}
      <div
        ref={desktopContainerRef}
        className="flex min-h-screen items-start justify-center bg-ink/10 p-4 xl:hidden"
      >
        <div
          style={{
            width: DESKTOP_WIDTH * desktopScale,
            height: DESKTOP_HEIGHT * desktopScale,
          }}
        >
          <div
            className="overflow-hidden rounded-2xl border-[6px] border-ink/85 bg-surface shadow-2xl"
            style={{
              width: DESKTOP_WIDTH,
              height: DESKTOP_HEIGHT,
              transform: `scale(${desktopScale})`,
              transformOrigin: "top left",
            }}
          >
            <iframe
              key={embedSrc}
              src={embedSrc}
              title={t.common.previewBadge}
              style={{ width: DESKTOP_WIDTH, height: DESKTOP_HEIGHT, border: 0 }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
