"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { site, type BpoBannerData, type SectionProps } from "@/data";
import BpoVideoModal from "./BpoVideoModel";

export default function BpoBanner1({
  data = site.banner,
  className = "",
}: SectionProps<BpoBannerData>) {
  const banner = data ?? site.banner;
  const [videoOpen, setVideoOpen] = useState(false);

  const primary = banner.buttons.find((b) => b.variant === "primary");
  const video = banner.buttons.find((b) => b.variant === "outline");

  return (
    <section
      className={`relative isolate flex min-h-[520px] items-center overflow-hidden bg-black sm:min-h-[580px] lg:min-h-[680px] ${className}`}
    >
      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={banner.image.src}
        alt={banner.image.alt}
        className="absolute inset-0 -z-20 h-full w-full object-center object-[72%_center] sm:object-[65%_center]"
      />
      {/* Readability overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/60 to-black/10 sm:via-black/45 sm:to-transparent" />

      <div className="mx-auto w-full max-w-[1320px] px-4 py-16 sm:px-6 lg:px-16">
        <div className="max-w-[560px]">
          <p className="flex items-center gap-3 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-white sm:text-[11.5px]">
            <span className="h-[2px] w-6 bg-[#E10600]" aria-hidden />
            {banner.badge}
          </p>

          <h1 className="mt-3 text-[40px] font-bold leading-[1] text-white sm:text-[52px] lg:text-[60px]">
            <span className="block">{banner.title.normal}</span>
            <span className="block text-[#E10600]">
              {banner.title.highlighted}
            </span>
            <span className="block">{banner.title.postTitle}</span>
          </h1>

          <p className="mt-3 max-w-[440px] text-[15px] leading-[1.7] text-white/90 sm:text-[16px] lg:text-[18px]">
            {banner.desc.plain}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-4">
            {primary && (
              <Link
                href={primary.href}
                className="inline-flex items-center gap-2 rounded-full bg-[#E10600] px-6 py-3 text-[13px] md:text-[16px] font-semibold text-white transition-colors hover:bg-[#b80500]"
              >
                {primary.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            )}

            {video && (
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="group cursor-pointer inline-flex items-center gap-3 text-[13px] md:text-[15px] font-semibold text-white"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 transition-colors group-hover:border-[#E10600] group-hover:bg-[#E10600]">
                  <Play className="ml-0.5 h-4 w-4 fill-white" aria-hidden />
                </span>
                {video.label}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="z-30">
        <BpoVideoModal
          open={videoOpen}
          url={banner.videoUrl}
          onClose={() => setVideoOpen(false)}
        />
      </div>
    </section>
  );
}
