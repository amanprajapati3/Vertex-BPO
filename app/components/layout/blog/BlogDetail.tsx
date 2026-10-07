import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ChevronRight, Clock3, Mail, Phone, User } from "lucide-react";
import PageBanner from "../../shared/PageBanner";
import ScrollReveal from "../../shared/ScrollReveal";
import { getBlogPosts, site, type BpoBlogArticle, type BpoBlogPost } from "@/data";

export default function BlogDetail({
  post,
  article,
}: {
  post: BpoBlogPost;
  article: BpoBlogArticle;
}) {
  const page = site.blog.detailPage;
  const recentPosts = [post, ...getBlogPosts().filter((item) => item.slug !== post.slug)].slice(0, 4);

  return (
    <>
      <PageBanner data={page.banner} compact />

      <ScrollReveal
        as="main"
        direction="up"
        distance={40}
        className="bg-white pb-8 pt-7 sm:pb-10 md:pb-8 md:pt-[30px]"
      >
        <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-5 px-4 sm:px-8 md:grid-cols-[minmax(0,2.3fr)_minmax(190px,1fr)] md:gap-[18px]">
          <ScrollReveal
            as="article"
            direction="right"
            distance={32}
            mobileDirection="up"
            className="min-w-0"
          >
            <div className="relative aspect-[2.84/1] overflow-hidden rounded-[3px] bg-gray-100">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 767px) 100vw, 65vw"
                className="object-cover"
              />
            </div>

            <span className="mt-3 inline-flex rounded-[3px] bg-[#ffe1e1] px-2 py-1 text-[11px] font-semibold uppercase leading-none text-[#ed111d]">
              {post.category}
            </span>

            <h1 className="mt-2 text-2xl font-bold leading-[1.2] text-[#111c2b] sm:text-3xl lg:text-4xl">
              {post.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-6 text-sm text-[#718096]">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-[#ff2635]" aria-hidden />
                {post.date}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <User className="h-4 w-4 text-[#ff2635]" aria-hidden />
                By {article.author}
              </span>
            </div>

            <p className="mt-5 text-base leading-[1.7] text-[#4b5563]">
              {article.intro}
            </p>

            {article.sections.map((section, index) => (
              <ScrollReveal
                key={`${section.title}-${index}`}
                as="section"
                direction="up"
                distance={40}
                className="mt-6"
              >
                <h2 className="text-xl font-bold leading-[1.3] text-[#111c2b] lg:text-2xl">
                  {index + 1}. {section.title}
                </h2>

                <p className="mt-2 text-base leading-[1.7] text-[#4b5563]">
                  {section.text}
                </p>

                {index === 0 && (
                  <div className="relative mt-4 aspect-[4.35/1] overflow-hidden rounded-[3px] bg-gray-100">
                    <Image
                      src={page.inlineImage}
                      alt="A virtual assistant managing a busy workday"
                      fill
                      sizes="(max-width: 767px) 100vw, 65vw"
                      className="object-cover"
                    />
                  </div>
                )}
              </ScrollReveal>
            ))}
          </ScrollReveal>

          <ScrollReveal
            as="aside"
            direction="left"
            distance={32}
            mobileDirection="up"
            className="space-y-4"
          >
            <ScrollReveal
              key="recent-posts"
              as="section"
              direction="up"
              distance={40}
              index={0}
              staggerChildren={0.08}
              delay={0.1}
              className="border border-gray-200 bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
            >
              <h2 className="border-b border-[#ff2635] pb-2 text-xl font-bold text-[#111c2b]">
                {page.sidebar.recentTitle}
              </h2>

              <ul className="mt-3 space-y-4">
                {recentPosts.map((recent) => (
                  <li key={recent.id}>
                    <Link
                      href={`/blog/${recent.slug}`}
                      className="group flex gap-3"
                    >
                      <span className="relative h-[60px] w-[64px] shrink-0 overflow-hidden rounded-[2px] bg-gray-100">
                        <Image
                          src={recent.image}
                          alt=""
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </span>

                      <span className="min-w-0">
                        <span className="line-clamp-3 block text-base font-medium leading-[1.3] text-[#243142] transition-colors group-hover:text-[#ed111d]">
                          {recent.title}
                        </span>

                        <span className="mt-1.5 inline-flex items-center gap-1 text-xs text-[#8993a1]">
                          <Clock3 className="h-3 w-3" aria-hidden />
                          {recent.date}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal
              key="sidebar-promo"
              as="section"
              direction="up"
              distance={40}
              index={1}
              staggerChildren={0.08}
              delay={0.1}
              className="rounded-[3px] bg-[#090a0c] p-4 text-white"
            >
              <h2 className="border-b-2 border-[#ed111d] pb-2 text-xl font-bold">
                {page.sidebar.promoTitle}
              </h2>

              <p className="mt-3 text-base leading-[1.5] text-white/90">
                {page.sidebar.promoDescription}
              </p>

              <a
                href={site.topbar.phoneHref}
                className="mt-3 flex items-center gap-2 text-sm font-medium"
              >
                <Phone
                  className="h-4 w-4 fill-[#ed111d] text-[#ed111d]"
                  aria-hidden
                />
                {site.topbar.phone}
              </a>

              <a
                href={site.topbar.emailHref}
                className="mt-2 flex items-center gap-2 break-all text-sm font-medium"
              >
                <Mail
                  className="h-4 w-4 fill-[#ed111d] text-[#ed111d]"
                  aria-hidden
                />
                {site.topbar.email}
              </a>
            </ScrollReveal>

            <ScrollReveal
              key="sidebar-categories"
              as="section"
              direction="up"
              distance={40}
              index={2}
              staggerChildren={0.08}
              delay={0.1}
              className="border border-gray-200 bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
            >
              <h2 className="border-b border-[#ff2635] pb-2 text-xl font-bold text-[#111c2b]">
                {page.sidebar.categoriesTitle}
              </h2>

              <ul className="mt-2">
                {page.sidebar.categories.map((category) => (
                  <li
                    key={category}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <Link
                      href="/blog"
                      className="flex items-center gap-2 py-2 text-base text-[#526071] transition-colors hover:text-[#ed111d]"
                    >
                      <ChevronRight
                        className="h-4 w-4 shrink-0 text-[#ff2635]"
                        aria-hidden
                      />
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </ScrollReveal>
        </div>
      </ScrollReveal>
    </>
  );
}