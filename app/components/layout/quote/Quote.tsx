import Image from "next/image";
import Link from "next/link";
import { Check, Mail, Phone } from "lucide-react";
import PageBanner from "../../shared/PageBanner";
import ScrollReveal from "../../shared/ScrollReveal";
import {
  site,
  type SectionProps,
  type BpoQuoteData,
  type BpoQuoteCtaContactItem,
} from "@/data";

const ctaIcons: Record<BpoQuoteCtaContactItem["icon"], typeof Phone> = {
  Phone,
  Mail,
};

export default function Quote({
  data = site.quote,
  className = "",
  contentClassName = "",
}: SectionProps<BpoQuoteData>) {
  const quote = data ?? site.quote;
  const { intro, form, cta } = quote;

  return (
    <>
      <PageBanner data={quote.banner} />

      <ScrollReveal
        as="section"
        direction="up"
        distance={40}
        className={`bg-white py-8 md:py-12 ${className}`}
      >
        <div
          className={`mx-auto w-full max-w-[1320px] px-4 sm:px-6 ${contentClassName}`}
        >
          <div className="grid gap-10 md:gap-0 md:grid-cols-2 lg:gap-16">
            {/* Left: intro and features */}
            <ScrollReveal
              as="div"
              direction="right"
              distance={32}
              mobileDirection="up"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold uppercase tracking-wider text-[#E10600]">
                  {intro.badge}
                </span>
              </div>

              <h2 className="mt-1 text-3xl lg:text-5xl max-w-sm font-bold leading-tight text-black sm:text-4xl">
                {intro.title.normal}{" "}
                <span className="text-[#E10600]">{intro.title.highlighted}</span>
              </h2>

              <p className="mt-4 max-w-md text-[15px] lg:text-base leading-[1.9] text-[#666666]">
                {intro.desc}
              </p>

              <ul className="mt-8 space-y-4">
                {intro.features.map((feature, i) => (
                  <ScrollReveal
                    key={feature.id}
                    as="li"
                    index={i}
                    staggerChildren={0.08}
                    delay={0.1}
                    distance={40}
                    className="flex items-center gap-3"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E10600] text-white">
                      <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
                    </span>
                    <span className="font-semibold text-black">
                      {feature.title}
                    </span>
                  </ScrollReveal>
                ))}
              </ul>
            </ScrollReveal>

            {/* Right: quote request form */}
            <ScrollReveal
              as="div"
              direction="left"
              distance={32}
              mobileDirection="up"
              className="rounded-lg border border-black/5 bg-white p-3 shadow-[0_8px_30px_rgba(0,0,0,0.08)] sm:p-5"
            >
              <h3 className="text-2xl font-bold text-black">{form.title}</h3>

              <form className="mt-4 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-1.5 text-sm font-semibold text-black">
                    {form.fields.fullName}
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="John Doe"
                      className="rounded-md border border-gray-200 bg-white px-4 py-3 text-sm font-normal text-black outline-none transition-colors placeholder:text-gray-400 focus:border-[#E10600]"
                    />
                  </label>

                  <label className="grid gap-1.5 text-sm font-semibold text-black">
                    {form.fields.company}
                    <input
                      type="text"
                      name="company"
                      placeholder="Company Inc."
                      className="rounded-md border border-gray-200 bg-white px-4 py-3 text-sm font-normal text-black outline-none transition-colors placeholder:text-gray-400 focus:border-[#E10600]"
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-1.5 text-sm font-semibold text-black">
                    {form.fields.email}
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="john@company.com"
                      className="rounded-md border border-gray-200 bg-white px-4 py-3 text-sm font-normal text-black outline-none transition-colors placeholder:text-gray-400 focus:border-[#E10600]"
                    />
                  </label>

                  <label className="grid gap-1.5 text-sm font-semibold text-black">
                    {form.fields.phone}
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      className="rounded-md border border-gray-200 bg-white px-4 py-3 text-sm font-normal text-black outline-none transition-colors placeholder:text-gray-400 focus:border-[#E10600]"
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-1.5 text-sm font-semibold text-black">
                    {form.fields.service}
                    <select
                      name="service"
                      required
                      defaultValue=""
                      className="rounded-md border border-gray-200 bg-white px-4 py-3 text-sm font-normal text-black outline-none transition-colors focus:border-[#E10600]"
                    >
                      <option value="" disabled>
                        {form.selects.service.placeholder}
                      </option>
                      {form.selects.service.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="grid gap-1.5 text-sm font-semibold text-black">
                    {form.fields.volume}
                    <select
                      name="volume"
                      defaultValue=""
                      className="rounded-md border border-gray-200 bg-white px-4 py-3 text-sm font-normal text-black outline-none transition-colors focus:border-[#E10600]"
                    >
                      <option value="" disabled>
                        {form.selects.volume.placeholder}
                      </option>
                      {form.selects.volume.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="grid gap-1.5 text-sm font-semibold text-black">
                  {form.fields.message}
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us about your project, expected volume and timelines..."
                    className="resize-y rounded-md border border-gray-200 bg-white px-4 py-3 text-sm font-normal text-black outline-none transition-colors placeholder:text-gray-400 focus:border-[#E10600]"
                  />
                </label>

                <label className="flex items-start gap-3 text-sm text-[#555555]">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[#E10600]"
                  />
                  {form.checkboxText}
                </label>


                <button
                  type="submit"
                  className="w-fit cursor-pointer rounded-xl bg-[#E10600] px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#b80500] sm:text-base"
                >
                  {form.buttonText}
                </button>
              </form>
            </ScrollReveal>
          </div>

          {/* CTA banner with contact info over the image */}
          <ScrollReveal
            as="div"
            direction="up"
            distance={40}
            className="relative isolate mt-12 overflow-hidden rounded-md"
          >
            <Image
              src={cta.image}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/65" />

            <div className="relative flex flex-col gap-8 p-6 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
                  {cta.title}
                </h2>
                <p className="mt-2 max-w-xl text-sm text-white/80 sm:text-base">
                  {cta.text}
                </p>
                <Link
                  href={cta.button.href}
                  className="mt-5 inline-flex rounded-full bg-[#E10600] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#b80500] sm:text-base"
                >
                  {cta.button.label}
                </Link>
              </div>

              <ul className="flex flex-col gap-4">
                {cta.contactInfo.map((item) => {
                  const Icon = ctaIcons[item.icon];
                  return (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        className="flex items-center gap-3 text-white"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E10600]">
                          <Icon className="h-5 w-5" aria-hidden />
                        </span>
                        <span>
                          <span className="block text-xs text-white/70">
                            {item.label}
                          </span>
                          <span className="text-sm font-semibold sm:text-base">
                            {item.value}
                          </span>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </ScrollReveal>
    </>
  );
}
