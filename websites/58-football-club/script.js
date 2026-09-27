// United FC Athletic — scroll parallax hero, 3D crest tilt on hover, mobile nav, ticket form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const layerBack = document.querySelector('.layer-back');
  const hero = document.getElementById('parallaxHero');

  if (!reduceMotion && layerBack && hero) {
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const progress = -rect.top / (rect.height || 1);
        const offset = Math.max(-30, Math.min(30, progress * 60));
        layerBack.style.transform = `translateY(${offset}px) scale(1.08)`;
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  const crest = document.getElementById('crest');
  if (crest && !reduceMotion) {
    crest.addEventListener('mouseenter', () => { crest.style.transform = 'rotateY(360deg)'; });
    crest.addEventListener('mouseleave', () => { setTimeout(() => { crest.style.transform = 'rotateY(0deg)'; }, 300); });
  }

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = "Tickets reserved — confirmation sent to your email.";
    form.reset();
  });
})();
