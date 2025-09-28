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

  const reviewsSection = document.getElementById('reviews');
  if (reviewsSection) {
    const fallbackMessage =
      '⭐ Live Google reviews will appear here once approved.';

    const showFallback = () => {
      reviewsSection.innerHTML = '';
      const placeholder = document.createElement('p');
      placeholder.className = 'reviews-placeholder';
      placeholder.textContent = fallbackMessage;
      reviewsSection.appendChild(placeholder);
    };

    const cards = document.createElement('div');
    cards.className = 'reviews-list';

    fetch('/api/reviews')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load reviews');
        }
        return response.json();
      })
      .then((data) => {
        const reviews = Array.isArray(data) ? data.slice(0, 5) : [];

        const ratingMap = {
          ONE: 1,
          TWO: 2,
          THREE: 3,
          FOUR: 4,
          FIVE: 5,
        };

        if (!reviews.length) {
          showFallback();
          return;
        }

        reviews.forEach((review) => {
          const card = document.createElement('article');
          card.className = 'review-card';

          const author =
            review?.reviewer?.displayName ||
            review?.authorName ||
            'Anonymous';
          const starRating = ratingMap[review?.starRating] || review?.rating || 0;
          const commentValue =
            typeof review?.comment === 'string'
              ? review.comment
              : review?.comment?.comment ||
                review?.text ||
                review?.reviewComment ||
                '';

          const authorEl = document.createElement('strong');
          authorEl.className = 'review-author';
          authorEl.textContent = author;

          const starsEl = document.createElement('div');
          starsEl.className = 'review-stars';
          const starCount = Math.max(0, Math.min(5, Math.round(starRating)));
          starsEl.setAttribute('aria-label', `${starCount} star review`);
          starsEl.textContent = '★'.repeat(starCount).padEnd(5, '☆');

          const textEl = document.createElement('p');
          textEl.className = 'review-text';
          textEl.textContent = commentValue || 'No additional comments.';

          card.appendChild(authorEl);
          card.appendChild(starsEl);
          card.appendChild(textEl);
          cards.appendChild(card);
        });

        reviewsSection.innerHTML = '';
        reviewsSection.appendChild(cards);
      })
      .catch((error) => {
        console.error(error);
        showFallback();
      });
  }
});
