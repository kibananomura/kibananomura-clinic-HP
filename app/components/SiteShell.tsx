"use client";

import { Suspense, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { SiteProvider } from "../lib/site";
import Header from "./Header";
import Footer from "./Footer";
import DeviceFrame from "./DeviceFrame";
import DevicePreviewToggle from "./DevicePreviewToggle";
import MobileTabBar from "./MobileTabBar";

function Shell({ children }: { children: ReactNode }) {
  const embed = useSearchParams().get("view") === "embed";

  const page = (
    <>
      <Header />
      <div className="pb-[5.5rem] sm:pb-0">
        <main>{children}</main>
        <Footer />
      </div>
      <MobileTabBar />
    </>
  );

  // iframe 内（スマホプレビュー）では枠やトグルを出さず、ページ本体だけを描画
  if (embed) return page;

  return (
    <>
      <DeviceFrame>{page}</DeviceFrame>
      <DevicePreviewToggle />
    </>
  );
}

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <SiteProvider>
      <Suspense fallback={null}>
        <Shell>{children}</Shell>
      </Suspense>
    </SiteProvider>
  );
}
