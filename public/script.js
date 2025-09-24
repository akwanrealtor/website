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

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const messageEl = document.getElementById('contactMessage');
    const submitButton = contactForm.querySelector('button[type="submit"]');

    const setMessage = (type, text) => {
      if (!messageEl) return;
      messageEl.textContent = text;
      messageEl.classList.remove('success', 'error');
      if (type) {
        messageEl.classList.add(type);
      }
    };

    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      setMessage('', '');

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.dataset.originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
      }

      try {
        const formData = new FormData(contactForm);
        formData.append('source_url', window.location.href);

        const response = await fetch(contactForm.action, {
          method: contactForm.method || 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        contactForm.reset();
        setMessage('success', 'Thank you! We’ll reach out shortly.');
      } catch (error) {
        console.error('Contact form submission failed:', error);
        setMessage(
          'error',
          'We’re sorry—something went wrong. Please try again or email hello@summitpm.com.'
        );
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          if (submitButton.dataset.originalText) {
            submitButton.textContent = submitButton.dataset.originalText;
            delete submitButton.dataset.originalText;
          }
        }
      }
    });
  }
});
