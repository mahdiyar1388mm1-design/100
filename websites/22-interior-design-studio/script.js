// Atelier Lune — mobile nav, before/after slider, consultation form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const wrap = document.getElementById('beforeWrap');
  const range = document.getElementById('compareRange');
  range.addEventListener('input', () => { wrap.style.width = range.value + '%'; });

  const form = document.getElementById('consultForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('consultNote').textContent = 'Thank you — Atelier Lune will respond within three business days.';
    form.reset();
  });
})();
