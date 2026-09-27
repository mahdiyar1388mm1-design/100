// Skyframe Cloud — mobile nav, region latency panel, usage pricing calculator
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const regions = {
    us: { name: 'North America', latency: 14 },
    eu: { name: 'Europe', latency: 18 },
    apac: { name: 'Asia Pacific', latency: 22 },
    sa: { name: 'South America', latency: 27 },
  };
  const fill = document.getElementById('latencyFill');
  const value = document.getElementById('latencyValue');
  const name = document.getElementById('regionName');
  function renderRegion(key) {
    const r = regions[key];
    name.textContent = r.name;
    value.textContent = r.latency;
    fill.style.width = `${100 - r.latency * 2}%`;
  }
  renderRegion('us');
  document.querySelectorAll('.region-item').forEach((btn) => btn.addEventListener('click', () => {
    document.querySelectorAll('.region-item').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    renderRegion(btn.dataset.region);
  }));

  const compute = document.getElementById('compute');
  const storage = document.getElementById('storage');
  const total = document.getElementById('cloudTotal');
  function recalc() {
    document.getElementById('computeOut').textContent = `${Number(compute.value).toLocaleString()} hrs`;
    document.getElementById('storageOut').textContent = `${storage.value} TB`;
    const cost = Number(compute.value) * 0.045 + Number(storage.value) * 18;
    total.textContent = `$${Math.round(cost).toLocaleString()}`;
  }
  [compute, storage].forEach((el) => el.addEventListener('input', recalc));
  recalc();
})();
