// Lumen Events — filterable portfolio grid, testimonial rotator, mobile nav, form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const projects = [
    { title: 'Nordholm Product Launch', cat: 'launch', seed: 'lumen-w1' },
    { title: 'Aurelia Foundation Gala', cat: 'gala', seed: 'lumen-w2' },
    { title: 'Finch & Co Annual Summit', cat: 'corporate', seed: 'lumen-w3' },
    { title: 'Verve Beauty Launch', cat: 'launch', seed: 'lumen-w4' },
    { title: 'Meridian Bank Gala', cat: 'gala', seed: 'lumen-w5' },
    { title: 'Halcyon Partners Retreat', cat: 'corporate', seed: 'lumen-w6' },
  ];
  const grid = document.getElementById('workGrid');
  function render(filter) {
    const list = filter === 'all' ? projects : projects.filter((p) => p.cat === filter);
    grid.innerHTML = list.map((p) => `
      <div class="work-card">
        <img src="https://picsum.photos/seed/${p.seed}/500/625" alt="${p.title} event photo" loading="lazy">
        <div class="work-cap"><strong>${p.title}</strong></div>
      </div>`).join('');
  }
  render('all');
  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      render(tab.dataset.cat);
    });
  });

  const quotes = [
    { text: '"Lumen turned our product launch into a story our guests are still talking about."', author: '— Head of Brand, Nordholm Group' },
    { text: '"Every detail, from the lighting to the flowers, felt considered and intentional."', author: '— Events Director, Aurelia Foundation' },
    { text: '"They ran our 400-guest gala without a single hiccup. Extraordinary team."', author: '— CEO, Meridian Bank' },
  ];
  let qi = 0;
  const dots = document.getElementById('quoteDots');
  dots.innerHTML = quotes.map((_, i) => `<button aria-label="Show testimonial ${i + 1}" class="${i === 0 ? 'active' : ''}"></button>`).join('');
  function showQuote(i) {
    qi = i;
    document.getElementById('quoteText').textContent = quotes[i].text;
    document.getElementById('quoteAuthor').textContent = quotes[i].author;
    dots.querySelectorAll('button').forEach((b, idx) => b.classList.toggle('active', idx === i));
  }
  dots.querySelectorAll('button').forEach((btn, i) => btn.addEventListener('click', () => showQuote(i)));
  setInterval(() => showQuote((qi + 1) % quotes.length), 6000);

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = 'Thank you — our team will reply within one business day.';
    form.reset();
  });
})();
