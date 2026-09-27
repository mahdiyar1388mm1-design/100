// Aether One — scroll-linked reveal steps + parallax product image, mobile nav, form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const steps = document.querySelectorAll('.reveal-step');
  const img = document.getElementById('productImg');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        const idx = Array.from(steps).indexOf(entry.target);
        if (!reduceMotion) {
          img.style.transform = `scale(${1 + idx * 0.06}) rotate(${idx * 3}deg)`;
        }
      } else {
        entry.target.classList.remove('active');
      }
    });
  }, { threshold: 0.55 });
  steps.forEach((s) => observer.observe(s));

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = "You're on the list — we'll email you as we get closer to launch.";
    form.reset();
  });
})();
