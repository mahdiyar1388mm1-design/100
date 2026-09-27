// Cognita AI — mobile nav, animated counters, model tabs, canvas particle network background
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  // Animated counters
  const counters = document.querySelectorAll('.metric-num');
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.target);
      const start = performance.now();
      const duration = 1200;
      function step(now) {
        const p = Math.min(1, (now - start) / duration);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      obs.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach((c) => io.observe(c));

  // Model tabs
  const modelData = {
    cognita: 'Cognita R1 is tuned specifically for enterprise reasoning tasks — citation-aware, fact-checked, and 30% faster than general-purpose models on structured workflows.',
    byo: 'Connect GPT, Claude, Gemini or an open-weight model of your choice. Cognita\'s orchestration layer works the same regardless of the underlying model.',
    hybrid: 'Route simple queries to smaller, cheaper models and complex reasoning chains to larger models automatically — cutting inference cost by up to 60%.',
  };
  const panel = document.getElementById('modelPanel');
  function renderPanel(key) { panel.textContent = modelData[key]; }
  renderPanel('cognita');
  document.querySelectorAll('.model-tab').forEach((tab) => tab.addEventListener('click', () => {
    document.querySelectorAll('.model-tab').forEach((t) => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    tab.classList.add('active'); tab.setAttribute('aria-selected', 'true');
    renderPanel(tab.dataset.model);
  }));

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = "Thanks — we'll follow up to schedule your demo within one business day.";
    form.reset();
  });

  // Canvas particle network (advanced visual, performant & degrades gracefully)
  const canvas = document.getElementById('networkCanvas');
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let width, height, particles;
  const isSmall = window.innerWidth < 700;
  const COUNT = reduceMotion ? 0 : (isSmall ? 34 : 70);

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }
  function initParticles() {
    particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }));
  }
  function draw() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
    });
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 140) {
          ctx.strokeStyle = `rgba(139,107,255,${0.18 * (1 - d / 140)})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    particles.forEach((p) => {
      ctx.fillStyle = 'rgba(63,214,224,0.7)';
      ctx.beginPath(); ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2); ctx.fill();
    });
    if (!document.hidden) requestAnimationFrame(draw);
  }

  if (canvas && !reduceMotion && COUNT > 0) {
    resize();
    initParticles();
    requestAnimationFrame(draw);
    window.addEventListener('resize', () => { resize(); initParticles(); });
    document.addEventListener('visibilitychange', () => { if (!document.hidden) requestAnimationFrame(draw); });
  }
})();
