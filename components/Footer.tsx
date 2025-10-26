"use client";

import React from "react";

// Plan: Footer: small logo + quick links, stacked ≤768px.

const quickLinks = [
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Residents", href: "#residents" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 py-12 text-slate-200">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <span className="flex items-center gap-2 text-white">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-lime-400 to-emerald-500 text-xs font-bold text-slate-900">
              LS
            </span>
            <span className="text-base font-semibold">LivingSimple Properties</span>
          </span>
          <p className="mt-3 max-w-xs text-sm text-slate-300">
            Montgomery County property management tailored for investors who expect transparency, protection, and reliable returns.
          </p>
        </div>
        <div className="grid gap-8 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-3">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">Quick Links</h3>
            <nav className="flex flex-col gap-2" aria-label="Footer quick links">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-300 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">Contact</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a
                  href="tel:+13018655600"
                  className="transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400"
                >
                  (301) 865-5600
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@livingsimpleproperties.com"
                  className="transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400"
                >
                  hello@livingsimpleproperties.com
                </a>
              </li>
              <li>
                11810 Grand Park Ave Suite 500
                <br />
                North Bethesda, MD 20852
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">Hours</h3>
            <p className="text-sm text-slate-300">
              Monday–Friday: 9am – 6pm
              <br />
              Saturday & Sunday: By appointment
            </p>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-white/10 pt-6">
        <p className="text-center text-xs text-slate-500">
          © {new Date().getFullYear()} LivingSimple Properties. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
