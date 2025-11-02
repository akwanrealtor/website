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
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

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

  React.useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return undefined;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(media.matches);

    const handleChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  return (
    <aside
      className={`safe-area-x pointer-events-auto fixed left-0 right-0 top-0 z-40 transition-transform duration-300 ease-out ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
      aria-label="Contact information bar"
      style={{ minHeight: `calc(${BAR_HEIGHT}px + env(safe-area-inset-top, 0px))` }}
    >
      <div
        className="mx-auto max-w-6xl px-4"
        style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 0.25rem)" }}
      >
        <div className="relative overflow-hidden rounded-b-3xl border border-white/10 bg-slate-950/90 text-white shadow-xl backdrop-blur">
          <div
            className="pointer-events-none absolute inset-0 opacity-80"
            aria-hidden
            style={{
              background:
                "radial-gradient(120% 120% at 15% 0%, rgba(163, 230, 53, 0.35), transparent 60%), radial-gradient(120% 120% at 85% -20%, rgba(16, 185, 129, 0.35), transparent 55%)",
            }}
          />
          <div className="relative flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
            <div className="flex flex-1 flex-wrap items-center gap-3 sm:gap-5">
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-lime-200">
                <span
                  className={`inline-flex h-2.5 w-2.5 rounded-full bg-lime-300 shadow-[0_0_0_3px_rgba(15,118,110,0.35)] ${
                    prefersReducedMotion ? "" : "animate-pulse"
                  }`}
                  aria-hidden
                />
                Live Support
              </span>
              <p className="text-sm text-white/80">
                Property pros in Montgomery County &amp; NW DC—ready within one business day.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href={`tel:${phoneNumberHref}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-lime-300 hover:bg-lime-300/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300"
              >
                <span aria-hidden className="text-base">
                  📞
                </span>
                Call {phoneNumberDisplay}
              </a>
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-lime-400/90 via-emerald-400/90 to-sky-400/90 px-4 py-2 text-sm font-semibold text-slate-900 shadow hover:from-lime-300 hover:to-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-200"
              >
                <span aria-hidden className="text-base">
                  ✉️
                </span>
                <span className="max-w-[160px] truncate text-left sm:max-w-none">
                  <span className="sm:hidden">{emailShort}</span>
                  <span className="hidden sm:inline">{email}</span>
                </span>
              </a>
            </div>
          </div>
          <div className="relative border-t border-white/10 px-4 py-2 text-xs text-white/70 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p>Leasing, renewals, and portfolio strategy tailored to your goals.</p>
              <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/60">
                <span aria-hidden>★</span> Guaranteed Peace of Mind
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ContactBar;
