// Explora — mobile nav, filters, save/wishlist
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const places = [
    { name: 'Bali, Indonesia', continent: 'asia', interest: 'beach', seed: 'ex-bali' },
    { name: 'Kyoto, Japan', continent: 'asia', interest: 'culture', seed: 'ex-kyoto' },
    { name: 'Santorini, Greece', continent: 'europe', interest: 'beach', seed: 'ex-santorini' },
    { name: 'Prague, Czechia', continent: 'europe', interest: 'culture', seed: 'ex-prague' },
    { name: 'Marrakech, Morocco', continent: 'africa', interest: 'culture', seed: 'ex-marrakech' },
    { name: 'Serengeti, Tanzania', continent: 'africa', interest: 'adventure', seed: 'ex-serengeti' },
    { name: 'Patagonia, Argentina', continent: 'americas', interest: 'adventure', seed: 'ex-patagonia' },
    { name: 'Tulum, Mexico', continent: 'americas', interest: 'beach', seed: 'ex-tulum' },
    { name: 'Queenstown, New Zealand', continent: 'americas', interest: 'adventure', seed: 'ex-queenstown' },
    { name: 'Lisbon, Portugal', continent: 'europe', interest: 'culture', seed: 'ex-lisbon' },
    { name: 'Ha Long Bay, Vietnam', continent: 'asia', interest: 'adventure', seed: 'ex-halong' },
    { name: 'Cape Town, South Africa', continent: 'africa', interest: 'beach', seed: 'ex-capetown' },
  ];

  const saved = new Set(JSON.parse(localStorage.getItem('explora-saved') || '[]'));
  let continentFilter = 'all', interestFilter = 'all';

  function cardHTML(p) {
    const isSaved = saved.has(p.name);
    return `<article class="place-card" data-name="${p.name}">
      <img src="https://picsum.photos/seed/${p.seed}/500/620" alt="${p.name}" loading="lazy">
      <button class="heart-btn${isSaved ? ' saved' : ''}" aria-label="Save ${p.name}" data-name="${p.name}">${isSaved ? '♥' : '♡'}</button>
      <div class="place-info"><h3>${p.name}</h3><span>${p.interest[0].toUpperCase() + p.interest.slice(1)}</span></div>
    </article>`;
  }

  function renderGrid() {
    const filtered = places.filter((p) => (continentFilter === 'all' || p.continent === continentFilter) && (interestFilter === 'all' || p.interest === interestFilter));
    document.getElementById('placeGrid').innerHTML = filtered.map(cardHTML).join('') || '<p>No destinations match those filters yet.</p>';
    document.getElementById('resultCount').textContent = `${filtered.length} destinations`;
    attachHeartHandlers();
    renderSaved();
  }

  function renderSaved() {
    const savedPlaces = places.filter((p) => saved.has(p.name));
    document.getElementById('savedGrid').innerHTML = savedPlaces.map(cardHTML).join('');
    document.getElementById('emptyNote').classList.toggle('hidden', savedPlaces.length > 0);
    attachHeartHandlers();
  }

  function attachHeartHandlers() {
    document.querySelectorAll('.heart-btn').forEach((btn) => {
      btn.onclick = () => {
        const name = btn.dataset.name;
        if (saved.has(name)) saved.delete(name); else saved.add(name);
        localStorage.setItem('explora-saved', JSON.stringify(Array.from(saved)));
        renderGrid();
      };
    });
  }

  document.querySelectorAll('#continentFilters .filter-chip').forEach((chip) => chip.addEventListener('click', () => {
    document.querySelectorAll('#continentFilters .filter-chip').forEach((c) => c.classList.remove('active'));
    chip.classList.add('active');
    continentFilter = chip.dataset.continent;
    renderGrid();
  }));
  document.querySelectorAll('#interestFilters .filter-chip').forEach((chip) => chip.addEventListener('click', () => {
    document.querySelectorAll('#interestFilters .filter-chip').forEach((c) => c.classList.remove('active'));
    chip.classList.add('active');
    interestFilter = chip.dataset.interest;
    renderGrid();
  }));

  renderGrid();
})();
