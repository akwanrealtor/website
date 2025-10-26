"use client";

import React from "react";

const ReviewsPlaceholder: React.FC = () => {
  return (
    <section
      aria-labelledby="reviews-heading"
      className="bg-white py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          <h2
            id="reviews-heading"
            className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
          >
            What Clients Are Saying
          </h2>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-stretch">
            <article
              aria-label="Google reviews availability notice"
              className="rounded-3xl border border-slate-200 bg-slate-50/80 p-8 shadow-sm"
            >
              <p className="text-base leading-7 text-slate-700">
                <span aria-hidden className="mr-2">⭐</span>
                Live Google reviews will appear here once approved.
              </p>
            </article>
            <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div
                role="img"
                aria-label="Map preview of LivingSimple service area"
                className="h-48 rounded-2xl bg-gradient-to-br from-lime-100 via-emerald-100 to-slate-100"
              >
                <div className="flex h-full items-center justify-center text-sm font-medium text-slate-500">
                  Map preview
                </div>
              </div>
              <a
                href="https://www.google.com/search?q=livingsimple+properties"
                target="_blank"
                rel="noopener"
                aria-label="Open LivingSimple Properties Google reviews in a new tab"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime-600 px-6 py-4 text-center text-base font-semibold text-white shadow-lg transition hover:bg-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
              >
                <span aria-hidden>⭐</span>
                See Our 95+ Google Reviews — 4.9★
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsPlaceholder;
