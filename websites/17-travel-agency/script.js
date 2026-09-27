// Wanderlust Co. — mobile nav, destination search, trip cost calculator
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  document.getElementById('destSearchBtn').addEventListener('click', () => {
    const q = document.getElementById('destSearch').value.trim().toLowerCase();
    const cards = document.querySelectorAll('.dest-card');
    let matched = null;
    cards.forEach((c) => { if (c.dataset.name.toLowerCase().includes(q)) matched = c; });
    document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' });
    if (matched) { matched.style.outline = '3px solid #ff6f5e'; setTimeout(() => (matched.style.outline = ''), 1600); }
  });

  const dest = document.getElementById('calcDest');
  const travelers = document.getElementById('calcTravelers');
  const tier = document.getElementById('calcTier');
  const total = document.getElementById('calcTotal');
  function recalc() {
    const base = Number(dest.value);
    const n = Math.max(1, Number(travelers.value) || 1);
    const multiplier = Number(tier.value);
    const sum = Math.round(base * n * multiplier);
    total.textContent = `$${sum.toLocaleString()}`;
  }
  [dest, travelers, tier].forEach((el) => el.addEventListener('input', recalc));
  recalc();
})();
