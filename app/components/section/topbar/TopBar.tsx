import { Mail, Phone } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import type { IconType } from "react-icons";
import { site, type BpoTopbarData, type SectionProps } from "@/data";

const socialIcons: Record<string, IconType> = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  twitter: FaTwitter,
  youtube: FaYoutube,
};

export default function BpoTopbar1({
  data = site.topbar,
  className = "",
}: SectionProps<BpoTopbarData>) {
  const topbar = data ?? site.topbar;

  return (
    <div className={`bg-black text-white ${className}`}>
      <div className="mx-auto flex min-h-[46px] w-full max-w-[1320px] items-stretch justify-center px-4 sm:justify-between sm:px-6">
        {/* Contact info */}
        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 py-2 text-[11px] font-medium sm:gap-x-6 sm:py-0 sm:text-[12px]">
          <li>
            <a
              href={topbar.phoneHref}
              className="inline-flex items-center gap-2 transition-colors hover:text-[#E10600]"
            >
              <Phone className=" h-5 w-5  text-[#E10600]" aria-hidden />
              <span className="sm:text-lg text-sm text-white/90">{topbar.phone}</span>
            </a>
          </li>
          <li>
            <a
              href={topbar.emailHref}
              className="inline-flex items-center gap-2 transition-colors hover:text-[#E10600]"
            >
              <Mail className="h-5 w-5  text-[#E10600]" aria-hidden />
              <span className="sm:text-lg text-sm text-white/90">{topbar.email}</span>
            </a>
          </li>
        </ul>

        {/* Social icons: hidden on the smallest screens (shown in footer) */}
        <ul className="hidden items-stretch   py-2 pr-6 sm:flex">
          {topbar.socialLinks.map((social) => {
            const Icon = socialIcons[social.label.toLowerCase()];
            if (!Icon) return null;
            return (
              <li key={social.label} className="flex border-r px-2 first:border-l-red-700 first:border-l last:border-r-0 border-red-800">
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex w-9 items-center justify-center  transition-colors hover:bg-[#E10600]"
                >
                  <Icon className="h-3.5 sm:w-5 sm:h-5 w-3.5" aria-hidden />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}