"use client";

import React from "react";

// Plan: Sitewide images: WebP + srcset/sizes + lazy; set width/height.
// Plan: Hero readability—add dark overlay, reduce H1 10–15%, tighten spacing, ensure image object-fit: cover.

const heroImages = {
  small: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=640&q=80&fm=webp",
  medium: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1280&q=80&fm=webp",
  large: "https://images.unsplash.com/photo-1600585154340-0ef3c08dcdb6?auto=format&fit=crop&w=1920&q=80&fm=webp",
};

const HeroSection: React.FC = () => {
  return (
    <section
      className="relative isolate overflow-hidden bg-slate-950 text-white"
      aria-label="LivingSimple Properties hero"
    >
      <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center gap-8 px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-300">Full-service property management</p>
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Stress-free rentals for Montgomery County homeowners
          </h1>
          <p className="text-base leading-7 text-slate-100/90 sm:text-lg">
            Leasing, maintenance, renewals, and accounting handled by experts who treat your property like our own.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:+13018655600"
              className="inline-flex items-center justify-center rounded-full bg-lime-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-lime-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-200"
            >
              Schedule a Call
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Download the Owner Guide
            </a>
          </div>
        </div>
        <dl className="grid gap-6 text-sm text-white/80 sm:grid-cols-3">
          <div>
            <dt className="font-semibold text-white">Average Days-to-Lease</dt>
            <dd className="text-3xl font-semibold text-lime-300">10</dd>
          </div>
          <div>
            <dt className="font-semibold text-white">Google Reviews</dt>
            <dd className="text-3xl font-semibold text-lime-300">95+</dd>
          </div>
          <div>
            <dt className="font-semibold text-white">Portfolio Occupancy</dt>
            <dd className="text-3xl font-semibold text-lime-300">99%</dd>
          </div>
        </dl>
      </div>
      <picture>
        <source
          srcSet={`${heroImages.large} 1280w, ${heroImages.medium} 960w, ${heroImages.small} 640w`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1280px"
          type="image/webp"
        />
        <img
          src={heroImages.large}
          alt="Modern living room setup representing a well-managed rental property"
          loading="eager"
          width={1920}
          height={1080}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
      </picture>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950/90 via-slate-950/70 to-slate-950/90" aria-hidden />
    </section>
  );
};

export default HeroSection;
