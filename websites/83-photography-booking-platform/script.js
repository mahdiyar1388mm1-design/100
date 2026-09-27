// Shuttr — filterable photographer marketplace grid, mobile nav, form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const photographers = [
    { name: 'Maren Holt Photography', style: 'wedding', price: 950, rating: 4.9, seed: 'sh-p1' },
    { name: 'Cole Iverson Studio', style: 'portrait', price: 280, rating: 4.8, seed: 'sh-p2' },
    { name: 'Bright Lane Events', style: 'event', price: 620, rating: 4.7, seed: 'sh-p3' },
    { name: 'Nova Product Shots', style: 'product', price: 340, rating: 5.0, seed: 'sh-p4' },
    { name: 'Willow & Vine Weddings', style: 'wedding', price: 1100, rating: 4.9, seed: 'sh-p5' },
    { name: 'Ezra Cole Portraits', style: 'portrait', price: 220, rating: 4.6, seed: 'sh-p6' },
  ];

  const checkboxes = Array.from(document.querySelectorAll('.filters input[type=checkbox]'));
  const priceRange = document.getElementById('priceRange');
  const grid = document.getElementById('resultsGrid');

  function render() {
    const activeStyles = checkboxes.filter((c) => c.checked).map((c) => c.value);
    const maxPrice = Number(priceRange.value);
    document.getElementById('priceOut').textContent = maxPrice;
    const list = photographers.filter((p) => activeStyles.includes(p.style) && p.price <= maxPrice);
    document.getElementById('resultCount').textContent = `${list.length} photographer${list.length === 1 ? '' : 's'} found`;
    grid.innerHTML = list.map((p) => `
      <article class="pcard">
        <img src="https://picsum.photos/seed/${p.seed}/400/300" alt="Sample photography by ${p.name}" loading="lazy">
        <div class="pcard-body">
          <h3>${p.name}</h3>
          <div class="pcard-meta"><span>★ ${p.rating}</span><span>${p.style}</span></div>
          <p class="pcard-price">From $${p.price}</p>
        </div>
      </article>`).join('') || '<p>No photographers match these filters.</p>';
  }

  checkboxes.forEach((c) => c.addEventListener('change', render));
  priceRange.addEventListener('input', render);
  render();

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = "Application received — we'll review your portfolio within 3 days.";
    form.reset();
  });
})();
