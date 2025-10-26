"use client";

import React from "react";

// Plan: Compress contact bar to one row; tel/mailto; hide-on-scroll; add sticky bottom CTA.

const phoneNumberDisplay = "(301) 865-5600";
const phoneNumberHref = "+13018655600";
const email = "hello@livingsimpleproperties.com";

const ContactBar: React.FC = () => {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const scrollingDown = currentY > lastY;
      const farFromTop = currentY > 48;
      setVisible(!scrollingDown || !farFromTop);
      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside
      className={`safe-area-x fixed left-0 right-0 top-0 z-40 transition-transform duration-300 ease-out ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
      aria-label="Contact information bar"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-b-2xl bg-slate-900/95 px-4 py-2 text-sm text-white shadow-lg backdrop-blur">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <a
            href={`tel:${phoneNumberHref}`}
            className="inline-flex items-center gap-1 font-semibold text-lime-300 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400"
          >
            <span aria-hidden>📞</span>
            <span>Call {phoneNumberDisplay}</span>
          </a>
          <span className="hidden h-4 w-px bg-white/40 sm:block" aria-hidden />
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-1 text-lime-100 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400"
          >
            <span aria-hidden>✉️</span>
            <span className="truncate">{email}</span>
          </a>
        </div>
        <p className="hidden text-xs text-white/80 sm:block">
          Responsive property management across Montgomery County.
        </p>
      </div>
    </aside>
  );
};

export default ContactBar;
