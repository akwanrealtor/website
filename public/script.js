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

  const faqButtons = document.querySelectorAll('.faq-question');
  if (faqButtons.length) {
    faqButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const expanded = button.getAttribute('aria-expanded') === 'true';
        const answer = button.nextElementSibling;

        faqButtons.forEach((otherButton) => {
          if (otherButton !== button) {
            otherButton.setAttribute('aria-expanded', 'false');
            const otherAnswer = otherButton.nextElementSibling;
            if (otherAnswer) {
              otherAnswer.setAttribute('hidden', '');
              otherAnswer.parentElement?.classList.remove('open');
            }
          }
        });

        button.setAttribute('aria-expanded', expanded ? 'false' : 'true');
        if (answer) {
          if (expanded) {
            answer.setAttribute('hidden', '');
            answer.parentElement?.classList.remove('open');
          } else {
            answer.removeAttribute('hidden');
            answer.parentElement?.classList.add('open');
          }
        }
      });
    });
  }
});
