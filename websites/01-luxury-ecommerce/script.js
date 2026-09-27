// Maison Vela — interactions: mobile nav, product grid render/filter, quick-view modal, cart count, quote slider, newsletter form
(function () {
  const products = [
    { id: 1, name: 'Aveline Satchel', cat: 'bags', price: '$1,240', tag: 'Bestseller', img: 'https://picsum.photos/seed/vela1/700/860', desc: 'Structured full-grain satchel with hand-stitched saddle seams and antique brass hardware.' },
    { id: 2, name: 'Corso Weekender', cat: 'travel', price: '$1,680', tag: 'New', img: 'https://picsum.photos/seed/vela2/700/860', desc: 'A weekend companion cut from a single hide, lined in waxed cotton canvas.' },
    { id: 3, name: 'Fienne Card Holder', cat: 'leather', price: '$185', tag: '', img: 'https://picsum.photos/seed/vela3/700/860', desc: 'Slim six-card holder, hand-burnished edges, available in five hide colours.' },
    { id: 4, name: 'Belmonte Tote', cat: 'bags', price: '$980', tag: '', img: 'https://picsum.photos/seed/vela4/700/860', desc: 'An unlined open tote for daily carry, softening beautifully with age.' },
    { id: 5, name: 'Rive Passport Case', cat: 'travel', price: '$220', tag: '', img: 'https://picsum.photos/seed/vela5/700/860', desc: 'Passport case with hidden boarding-pass pocket and hand-stitched spine.' },
    { id: 6, name: 'Solene Wallet', cat: 'leather', price: '$260', tag: 'New', img: 'https://picsum.photos/seed/vela6/700/860', desc: 'Bifold wallet finished with a single continuous saddle-stitch seam.' },
  ];

  const grid = document.getElementById('productGrid');
  function renderGrid(filter) {
    grid.innerHTML = products
      .filter((p) => filter === 'all' || p.cat === filter)
      .map(
        (p) => `
        <button class="product-card" data-id="${p.id}" aria-haspopup="dialog">
          <div class="product-media">
            ${p.tag ? `<span class="tag">${p.tag}</span>` : ''}
            <img src="${p.img}" alt="${p.name}, Maison Vela ${p.cat}" loading="lazy">
          </div>
          <h3>${p.name}</h3>
          <p class="price">${p.price}</p>
        </button>`
      )
      .join('');
    grid.querySelectorAll('.product-card').forEach((btn) => btn.addEventListener('click', () => openModal(Number(btn.dataset.id))));
  }
  renderGrid('all');

  document.querySelectorAll('.filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach((b) => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('active'); btn.setAttribute('aria-selected', 'true');
      renderGrid(btn.dataset.filter);
    });
  });

  // Quick view modal
  const modal = document.getElementById('quickModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalPrice = document.getElementById('modalPrice');
  const modalCat = document.getElementById('modalCat');
  let cart = 0;
  const cartCount = document.getElementById('cartCount');
  const cartBtn = document.getElementById('cartBtn');

  function openModal(id) {
    const p = products.find((x) => x.id === id);
    if (!p) return;
    modalImg.src = p.img; modalImg.alt = p.name;
    modalTitle.textContent = p.name;
    modalDesc.textContent = p.desc;
    modalPrice.textContent = p.price;
    modalCat.textContent = p.cat === 'leather' ? 'Small Leather Goods' : p.cat.charAt(0).toUpperCase() + p.cat.slice(1);
    modal.hidden = false;
    document.getElementById('modalAdd').onclick = () => {
      cart += 1; cartCount.textContent = cart;
      cartBtn.setAttribute('aria-label', `View bag, ${cart} items`);
      modal.hidden = true;
    };
  }
  document.getElementById('modalClose').addEventListener('click', () => (modal.hidden = true));
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.hidden = true; });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') modal.hidden = true; });

  // Mobile nav
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  navToggle.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  mobileNav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => mobileNav.classList.remove('open')));

  // Quote slider
  const quotes = document.querySelectorAll('.quote');
  const dotsWrap = document.getElementById('quoteDots');
  quotes.forEach((_, i) => {
    const dot = document.createElement('button');
    if (i === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Show testimonial ${i + 1}`);
    dot.addEventListener('click', () => showQuote(i));
    dotsWrap.appendChild(dot);
  });
  let quoteIndex = 0;
  function showQuote(i) {
    quotes.forEach((q, idx) => q.classList.toggle('active', idx === i));
    dotsWrap.querySelectorAll('button').forEach((d, idx) => d.classList.toggle('active', idx === i));
    quoteIndex = i;
  }
  setInterval(() => showQuote((quoteIndex + 1) % quotes.length), 5000);

  // Newsletter form
  const form = document.getElementById('newsletterForm');
  const note = document.getElementById('formNote');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.email.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    note.textContent = valid ? 'Thank you — check your inbox to confirm.' : 'Please enter a valid email address.';
    if (valid) form.reset();
  });

  // Search stub
  document.getElementById('searchBtn').addEventListener('click', () => {
    const q = prompt('Search Maison Vela');
    if (q) alert(`Searching for "${q}" — demo only.`);
  });
})();
