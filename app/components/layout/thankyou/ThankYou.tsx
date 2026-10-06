import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site, type SectionProps, type BpoThankYouData } from "@/data";

export default function ThankYou({
  data = site.thankYou,
  className = "",
  contentClassName = "",
}: SectionProps<BpoThankYouData>) {
  return (
    <section className={`bg-white py-8 md:py-12 ${className}`}>
      <div
        className={`mx-auto grid w-full max-w-[1320px] items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 ${contentClassName}`}
      >
        <div className="relative h-[240px] overflow-hidden rounded-md sm:h-[320px] lg:h-[520px]">
          <Image
            src={data.image}
            alt={data.title}
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <svg
            viewBox="0 0 52 52"
            className="h-16 w-16 sm:h-20 sm:w-20"
            aria-hidden
          >
            <circle
              cx="26"
              cy="26"
              r="24"
              fill="none"
              stroke="#E10600"
              strokeWidth="3"
              strokeLinecap="round"
              className="thankyou-tick-circle"
            />
            <path
              d="M15 27 l7.5 7.5 l14.5 -14.5"
              fill="none"
              stroke="#E10600"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="thankyou-tick-mark"
            />
          </svg>

          <h1 className="mt-6 text-3xl font-bold text-black sm:text-4xl lg:text-5xl">
            {data.title}
          </h1>

          <div className="mt-3 h-1 w-16 bg-[#E10600]" />

          <p className="mt-5 text-lg lg:text-2xl font-medium text-[#1a1919] sm:text-xl">
            {data.headline}
          </p>

          <p className="mt-3 max-w-xl text-[15px] lg:text-lg leading-relaxed text-[#666666]">
            {data.paragraph}
          </p>

          <Link
            href={data.button.href}
            className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-[#E10600] px-8 py-4 text-base font-semibold text-white shadow-lg transition-colors hover:bg-[#b80500]"
          >
            {data.button.label}
            <ArrowRight
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </section>
  );
}