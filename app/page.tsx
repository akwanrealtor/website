"use client";

import React from "react";
import BottomStickyCta from "../components/BottomStickyCta";
import ContactBar from "../components/ContactBar";
import Footer from "../components/Footer";
import HeaderNav from "../components/HeaderNav";
import HeroSection from "../components/HeroSection";
import ReviewsPlaceholder from "../components/ReviewsPlaceholder";
import SeoManager from "../components/SeoManager";

const HomePage: React.FC = () => {
  return (
    <>
      <SeoManager />
      <div className="flex min-h-screen flex-col bg-white text-slate-900">
        <ContactBar />
        <HeaderNav />
        <main className="flex-1">
          <HeroSection />
          <section id="guarantees" className="bg-white py-20 sm:py-24">
            <div className="mx-auto max-w-6xl space-y-12 px-4 sm:px-6 lg:px-8">
              <div className="space-y-3 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-500">Our promise</p>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                  Three guarantees that put your mind at ease
                </h2>
                <p className="mx-auto max-w-2xl text-base leading-7 text-slate-600">
                  LivingSimple protects your rental income with safeguards that most managers won’t put in writing.
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Lease-Break Credit",
                    description:
                      "If a resident leaves early, we cover the lost rent while we market and fill the home—no new leasing fee charged.",
                    icon: "🛡️",
                  },
                  {
                    title: "Eviction Protection",
                    description:
                      "Should things go sideways, we cover up to $8,000 in court and legal costs so your cash flow stays intact.",
                    icon: "⚖️",
                  },
                  {
                    title: "No Termination Fee",
                    description:
                      "Stay only if we deliver. If our partnership isn’t the right fit, you can leave anytime without penalties.",
                    icon: "🤝",
                  },
                ].map((item) => (
                  <article
                    key={item.title}
                    className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <span aria-hidden className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-lime-100 text-xl">
                      {item.icon}
                    </span>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                      <p className="text-sm leading-6 text-slate-600">{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
          <section id="difference" className="bg-slate-50 py-20 sm:py-24">
            <div className="mx-auto max-w-6xl space-y-12 px-4 sm:px-6 lg:px-8">
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-500">Win-win difference</p>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                  Partnership over pressure
                </h2>
                <p className="max-w-3xl text-base leading-7 text-slate-600">
                  We manage like owners—clear communication, performance-based fees, and advice grounded in Montgomery County data.
                </p>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">Traditional Management</h3>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                    <li>Charges onboarding and termination fees</li>
                    <li>Slow updates and vague financial reporting</li>
                    <li>Owners shoulder vacancy risk and legal costs</li>
                    <li>Generic marketing outside your neighborhood</li>
                  </ul>
                </article>
                <article className="rounded-3xl border border-lime-300 bg-white p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-slate-900">LivingSimple Win-Win</h3>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                    <li>Leave anytime—our performance keeps you, not a contract</li>
                    <li>Bi-weekly owner updates plus an online dashboard</li>
                    <li>Lease-Break Credit and $8K eviction coverage included</li>
                    <li>Neighborhood-specific pricing powered by local experts</li>
                  </ul>
                </article>
              </div>
              <div className="rounded-3xl bg-lime-100/70 p-6 text-center text-slate-800">
                <p className="text-sm font-medium">
                  “Our guarantee is simple: if we don’t deliver the calm, confident ownership experience you were promised, you shouldn’t pay for it.” — The LivingSimple Team
                </p>
              </div>
            </div>
          </section>
          <section id="local" className="bg-white py-20 sm:py-24">
            <div className="mx-auto max-w-6xl space-y-12 px-4 sm:px-6 lg:px-8">
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-500">Local expertise</p>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                  Montgomery County knowledge. NW DC hustle.
                </h2>
                <p className="max-w-3xl text-base leading-7 text-slate-600">
                  From condo conversions in Bethesda Row to single-family homes near Rock Creek Park, we match residents to the neighborhoods they’ll love—keeping your investment occupied.
                </p>
              </div>
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center">
                <div className="overflow-hidden rounded-3xl">
                  <picture>
                    <source
                      srcSet="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1280&q=80&fm=webp"
                      type="image/webp"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1280&q=80"
                      alt="Neighborhood street in Northwest Washington DC"
                      loading="lazy"
                      width={1280}
                      height={853}
                      className="h-full w-full object-cover"
                    />
                  </picture>
                </div>
                <div className="grid gap-6">
                  {[
                    {
                      neighborhood: "Rockville",
                      highlight: "Single-family homes near the Red Line with families seeking top-rated schools.",
                    },
                    {
                      neighborhood: "Bethesda",
                      highlight: "Luxury condos and townhomes steps from dining and NIH employers.",
                    },
                    {
                      neighborhood: "Silver Spring",
                      highlight: "Duplexes and accessory units with stable long-term residents.",
                    },
                    {
                      neighborhood: "NW DC",
                      highlight: "Rowhomes and boutique buildings attracting professionals who renew year after year.",
                    },
                  ].map((item) => (
                    <article key={item.neighborhood} className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5 shadow-sm">
                      <h3 className="text-base font-semibold text-slate-900">{item.neighborhood}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{item.highlight}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section id="contact" className="bg-slate-950 py-20 text-white sm:py-24">
            <div className="mx-auto max-w-4xl space-y-10 px-4 sm:px-6 lg:px-8">
              <div className="space-y-3 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-300">Let’s build your plan</p>
                <h2 className="text-3xl font-semibold sm:text-4xl">Start Your Rental Performance Plan</h2>
                <p className="text-base leading-7 text-slate-200">
                  Tell us about your rental and we’ll follow up within one business day with a guaranteed protection roadmap and rent analysis.
                </p>
              </div>
              <form className="grid gap-4 rounded-3xl bg-white/5 p-6 shadow-lg backdrop-blur">
                <div className="grid gap-2 sm:grid-cols-2">
                  <label className="flex flex-col gap-1 text-left text-sm">
                    <span className="text-slate-200">Full name</span>
                    <input
                      type="text"
                      name="name"
                      className="h-11 rounded-2xl border border-white/20 bg-white/10 px-4 text-sm text-white placeholder:text-white/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300"
                      placeholder="Jane Smith"
                      required
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-left text-sm">
                    <span className="text-slate-200">Email</span>
                    <input
                      type="email"
                      name="email"
                      className="h-11 rounded-2xl border border-white/20 bg-white/10 px-4 text-sm text-white placeholder:text-white/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300"
                      placeholder="you@example.com"
                      required
                    />
                  </label>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <label className="flex flex-col gap-1 text-left text-sm">
                    <span className="text-slate-200">Phone</span>
                    <input
                      type="tel"
                      name="phone"
                      className="h-11 rounded-2xl border border-white/20 bg-white/10 px-4 text-sm text-white placeholder:text-white/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300"
                      placeholder="(301) 555-1234"
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-left text-sm">
                    <span className="text-slate-200">Property address</span>
                    <input
                      type="text"
                      name="address"
                      className="h-11 rounded-2xl border border-white/20 bg-white/10 px-4 text-sm text-white placeholder:text-white/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300"
                      placeholder="123 Main St, Rockville"
                    />
                  </label>
                </div>
                <label className="flex flex-col gap-1 text-left text-sm">
                  <span className="text-slate-200">How can we help?</span>
                  <textarea
                    name="notes"
                    rows={4}
                    className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300"
                    placeholder="Tell us about your tenants, timelines, or goals."
                  />
                </label>
                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-lime-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-lime-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-200"
                >
                  Send My Plan
                </button>
                <p className="text-center text-xs text-slate-200/80">
                  Prefer a call? Reach us at <a href="tel:+13018655600" className="font-semibold text-lime-200 underline-offset-2 hover:underline">(301) 865-5600</a>.
                </p>
              </form>
            </div>
          </section>
          <ReviewsPlaceholder />
        </main>
        <Footer />
      </div>
      <BottomStickyCta />
    </>
  );
};

export default HomePage;
