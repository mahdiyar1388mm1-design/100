// Cornerstone Realty — mobile nav, listing filters, mortgage calculator
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const listings = [
    { name: '412 Birchwood Ave', type: 'house', price: 875000, meta: '4 bed · 3 bath · 2,400 sqft', seed: 're1' },
    { name: 'Unit 12B, The Meridian', type: 'condo', price: 540000, meta: '2 bed · 2 bath · 1,150 sqft', seed: 're2' },
    { name: '88 Cedar Court', type: 'townhome', price: 690000, meta: '3 bed · 2.5 bath · 1,800 sqft', seed: 're3' },
    { name: '215 Highland Drive', type: 'house', price: 1150000, meta: '5 bed · 4 bath · 3,100 sqft', seed: 're4' },
    { name: 'Unit 4, Riverside Lofts', type: 'condo', price: 460000, meta: '1 bed · 1 bath · 850 sqft', seed: 're5' },
    { name: '77 Willowbrook Lane', type: 'townhome', price: 725000, meta: '3 bed · 3 bath · 1,950 sqft', seed: 're6' },
  ];

  let maxPrice = 1200000, typeFilter = 'all';
  const grid = document.getElementById('listingGrid');
  function render() {
    const filtered = listings.filter((l) => l.price <= maxPrice && (typeFilter === 'all' || l.type === typeFilter));
    grid.innerHTML = filtered.map((l) => `
      <article class="listing-card">
        <img src="https://picsum.photos/seed/${l.seed}/500/380" alt="${l.name}, ${l.meta}" loading="lazy">
        <div class="listing-body">
          <h3>${l.name}</h3>
          <p class="price">$${l.price.toLocaleString()}</p>
          <p class="meta">${l.meta}</p>
        </div>
      </article>`).join('') || '<p>No listings under this budget yet — try increasing the range.</p>';
    document.getElementById('resultCount').textContent = `${filtered.length} listings match your filters`;
  }
  render();

  const priceRange = document.getElementById('priceRange');
  const priceOut = document.getElementById('priceOut');
  priceRange.addEventListener('input', () => {
    maxPrice = Number(priceRange.value);
    priceOut.textContent = `$${maxPrice.toLocaleString()}`;
    render();
  });
  document.querySelectorAll('.type-chips .chip').forEach((chip) => chip.addEventListener('click', () => {
    document.querySelectorAll('.type-chips .chip').forEach((c) => c.classList.remove('active'));
    chip.classList.add('active');
    typeFilter = chip.dataset.type;
    render();
  }));

  // Mortgage calculator
  const homePrice = document.getElementById('homePrice');
  const downPayment = document.getElementById('downPayment');
  const rate = document.getElementById('rate');
  const term = document.getElementById('term');
  const monthly = document.getElementById('monthlyPayment');
  function calcMortgage() {
    const price = Number(homePrice.value) || 0;
    const down = price * (Number(downPayment.value) / 100 || 0);
    const principal = price - down;
    const monthlyRate = (Number(rate.value) || 0) / 100 / 12;
    const n = Number(term.value) * 12;
    const payment = monthlyRate === 0 ? principal / n : (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
    monthly.textContent = `$${Math.round(payment).toLocaleString()}/mo`;
  }
  [homePrice, downPayment, rate, term].forEach((el) => el.addEventListener('input', calcMortgage));
  calcMortgage();
})();
