// Artifact — countdown timer, NFT grid filter, creators row, mobile nav, notify form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  // Countdown
  let totalSeconds = 5 * 3600 + 42 * 60 + 18;
  const countdownEl = document.getElementById('countdown');
  setInterval(() => {
    if (totalSeconds <= 0) return;
    totalSeconds--;
    const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const s = String(totalSeconds % 60).padStart(2, '0');
    countdownEl.textContent = `${h}:${m}:${s}`;
  }, 1000);

  const nfts = [
    { title: 'Chromatic Drift #12', creator: 'Nova Vega', price: '2.4 ETH', category: 'art', seed: 'nft1' },
    { title: 'Silent Frame', creator: 'Kai Marsh', price: '1.1 ETH', category: 'photo', seed: 'nft2' },
    { title: 'Polyhedra Study 04', creator: 'Rin Okabe', price: '3.8 ETH', category: '3d', seed: 'nft3' },
    { title: 'Neon Bloom', creator: 'Nova Vega', price: '0.9 ETH', category: 'art', seed: 'nft4' },
    { title: 'Vantage Point', creator: 'Kai Marsh', price: '1.6 ETH', category: 'photo', seed: 'nft5' },
    { title: 'Fractal Garden', creator: 'Rin Okabe', price: '4.2 ETH', category: '3d', seed: 'nft6' },
    { title: 'Static Bloom', creator: 'Ada Osei', price: '2.0 ETH', category: 'art', seed: 'nft7' },
    { title: 'Reflections No. 9', creator: 'Ada Osei', price: '1.4 ETH', category: 'photo', seed: 'nft8' },
  ];

  const grid = document.getElementById('nftGrid');
  grid.innerHTML = nfts.map((n) => `
    <article class="nft-card" data-category="${n.category}">
      <img src="https://picsum.photos/seed/${n.seed}/400/400" alt="${n.title} digital art by ${n.creator}" loading="lazy">
      <div class="nft-body">
        <h3>${n.title}</h3>
        <div class="nft-foot"><span>${n.creator}</span><span class="nft-price">${n.price}</span></div>
      </div>
    </article>`).join('');

  const chips = document.querySelectorAll('.chip');
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      const filter = chip.dataset.filter;
      document.querySelectorAll('.nft-card').forEach((card) => {
        card.hidden = filter !== 'all' && card.dataset.category !== filter;
      });
    });
  });

  const creators = [
    { name: 'Nova Vega', seed: 'creator1' },
    { name: 'Kai Marsh', seed: 'creator2' },
    { name: 'Rin Okabe', seed: 'creator3' },
    { name: 'Ada Osei', seed: 'creator4' },
  ];
  document.getElementById('creatorRow').innerHTML = creators.map((c) => `
    <div class="creator-card">
      <img src="https://picsum.photos/seed/${c.seed}/160/160" alt="Portrait of digital artist ${c.name}" loading="lazy">
      <span>${c.name}</span>
    </div>`).join('');

  document.getElementById('connectBtn').addEventListener('click', () => {
    const btn = document.getElementById('connectBtn');
    btn.textContent = btn.textContent === 'Connect Wallet' ? 'Wallet Connected ✓' : 'Connect Wallet';
  });

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = "You'll be notified about the next drop.";
    form.reset();
  });
})();
