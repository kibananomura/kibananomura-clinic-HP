import type { MetadataRoute } from "next";
import { SYMPTOMS } from "./lib/symptoms-data";
import { DISEASES } from "./lib/diseases-data";
import { generatedPosts } from "./lib/blog-data.generated";
import { BASE_URL } from "./lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/services",
    "/pricing",
    "/faq",
    "/contact",
    "/careers",
    "/symptoms",
    "/diseases",
    "/blog",
    "/links",
    "/tokushoho",
    "/privacy",
    "/first-visit",
    "/survey",
    "/equipment",
    "/news",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));

  const symptomRoutes: MetadataRoute.Sitemap = SYMPTOMS.map((entry) => ({
    url: `${BASE_URL}/symptoms/${entry.slug}`,
    lastModified: entry.lastReviewed,
  }));

  const diseaseRoutes: MetadataRoute.Sitemap = DISEASES.map((entry) => ({
    url: `${BASE_URL}/diseases/${entry.slug}`,
    lastModified: entry.lastReviewed,
  }));

  const blogRoutes: MetadataRoute.Sitemap = generatedPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date.replace(/\./g, "-")),
  }));

  return [...staticRoutes, ...symptomRoutes, ...diseaseRoutes, ...blogRoutes];
}
