"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Award, Check, PhoneCall, Users, type LucideIcon } from "lucide-react";
import { site, type BpoWorkData, type SectionProps } from "@/data";

const statIcons: Record<string, LucideIcon> = {
  award: Award,
  "phone-call": PhoneCall,
};

function useCountUp(target: number, start: boolean, duration = 1800) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(id);
    }

    let rafId = 0;
    const startedAt = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [start, target, duration]);

  return value;
}

function StatValue({
  value,
  suffix,
  start,
}: {
  value: number;
  suffix: string;
  start: boolean;
}) {
  const display = useCountUp(value, start);
  return (
    <>
      {display}
      {suffix}
    </>
  );
}

export default function BpoChoose1({
  data = site.work,
  className = "",
}: SectionProps<BpoWorkData>) {
  const choose = data ?? site.work;

  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setStarted(true));
      return () => cancelAnimationFrame(id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`bg-white pt-8 md:pt-12 ${className}`}>
      <div className="mx-auto grid w-full max-w-[1300px]  gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
        {/* Content */}
        <div>
          <p className="flex items-center gap-2 text-[12px] sm:text-[16px] font-bold uppercase tracking-wide text-[#E10600]">
            <Users className="h-5 sm:w-8 sm:h-8 lg:w-10 lg:h-10 w-5" aria-hidden />
            {choose.badge}
          </p>

          <h2 className="mt-1 text-[28px] font-bold leading-[1.2] text-black sm:text-[36px] lg:text-[40px]">
            {choose.title.normal}{" "}
            <span className="text-[#E10600]">{choose.title.highlighted}</span>
          </h2>

          <p className="mt-4 text-[14px] lg:pr-9 lg:text-lg leading-[1.8] text-[#555555] sm:text-[15px]">
            {choose.desc}
          </p>

          <ul className="mt-6 grid gap-x-8 gap-y-5 lg:pr-14 sm:grid-cols-2">
            {choose.features.map((feature) => (
              <li key={feature.id} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E10600]">
                  <Check className="h-5 w-5 text-white" strokeWidth={3} aria-hidden />
                </span>
                <span className="text-[14px] md:text-base font-medium leading-snug text-[#111111]">
                  {feature.title}
                </span>
              </li>
            ))}
          </ul>

          <hr className="my-7 border-black/10" />

          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-0">
            {choose.stats.map((stat, index) => {
              const Icon = statIcons[stat.icon] ?? Award;
              return (
                <li
                  key={stat.id}
                  className={`flex items-center gap-4 ${
                    index > 0 ? "sm:border-l sm:border-black/10 sm:pl-8" : ""
                  }`}
                >
                  <Icon className="h-12 lg:h-16 lg:w-16 w-12 shrink-0 text-[#E10600]" strokeWidth={1.25} aria-hidden />
                  <div>
                    <p className="text-[30px] lg:text-4xl font-bold leading-none text-black sm:text-[34px]">
                      <StatValue value={stat.number} suffix={stat.suffix} start={started} />
                    </p>
                    <p className="mt-1 text-[14px] text-[#1d1c1c]">{stat.label}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Image + floating card */}
        <div className="relative pb-10 sm:pb-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={choose.image.src}
            alt={choose.image.alt}
            className="aspect-[4/3.6] w-full rounded-md object-cover sm:aspect-[4/3.3] lg:aspect-[4/3.5]"
          />

          <div className="absolute bottom-0 right-3 w-[78%] max-w-[260px] rounded-md bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.15)] sm:bottom-6 sm:right-0 sm:translate-x-3 sm:p-5 lg:translate-x-6">
            <p className="text-[15px] font-bold leading-snug text-black sm:text-[16px] lg:text-xl lg:pr-10">
              {choose.floatingCard.title}
            </p>
            <Link
              href={choose.floatingCard.button.href}
              className="mt-2 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#E10600] transition-colors hover:text-[#b80500]"
            >
              {choose.floatingCard.button.label}
              <ArrowRight className="h-6 w-6" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}