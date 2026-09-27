// Pinnacle Estates — mobile nav, 3D tilt cards, inquiry form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.tilt-card').forEach((card) => {
      const inner = card.querySelector('.tilt-inner');
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        inner.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
      });
      card.addEventListener('mouseleave', () => { inner.style.transform = 'rotateY(0) rotateX(0) scale(1)'; });
    });
  }

  const form = document.getElementById('inquireForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('inquireNote').textContent = 'Received — a Pinnacle advisor will reach out within one business day.';
    form.reset();
  });
})();
