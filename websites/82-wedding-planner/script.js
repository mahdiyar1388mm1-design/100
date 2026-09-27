// Ivory & Oak Weddings — gallery render, mobile nav, inquiry form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const seeds = ['io-g1', 'io-g2', 'io-g3', 'io-g4', 'io-g5', 'io-g6', 'io-g7', 'io-g8'];
  document.getElementById('galleryGrid').innerHTML = seeds.map((s, i) =>
    `<img src="https://picsum.photos/seed/${s}/300/300" alt="Wedding celebration moment ${i + 1}" loading="lazy">`
  ).join('');

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = "Thank you! We'll check our calendar and reply within 48 hours.";
    form.reset();
  });
})();
