// games-animations.js
(function() {
  const cards = [...document.querySelectorAll('.game-card[data-game]')];

  // Intersection Observer for reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.25,
    rootMargin: '80px 0px'
  });

  cards.forEach((card, i) => {
    io.observe(card);
    // Stagger by transition delay
    card.style.transitionDelay = (i * 90) + 'ms';
  });

  // 3D tilt effect
  const tilt = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 14;
    const rotateX = (0.5 - y) * 12;
    card.style.transform = `translateY(0) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const reset = (e) => {
    e.currentTarget.style.transform = '';
  };

  cards.forEach(card => {
    card.addEventListener('pointermove', tilt);
    card.addEventListener('pointerleave', reset);
  });

})();