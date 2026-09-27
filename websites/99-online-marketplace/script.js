// Marketly — category filter + listing grid render, search, mobile nav, form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const categories = ['All', 'Electronics', 'Home', 'Fashion', 'Vehicles', 'Furniture', 'Sports'];
  document.getElementById('catRow').innerHTML = categories.map((c, i) =>
    `<button class="cat-chip${i === 0 ? ' active' : ''}" data-cat="${c}">${c}</button>`
  ).join('');

  const listings = [
    { title: 'Mirrorless Camera, barely used', price: '$420', cat: 'Electronics', location: 'Amsterdam', seed: 'mk-1' },
    { title: 'Mid-century accent chair', price: '$180', cat: 'Furniture', location: 'Utrecht', seed: 'mk-2' },
    { title: "Men's leather jacket, size M", price: '$95', cat: 'Fashion', location: 'Rotterdam', seed: 'mk-3' },
    { title: 'Mountain bike, 21-speed', price: '$260', cat: 'Sports', location: 'The Hague', seed: 'mk-4' },
    { title: 'Ceramic dinnerware set (12pc)', price: '$65', cat: 'Home', location: 'Amsterdam', seed: 'mk-5' },
    { title: '2019 hatchback, low mileage', price: '$11,200', cat: 'Vehicles', location: 'Eindhoven', seed: 'mk-6' },
    { title: 'Noise-cancelling headphones', price: '$140', cat: 'Electronics', location: 'Groningen', seed: 'mk-7' },
    { title: 'Standing desk, electric', price: '$210', cat: 'Furniture', location: 'Amsterdam', seed: 'mk-8' },
  ];

  const grid = document.getElementById('listingGrid');
  function render(cat, query) {
    let list = cat === 'All' ? listings : listings.filter((l) => l.cat === cat);
    if (query) list = list.filter((l) => l.title.toLowerCase().includes(query.toLowerCase()));
    document.getElementById('resultCount').textContent = `${list.length} listing${list.length === 1 ? '' : 's'}`;
    grid.innerHTML = list.map((l) => `
      <article class="listing-card">
        <img src="https://picsum.photos/seed/${l.seed}/300/300" alt="${l.title}" loading="lazy">
        <div class="listing-body">
          <p class="listing-price">${l.price}</p>
          <p class="listing-title">${l.title}</p>
          <div class="listing-meta"><span>${l.cat}</span><span>${l.location}</span></div>
        </div>
      </article>`).join('') || '<p>No listings match your search.</p>';
  }
  render('All', '');

  document.querySelectorAll('.cat-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.cat-chip').forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      render(chip.dataset.cat, document.getElementById('searchInput').value);
    });
  });

  document.getElementById('searchInput').addEventListener('input', (e) => {
    const activeCat = document.querySelector('.cat-chip.active').dataset.cat;
    render(activeCat, e.target.value);
  });

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = 'Your listing is live! Buyers can now message you directly.';
    form.reset();
  });
})();
