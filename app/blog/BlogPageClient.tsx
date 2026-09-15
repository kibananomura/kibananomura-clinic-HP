"use client";

import Link from "next/link";
import Image from "next/image";
import FadeIn from "../components/FadeIn";
import SectionHeading from "../components/SectionHeading";
import { SoftBlob, LeafSprig } from "../components/Decor";
import { useSite } from "../lib/site";
import { posts, getContent } from "../lib/blog";

export default function BlogPageClient() {
  const { t, lang } = useSite();

  return (
    <section className="section-pad relative overflow-hidden bg-cream page-top">
      <SoftBlob className="absolute -right-24 top-24 h-80 w-80 bg-sky/30" />
      <SoftBlob className="absolute -left-16 bottom-12 h-72 w-72 bg-primary/10" />
      <LeafSprig className="absolute right-10 bottom-10 hidden h-24 w-16 rotate-12 opacity-40 sm:block" />

      <div className="container-page relative">
        <FadeIn>
          <SectionHeading eyebrow={t.blog.eyebrow} title={t.blog.heading} />
        </FadeIn>

        <FadeIn delay={0.05}>
          <p className="mx-auto mt-6 max-w-xl text-center text-[15px] leading-relaxed text-ink/75">
            {t.blog.intro}
          </p>
        </FadeIn>

        <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
          {posts.map((post, i) => {
            const c = getContent(post, lang);
            return (
              <FadeIn as="article" key={post.slug} delay={(i % 2) * 0.08}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block h-full overflow-hidden rounded-3xl bg-surface/90 shadow-card transition-all hover:-translate-y-1 hover:shadow-soft"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.cover}
                      alt={c.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className={`object-cover ${
                        post.coverPosition ?? "object-center"
                      } transition-transform duration-500 group-hover:scale-105`}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <time className="font-bold text-primary-dark">
                        {post.date}
                      </time>
                      <span className="rounded-full bg-accent px-2.5 py-0.5 font-bold text-primary-dark">
                        {c.category}
                      </span>
                    </div>
                    <h2 className="mt-2 text-lg font-bold text-ink">{c.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink/70">
                      {c.excerpt}
                    </p>
                    <span className="mt-4 inline-block text-sm font-bold text-primary transition-colors group-hover:text-primary-dark">
                      {t.blog.readMore}
                    </span>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full bg-surface px-5 py-2.5 text-sm font-bold text-primary-dark shadow-card transition-transform hover:scale-105"
          >
            <span aria-hidden="true">←</span>
            {t.common.backHome}
          </Link>
        </div>
      </div>
    </section>
  );
}
