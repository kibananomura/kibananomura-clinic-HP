import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, DM_Sans } from "next/font/google";
import "./globals.css";
import SiteShell from "./components/SiteShell";
import ClinicJsonLd from "./components/ClinicJsonLd";
import { BRAND } from "./lib/brand";
import { BASE_URL, SITE_SEO } from "./lib/seo";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-sans-jp",
  display: "swap",
  preload: false,
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const siteTitle = SITE_SEO.title;
const siteDescription = SITE_SEO.description;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: siteTitle,
  description: siteDescription,
  keywords: [...SITE_SEO.keywords],
  authors: [{ name: BRAND.ja.primary }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    locale: "ja_JP",
    siteName: BRAND.ja.primary,
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    // Bing Webmaster Toolsで「サイト所有権の確認」＞「メタタグ」で発行された値に差し替えること。
    // 未発行の間はプレースホルダーのままにしておく（実在しないコードなので確認は失敗するが、
    // 実装のみ先行させている）。
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION ?? "PLACEHOLDER_BING_VERIFICATION_CODE",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#5B9B5A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${notoSansJp.variable} ${dmSans.variable}`}>
      <body>
        <ClinicJsonLd />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
