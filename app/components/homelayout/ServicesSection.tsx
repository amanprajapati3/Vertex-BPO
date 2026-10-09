import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { site, type BpoServicesData, type SectionProps } from "@/data";
import ScrollReveal from "../shared/ScrollReveal";

type BpoServicesProps = SectionProps<BpoServicesData> & {
  /** Show every service (services page) instead of the home-page count. */
  showAll?: boolean;
  /** Light theme (white background) for the services page. */
  light?: boolean;
};

export default function BpoServices1({
  data = site.services,
  className = "",
  showAll = false,
  light = false,
}: BpoServicesProps) {
  const services = data ?? site.services;
  const items = showAll
    ? services.services
    : services.services.slice(0, services.homeVisibleCount);

  return (
    <ScrollReveal
      as="section"
      direction="up"
      distance={32}
      className={`py-8 md:py-12  ${light ? "bg-white" : "bg-black"} ${className}`}
    >
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center">
          <p className="text-[12px] font-semibold uppercase tracking-wide text-[#E10600] sm:text-[16px] lg:text-xl">
            {services.badge}
          </p>
          <h2 className={`mt-3 text-[32px] font-bold leading-[1.15] sm:text-[42px] lg:text-[60px] ${light ? "text-black" : "text-white"}`}>
            {services.title.normal}{" "}
            <span className="text-[#E10600]">{services.title.highlighted}</span>
          </h2>
        </div>

        {/* Cards: 1 col mobile, 2 tablet, 4 desktop */}
        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-12 lg:grid-cols-4">
          {items.map((service, index) => (
            <ScrollReveal
              as="li"
              key={service.id}
              index={index}
              staggerChildren={0.08}
              delay={0.1}
              distance={40}
            >
              <Link
                href={service.button.href}
                className="group relative block aspect-[4/4.2] overflow-hidden rounded-md bg-neutral-900 sm:aspect-[4/4.6]"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  loading={showAll ? "eager" : "lazy"}
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                <div className="absolute bottom-3 left-3 right-3 flex items-stretch overflow-hidden rounded-[3px] bg-white shadow-lg">
                  <h3 className="flex-1 pl-4 pr-16 py-2    font-bold leading-snug text-black text-[18px] ">
                    {service.title}
                  </h3>
                  <span className="flex w-16 shrink-0 items-center justify-center bg-[#E10600] text-white transition-colors group-hover:bg-[#b80500]">
                    <ArrowUpRight className="h-7 w-7" strokeWidth={2.5} aria-hidden />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </ul>

        {!showAll && (
          <div className="mt-10 text-center">
            <Link
              href={services.button.href}
              className="inline-flex items-center gap-2 rounded-full bg-[#E10600] px-7 md:px-10 py-3 text-[13px] md:text-xl font-semibold text-white transition-colors hover:bg-[#b80500]"
            >
              {services.button.label}
              <ArrowRight className="h-6 w-6" aria-hidden />
            </Link>
          </div>
        )}
      </div>
    </ScrollReveal>
  );
}