import type { Metadata } from "next";
import { BRAND } from "../../lib/brand";
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
    return { title: `自費診療について | ${BRAND.ja.primary}` };
  }
  return {
    title: `${item.title} | 自費診療 | ${BRAND.ja.primary}`,
    description: `${item.summary.replace(/\*\*|__/g, "")} 料金・主なリスクはページ内でご確認いただけます。`,
    alternates: {
      canonical: `/self-pay/${slug}`,
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
