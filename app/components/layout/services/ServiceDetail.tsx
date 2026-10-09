"use client";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ChevronRight } from "lucide-react";
import PageBanner from "../../shared/PageBanner";
import ScrollReveal from "../../shared/ScrollReveal";
import { site, type BpoServiceDetail, type BpoServiceItem } from "@/data";
import { useRef } from "react";

export default function ServiceDetail({
  service,
  detail,
}: {
  service: BpoServiceItem;
  detail: BpoServiceDetail;
}) {
  const page = site.serviceDetailPage;
  const { sidebar, content } = page;

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      <PageBanner data={page.banner} compact />

      <ScrollReveal
        as="main"
        direction="up"
        distance={32}
        className="bg-white py-8 md:py-12"
      >
        <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-6 px-4 sm:px-8 md:grid-cols-[minmax(0,2.6fr)_minmax(180px,1fr)] md:gap-[18px]">
          <ScrollReveal
            as="article"
            direction="right"
            distance={32}
            mobileDirection="up"
            className="min-w-0"
          >
            <div className="relative aspect-[3.2/1] overflow-hidden rounded-[3px] bg-gray-100">
              <Image
                src={content.heroImage}
                alt={service.title}
                fill
                priority
                sizes="(max-width: 767px) 100vw, 65vw"
                className="object-cover"
              />
            </div>

            <h1 className="mt-3 text-2xl font-bold leading-[1.2] text-[#101820] sm:text-3xl lg:text-4xl">
              {service.title} Services
            </h1>

            <p className="mt-2 text-base leading-[1.7] text-[#384454]">
              {service.description}
            </p>

            <h2 className="mt-6 text-xl font-bold leading-[1.3] text-[#101820] lg:text-2xl">
              How Our {service.title} Services Help You
            </h2>

            <p className="mt-2 text-base leading-[1.7] text-[#384454]">
              {detail.about}
            </p>

            <ul className="mt-4 space-y-2">
              {detail.features.map((feature, i) => (
                <ScrollReveal
                  key={feature}
                  as="li"
                  index={i}
                  staggerChildren={0.08}
                  delay={0.1}
                  distance={40}
                  className="flex items-start gap-2.5 text-base leading-[1.6] text-[#384454]"
                >
                  <CheckCircle2
                    className="mt-1 h-4 w-4 shrink-0 text-[#ff2635]"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <span>{feature}</span>
                </ScrollReveal>
              ))}
            </ul>

            <h2 className="mt-6 text-xl font-bold leading-[1.3] text-[#101820] lg:text-2xl">
              {content.supportHeading}
            </h2>

            <p className="mt-2 text-base leading-[1.7] text-[#384454]">
              {content.supportDescription}
            </p>

            <div className="relative mt-4 aspect-[4.3/1] overflow-hidden rounded-[3px] bg-gray-100">
              <Image
                src={content.secondaryImage}
                alt="Our support team working together"
                fill
                loading="eager"
                sizes="(max-width: 767px) 100vw, 65vw"
                className="object-cover"
              />
            </div>

            <p className="mt-3 text-base leading-[1.7] text-[#384454]">
              {content.closingDescription}
            </p>
          </ScrollReveal>

          <ScrollReveal
            as="aside"
            direction="left"
            distance={32}
            mobileDirection="up"
            className="space-y-4"
          >
            <ScrollReveal
              as="section"
              index={0}
              staggerChildren={0.08}
              delay={0.1}
              distance={40}
              className="border border-gray-200 bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.05)]"
            >
              <h2 className="border-b border-[#ff2635] pb-2 text-xl font-bold text-[#101820]">
                {sidebar.servicesTitle}
              </h2>

              <ul className="mt-2">
                {sidebar.services.map((item) => (
                  <li
                    key={`${item.label}-${item.slug}`}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <Link
                      href={`/services/${item.slug}`}
                      aria-current={
                        item.slug === service.slug ? "page" : undefined
                      }
                      className={`flex items-center gap-2 py-2 text-base leading-[1.3] transition-colors hover:text-[#ff2635] ${
                        item.slug === service.slug
                          ? "font-semibold text-[#ff2635]"
                          : "text-[#46515f]"
                      }`}
                    >
                      <ChevronRight
                        className="h-4 w-4 shrink-0 text-[#ff2635]"
                        aria-hidden
                      />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal
              as="section"
              index={1}
              staggerChildren={0.08}
              delay={0.1}
              distance={40}
              className="border border-gray-200 bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.05)]"
            >
              <h2 className="border-b border-[#ff2635] pb-2 text-xl font-bold text-[#101820]">
                {sidebar.callbackTitle}
              </h2>

              <form
                ref={formRef}
                onSubmit={(e) => {
                  e.preventDefault();
                  formRef.current?.reset();
                  window.location.reload();
                }}
                className="mt-3 space-y-2"
              >
                {sidebar.callbackFields.map((field) => (
                  <input
                    key={field.name}
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    aria-label={field.placeholder}
                    required
                    className="h-10 w-full border-0 bg-[#f3f3f3] px-3 text-sm text-[#333] outline-none placeholder:text-[#707782] focus:ring-1 focus:ring-[#ff2635]"
                  />
                ))}

                <textarea
                  name="message"
                  placeholder={sidebar.callbackMessagePlaceholder}
                  aria-label={sidebar.callbackMessagePlaceholder}
                  rows={4}
                  required
                  className="min-h-[100px] w-full resize-y border-0 bg-[#f3f3f3] px-3 py-2.5 text-sm text-[#333] outline-none placeholder:text-[#707782] focus:ring-1 focus:ring-[#ff2635]"
                />

                <button
                  type="submit"
                  className="h-10 w-full bg-[#ff2635] text-sm font-semibold text-white transition-colors hover:bg-[#d90c1b]"
                >
                  {sidebar.callbackButton}
                </button>
              </form>
            </ScrollReveal>
          </ScrollReveal>
        </div>
      </ScrollReveal>
    </>
  );
}
