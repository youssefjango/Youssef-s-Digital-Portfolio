// games-animations.js (refined)
document.addEventListener('DOMContentLoaded', () => {
  const cards = Array.from(document.querySelectorAll('.game-card[data-game]'));
  if (!cards.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reveal on scroll (with fallback)
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25, rootMargin: '80px 0px' });

    cards.forEach((card, i) => {
      io.observe(card);
      card.style.setProperty('--stagger', `${i * 90}ms`);
    });
  } else {
    cards.forEach(card => card.classList.add('is-visible'));
  }

  // Tilt with rAF throttle
  if (!reduceMotion) {
    cards.forEach(card => {
      let ticking = false;
      let rx = 0, ry = 0;

      const onMove = (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        ry = (x - 0.5) * 14;
        rx = (0.5 - y) * 12;

        if (!ticking) {
          ticking = true;
          requestAnimationFrame(() => {
            card.style.transform = `translateY(0) scale(1.02) rotateX(${rx}deg) rotateY(${ry}deg)`;
            ticking = false;
          });
        }
      };

      const onLeave = () => { card.style.transform = ''; };

      card.addEventListener('pointermove', onMove, { passive: true });
      card.addEventListener('pointerleave', onLeave);
    });
  }
});