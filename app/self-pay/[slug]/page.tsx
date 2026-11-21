import type { Metadata } from "next";
import { BRAND } from "../../lib/brand";
import { BASE_URL } from "../../lib/seo";
import { getSelfPayEntry, SELFPAY_ITEMS } from "../../lib/selfpay-data";
import SelfPayPageClient from "./SelfPayPageClient";
import BreadcrumbJsonLd from "../../components/BreadcrumbJsonLd";

export function generateStaticParams() {
  return SELFPAY_ITEMS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getSelfPayEntry(slug);
  if (!item) {
    return { title: `自費診療について | ${BRAND.ja.titleSuffix}` };
  }
  const priceReady = !item.priceNote.startsWith("準備中") && !item.priceNote.startsWith("料金は開院までに");
  const description =
    item.seoDescription ??
    `${item.summary.replace(/\*\*|__/g, "")} ${priceReady ? "料金・主なリスクはページ内でご確認いただけます。" : "主なリスクはページ内でご確認いただけます（料金は開院までに掲載します）。"}`;
  return {
    title: item.seoTitle ? { absolute: item.seoTitle } : `${item.title} | 自費診療 | ${BRAND.ja.titleSuffix}`,
    description,
    alternates: {
      canonical: `/self-pay/${slug}`,
    },
    openGraph: {
      title: item.seoTitle ?? `${item.title} | 自費診療`,
      description,
      url: `${BASE_URL}/self-pay/${slug}`,
      type: "article",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
  };
}

export default async function SelfPayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getSelfPayEntry(slug);
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "トップ", url: "/" },
          { name: "診療案内", url: "/services" },
          { name: item?.title ?? slug, url: `/self-pay/${slug}` },
        ]}
      />
      <SelfPayPageClient />
    </>
  );
}
