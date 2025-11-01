document.addEventListener('DOMContentLoaded', () => {
  const viewportMeta = document.querySelector('meta[name="viewport"]');
  if (viewportMeta && !/viewport-fit=cover/.test(viewportMeta.content)) {
    viewportMeta.content = `${viewportMeta.content}, viewport-fit=cover`;
  }

  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const navLinks = document.querySelectorAll('.nav-links a');
  const activePage = document.body.dataset.page;

  navLinks.forEach((link) => {
    if (link.dataset.page === activePage) {
      link.classList.add('active');
    }
  });

  const navToggle = document.querySelector('[data-nav-toggle]');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuBackdrop = mobileMenu?.querySelector('[data-menu-backdrop]');
  const menuCloseButtons = mobileMenu ? mobileMenu.querySelectorAll('[data-menu-close]') : [];
  const contactBar = document.querySelector('[data-contact-bar]');
  let lastFocusedTrigger = null;
  const mobileBreakpoint = window.matchMedia('(max-width: 720px)');

  const createMobileCta = () => {
    const cta = document.createElement('aside');
    cta.className = 'mobile-cta';
    cta.setAttribute('aria-label', 'Quick contact options');
    cta.setAttribute('aria-hidden', 'true');

    cta.innerHTML = `
      <div class="mobile-cta__inner">
        <div class="mobile-cta__copy">
          <span class="mobile-cta__eyebrow">Need help fast?</span>
          <p class="mobile-cta__title">Talk with LivingSimple today</p>
        </div>
        <div class="mobile-cta__actions">
          <a class="btn btn-primary" href="tel:+12402134179">Call now</a>
          <a class="btn btn-outline" href="/contact.html#consultation">Get rent analysis</a>
        </div>
      </div>
    `;

    document.body.appendChild(cta);
    return cta;
  };

  const mobileCta = createMobileCta();

  const focusableSelector =
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

  const getMenuFocusables = () => {
    if (!mobileMenu) return [];
    return Array.from(mobileMenu.querySelectorAll(focusableSelector)).filter(
      (el) => !el.hasAttribute('disabled') && el.getAttribute('tabindex') !== '-1'
    );
  };

  const handleMenuKeydown = (event) => {
    if (!mobileMenu?.classList.contains('is-open')) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      setMenuState(false);
      return;
    }

    if (event.key !== 'Tab') return;

    const focusable = getMenuFocusables();
    if (!focusable.length) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const updateMobileCtaVisibility = () => {
    if (!mobileCta) return;
    const isMobile = mobileBreakpoint.matches;
    const menuOpen = mobileMenu?.classList.contains('is-open');
    const shouldShow = isMobile && !menuOpen && window.scrollY > 220;

    mobileCta.classList.toggle('is-visible', shouldShow);
    mobileCta.setAttribute('aria-hidden', shouldShow ? 'false' : 'true');
  };

  const setMenuState = (isOpen) => {
    if (!mobileMenu || !navToggle) return;

    const wasOpen = mobileMenu.classList.contains('is-open');

    mobileMenu.classList.toggle('is-open', isOpen);
    mobileMenu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.classList.toggle('no-scroll', isOpen);

    if (isOpen && !wasOpen) {
      lastFocusedTrigger = document.activeElement;
      const closeButton = mobileMenu.querySelector('[data-menu-close]');
      const [firstFocusable] = getMenuFocusables();
      requestAnimationFrame(() => {
        (closeButton || firstFocusable)?.focus({ preventScroll: true });
      });
      document.addEventListener('keydown', handleMenuKeydown);
    } else if (!isOpen && wasOpen) {
      document.removeEventListener('keydown', handleMenuKeydown);
      if (lastFocusedTrigger instanceof HTMLElement && lastFocusedTrigger !== document.body) {
        lastFocusedTrigger.focus({ preventScroll: true });
      } else {
        navToggle.focus({ preventScroll: true });
      }
    } else if (!isOpen) {
      document.body.classList.remove('no-scroll');
    }

    updateMobileCtaVisibility();
  };

  navToggle?.addEventListener('click', () => {
    const willOpen = !mobileMenu?.classList.contains('is-open');
    setMenuState(willOpen);
  });

  menuBackdrop?.addEventListener('click', () => setMenuState(false));

  menuCloseButtons.forEach((button) => {
    button.addEventListener('click', () => setMenuState(false));
  });

  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenuState(false));
    });
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 900) {
      setMenuState(false);
    }
    updateMobileCtaVisibility();
  });

  if (contactBar) {
    let lastScrollY = window.scrollY;
    const hideThreshold = 12;

    const showContactBar = () => {
      contactBar.classList.remove('is-hidden');
      contactBar.removeAttribute('aria-hidden');
    };

    const hideContactBar = () => {
      contactBar.classList.add('is-hidden');
      contactBar.setAttribute('aria-hidden', 'true');
    };

    showContactBar();

    window.addEventListener('scroll', () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY;

      if (currentY <= 16) {
        showContactBar();
      } else if (delta > hideThreshold) {
        hideContactBar();
      } else if (delta < -hideThreshold) {
        showContactBar();
      }

      lastScrollY = currentY;
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href').substring(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const rentalPlanCta = document.querySelector('[data-rental-plan-cta]');
  if (rentalPlanCta) {
    rentalPlanCta.addEventListener('click', (event) => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'rental_performance_plan_click');
      }

      const targetId = 'rental-analysis';
      const anchorTarget = document.getElementById(targetId);

      if (anchorTarget) {
        event.preventDefault();
        anchorTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      event.preventDefault();
      try {
        const destination = new URL(rentalPlanCta.getAttribute('href') || '/contact', window.location.origin);
        destination.hash = '';
        destination.searchParams.set('intent', 'rental-analysis');
        window.location.href = destination.pathname + destination.search;
      } catch (error) {
        window.location.href = '/contact?intent=rental-analysis';
      }
    });
  }

  document.querySelectorAll('input[name="source_url"]').forEach((input) => {
    input.value = window.location.href;
  });

  const carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    const slides = Array.from(carousel.querySelectorAll('[data-carousel-slide]'));
    const nextBtn = carousel.querySelector('[data-carousel-next]');
    const prevBtn = carousel.querySelector('[data-carousel-prev]');
    const dots = Array.from(carousel.querySelectorAll('[data-carousel-dot]'));
    let activeIndex = slides.findIndex((slide) => slide.classList.contains('is-active'));
    if (activeIndex < 0) activeIndex = 0;

    const setSlide = (index) => {
      const total = slides.length;
      const newIndex = ((index % total) + total) % total;
      slides.forEach((slide, idx) => {
        slide.classList.toggle('is-active', idx === newIndex);
      });
      dots.forEach((dot, idx) => {
        dot.classList.toggle('is-active', idx === newIndex);
        dot.setAttribute('aria-selected', idx === newIndex ? 'true' : 'false');
      });
      activeIndex = newIndex;
    };

    nextBtn?.addEventListener('click', () => {
      setSlide(activeIndex + 1);
    });

    prevBtn?.addEventListener('click', () => {
      setSlide(activeIndex - 1);
    });

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const index = Number(dot.dataset.carouselDot);
        if (!Number.isNaN(index)) {
          setSlide(index);
        }
      });
    });

    const autoRotate = () => setSlide(activeIndex + 1);
    let autoTimer = setInterval(autoRotate, 8000);

    carousel.addEventListener('mouseenter', () => {
      clearInterval(autoTimer);
    });

    carousel.addEventListener('mouseleave', () => {
      clearInterval(autoTimer);
      autoTimer = setInterval(autoRotate, 8000);
    });
  }

  const handleMobileBreakpoint = () => updateMobileCtaVisibility();

  if (typeof mobileBreakpoint.addEventListener === 'function') {
    mobileBreakpoint.addEventListener('change', handleMobileBreakpoint);
  } else if (typeof mobileBreakpoint.addListener === 'function') {
    mobileBreakpoint.addListener(handleMobileBreakpoint);
  }

  window.addEventListener('scroll', updateMobileCtaVisibility, { passive: true });

  updateMobileCtaVisibility();
});
