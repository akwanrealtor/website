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
      <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center gap-10 px-4 py-28 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-lime-300/90">Management with a Guarantee</p>
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Win-win property management for Rockville, Bethesda, Silver Spring, and NW DC landlords.
          </h1>
          <p className="text-base leading-7 text-slate-100/90 sm:text-lg">
            Enjoy calm, consistent returns with a partner who covers the what-ifs—lease breaks, evictions, and the stress that
            comes with them.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-lime-400 px-7 py-3 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-lime-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-200"
            >
              Start Your Rental Performance Plan
            </a>
            <a
              href="tel:+13018655600"
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-7 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Talk with a Property Expert
            </a>
          </div>
        </div>
        <dl className="grid gap-6 text-sm text-white/80 sm:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <dt className="font-semibold text-white">Guaranteed Protections</dt>
            <dd className="mt-2 text-3xl font-semibold text-lime-300">3 Included</dd>
            <dd className="mt-1 text-xs uppercase tracking-[0.25em] text-white/70">Lease-Break • Eviction • Exit</dd>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <dt className="font-semibold text-white">Local Homes Managed</dt>
            <dd className="mt-2 text-3xl font-semibold text-lime-300">250+</dd>
            <dd className="mt-1 text-xs uppercase tracking-[0.25em] text-white/70">Montgomery County &amp; NW DC</dd>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <dt className="font-semibold text-white">Owner Satisfaction</dt>
            <dd className="mt-2 text-3xl font-semibold text-lime-300">4.9★</dd>
            <dd className="mt-1 text-xs uppercase tracking-[0.25em] text-white/70">95+ Google Reviews</dd>
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
