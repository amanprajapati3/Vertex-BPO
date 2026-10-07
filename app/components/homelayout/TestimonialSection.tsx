"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { site, type BpoTestimonialData, type SectionProps } from "@/data";
import ScrollReveal from "../shared/ScrollReveal";

export default function BpoTestimonial1({
  data = site.testimonial,
  className = "",
}: SectionProps<BpoTestimonialData>) {
  const testimonial = data ?? site.testimonial;
  const items = testimonial.testimonialItems;
  const gap = testimonial.carousel.gap;

  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [perView, setPerView] = useState(1);
  const [page, setPage] = useState(0);

  const pageCount = Math.max(1, Math.ceil(items.length / perView));

  /* Work out cards per view and the active page from the real scroll position */
  const measure = useCallback(() => {
    const track = trackRef.current;
    const first = track?.children[0] as HTMLElement | undefined;
    if (!track || !first) return;

    const cardWidth = first.offsetWidth;
    const pv = Math.max(1, Math.round((track.clientWidth + gap) / (cardWidth + gap)));
    const pages = Math.ceil(items.length / pv);
    const maxScroll = track.scrollWidth - track.clientWidth;

    let active = 0;
    if (maxScroll > 1) {
      active =
        track.scrollLeft >= maxScroll - 2
          ? pages - 1
          : Math.min(pages - 1, Math.round(track.scrollLeft / ((cardWidth + gap) * pv)));
    }
    setPerView(pv);
    setPage(active);
  }, [gap, items.length]);

  useEffect(() => {
    measure();
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [measure]);

  const onScroll = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(measure);
  };

  const goTo = (target: number) => {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.max(0, Math.min(pageCount - 1, target));
    const card = track.children[next * perView] as HTMLElement | undefined;
    if (!card) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    track.scrollTo({ left: Math.min(card.offsetLeft, maxScroll), behavior: "smooth" });
  };

  return (
    <ScrollReveal
      as="section"
      direction="up"
      distance={40}
      className={`bg-black py-8 md:py-12 mt-8 md:mt-12 ${className}`}
    >
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6">
        {/* Heading */}
        <div className="mx-auto max-w-[750px] text-center">
          <p className="text-[12px] sm:text-xl font-semibold uppercase tracking-wide text-[#E10600] ">
            {testimonial.badge}
          </p>
          <h2 className="mt-1 text-[30px] font-bold leading-[1.15] text-white sm:text-[40px] lg:text-[50px]">
            {testimonial.title.normal}{" "}
            <span className="text-[#E10600]">{testimonial.title.highlighted}</span>{" "}
            {testimonial.title.postTitle}
          </h2>
          <p className="mt-2 text-[13px] sm:text-base leading-[1.7] text-white/85 ">
            {testimonial.desc}
          </p>
        </div>

        {/* Slider */}
        <div className="relative mt-10 lg:mt-12">
          {testimonial.carousel.hasArrows && (
            <>
              <button
                type="button"
                onClick={() => goTo(page - 1)}
                disabled={page === 0}
                aria-label="Previous testimonials"
                className="absolute left-0 cursor-pointer top-1/2 z-10 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#E10600] shadow-lg transition-colors hover:bg-[#E10600] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#E10600] lg:flex"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={3} aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => goTo(page + 1)}
                disabled={page === pageCount - 1}
                aria-label="Next testimonials"
                className="absolute right-0 cursor-pointer top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-white text-[#E10600] shadow-lg transition-colors hover:bg-[#E10600] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#E10600] lg:flex"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={3} aria-hidden />
              </button>
            </>
          )}

          <div
            ref={trackRef}
            onScroll={onScroll}
            style={{ gap }}
            className="relative flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((item) => (
              <article
                key={item.id}
                className="flex shrink-0 basis-full snap-start flex-col rounded-lg border border-white/10 bg-[#0e0e0e] p-6 md:basis-[calc((100%-24px)/2)] lg:basis-[calc((100%-48px)/3)]"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E10600]">
                  <Quote className="h-7 w-7 fill-white text-white" aria-hidden />
                </span>

                <p className="mt-2 flex-1 text-[14px] sm:text-base lg:text-lg leading-[1.75] text-white/90">
                  &quot;{item.quote}&quot;
                </p>

                <div className="mt-3 flex items-center gap-4 border-t border-white/15 pt-5">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={96}
                    height={96}
                    sizes="(max-width: 767px) 64px, (max-width: 1023px) 80px, 96px"
                    className="h-16 w-16 md:h-20 md:w-20 lg:w-24 lg:h-24 shrink-0 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <h3 className="truncate text-[15px] md:text-lg font-bold text-white">{item.name}</h3>
                    <p className="text-[14px] lg:text-base leading-snug text-white/70">
                      {item.designation}
                      <br />
                      {item.company}
                    </p>
                    {/* <div className="mt-1.5 flex gap-0.5" aria-label={`${item.rating} out of 5 stars`}>
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-[#E10600] text-[#E10600]" aria-hidden />
                      ))}
                    </div> */}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Dots */}
        {testimonial.carousel.hasDots && (
          <div className="mt-8 flex items-center justify-center gap-2.5" role="tablist" aria-label="Testimonial pages">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === page}
                aria-label={`Go to page ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === page ? "w-2.5 bg-[#E10600]" : "w-2.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </ScrollReveal>
  );
}