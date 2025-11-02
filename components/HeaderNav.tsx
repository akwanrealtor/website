"use client";

import React from "react";

// Plan: Optimize mobile header/nav: sticky, logo 28px, hamburger, safe-area insets, prevent CLS.

type NavLink = {
  href: string;
  label: string;
};

const navLinks: NavLink[] = [
  { href: "#guarantees", label: "Guarantees" },
  { href: "#difference", label: "Win-Win Difference" },
  { href: "#local", label: "Local Expertise" },
  { href: "#contact", label: "Contact" },
];

const BrandMark: React.FC = () => (
  <span className="flex items-center gap-2 text-slate-900">
    <span
      aria-hidden
      className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-lime-400 to-emerald-500 text-sm font-black text-slate-900"
    >
      LS
    </span>
    <span className="text-lg font-semibold tracking-tight">LivingSimple</span>
  </span>
);

const HeaderNav: React.FC = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement | null>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    if (typeof document === "undefined" || typeof window === "undefined") return undefined;
    const { body, documentElement } = document;

    if (menuOpen) {
      const scrollBarCompensation = window.innerWidth - documentElement.clientWidth;
      body.style.overflow = "hidden";
      if (scrollBarCompensation > 0) {
        body.style.paddingRight = `${scrollBarCompensation}px`;
      }
    } else {
      body.style.overflow = "";
      body.style.paddingRight = "";
    }

    return () => {
      body.style.overflow = "";
      body.style.paddingRight = "";
    };
  }, [menuOpen]);

  React.useEffect(() => {
    if (!menuOpen) return undefined;
    const node = menuRef.current;
    if (!node) return undefined;

    const focusable = Array.from(
      node.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    );

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (event.key === "Tab" && focusable.length > 0) {
        const { activeElement } = document;
        const currentIndex = focusable.indexOf(activeElement as HTMLElement);
        if (event.shiftKey) {
          if (currentIndex <= 0) {
            focusable[focusable.length - 1]?.focus();
            event.preventDefault();
          }
        } else if (currentIndex === focusable.length - 1) {
          focusable[0]?.focus();
          event.preventDefault();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    focusable[0]?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  React.useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen((previous) => !previous);

  return (
    <header
      className={`safe-area-x safe-area-y sticky top-0 z-30 transition-all duration-300 ${
        scrolled ? "bg-white/95 shadow-md backdrop-blur" : "bg-white/80"
      }`}
    >
      <div className="relative mx-auto flex min-h-[72px] max-w-6xl items-center justify-between gap-4 px-4">
        <div
          className="pointer-events-none absolute inset-x-4 bottom-0 h-px bg-gradient-to-r from-transparent via-lime-300/50 to-transparent"
          aria-hidden
        />
        <a
          href="/"
          className="flex items-center gap-2 text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500"
          aria-label="LivingSimple Properties home"
        >
          <BrandMark />
        </a>
        <nav
          className="hidden flex-1 items-center justify-center gap-2 text-[0.95rem] font-semibold text-slate-800 lg:flex"
          aria-label="Primary navigation"
        >
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="inline-flex items-center rounded-full px-3.5 py-2 transition hover:bg-lime-100 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500"
            >
              {label}
            </a>
          ))}
          <div className="flex items-center gap-3">
            <a
              href="tel:+13018655600"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-lime-400 hover:text-lime-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500"
            >
              <span aria-hidden className="text-base">📞</span>
              Talk to us
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-lime-400 via-emerald-400 to-sky-400 px-5 py-2 text-sm font-semibold text-slate-900 shadow transition hover:from-lime-300 hover:to-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-200"
            >
              <span aria-hidden className="text-base">✨</span>
              Get my plan
            </a>
          </div>
        </nav>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={toggleMenu}
          className="inline-flex items-center justify-center rounded-full border border-slate-200 p-2 text-slate-700 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500 lg:hidden"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className="sr-only">Menu</span>
          <svg
            aria-hidden
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {menuOpen ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <>
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </>
            )}
          </svg>
        </button>
      </div>
      <div
        ref={menuRef}
        id="mobile-menu"
        className={`fixed inset-x-0 top-0 z-20 bg-white/95 pt-[72px] backdrop-blur transition-transform duration-300 ease-out lg:hidden ${
          menuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="safe-area-x safe-area-y space-y-5 pb-16">
          <div className="px-6">
            <div className="flex items-center justify-between rounded-3xl border border-slate-200/70 bg-white/70 px-4 py-3 text-sm text-slate-600 shadow-sm">
              <div className="flex items-center gap-2 font-medium text-slate-800">
                <span aria-hidden className="text-base">⚡</span>
                We're ready when you are
              </div>
              <a
                href="tel:+13018655600"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-white"
              >
                <span aria-hidden>📞</span> Call now
              </a>
            </div>
          </div>
          <nav className="flex flex-col" aria-label="Mobile primary navigation">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="flex items-center justify-between border-b border-slate-100 px-6 py-3 text-base font-medium text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500"
                onClick={() => setMenuOpen(false)}
              >
                {label}
                <span aria-hidden>›</span>
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-3 px-6">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base font-semibold text-slate-900 transition hover:border-lime-400 hover:text-lime-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500"
              onClick={() => setMenuOpen(false)}
            >
              <span aria-hidden className="text-lg">✨</span>
              Start my plan
            </a>
            <a
              href="tel:+13018655600"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400"
              onClick={() => setMenuOpen(false)}
            >
              <span aria-hidden className="text-lg">📞</span>
              Speak to a strategist
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderNav;
