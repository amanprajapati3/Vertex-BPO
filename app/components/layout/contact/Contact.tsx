import { Clock, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import PageBanner from "../../shared/PageBanner";
import ScrollReveal from "../../shared/ScrollReveal";
import {
  site,
  type SectionProps,
  type BpoContactData,
  type BpoContactIcon,
} from "@/data";

const cardIcons: Record<BpoContactIcon, LucideIcon> = {
  Phone,
  Mail,
  MapPin,
  Clock,
};

export default function Contact({
  data = site.contact,
  className = "",
  contentClassName = "",
}: SectionProps<BpoContactData>) {
  const contact = data ?? site.contact;
  const { getInTouch, form, location } = contact;

  return (
    <>
      <PageBanner data={contact.banner} />

      <ScrollReveal
        as="section"
        direction="up"
        distance={40}
        className={`bg-white py-8 md:py-12 ${className}`}
      >
        <div
          className={`mx-auto w-full max-w-[1320px] px-4 sm:px-6 ${contentClassName}`}
        >
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left: heading, paragraph, contact details */}
            <ScrollReveal
              as="div"
              direction="right"
              distance={32}
              mobileDirection="up"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold uppercase tracking-wider text-[#E10600]">
                  {getInTouch.badge}
                </span>
              </div>

              <h2 className="mt-1 text-3xl lg:text-5xl max-w-sm font-bold  text-black sm:text-4xl">
                {getInTouch.title.normal}{" "}
                <span className="text-[#E10600]">
                  {getInTouch.title.highlighted}
                </span>
              </h2>

              <p className="mt-4 text-[15px] lg:text-base max-w-lg leading-[1.9] text-[#666666]">
                {getInTouch.desc}
              </p>

              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 space-y-6">
                {getInTouch.cards.map((card, i) => {
                  const Icon = cardIcons[card.icon as BpoContactIcon];
                  return (
                    <ScrollReveal
                      key={card.id}
                      as="li"
                      index={i}
                      staggerChildren={0.08}
                      delay={0.1}
                      distance={40}
                      className="flex items-start gap-4"
                    >
                      <span className="flex h-12 lg:h-20 lg:w-20 w-12 shrink-0 items-center justify-center rounded-full bg-[#E10600]/10 text-[#E10600]">
                        <Icon className="h-6 lg:h-9 lg:w-9 w-6" aria-hidden />
                      </span>
                      <div>
                        <h3 className="font-bold text-black">{card.title}</h3>
                        <p className="text-sm text-[#666666]">{card.info}</p>
                        <p className="text-sm text-[#666666]">{card.subInfo}</p>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </ul>
            </ScrollReveal>

            {/* Right: contact form */}
            <ScrollReveal
              as="div"
              direction="left"
              distance={32}
              mobileDirection="up"
              className="rounded-lg border border-black/5 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)] sm:p-8"
            >
              <h3 className="text-2xl font-bold text-black">{form.title}</h3>

              <form className="mt-6 grid gap-4">
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
                    {form.fields.email}
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="john@company.com"
                      className="rounded-md border border-gray-200 bg-white px-4 py-3 text-sm font-normal text-black outline-none transition-colors placeholder:text-gray-400 focus:border-[#E10600]"
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
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

                  <label className="grid gap-1.5 text-sm font-semibold text-black">
                    Subject
                    <select
                      name="subject"
                      defaultValue=""
                      className="rounded-md border border-gray-200 bg-white px-4 py-3 text-sm font-normal text-black outline-none transition-colors focus:border-[#E10600]"
                    >
                      <option value="" disabled>
                        {form.subjectSelect.placeholder}
                      </option>
                      {form.subjectSelect.options.map((option) => (
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
                    placeholder="Tell us a little about your project..."
                    className="resize-y rounded-md border border-gray-200 bg-white px-4 py-3 text-sm font-normal text-black outline-none transition-colors placeholder:text-gray-400 focus:border-[#E10600]"
                  />
                </label>

                <p className="text-xs text-[#777777]">{form.requiredText}</p>

                <button
                  type="submit"
                  className="w-fit rounded-full bg-[#E10600] px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#b80500] sm:text-base"
                >
                  {form.buttonText}
                </button>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </ScrollReveal>

      {/* Full-width Google map */}
      <ScrollReveal as="div" direction="up" distance={40} className="p-10 mb-10">
<iframe
        src={location.mapInfo.iframeUrl}
        title={location.mapInfo.name}
        className="h-[320px] w-full  border-0 sm:h-[420px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      </ScrollReveal>

    </>
  );
}
