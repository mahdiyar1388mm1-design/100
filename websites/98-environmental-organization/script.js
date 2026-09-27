// Terra Guard — canvas progress ring + animated bar chart, animated stat counters, mobile nav
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  function drawRing(pct) {
    const canvas = document.getElementById('ringCanvas');
    const ctx = canvas.getContext('2d');
    const cx = canvas.width / 2, cy = canvas.height / 2, r = 75;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.lineWidth = 18;
    ctx.strokeStyle = '#e0d9c4';
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + pct * Math.PI * 2);
    ctx.strokeStyle = '#3f7d3a';
    ctx.lineWidth = 18;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.fillStyle = '#1e2b1a';
    ctx.font = 'bold 28px Archivo, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${Math.round(pct * 100)}%`, cx, cy + 10);
  }
  let ringCurrent = 0;
  const ringTarget = 0.74;
  const ringTimer = setInterval(() => {
    ringCurrent += 0.015;
    if (ringCurrent >= ringTarget) { ringCurrent = ringTarget; clearInterval(ringTimer); }
    drawRing(ringCurrent);
  }, 20);

  function drawBars() {
    const canvas = document.getElementById('barCanvas');
    const ctx = canvas.getContext('2d');
    const data = [
      { year: '2021', value: 40000 },
      { year: '2022', value: 68000 },
      { year: '2023', value: 92000 },
      { year: '2024', value: 130000 },
      { year: '2025', value: 175000 },
      { year: '2026', value: 210000 },
    ];
    const w = canvas.width, h = canvas.height, pad = 30;
    const max = Math.max(...data.map((d) => d.value));
    const barWidth = (w - pad * 2) / data.length - 12;
    ctx.clearRect(0, 0, w, h);
    ctx.font = '11px Archivo, sans-serif';
    ctx.textAlign = 'center';
    data.forEach((d, i) => {
      const barHeight = ((d.value / max) * (h - pad * 2));
      const x = pad + i * ((w - pad * 2) / data.length) + 6;
      const y = h - pad - barHeight;
      ctx.fillStyle = '#3f7d3a';
      ctx.fillRect(x, y, barWidth, barHeight);
      ctx.fillStyle = '#1e2b1a';
      ctx.fillText(d.year, x + barWidth / 2, h - pad + 16);
    });
  }
  drawBars();

  function animateCount(el, target) {
    const duration = 1400;
    const start = performance.now();
    function step(now) {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(target * p).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(step);
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(document.getElementById('stat1'), 2400000);
        animateCount(document.getElementById('stat2'), 890000);
        animateCount(document.getElementById('stat3'), 640);
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });
  observer.observe(document.querySelector('.stat-strip'));

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = "You're in — welcome to the Terra Guard movement.";
    form.reset();
  });
})();
