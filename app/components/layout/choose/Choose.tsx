"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site, SectionProps, BpoChooseData } from "@/data"; // Adjust import path as needed
import ScrollReveal from "../../shared/ScrollReveal";

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

function ProgressRing({ value, start }: { value: number; start: boolean }) {
  const display = useCountUp(value, start);

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
        <path
          className="text-gray-100"
          strokeWidth="3.5"
          stroke="currentColor"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        {display > 0 && (
          <path
            className="text-red-600"
            strokeDasharray={`${display}, 100`}
            strokeWidth="3.5"
            strokeLinecap="round"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        )}
      </svg>
      <div className="absolute text-xl font-bold text-gray-900">{display}%</div>
    </div>
  );
}

export default function Choose({
  data = site.choose as BpoChooseData,
  className = "",
  contentClassName = "",
}: SectionProps<BpoChooseData>) {
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
    <section
      ref={sectionRef}
      className={`py-8 md:py-12 bg-white overflow-hidden ${className}`}
    >
      <ScrollReveal
        as="div"
        direction="up"
        distance={32}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${contentClassName}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Content */}
          <ScrollReveal
            as="div"
            direction="right"
            distance={32}
            mobileDirection="up"
            className="lg:col-span-7 space-y-0"
          >

            {/* Badge */}
            <div className="flex items-center gap-3">
              <span className="h-0.5 w-10 bg-red-600 inline-block"></span>
              <span className="text-red-600 font-semibold tracking-wider text-sm uppercase">
                {data.badge}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl mt-3 mb-2 font-bold text-gray-900 leading-tight">
              {data.title.normal}{" "}
              <span className="text-gray-900">{data.title.highlighted}</span>
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-base pb-3 leading-relaxed">
              {data.desc}
            </p>

            {/* Features with Circular Progress Bars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-2">
              {data.features.map((feature, i) => (
                <ScrollReveal
                  key={feature.id}
                  as="div"
                  index={i}
                  staggerChildren={0.08}
                  delay={0.1}
                  distance={40}
                  className="space-y-4"
                >

                  {/* Circular Percentage Ring */}
                  <ProgressRing value={feature.percentage} start={started} />

                  {/* Feature Text */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-gray-900 text-lg leading-snug">
                      {feature.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>

                </ScrollReveal>
              ))}
            </div>

            {/* Action Button */}
            <div className="pt-4">
              <Link
                href={data.button.href}
                className="inline-flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <span>{data.button.label}</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

          </ScrollReveal>

          {/* Right Column: Image */}
          <ScrollReveal
            as="div"
            direction="left"
            distance={32}
            mobileDirection="up"
            className="lg:col-span-5 relative"
          >
            <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[580px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={data.image.src}
                alt={data.image.alt}
                fill
                sizes="(max-width: 1023px) 100vw, 40vw"
                className="object-cover object-center"
                priority
              />
            </div>
          </ScrollReveal>

        </div>
      </ScrollReveal>
    </section>
  );
}
