"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ArrowRight } from "lucide-react";
import PageBanner from "../../shared/PageBanner";
import { site } from "@/data";

export default function Faq() {
  const data = site.faq;
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <>
      <PageBanner data={data.banner} />

      <section className="py-8 md:py-12 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 space-y-0">
            <div className="flex items-center justify-center gap-3">
              <span className="text-red-600 font-semibold tracking-wider text-sm uppercase">
                {data.badge}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              {data.title.normal}{" "}
              <span className="text-red-600">{data.title.highlighted}</span>
            </h2>

            <span className="h-0.5 w-10 bg-red-600 inline-block"></span>

            <p className="text-gray-600 text-base sm:text-lg">
              {data.desc}
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* FAQ Column */}
            <div className="lg:col-span-7 lg:col-start-6 order-1 lg:order-2 space-y-3">

              <div className="space-y-2">
                {data.faqs.map((faq) => {
                  const isOpen = openId === faq.id;

                  return (
                    <div
                      key={faq.id}
                      className={`transition-all duration-300 overflow-hidden ${
                        isOpen
                          ? "bg-red-50/50 border-red-200 shadow-sm"
                          : "bg-white border-b border-b-gray-200"
                      }`}
                    >
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full cursor-pointer flex items-center justify-between p-3 text-left focus:outline-none"
                      >
                        <div className="flex items-center gap-4 pr-4">
                          <span className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white shrink-0 transition-colors">
                            {isOpen ? (
                              <Minus className="w-4 h-4" />
                            ) : (
                              <Plus className="w-4 h-4" />
                            )}
                          </span>

                          <span className="font-bold text-gray-900 text-base">
                            {faq.question}
                          </span>
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-6 pt-0 text-gray-600 text-sm sm:text-base leading-relaxed pl-17">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Desktop CTA - unchanged position */}
              <div className="hidden lg:flex bg-[#111111] rounded-2xl p-6 sm:p-8 items-center justify-between gap-6 shadow-xl mt-8">
                <div className="space-y-1 text-left">
                  <h3 className="text-white text-xl sm:text-2xl font-bold">
                    {data.sidebar.promoCard.title}
                  </h3>

                  <p className="text-gray-400 text-sm sm:text-base">
                    {data.sidebar.promoCard.desc}
                  </p>
                </div>

                <Link
                  href={data.sidebar.promoCard.buttonLink}
                  className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all duration-300 whitespace-nowrap group"
                >
                  <span>{data.sidebar.promoCard.buttonText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="lg:col-span-5 lg:col-start-1 order-2 lg:order-1 relative">
              <div className="relative w-full h-[450px] sm:h-[550px] lg:h-[620px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/bpo/bpo9.jpg"
                  alt="Call center agent with headset"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Mobile + Tablet CTA - always after image */}
          <div className="lg:hidden bg-[#111111] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl mt-8">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-white text-xl sm:text-2xl font-bold">
                {data.sidebar.promoCard.title}
              </h3>

              <p className="text-gray-400 text-sm sm:text-base">
                {data.sidebar.promoCard.desc}
              </p>
            </div>

            <Link
              href={data.sidebar.promoCard.buttonLink}
              className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all duration-300 whitespace-nowrap group"
            >
              <span>{data.sidebar.promoCard.buttonText}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}