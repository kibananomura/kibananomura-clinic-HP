"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SiteProvider } from "../lib/site";
import Header from "./Header";
import Footer from "./Footer";
import MobileTabBar from "./MobileTabBar";
import ChatWidget from "./ChatWidget";

function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // 社内の資料一覧ページ（/admin）は患者さん向けサイトの一部ではないため、
  // 共通ヘッダー・フッター・モバイルタブバーを表示しない
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <main>{children}</main>;
  }

  return (
    <>
      <Header />
      <div className="pb-[5.5rem] sm:pb-0">
        <main>{children}</main>
        <Footer />
      </div>
      <MobileTabBar />
      <ChatWidget />
    </>
  );
}

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <SiteProvider>
      <Shell>{children}</Shell>
    </SiteProvider>
  );
}
