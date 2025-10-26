"use client";

import React from "react";

const criticalCss = 
  "body{margin:0;font-family:'Inter',system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background-color:#0f172a;}" +
  ".safe-area-x{padding-left:calc(1rem + env(safe-area-inset-left));padding-right:calc(1rem + env(safe-area-inset-right));}" +
  ".safe-area-y{padding-top:calc(0.75rem + env(safe-area-inset-top));padding-bottom:calc(0.75rem + env(safe-area-inset-bottom));}";

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'LivingSimple Properties',
  url: 'https://www.livingsimpleproperties.com',
  telephone: '+13018655600',
  email: 'hello@livingsimpleproperties.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '11810 Grand Park Ave Suite 500',
    addressLocality: 'North Bethesda',
    addressRegion: 'MD',
    postalCode: '20852',
    addressCountry: 'US',
  },
  sameAs: [
    'https://www.facebook.com/livingsimpleproperties',
    'https://www.instagram.com/livingsimpleproperties',
    'https://www.linkedin.com/company/livingsimple-properties',
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
};

const SeoManager: React.FC = () => {
  React.useEffect(() => {
    if (typeof document === "undefined") return;

    const ensureTag = <T extends HTMLElement>(
      selector: string,
      create: () => T,
      configure?: (node: T) => void,
    ) => {
      let node = document.head.querySelector(selector) as T | null;
      if (!node) {
        node = create();
        document.head.appendChild(node);
      }
      if (configure && node) {
        configure(node);
      }
      return node;
    };

    ensureTag<HTMLMetaElement>("meta[name='viewport']", () => {
      const meta = document.createElement("meta");
      meta.name = "viewport";
      return meta;
    }, (meta) => {
      meta.content = "width=device-width, initial-scale=1, viewport-fit=cover";
    });

    ensureTag<HTMLMetaElement>("meta[property='og:title']", () => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:title");
      return meta;
    }, (meta) => {
      meta.content = "LivingSimple Properties | Property Management";
    });

    ensureTag<HTMLMetaElement>("meta[property='og:description']", () => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:description");
      return meta;
    }, (meta) => {
      meta.content = "LivingSimple Properties delivers stress-free property management across Montgomery County.";
    });

    ensureTag<HTMLMetaElement>("meta[property='og:image']", () => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:image");
      return meta;
    }, (meta) => {
      meta.content = "https://images.unsplash.com/photo-1600585154340-0ef3c08dcdb6?auto=format&fit=crop&w=1200&q=80";
    });

    ensureTag<HTMLLinkElement>("link[data-seo='preconnect-fonts']", () => {
      const link = document.createElement("link");
      link.dataset.seo = "preconnect-fonts";
      link.rel = "preconnect";
      link.href = "https://fonts.googleapis.com";
      return link;
    });

    ensureTag<HTMLLinkElement>("link[data-seo='preconnect-fonts-gstatic']", () => {
      const link = document.createElement("link");
      link.dataset.seo = "preconnect-fonts-gstatic";
      link.rel = "preconnect";
      link.href = "https://fonts.gstatic.com";
      link.crossOrigin = "";
      return link;
    });

    ensureTag<HTMLLinkElement>("link[data-seo='preload-font']", () => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "style";
      link.dataset.seo = "preload-font";
      link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
      link.onload = () => {
        link.rel = "stylesheet";
      };
      return link;
    });

    ensureTag<HTMLStyleElement>("style[data-seo='critical']", () => {
      const style = document.createElement("style");
      style.dataset.seo = "critical";
      style.textContent = criticalCss;
      return style;
    });

    ensureTag<HTMLScriptElement>("script[data-seo='jsonld']", () => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.seo = "jsonld";
      script.textContent = JSON.stringify(jsonLd);
      return script;
    }, (script) => {
      script.textContent = JSON.stringify(jsonLd);
    });

    return () => {
      const cleanupSelectors = [
        "link[data-seo='preload-font']",
        "style[data-seo='critical']",
        "script[data-seo='jsonld']",
      ];
      cleanupSelectors.forEach((selector) => {
        const node = document.head.querySelector(selector);
        if (node && node.parentElement) {
          node.parentElement.removeChild(node);
        }
      });
    };
  }, []);

  return null;
};

export default SeoManager;
