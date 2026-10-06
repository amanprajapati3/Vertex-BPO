"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Phone, Play } from "lucide-react";
import { site, type BpoAboutData, type SectionProps } from "@/data";
import BpoVideoModal from "./BpoVideoModel";

export default function BpoAbout1({
  data = site.about,
  className = "",
  hideButton = false,
}: SectionProps<BpoAboutData> & { hideButton?: boolean }) {
  const about = data ?? site.about;
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className={`bg-white pt-8 md:pt-12 ${className}`}>
      <div className="mx-auto  grid w-full max-w-[1320px]  gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
        {/* Image + play button */}
        <div className="relative order-2 overflow-hidden rounded-md lg:order-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={about.image.src}
            alt={about.image.alt}
            className="aspect-[4/3] w-full object-cover sm:aspect-[16/11] lg:aspect-[4/3.4]"
          />
          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            aria-label="Play video"
            className="absolute cursor-pointer left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_0_0_10px_rgba(255,255,255,0.3)] transition-transform hover:scale-105 sm:h-20 sm:w-20"
          >
            <Play className="ml-1 h-6 w-6 fill-[#E10600] text-[#E10600] sm:h-7 sm:w-7" aria-hidden />
          </button>
        </div>

        {/* Content */}
        <div className="order-1 lg:order-2">
          <p className="text-[12px]  font-semibold uppercase tracking-wide text-[#E10600] sm:text-[17px]">
            {about.badge}
          </p>

          <h2 className="mt-1 text-[34px] font-bold leading-[1.1] text-black sm:text-[44px] lg:text-[60px]">
            <span className="block">{about.title.normal}</span>
            <span className="block text-[#E10600]">{about.title.highlighted}</span>
            <span className="block">{about.title.postTitle}</span>
          </h2>

          {about.paragraphs.map((text) => (
            <p key={text} className="mt-5 text-[14px] leading-[1.8] lg:pr-10 text-[#444444] sm:text-[15px] md:text-[17px]">
              {text}
            </p>
          ))}

          <ul className="mt-6 space-y-3">
            {about.features.map((feature) => (
              <li key={feature.id} className="flex items-start gap-3 text-[14px] md:text-[17px] text-[#222222]">
                <Check className="mt-0.5 h-6 w-6 shrink-0 text-[#E10600]" strokeWidth={3} aria-hidden />
                {feature.title}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-5">
            {!hideButton && (
              <>
                <Link
                  href={about.button.href}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#E10600] px-6 py-3 text-[13px] sm:text-base lg:text-xl font-semibold text-white transition-colors hover:bg-[#b80500]"
                >
                  {about.button.label}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>

                <span className="hidden h-12 w-px bg-black/15 sm:block" aria-hidden />
              </>
            )}

            <a href={about.phoneBlock.phoneHref} className="group flex items-center gap-3">
              <span className="flex h-12 md:w-16 md:h-16 w-12 items-center justify-center rounded-full border-2 border-black/80 text-black transition-colors group-hover:border-[#E10600] group-hover:text-[#E10600]">
                <Phone className="h-5 md:h-7 md:w-7 w-5" aria-hidden />
              </span>
              <span>
                <span className="block text-[12px] md:text-[16px] text-[#555555]">{about.phoneBlock.label}</span>
                <span className="block text-[18px] lg:text-[22px] font-bold leading-tight text-black sm:text-[20px]">
                  {about.phoneBlock.phone}
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>

      <BpoVideoModal open={videoOpen} url={about.videoUrl} onClose={() => setVideoOpen(false)} />
    </section>
  );
}