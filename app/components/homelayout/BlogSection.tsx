"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, CalendarDays, User } from "lucide-react";
import { site, type BpoBlogData, type SectionProps } from "@/data";
import ScrollReveal from "../shared/ScrollReveal";

type BpoBlogProps = SectionProps<BpoBlogData> & {
  /** Show paginated posts (blog page) instead of the home-page count. */
  showAll?: boolean;
};

export default function BpoBlog1({
  data = site.blog,
  className = "",
  showAll = false,
}: BpoBlogProps) {
  const blog = data ?? site.blog;
  const totalPages = Math.ceil(blog.posts.length / blog.postsPerPage);
  const [page, setPage] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const items = showAll
    ? blog.posts.slice(page * blog.postsPerPage, (page + 1) * blog.postsPerPage)
    : blog.posts.slice(0, blog.homeVisibleCount);

  const goTo = (next: number) => {
    const target = Math.min(Math.max(next, 0), totalPages - 1);
    if (target === page) return;
    setPage(target);
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      ref={sectionRef}
      className={`bg-white py-8 md:py-12 ${className}`}
    >
      <ScrollReveal
        as="div"
        direction="up"
        distance={32}
        className="mx-auto w-full max-w-[1320px] px-4 sm:px-6"
      >
        {/* Heading */}
        <div className="mx-auto max-w-[720px] text-center">
          <p className="text-[12px] sm:text-xl font-semibold uppercase tracking-wide text-[#E10600] ">
            {blog.badge}
          </p>
          <h2 className="mt-1 text-[30px] font-bold leading-[1.15] text-black sm:text-[40px] lg:text-[48px]">
            {blog.title.normal} <span className="text-[#E10600]">{blog.title.highlighted}</span>
          </h2>
          <p className="mt-4 text-[15px] sm:text-base lg:text-lg leading-[1.7] text-[#555555] sm:text-[14px]">
            {blog.desc}
          </p>
        </div>

        {/* Cards: image left on the first card, right on the second (desktop) */}
        <div className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-2">
          {items.map((post, index) => (
            <ScrollReveal
              as="article"
              key={post.id}
              index={index}
              staggerChildren={0.08}
              delay={0.1}
              distance={40}
              className={`flex flex-col overflow-hidden rounded-lg border border-black/5 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] sm:flex-row ${
                index % 2 === 1 ? "sm:flex-row-reverse" : ""
              }`}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="block shrink-0 overflow-hidden sm:w-[42%]"
                tabIndex={-1}
                aria-hidden
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  width={1600}
                  height={1000}
                  sizes="(max-width: 1023px) 100vw, 25vw"
                  className="aspect-[16/10] rounded-xl h-full w-full object-cover transition-transform duration-500 hover:scale-105 sm:aspect-auto "
                />
              </Link>

              <div className="flex flex-1 flex-col p-4 lg:p-6">
                <span className="w-fit rounded-[3px] bg-[#E10600]/10 px-2.5 py-1 text-[10px] sm:text-[14px] font-semibold uppercase tracking-wide text-[#E10600]">
                  {post.category}
                </span>

                <h3 className="mt-3 text-[18px] font-bold leading-snug text-black sm:text-[20px] lg:text-2xl">
                  <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-[#E10600]">
                    {post.title}
                  </Link>
                </h3>

                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] text-[#777777]">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-5 w-5 text-[#E10600]" aria-hidden />
                   <span className="text-sm">{post.date}</span> 
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <User className="h-5 w-5 text-[#E10600]" aria-hidden />
                    <span className="text-sm">By {post.author}</span>
                  </span>
                </div>

                <p className="mt-3 flex-1 text-[13px] lg:pr-10 sm:text-base leading-[1.7] text-[#666666]">
                  {post.description}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-5 inline-flex w-fit items-center gap-2 rounded-[4px] bg-[#E10600] px-4 py-2 text-[15px] font-semibold text-white transition-colors hover:bg-[#b80500]"
                >
                  {post.readMoreText}
                  <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Pagination: only on the blog page */}
        {showAll && totalPages > 1 && (
          <nav
            className="mt-10 flex items-center justify-center gap-2"
            aria-label="Blog pagination"
          >
            <button
              type="button"
              onClick={() => goTo(page - 1)}
              disabled={page === 0}
              aria-label="Previous page"
              className="flex h-10 w-10 items-center  cursor-pointer justify-center rounded-[4px] bg-[#E10600] text-white transition-colors hover:bg-[#b80500] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden />
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-current={page === i ? "page" : undefined}
                aria-label={`Page ${i + 1}`}
                className={`h-10 min-w-10 cursor-pointer rounded-[4px] px-3 text-[15px] font-semibold text-white transition-colors ${
                  page === i ? "bg-[#b80500]" : "bg-[#E10600] hover:bg-[#b80500]"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              type="button"
              onClick={() => goTo(page + 1)}
              disabled={page === totalPages - 1}
              aria-label="Next page"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[4px] bg-[#E10600] text-white transition-colors hover:bg-[#b80500] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowRight className="h-5 w-5" aria-hidden />
            </button>
          </nav>
        )}
      </ScrollReveal>
    </section>
  );
}
