import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, DM_Sans } from "next/font/google";
import "./globals.css";
import SiteShell from "./components/SiteShell";
import ClinicJsonLd from "./components/ClinicJsonLd";
import { BRAND } from "./lib/brand";
import { SITE_SEO } from "./lib/seo";

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
  title: siteTitle,
  description: siteDescription,
  keywords: [...SITE_SEO.keywords],
  authors: [{ name: BRAND.ja.primary }],
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
