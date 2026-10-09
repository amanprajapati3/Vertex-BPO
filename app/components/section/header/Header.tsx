"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import {
  site,
  type BpoHeaderData,
  type BpoHeaderNavItem,
  type SectionProps,
} from "@/data";
import BpoTopbar1 from "../topbar/TopBar";

const buttonIcons = {
  "chevron-right": ChevronRight,
  "arrow-right": ArrowRight,
} as const;

export default function BpoHeader1({
  data = site.header,
  className = "",
}: SectionProps<BpoHeaderData>) {
  const header = data ?? site.header;
  const nav = header.nav as BpoHeaderNavItem[];
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setOpenSubmenu(null);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  /* Close the drawer after navigating */
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  /* Lock page scroll while the drawer is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* Escape closes the drawer; resizing up to desktop resets it */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeMenu();
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => e.matches && closeMenu();
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, [closeMenu]);

  const primaryButton = header.buttons[0];
  const ButtonIcon =
    buttonIcons[
      (primaryButton?.icon ?? "chevron-right") as keyof typeof buttonIcons
    ] ?? ChevronRight;

  const logo = (
    <Link href="/" className="flex shrink-0 items-center" onClick={closeMenu}>
      <Image
        src={header.site.logo.normal}
        alt={header.site.logo.alt}
        width={778}
        height={212}
        sizes="300px"
        loading="eager"
        className="h-16 w-auto sm:h-14 md:h-20"
      />
    </Link>
  );

  return (
    <div className="sticky top-0 z-50 ">
      <BpoTopbar1 />
      <header
        className={`w-full border-b border-black/5 bg-white shadow-[0_1px_8px_rgba(0,0,0,0.06)] ${className}`}
      >
        <div className="mx-auto flex h-[64px] w-full max-w-[1320px] items-center justify-between gap-4 px-4 sm:h-[78px] sm:px-6">
          {logo}

          {/*  Desktop navigation (hover dropdown)  */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8 xl:gap-10">
              {nav.map((item) => {
                const active = isActive(item.href);
                const hasChildren = !!item.children?.length;
                return (
                  <li key={item.label} className="group relative">
                    <Link
                      href={item.href}
                      className={`flex items-center gap-1 py-6 text-[12.5px] md:text-base font-semibold uppercase tracking-wide transition-colors hover:text-[#E10600] ${
                        active ? "text-[#E10600]" : "text-[#111111]"
                      }`}
                    >
                      {item.label}
                      {hasChildren && (
                        <ChevronDown
                          className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                          aria-hidden
                        />
                      )}
                    </Link>

                    {hasChildren && (
                      <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 translate-y-2 pt-0 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                        <ul className="border-t-2 border-[#E10600] bg-white py-2 shadow-[0_12px_30px_rgba(0,0,0,0.15)]">
                          {item.children!.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className={`block px-5 py-2.5 text-[13px] md:text-[15px] font-medium transition-colors hover:bg-[#E10600]/5 hover:text-[#E10600] ${
                                  pathname === child.href
                                    ? "text-[#E10600]"
                                    : "text-[#222222]"
                                }`}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/*  Right side: CTA + hamburger  */}
          <div className="flex items-center gap-3">
            {primaryButton && (
              <Link
                href={primaryButton.href}
                className="hidden items-center gap-1.5 rounded-[8px] bg-[#E10600] px-5 py-2.5 text-[11.5px] md:text-base font-bold md:font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#b80500] md:inline-flex"
              >
                {primaryButton.label}
                <ButtonIcon
                  className="h-3.5 w-3.5"
                  strokeWidth={3}
                  aria-hidden
                />
              </Link>
            )}

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={header.mobileMenu.openLabel}
              aria-expanded={menuOpen}
              aria-controls="bpo-mobile-menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-[4px] border border-black/10 text-[#111111] transition-colors hover:border-[#E10600] hover:text-[#E10600] lg:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>

        {/*  Overlay  */}
        <div
          onClick={closeMenu}
          aria-hidden
          className={`fixed inset-0 z-[60] bg-black/60 transition-opacity duration-300 lg:hidden ${
            menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        />

        {/*  Mobile / tablet drawer (slides from left)  */}
        <aside
          id="bpo-mobile-menu"
          aria-hidden={!menuOpen}
          className={`fixed inset-y-0 left-0 z-[70] flex w-[85%] max-w-[360px] flex-col bg-white shadow-2xl transition-[transform,visibility] duration-300 ease-in-out lg:hidden ${
            menuOpen ? "visible translate-x-0" : "invisible -translate-x-full"
          }`}
        >
          <div className="flex h-[64px] shrink-0 items-center justify-between border-b border-black/10 px-4 sm:h-[72px]">
            {logo}
            <button
              type="button"
              onClick={closeMenu}
              aria-label={header.mobileMenu.closeLabel}
              className="inline-flex h-10 w-10 items-center justify-center rounded-[4px] bg-[#E10600] text-white transition-colors hover:bg-[#b80500]"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-2">
            <ul>
              {nav.map((item) => {
                const active = isActive(item.href);
                const hasChildren = !!item.children?.length;
                const expanded = openSubmenu === item.label;

                return (
                  <li key={item.label} className="border-b border-black/10">
                    {hasChildren ? (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setOpenSubmenu(expanded ? null : item.label)
                          }
                          aria-expanded={expanded}
                          className={`flex w-full items-center justify-between py-3.5 text-left text-[13px] font-semibold uppercase tracking-wide transition-colors ${
                            active || expanded
                              ? "text-[#E10600]"
                              : "text-[#111111]"
                          }`}
                        >
                          {item.label}
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-300 ${
                              expanded ? "rotate-180" : ""
                            }`}
                            aria-hidden
                          />
                        </button>

                        <div
                          className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                            expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                          }`}
                        >
                          <ul className="overflow-hidden">
                            <li>
                              <Link
                                href={item.href}
                                className="flex items-center gap-2 py-2.5 pl-3 text-[13px] font-semibold text-[#E10600]"
                              >
                                <ChevronRight
                                  className="h-3.5 w-3.5"
                                  aria-hidden
                                />
                                {header.mobileMenu.viewAllLabel} {item.label}
                              </Link>
                            </li>
                            {item.children!.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className={`flex items-center gap-2 py-2.5 pl-3 text-[13px] font-medium transition-colors hover:text-[#E10600] ${
                                    pathname === child.href
                                      ? "text-[#E10600]"
                                      : "text-[#333333]"
                                  }`}
                                >
                                  <ChevronRight
                                    className="h-3.5 w-3.5 text-[#E10600]"
                                    aria-hidden
                                  />
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={`block py-3.5 text-[13px] font-semibold uppercase tracking-wide transition-colors hover:text-[#E10600] ${
                          active ? "text-[#E10600]" : "text-[#111111]"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {primaryButton && (
            <div className="shrink-0 border-t border-black/10 p-4 md:hidden">
              <Link
                href={primaryButton.href}
                className="flex w-full items-center justify-center gap-1.5 rounded-[4px] bg-[#E10600] px-5 py-3 text-[12px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#b80500]"
              >
                {primaryButton.label}
                <ButtonIcon
                  className="h-3.5 w-3.5"
                  strokeWidth={3}
                  aria-hidden
                />
              </Link>
            </div>
          )}
        </aside>
      </header>
    </div>
  );
}
