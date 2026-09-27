// Azure Cove Resort — parallax scroll layers (rAF-throttled), header state, mobile nav, form
(function () {
  const header = document.getElementById('header');
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const layers = document.querySelectorAll('.layer');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let ticking = false;

  function updateParallax() {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 40);
    if (!reduceMotion) {
      layers.forEach((layer) => {
        const speed = parseFloat(layer.dataset.speed);
        layer.style.transform = `translate3d(0, ${y * speed * 0.3}px, 0)`;
      });
    }
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
  updateParallax();

  const form = document.getElementById('reserveForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('reserveNote').textContent = 'Availability request sent — our reservations team will reply within 12 hours.';
    form.reset();
  });
})();
