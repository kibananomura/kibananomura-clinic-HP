"use client";

import Link from "next/link";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { SoftBlob } from "../../components/Decor";
import { useSite } from "../../lib/site";
import { getPost, getContent, getAdjacentPosts } from "../../lib/blog";

export default function BlogArticle() {
  const { t, lang } = useSite();
  const params = useParams();
  const slug = String(params?.slug ?? "");
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const c = getContent(post, lang);
  const { prev, next } = getAdjacentPosts(post.slug);

  return (
    <article className="relative overflow-hidden bg-cream pb-24 page-top">
      <SoftBlob className="absolute -right-24 top-32 h-80 w-80 bg-sky/30" />
      <SoftBlob className="absolute -left-16 bottom-12 h-72 w-72 bg-primary/10" />

      <div className="container-page relative">
        <div className="mx-auto max-w-3xl">
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl shadow-card">
            <Image
              src={post.cover}
              alt={c.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className={`object-cover ${post.coverPosition ?? "object-center"}`}
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
            <time className="font-bold text-primary-dark">{post.date}</time>
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-primary-dark">
              {c.category}
            </span>
          </div>

          <h1 className="mt-3 text-2xl font-bold leading-relaxed text-ink sm:text-3xl">
            {c.title}
          </h1>

          <div className="mt-8 space-y-5">
            {c.body.map((block, i) =>
              block.kind === "text" ? (
                <p
                  key={i}
                  className="text-[15px] leading-[1.95] text-ink/80"
                >
                  {block.text}
                </p>
              ) : (
                <figure key={i} className="my-8">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-card">
                    <Image
                      src={block.src}
                      alt={block.caption ?? ""}
                      fill
                      sizes="(max-width: 768px) 100vw, 768px"
                      className="object-cover"
                    />
                  </div>
                  {block.caption && (
                    <figcaption className="mt-2 text-center text-xs text-ink/55">
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              )
            )}
          </div>

          <nav className="mt-12 grid gap-4 border-t border-accent pt-8 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/blog/${prev.slug}`}
                className="group rounded-2xl bg-surface/90 p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-soft"
              >
                <span className="text-xs font-bold text-primary">
                  ← {t.blog.prev}
                </span>
                <p className="mt-1 text-sm font-bold text-ink group-hover:text-primary-dark">
                  {getContent(prev, lang).title}
                </p>
              </Link>
            ) : (
              <span className="hidden sm:block" />
            )}
            {next ? (
              <Link
                href={`/blog/${next.slug}`}
                className="group rounded-2xl bg-surface/90 p-5 text-right shadow-card transition-all hover:-translate-y-0.5 hover:shadow-soft"
              >
                <span className="text-xs font-bold text-primary">
                  {t.blog.next} →
                </span>
                <p className="mt-1 text-sm font-bold text-ink group-hover:text-primary-dark">
                  {getContent(next, lang).title}
                </p>
              </Link>
            ) : (
              <span className="hidden sm:block" />
            )}
          </nav>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 rounded-full bg-surface px-5 py-2.5 text-sm font-bold text-primary-dark shadow-card transition-transform hover:scale-105"
            >
              <span aria-hidden="true">←</span>
              {t.blog.backToList}
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-soft transition-transform hover:scale-105 hover:bg-primary-dark"
            >
              {t.common.backHome}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
