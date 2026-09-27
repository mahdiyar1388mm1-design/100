// Surge Digital — mobile nav, animated stat counters, accordion, form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const counters = document.querySelectorAll('.r-num');
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.target);
      const start = performance.now();
      function step(now) {
        const p = Math.min(1, (now - start) / 1200);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      obs.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach((c) => io.observe(c));

  document.querySelectorAll('.acc-head').forEach((head) => {
    head.addEventListener('click', () => {
      const body = head.nextElementSibling;
      const isOpen = body.classList.contains('open');
      document.querySelectorAll('.acc-body').forEach((b) => b.classList.remove('open'));
      document.querySelectorAll('.acc-head').forEach((h) => h.classList.remove('active'));
      if (!isOpen) { body.classList.add('open'); head.classList.add('active'); }
    });
  });

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = "Thanks — your growth audit will land in your inbox within 48 hours.";
    form.reset();
  });
})();
