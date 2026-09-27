// Echoes of Ardent — multi-layer scroll parallax, mobile nav, pre-order/notify forms
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hero = document.getElementById('parallaxHero');
  const sky = document.querySelector('.p-sky');
  const mountains = document.querySelector('.p-mountains');
  const fore = document.querySelector('.p-fore');

  if (!reduceMotion && hero) {
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const progress = Math.min(Math.max(-rect.top / (rect.height || 1), 0), 1.4);
        sky.style.transform = `translateY(${progress * 40}px)`;
        mountains.style.transform = `translateY(${progress * 90}px)`;
        fore.style.transform = `translateY(${progress * 160}px)`;
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  document.querySelectorAll('.edition-card .btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.textContent = 'Reserved ✓';
      btn.disabled = true;
    });
  });

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = "You'll be notified the moment Echoes of Ardent launches.";
    form.reset();
  });
})();
