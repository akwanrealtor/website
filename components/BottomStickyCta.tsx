"use client";

import React from "react";

const BottomStickyCta: React.FC = () => {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => {
      setVisible(window.scrollY > 320);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 transition-transform duration-300 ease-out ${
        visible ? "translate-y-0" : "translate-y-12"
      }`}
      aria-hidden={!visible}
    >
      <div className="flex w-full max-w-md items-center justify-between gap-3 rounded-full bg-slate-900/95 px-4 py-3 text-sm text-white shadow-2xl backdrop-blur">
        <a
          href="tel:+13018655600"
          className="flex-1 rounded-full bg-lime-500 px-4 py-2 text-center font-semibold text-slate-900 transition hover:bg-lime-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-200"
        >
          📞 Call
        </a>
        <a
          href="#rental-report"
          className="flex-1 rounded-full border border-white/50 px-4 py-2 text-center font-semibold text-white transition hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          📊 Get Rental Report
        </a>
      </div>
    </div>
  );
};

export default BottomStickyCta;
