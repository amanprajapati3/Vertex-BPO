"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowUp,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  type LucideIcon,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import type { IconType } from "react-icons";
import { site, type BpoFooterData, type SectionProps } from "@/data";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialIcons: Record<string, IconType | typeof XIcon> = {
  facebook: FaFacebookF,
  x: XIcon,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
  instagram: FaInstagram,
};

const contactIcons: Record<string, LucideIcon> = {
  "map-pin": MapPin,
  phone: Phone,
  mail: Mail,
};

export default function BpoFooter1({
  data = site.footer,
  className = "",
}: SectionProps<BpoFooterData>) {
  const footer = data ?? site.footer;

  return (
    <footer className={`bg-black text-white ${className}`}>
      <div className="mx-auto w-full max-w-[1320px] px-4 pb-10 pt-14 sm:px-6 lg:pt-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.15fr_1fr_1fr_1.2fr] lg:gap-12">
          {/*  Brand  */}
          <div>
            <Link href="/" className="inline-block">
              <Image
                src={footer.logoImage}
                alt={footer.logoAlt}
                width={717}
                height={208}
                sizes="300px"
                className="h-16 w-auto sm:h-14 md:h-20"
              />
            </Link>
            <p className="mt-5 max-w-[300px] text-[13px] md:text-base leading-[1.8] text-white">
              {footer.desc}
            </p>

            <ul className="mt-6 flex flex-wrap gap-3">
              {footer.socialLinks.map((social) => {
                const Icon = socialIcons[social.label.toLowerCase()];
                if (!Icon) return null;
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-9 sm:h-11 sm:w-11 w-9 items-center justify-center rounded-xl border border-white/25 text-white transition-colors hover:border-[#E10600] hover:bg-[#E10600]"
                    >
                      <Icon className="h-4 sm:h-5 sm:w-5 w-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/*  Link columns  */}
          {footer.columns.map((column) => (
            <div key={column.title}>
              <h3 className="flex items-center gap-2.5 text-[17px] md:text-2xl font-semibold text-white">
                <span className="h-2 w-2 bg-[#E10600]" aria-hidden />
                {column.title}
              </h3>
              <ul className="mt-6 space-y-3.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-[13px] md:text-base text-white/80 transition-colors hover:text-white"
                    >
                      <ChevronRight
                        className="h-3.5 w-3.5 text-[#E10600] transition-transform duration-200 group-hover:translate-x-0.5"
                        aria-hidden
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/*  Contact info  */}
          <div>
            <h3 className="flex items-center gap-2.5 text-[17px] md:text-2xl font-semibold text-white">
              <span className="h-2 w-2 bg-[#E10600]" aria-hidden />
              {footer.footerContact.title}
            </h3>
            <ul className="mt-6">
              {footer.footerContact.items.map((item, index, all) => {
                const Icon = contactIcons[item.icon];
                const isLast = index === all.length - 1;
                return (
                  <li
                    key={item.icon}
                    className={`flex items-start gap-4 py-4 first:pt-0 ${
                      isLast ? "" : "border-b border-white/15"
                    }`}
                  >
                    <span className="flex h-10 md:w-14 md:h-14 w-10 shrink-0 items-center justify-center rounded-full bg-[#E10600]">
                      {Icon && <Icon className="h-[18px] md:h-[25px] md:w-[25px] w-[18px] text-white" aria-hidden />}
                    </span>
                    <div className="space-y-0.5 pt-0.5 text-[13px] md:text-base leading-[1.7] text-white/90">
                      {item.lines.map((line) =>
                        "href" in line && line.href ? (
                          <a
                            key={line.text}
                            href={line.href}
                            className="block break-words transition-colors hover:text-[#E10600]"
                          >
                            {line.text}
                          </a>
                        ) : (
                          <p key={line.text}>{line.text}</p>
                        ),
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/*  Bottom bar  */}
      <div className="border-t border-white/10">
        <div className="relative mx-auto flex w-full max-w-[1320px] items-center justify-center px-14 py-4 sm:px-16">
          <p className="text-center text-[12px] sm:text-base text-white/80">
            {footer.copyright.prefix}{" "}
            {footer.copyright.suffix}
          </p>

          {footer.backToTop && (
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label={footer.backToTopLabel}
              className="absolute right-4 cursor-pointer top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-[4px] bg-[#E10600] text-white transition-colors hover:bg-[#b80500] sm:right-6"
            >
              <ArrowUp className="h-5 w-5" aria-hidden />
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}