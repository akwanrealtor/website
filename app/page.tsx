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
          <section id="services" className="bg-white py-20 sm:py-24">
            <div className="mx-auto max-w-6xl space-y-12 px-4 sm:px-6 lg:px-8">
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-500">Property management services</p>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                  Everything you need to protect your rental investment
                </h2>
                <p className="max-w-2xl text-base leading-7 text-slate-600">
                  Leasing, renewals, inspections, maintenance coordination, 24/7 resident support, monthly financial reporting, and eviction protection bundled into one responsive team.
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Leasing & Marketing",
                    description:
                      "Professional photography, optimized listings, and thorough resident screening to secure high-quality tenants fast.",
                  },
                  {
                    title: "Maintenance Coordination",
                    description:
                      "24/7 maintenance hotline with vetted vendors and proactive seasonal inspections to prevent costly surprises.",
                  },
                  {
                    title: "Accounting & Compliance",
                    description:
                      "Monthly statements, year-end 1099s, and regulatory compliance handled by specialists who keep you audit ready.",
                  },
                ].map((item) => (
                  <article
                    key={item.title}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
          <section id="pricing" className="bg-slate-50 py-20 sm:py-24">
            <div className="mx-auto max-w-6xl space-y-12 px-4 sm:px-6 lg:px-8">
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-500">Transparent pricing</p>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Simple fees that scale with you</h2>
                <p className="max-w-2xl text-base leading-7 text-slate-600">
                  Pay for performance—not promises. No onboarding fees, hidden charges, or markups. Cancel anytime if we don’t deliver.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-900">Core Management</h3>
                  <p className="mt-2 text-sm text-slate-500">8% monthly management fee</p>
                  <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-600">
                    <li>Leasing coordination</li>
                    <li>Resident relations & renewals</li>
                    <li>Maintenance coordination</li>
                    <li>Monthly owner statements</li>
                  </ul>
                </article>
                <article className="rounded-3xl border border-lime-300 bg-lime-50/80 p-8 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-900">Premium Protection</h3>
                  <p className="mt-2 text-sm text-slate-500">10% monthly management fee</p>
                  <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-600">
                    <li>Everything in Core</li>
                    <li>Eviction protection up to $5,000</li>
                    <li>Annual portfolio review</li>
                    <li>Move-in/out inspections</li>
                  </ul>
                </article>
              </div>
            </div>
          </section>
          <section id="owners" className="bg-white py-20 sm:py-24">
            <div className="mx-auto max-w-6xl space-y-12 px-4 sm:px-6 lg:px-8">
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-500">Owner resources</p>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Guidance tailored to investors</h2>
                <p className="max-w-2xl text-base leading-7 text-slate-600">
                  Access market analyses, make-ready checklists, and personalized strategies to optimize cash flow and retain great residents.
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Rental Analysis",
                    description: "Request an in-depth market rent report with comps and projected net income.",
                  },
                  {
                    title: "Portfolio Planning",
                    description: "Quarterly reviews align your goals with strategic recommendations from our team.",
                  },
                  {
                    title: "Resident Retention",
                    description: "Experience-driven resident perks and renewals that minimize vacancy losses.",
                  },
                ].map((item) => (
                  <article
                    key={item.title}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
          <section id="rental-report" className="bg-slate-950 py-20 text-white sm:py-24">
            <div className="mx-auto max-w-4xl space-y-8 px-4 sm:px-6 lg:px-8">
              <div className="space-y-3 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-lime-300">Free rental report</p>
                <h2 className="text-3xl font-semibold sm:text-4xl">Discover your property’s earning potential</h2>
                <p className="text-base leading-7 text-slate-200">
                  Share your property details and we’ll send a personalized rent analysis with recommendations in one business day.
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
                  <span className="text-slate-200">Questions or notes</span>
                  <textarea
                    name="notes"
                    rows={4}
                    className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300"
                    placeholder="Share timelines, renovation plans, or anything we should know."
                  />
                </label>
                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-lime-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-lime-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-200"
                >
                  Request my report
                </button>
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
