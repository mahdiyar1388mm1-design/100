// SwiftBite — mobile nav, cuisine filter, order tracker simulation
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const restaurants = [
    { name: 'Golden Slice Pizza', cuisine: 'pizza', rating: '4.8', time: '20-30 min', img: 'sb-r1' },
    { name: 'Umi Sushi Bar', cuisine: 'sushi', rating: '4.9', time: '25-35 min', img: 'sb-r2' },
    { name: 'Patty House Burgers', cuisine: 'burgers', rating: '4.6', time: '15-25 min', img: 'sb-r3' },
    { name: 'Green Bowl Salads', cuisine: 'salads', rating: '4.7', time: '15-20 min', img: 'sb-r4' },
    { name: 'Bangkok Street Thai', cuisine: 'thai', rating: '4.8', time: '25-30 min', img: 'sb-r5' },
    { name: 'Napoli Pizza Co.', cuisine: 'pizza', rating: '4.5', time: '20-25 min', img: 'sb-r6' },
    { name: 'Sakura Sushi Express', cuisine: 'sushi', rating: '4.6', time: '20-30 min', img: 'sb-r7' },
    { name: 'Smash Burger Lab', cuisine: 'burgers', rating: '4.9', time: '15-20 min', img: 'sb-r8' },
  ];
  const grid = document.getElementById('restaurantGrid');
  function renderGrid(filter) {
    grid.innerHTML = restaurants
      .filter((r) => filter === 'all' || r.cuisine === filter)
      .map((r) => `
        <article class="r-card">
          <img src="https://picsum.photos/seed/${r.img}/400/300" alt="${r.name} storefront" loading="lazy">
          <div class="info">
            <h3>${r.name}</h3>
            <div class="meta"><span class="rating">★ ${r.rating}</span><span>${r.time}</span></div>
          </div>
        </article>`)
      .join('');
  }
  renderGrid('all');
  document.querySelectorAll('.chip').forEach((chip) => chip.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach((c) => c.classList.remove('active'));
    chip.classList.add('active');
    renderGrid(chip.dataset.cuisine);
  }));

  document.getElementById('findFoodBtn').addEventListener('click', () => {
    document.getElementById('search').scrollIntoView({ behavior: 'smooth' });
  });

  // Order tracker simulation
  const steps = document.querySelectorAll('.step');
  const fill = document.getElementById('trackFill');
  let current = -1;
  let interval;
  document.getElementById('simulateBtn').addEventListener('click', () => {
    clearInterval(interval);
    current = -1;
    steps.forEach((s) => s.classList.remove('done'));
    fill.style.height = '0%';
    interval = setInterval(() => {
      current++;
      if (current >= steps.length) { clearInterval(interval); return; }
      steps[current].classList.add('done');
      fill.style.height = `${(current / (steps.length - 1)) * 100}%`;
    }, 900);
  });
})();
