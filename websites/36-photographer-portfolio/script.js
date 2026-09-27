// Mara Voss — mobile nav, lightbox gallery, contact form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const items = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  let current = 0;
  function open(idx) {
    current = idx;
    const img = items[current].querySelector('img');
    lbImg.src = img.src.replace(/\/\d+\/\d+$/, '/1400/1000');
    lbImg.alt = img.alt;
    lightbox.hidden = false;
  }
  items.forEach((btn, idx) => btn.addEventListener('click', () => open(idx)));
  document.getElementById('lbClose').addEventListener('click', () => (lightbox.hidden = true));
  document.getElementById('lbNext').addEventListener('click', () => open((current + 1) % items.length));
  document.getElementById('lbPrev').addEventListener('click', () => open((current - 1 + items.length) % items.length));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.hidden = true; });
  document.addEventListener('keydown', (e) => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') lightbox.hidden = true;
    if (e.key === 'ArrowRight') open((current + 1) % items.length);
    if (e.key === 'ArrowLeft') open((current - 1 + items.length) % items.length);
  });

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = "Thank you — I'll reply with availability within 2 days.";
    form.reset();
  });
})();
