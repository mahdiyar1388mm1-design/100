// Coinforge — ticker, candlestick chart, market table, mobile nav, forms
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const assets = [
    { name: 'Bitcoin (BTC)', price: 67240.18, change: 2.4, cap: '$1.32T' },
    { name: 'Ethereum (ETH)', price: 3488.52, change: -1.1, cap: '$419B' },
    { name: 'Solana (SOL)', price: 178.90, change: 5.8, cap: '$82B' },
    { name: 'Cardano (ADA)', price: 0.64, change: -0.6, cap: '$22B' },
    { name: 'Polygon (MATIC)', price: 0.91, change: 3.2, cap: '$9B' },
  ];

  const ticker = document.getElementById('ticker');
  const tickerRow = assets.map((a) => `<span class="${a.change >= 0 ? 'up' : 'down'}">${a.name.split(' ')[0]} $${a.price.toLocaleString()} (${a.change >= 0 ? '+' : ''}${a.change}%)</span>`).join('');
  ticker.innerHTML = tickerRow + tickerRow;

  const marketBody = document.getElementById('marketBody');
  marketBody.innerHTML = assets.map((a) => `
    <tr>
      <td>${a.name}</td>
      <td>$${a.price.toLocaleString()}</td>
      <td class="${a.change >= 0 ? 'up' : 'down'}">${a.change >= 0 ? '+' : ''}${a.change}%</td>
      <td>${a.cap}</td>
    </tr>`).join('');

  // Deterministic candlestick chart
  const chart = document.getElementById('candleChart');
  let seed = 7;
  function rand() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
  const svgns = 'http://www.w3.org/2000/svg';
  let price = 60;
  for (let i = 0; i < 24; i++) {
    const open = price;
    const close = open + (rand() - 0.45) * 8;
    const high = Math.max(open, close) + rand() * 3;
    const low = Math.min(open, close) - rand() * 3;
    price = close;
    const x = 6 + i * 12.3;
    const scale = (v) => 110 - v;
    const wick = document.createElementNS(svgns, 'line');
    wick.setAttribute('x1', x); wick.setAttribute('x2', x);
    wick.setAttribute('y1', scale(high)); wick.setAttribute('y2', scale(low));
    wick.setAttribute('stroke', close >= open ? '#00f0a0' : '#ff4d6d');
    wick.setAttribute('stroke-width', '1');
    chart.appendChild(wick);
    const body = document.createElementNS(svgns, 'rect');
    body.setAttribute('x', x - 3);
    body.setAttribute('y', scale(Math.max(open, close)));
    body.setAttribute('width', 6);
    body.setAttribute('height', Math.max(1, Math.abs(scale(open) - scale(close))));
    body.setAttribute('fill', close >= open ? '#00f0a0' : '#ff4d6d');
    chart.appendChild(body);
  }

  document.getElementById('walletBtn').addEventListener('click', () => {
    const btn = document.getElementById('walletBtn');
    btn.textContent = btn.textContent === 'Connect Wallet' ? 'Wallet Connected ✓' : 'Connect Wallet';
  });
  document.getElementById('createAccountBtn').addEventListener('click', () => {
    document.getElementById('security').scrollIntoView({ behavior: 'smooth' });
  });

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = "Account created — verify your email to start trading.";
    form.reset();
  });
})();
