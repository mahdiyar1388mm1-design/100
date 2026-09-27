// Metriq Analytics — live-updating canvas line chart, animated bar list, ticking metrics, mobile nav
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const metrics = [
    { label: 'Active users', value: 4820, delta: '+3.1%' },
    { label: 'Sessions today', value: 18240, delta: '+7.4%' },
    { label: 'Conversion rate', value: '4.6%', delta: '+0.3pt' },
    { label: 'Avg. session', value: '5m 42s', delta: '+12s' },
  ];
  document.getElementById('metricRow').innerHTML = metrics.map((m) => `
    <div class="metric">
      <span>${m.label}</span>
      <strong>${typeof m.value === 'number' ? m.value.toLocaleString() : m.value}</strong>
      <p class="delta">${m.delta}</p>
    </div>`).join('');

  const events = [
    { name: 'Page View', value: 92 },
    { name: 'Sign Up', value: 61 },
    { name: 'Add to Cart', value: 47 },
    { name: 'Checkout', value: 28 },
  ];
  document.getElementById('barList').innerHTML = events.map((e) => `
    <div class="bar-row">
      <span>${e.name}</span>
      <div class="bar-track"><div class="bar-fill" style="width:${e.value}%"></div></div>
      <span class="bar-val">${e.value}%</span>
    </div>`).join('');

  const canvas = document.getElementById('liveChart');
  const ctx = canvas.getContext('2d');
  let data = Array.from({ length: 40 }, () => 40 + Math.random() * 40);

  function drawChart() {
    const w = canvas.width, h = canvas.height, pad = 16;
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = '#1a1f33';
    for (let i = 0; i <= 4; i++) {
      const y = pad + (i * (h - pad * 2)) / 4;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }
    const max = Math.max(...data), min = Math.min(...data);
    ctx.beginPath();
    ctx.strokeStyle = '#22d3ee';
    ctx.lineWidth = 2.5;
    data.forEach((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath();
    ctx.fillStyle = 'rgba(34,211,238,0.08)';
    ctx.fill();
  }
  drawChart();

  if (!reduceMotion) {
    setInterval(() => {
      data.shift();
      const last = data[data.length - 1];
      data.push(Math.max(20, Math.min(100, last + (Math.random() - 0.5) * 14)));
      drawChart();
    }, 900);
  }

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = 'Trial activated — your first dashboard is ready.';
    form.reset();
  });
})();
