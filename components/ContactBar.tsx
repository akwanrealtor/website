"use client";

import React from "react";

// Plan: Compress contact bar to one row; tel/mailto; hide-on-scroll; add sticky bottom CTA.

const phoneNumberDisplay = "(301) 865-5600";
const phoneNumberHref = "+13018655600";
const email = "hello@livingsimpleproperties.com";
const emailShort = "hello@livingsimple…";
const BAR_HEIGHT = 52;

const ContactBar: React.FC = () => {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    if (typeof window === "undefined") return undefined;
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
    <>
      <aside
        className={`safe-area-x fixed left-0 right-0 top-0 z-40 transition-transform duration-300 ease-out ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
        aria-label="Contact information bar"
        style={{ minHeight: `calc(${BAR_HEIGHT}px + env(safe-area-inset-top, 0px))` }}
      >
        <div
          className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-b-2xl bg-slate-900/95 px-4 py-1 text-sm text-white shadow-lg backdrop-blur"
          style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 0.25rem)" }}
        >
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href={`tel:${phoneNumberHref}`}
              className="inline-flex h-11 items-center gap-1 rounded-full px-4 font-semibold text-lime-300 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400"
            >
              <span aria-hidden>📞</span>
              <span>Call {phoneNumberDisplay}</span>
            </a>
            <span className="hidden h-4 w-px bg-white/40 sm:block" aria-hidden />
            <a
              href={`mailto:${email}`}
              className="inline-flex h-11 items-center gap-1 rounded-full px-4 text-lime-100 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400"
            >
              <span aria-hidden>✉️</span>
              <span className="block max-w-[150px] truncate text-left sm:max-w-none">
                <span className="sm:hidden">{emailShort}</span>
                <span className="hidden sm:inline">{email}</span>
              </span>
            </a>
          </div>
          <p className="hidden text-xs text-white/80 sm:block">
            Responsive property management across Montgomery County.
          </p>
        </div>
      </aside>
      <div
        aria-hidden
        style={{
          height: visible ? `calc(${BAR_HEIGHT}px + env(safe-area-inset-top, 0px))` : "0px",
          transition: "height 300ms ease",
        }}
      />
    </>
  );
};

export default ContactBar;
