"use client";

import Link from "next/link";
import Image from "next/image";
import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";
import { SoftBlob, Blossom } from "./Decor";
import { useSite } from "../lib/site";
import { posts, getContent } from "../lib/blog";

export default function BlogTeaser() {
  const { t, lang } = useSite();
  const latest = posts.slice(0, 2);

  return (
    <section id="blog" className="section-pad relative overflow-hidden bg-accent/60">
      <SoftBlob className="absolute -left-24 top-20 h-80 w-80 bg-blossom/20" />
      <SoftBlob className="absolute -right-16 bottom-12 h-72 w-72 bg-primary/10" />
      <Blossom className="absolute right-8 top-12 hidden h-9 w-9 opacity-70 sm:block" />

      <div className="container-page relative">
        <FadeIn>
          <SectionHeading eyebrow={t.blog.eyebrow} title={t.blog.latestHeading} />
        </FadeIn>

        <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
          {latest.map((post, i) => {
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
                    <h3 className="mt-2 text-lg font-bold text-ink">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/70">
                      {c.excerpt}
                    </p>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.15} className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-primary px-7 py-3.5 font-bold text-white shadow-soft transition-transform hover:scale-105 hover:bg-primary-dark"
          >
            {t.blog.viewAll}
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
