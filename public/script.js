document.addEventListener('DOMContentLoaded', () => {
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

  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const sourceUrlInput = document.querySelector('input[name="source_url"]');
  if (sourceUrlInput) {
    sourceUrlInput.value = window.location.href;
  }

  const hero = document.querySelector('.hero');
  const heroRealtor = document.querySelector('.hero-realtor');
  if (hero && heroRealtor) {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let animationFrameId = null;

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const updatePosition = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      heroRealtor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      animationFrameId = requestAnimationFrame(updatePosition);
    };

    const handlePointerMove = (event) => {
      const bounds = hero.getBoundingClientRect();
      const relativeX = event.clientX - (bounds.left + bounds.width / 2);
      const relativeY = event.clientY - (bounds.top + bounds.height / 2);

      targetX = clamp(relativeX * 0.08, -48, 48);
      targetY = clamp(relativeY * 0.1, -52, 52);
    };

    const handlePointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const startInteractiveMotion = () => {
      if (animationFrameId !== null) {
        return;
      }
      hero.addEventListener('pointermove', handlePointerMove);
      hero.addEventListener('pointerleave', handlePointerLeave);
      updatePosition();
    };

    const stopInteractiveMotion = () => {
      hero.removeEventListener('pointermove', handlePointerMove);
      hero.removeEventListener('pointerleave', handlePointerLeave);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      currentX = 0;
      currentY = 0;
      targetX = 0;
      targetY = 0;
      heroRealtor.style.transform = 'translate3d(0px, 0px, 0px)';
    };

    const evaluateMotionPreference = () => {
      if (mediaQuery.matches) {
        stopInteractiveMotion();
      } else {
        startInteractiveMotion();
      }
    };

    mediaQuery.addEventListener('change', evaluateMotionPreference);
    evaluateMotionPreference();
  }
});
