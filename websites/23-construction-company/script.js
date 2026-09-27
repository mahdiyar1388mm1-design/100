// Ironclad Build — mobile nav, quote form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const form = document.getElementById('quoteForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('quoteNote').textContent = 'Request received — a project estimator will call within one business day.';
    form.reset();
  });
})();
