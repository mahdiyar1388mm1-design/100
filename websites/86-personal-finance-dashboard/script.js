// Budgetly — canvas donut chart + line chart data viz, animated counters, mobile nav, form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  function animateCount(el, target, prefix = '$') {
    const duration = 1200;
    const start = performance.now();
    function step(now) {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = `${prefix}${Math.round(target * p).toLocaleString()}`;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = `${prefix}${target.toLocaleString()}`;
    }
    requestAnimationFrame(step);
  }

  const categories = [
    { name: 'Housing', value: 1450, color: '#2563eb' },
    { name: 'Food', value: 620, color: '#16a34a' },
    { name: 'Transport', value: 310, color: '#f59e0b' },
    { name: 'Entertainment', value: 210, color: '#ec4899' },
    { name: 'Other', value: 180, color: '#94a3b8' },
  ];

  function drawDonut() {
    const canvas = document.getElementById('donutChart');
    const ctx = canvas.getContext('2d');
    const total = categories.reduce((s, c) => s + c.value, 0);
    const cx = canvas.width / 2, cy = canvas.height / 2, radius = 90, thickness = 28;
    let startAngle = -Math.PI / 2;
    categories.forEach((c) => {
      const angle = (c.value / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, startAngle, startAngle + angle);
      ctx.lineWidth = thickness;
      ctx.strokeStyle = c.color;
      ctx.stroke();
      startAngle += angle;
    });
    ctx.fillStyle = '#111827';
    ctx.font = 'bold 20px Manrope, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`$${total.toLocaleString()}`, cx, cy + 7);
  }
  drawDonut();

  document.getElementById('legendList').innerHTML = categories.map((c) =>
    `<li><span><span class="dot" style="background:${c.color}"></span>${c.name}</span><span>$${c.value}</span></li>`
  ).join('');

  function drawLine() {
    const canvas = document.getElementById('lineChart');
    const ctx = canvas.getContext('2d');
    const data = [2100, 2450, 1980, 2600, 2300, 2770];
    const w = canvas.width, h = canvas.height, pad = 20;
    const max = Math.max(...data), min = Math.min(...data);
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = '#e5e9f0';
    for (let i = 0; i <= 3; i++) {
      const y = pad + (i * (h - pad * 2)) / 3;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }
    ctx.beginPath();
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3;
    data.forEach((v, i) => {
      const x = pad + (i * (w - pad * 2)) / (data.length - 1);
      const y = h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.fillStyle = '#2563eb';
    data.forEach((v, i) => {
      const x = pad + (i * (w - pad * 2)) / (data.length - 1);
      const y = h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2);
      ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
    });
  }
  drawLine();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(document.getElementById('balanceOut'), 8420);
        document.getElementById('goalFill').style.width = '58%';
        document.getElementById('goalText').textContent = '$6,960 of $12,000';
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });
  observer.observe(document.querySelector('.dash-grid'));

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = 'Account created — connect your first bank account to get started.';
    form.reset();
  });
})();
