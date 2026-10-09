import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export interface PageBannerData {
  title: string;
  highlightedTitle?: string;
  home: string;
  current: string;
  bgImage: string;
}

export default function PageBanner({
  data,
  className = "",
  compact = false,
}: {
  data: PageBannerData;
  className?: string;
  compact?: boolean;
}) {
  return (
    <ScrollReveal
      as="section"
      direction="up"
      distance={40}
      className={`relative isolate overflow-hidden h-[220px] sm:h-[280px] lg:h-[380px] ${className}`}
    >
      {/* Image: full-bleed on mobile/tablet, left panel on desktop */}
      <div
        className={`absolute inset-y-0 left-0 w-full ${
          compact
            ? "md:w-1/2 page-banner-compact-image-cut"
            : "page-banner-image-cut lg:w-1/2"
        }`}
      >
        <Image
          src={data.bgImage}
          alt={`${data.title}${data.highlightedTitle ? ` ${data.highlightedTitle}` : ""}`}
          fill
          loading="eager"
          sizes="100vw"
          className={`h-full w-full object-cover ${
            compact ? "object-top" : "object-center"
          }`}
        />
      </div>

      {/* Readability overlay (mobile/tablet only) */}
      <div className="absolute inset-0 bg-black/55 lg:hidden" aria-hidden />

      {/* Cream panel on the right (desktop only) */}
      <div
        className={`absolute inset-y-0 right-0 hidden w-[68%] -z-20 bg-[#f8f3ea] ${
          compact
            ? "md:block page-banner-compact-panel-cut"
            : "lg:block page-banner-panel-cut"
        }`}
        aria-hidden
      />

      {/* Red slanted divider spanning half the banner height (desktop only) */}
      <svg
        className={`absolute inset-0 hidden h-full w-full ${compact ? "md:block" : "lg:block"}`}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <line
          x1="50"
          y1="0"
          x2="48"
          y2="50"
          stroke="#E10600"
          strokeWidth="15"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Content: overlaid on the image for mobile/tablet, on the cream panel for desktop */}
      <div className="relative mx-auto flex h-full w-full max-w-[1320px] items-center px-4 sm:px-6">
        <div className={`w-full ${compact ? "md:pl-[54%]" : "lg:pl-[54%]"}`}>
          <h1
            className={`text-[30px] font-bold leading-tight text-white sm:text-[38px] ${
              compact
                ? "md:text-[42px] md:text-black"
                : "lg:text-[64px] lg:text-black"
            }`}
          >
            {data.title}
            {data.highlightedTitle && (
              <>
                {" "}
                <span className="text-[#E10600]">{data.highlightedTitle}</span>
              </>
            )}
          </h1>
          <nav
            className={`mt-2 flex items-center gap-2 text-[13px] sm:text-[14px] ${
              compact ? "md:text-[14px]" : "lg:text-[20px]"
            }`}
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className={`transition-colors hover:text-[#E10600] ${
                compact
                  ? "text-white/85 md:text-[#E10600]"
                  : "text-white/85 lg:text-[#0c0c0c]"
              }`}
            >
              {data.home}
            </Link>
            {compact ? (
              <span
                className="text-white/80 md:text-[#111111]"
                aria-hidden
              >
                /
              </span>
            ) : (
              <ChevronRight className="h-4 w-4 text-[#E10600]" aria-hidden />
            )}
            <span
              className={`font-medium ${
                compact
                  ? "text-[#E10600] md:text-[#111111]"
                  : "text-[#E10600]"
              }`}
            >
              {data.current}
            </span>
          </nav>
        </div>
      </div>
    </ScrollReveal>
  );
}
