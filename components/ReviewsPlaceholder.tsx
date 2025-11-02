"use client";

import React from "react";

const ReviewsPlaceholder: React.FC = () => {
  return (
    <section id="testimonials" aria-labelledby="reviews-heading" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          <div className="space-y-3 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-500">Trusted locally</p>
            <h2 id="reviews-heading" className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Montgomery County neighbors who chose LivingSimple
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-7 text-slate-600">
              Real stories from Rockville, Bethesda, Silver Spring, and Northwest DC homeowners who wanted partnership over
              headaches.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
            <picture className="overflow-hidden rounded-3xl">
              <source
                srcSet="https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1280&q=80&fm=webp"
                type="image/webp"
              />
              <img
                src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1280&q=80"
                alt="Townhomes in Bethesda, Maryland"
                loading="lazy"
                width={1280}
                height={853}
                className="h-full w-full object-cover"
              />
            </picture>
            <div className="grid gap-6">
              <figure className="rounded-3xl border border-slate-200 bg-slate-50/70 p-6 text-left shadow-sm">
                <blockquote className="text-base leading-7 text-slate-700">
                  “As a first-time landlord in Rockville, I was terrified of getting the wrong tenant. LivingSimple placed a
                  resident in nine days and checked in every week with updates. When a job transfer took them out early, the
                  Lease-Break Credit covered the vacant month.”
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-slate-900">— Maya L., Rockville homeowner</figcaption>
              </figure>
              <figure className="rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm">
                <blockquote className="text-base leading-7 text-slate-700">
                  “We live overseas now and needed someone we could trust with our Silver Spring duplex. The communication is
                  honest, the maintenance approvals are simple, and knowing eviction costs are covered up to $8,000 helps us
                  sleep at night.”
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-slate-900">— Jordan &amp; Alex P., Silver Spring landlords</figcaption>
              </figure>
              <a
                href="https://www.google.com/search?q=livingsimple+properties"
                target="_blank"
                rel="noopener"
                aria-label="Open LivingSimple Properties Google reviews in a new tab"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-lime-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-lime-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300"
              >
                <span aria-hidden>⭐</span>
                Read 95+ Google Reviews
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsPlaceholder;
