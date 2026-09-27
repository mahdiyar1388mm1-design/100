// Archiva — mobile nav, search form, borrow buttons, library card form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  document.getElementById('searchForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const q = document.getElementById('searchInput').value.trim();
    document.getElementById('searchInput').placeholder = q ? `Showing results for "${q}"` : 'Search titles, authors, subjects...';
    document.getElementById('searchInput').value = '';
  });

  document.querySelectorAll('.btn-outline').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.textContent = 'Borrowed ✓';
      btn.disabled = true;
    });
  });

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = "Your library card is ready — check your email to activate it.";
    form.reset();
  });
})();
