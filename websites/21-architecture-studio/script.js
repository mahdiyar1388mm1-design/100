// Studio Meridian — mobile nav, project selector, contact form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const projects = [
    { img: 'meridian0', desc: 'A residence organized around two enclosed courtyards, using board-formed concrete and shoji-inspired sliding screens to modulate light through the day.' },
    { img: 'meridian1', desc: 'A civic library wrapped in a perforated brick screen, designed to filter daylight into reading rooms without a single blind.' },
    { img: 'meridian2', desc: 'A Cotswold stone residence extended in blackened timber, blurring the line between the 200-year-old original and the new wing.' },
    { img: 'meridian3', desc: 'A folded timber roof pavilion for public gatherings, engineered to shed snow load without a single interior column.' },
  ];
  const rows = document.querySelectorAll('.work-row');
  const img = document.getElementById('workImg');
  const desc = document.getElementById('workDesc');
  rows.forEach((row) => row.addEventListener('click', () => {
    rows.forEach((r) => r.classList.remove('active'));
    row.classList.add('active');
    const p = projects[Number(row.dataset.project)];
    img.src = `https://picsum.photos/seed/${p.img}/900/1100`;
    desc.textContent = p.desc;
  }));

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = 'Thank you — we review every inquiry personally and reply within a week.';
    form.reset();
  });
})();
