"use client";

import type { ReactNode } from "react";
import { SiteProvider } from "../lib/site";
import Header from "./Header";
import Footer from "./Footer";
import MobileTabBar from "./MobileTabBar";

function Shell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className="pb-[5.5rem] sm:pb-0">
        <main>{children}</main>
        <Footer />
      </div>
      <MobileTabBar />
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
