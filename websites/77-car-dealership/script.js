// Velocity Motors — inventory filter grid, financing calculator, mobile nav, form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const cars = [
    { name: 'Velocity GT Sedan', price: '$34,900', type: 'sedan', tags: ['2024', 'Gasoline', 'Auto'], seed: 'v-sedan-1' },
    { name: 'Ranger X SUV', price: '$41,500', type: 'suv', tags: ['2024', 'AWD', 'Auto'], seed: 'v-suv-1' },
    { name: 'Volt EV Hatch', price: '$38,200', type: 'electric', tags: ['2025', 'Electric', '310mi'], seed: 'v-ev-1' },
    { name: 'Apex Coupe', price: '$46,750', type: 'sedan', tags: ['2023', 'Gasoline', 'Manual'], seed: 'v-sedan-2' },
    { name: 'Terra 7 SUV', price: '$52,300', type: 'suv', tags: ['2024', '7-Seat', 'Auto'], seed: 'v-suv-2' },
    { name: 'Current EV Sedan', price: '$44,000', type: 'electric', tags: ['2025', 'Electric', '340mi'], seed: 'v-ev-2' },
  ];

  const grid = document.getElementById('carGrid');
  function renderCars(filter) {
    const list = filter === 'all' ? cars : cars.filter((c) => c.type === filter);
    grid.innerHTML = list.map((c) => `
      <article class="car-card">
        <img src="https://picsum.photos/seed/${c.seed}/500/375" alt="${c.name}" loading="lazy">
        <div class="car-body">
          <h3>${c.name}</h3>
          <p class="car-price">${c.price}</p>
          <div class="car-tags">${c.tags.map((t) => `<span>${t}</span>`).join('')}</div>
        </div>
      </article>`).join('');
  }
  renderCars('all');

  document.querySelectorAll('.chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      renderCars(chip.dataset.filter);
    });
  });

  const priceSlider = document.getElementById('priceSlider');
  const downSlider = document.getElementById('downSlider');
  const termSlider = document.getElementById('termSlider');
  function calc() {
    const price = Number(priceSlider.value);
    const down = Number(downSlider.value);
    const term = Number(termSlider.value);
    document.getElementById('priceOut').textContent = price.toLocaleString();
    document.getElementById('downOut').textContent = down.toLocaleString();
    document.getElementById('termOut').textContent = term;
    const principal = Math.max(price - down, 0);
    const monthlyRate = 0.065 / 12;
    const payment = principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -term));
    document.getElementById('paymentOut').textContent = `$${Math.round(payment).toLocaleString()}`;
  }
  [priceSlider, downSlider, termSlider].forEach((s) => s.addEventListener('input', calc));
  calc();

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = 'Thanks! A Velocity appraiser will email your trade-in estimate shortly.';
    form.reset();
  });
})();
