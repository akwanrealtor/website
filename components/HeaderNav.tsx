"use client";

import React from "react";

// Plan: Optimize mobile header/nav: sticky, logo 28px, hamburger, safe-area insets, prevent CLS.

type NavLink = {
  href: string;
  label: string;
};

const navLinks: NavLink[] = [
  { href: "#services", label: "Services" },
  { href: "#pricing", label: "Pricing" },
  { href: "#owners", label: "Owners" },
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

  const toggleMenu = () => setMenuOpen((previous) => !previous);

  return (
    <header className="safe-area-x safe-area-y sticky top-0 z-30 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex min-h-[72px] max-w-6xl items-center justify-between gap-4">
        <a
          href="/"
          className="flex items-center gap-2 text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500"
          aria-label="LivingSimple Properties home"
        >
          <BrandMark />
        </a>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 lg:flex" aria-label="Primary navigation">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="rounded-full px-4 py-2 transition hover:bg-lime-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500"
            >
              {label}
            </a>
          ))}
          <a
            href="/contact"
            className="rounded-full border border-slate-200 px-4 py-2 font-semibold text-slate-900 transition hover:border-lime-400 hover:text-lime-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500"
          >
            Contact
          </a>
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
        className={`fixed inset-x-0 top-0 z-20 bg-white/98 pt-[72px] transition-transform duration-300 ease-out lg:hidden ${
          menuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="safe-area-x safe-area-y space-y-4 pb-16">
          <nav className="flex flex-col" aria-label="Mobile primary navigation">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="flex items-center justify-between border-b border-slate-100 px-2 py-3 text-base font-medium text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500"
                onClick={() => setMenuOpen(false)}
              >
                {label}
                <span aria-hidden>›</span>
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-3">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-4 py-3 text-base font-semibold text-slate-900 transition hover:border-lime-400 hover:text-lime-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderNav;
