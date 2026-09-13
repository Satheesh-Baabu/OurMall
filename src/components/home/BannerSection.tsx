"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "@/components/Button"; // adjust import to your setup

const banners = [
  {
    image: "/banner.png",
    alt: "Christmas sale",
    href: "#products",
  },
  {
    image: "/banner_2.png",
    alt: "Special shopping offers",
    href: "/products",
  },
  {
    image: "/banner_3.png",
    alt: "New arrivals and discounts",
    href: "/products",
  },
];

export default function BannerSection() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // detect mobile viewport
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    setIsMobile(mql.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // only auto-rotate on non-mobile
  useEffect(() => {
    if (isMobile) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isMobile]);

  const activeBanner = isMobile ? banners[1] : banners[current];

  return (
    <section className="mx-auto max-w-full h-[90vh] overflow-hidden relative">
      <div className="relative h-full w-full">
        <Image
          src={activeBanner.image}
          alt={activeBanner.alt}
          loading="eager"
          width={1920}
          height={1080}
          priority={current === 0}
          className="h-full w-full object-cover object-top transition-opacity duration-500"
        />

        {/* Shop Now button */}
        <div className="absolute inset-0 flex items-end mb-20 justify-center ">
          <Button
            href={banners[current].href}
            className="bg-secondary hover:bg-secondary/90 shadow-2xl shadow-secondary/50 
               transition-all duration-500 ease-in
                hover:shadow-secondary/70
               animate-bounce hover:animate-none
               active:scale-95"
          >
            Shop Now
          </Button>
        </div>

        {/* Dots */}
        {!isMobile && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`Show banner ${index + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  current === index
                    ? "w-8 bg-white"
                    : "w-2.5 bg-white/60 hover:bg-white"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
