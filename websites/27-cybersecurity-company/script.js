// Sentinel Shield — mobile nav, animated counters, terminal log typing effect, form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const counters = document.querySelectorAll('.num');
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.target);
      const start = performance.now();
      function step(now) {
        const p = Math.min(1, (now - start) / 1200);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      obs.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach((c) => io.observe(c));

  // Terminal log simulation
  const logLines = [
    '[09:14:02] Anomaly detected: unusual outbound traffic — host WKS-2291',
    '[09:14:03] Correlating with threat intel feed...',
    '[09:14:05] Match found: known C2 domain, confidence 97%',
    '[09:14:06] Auto-isolating host WKS-2291 from network',
    '[09:14:08] Analyst notified — case #48213 opened',
    '[09:14:41] Host contained. No lateral movement detected.',
  ];
  const body = document.getElementById('terminalBody');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    body.textContent = logLines.join('\n');
  } else {
    let i = 0;
    function addLine() {
      if (i >= logLines.length) { i = 0; body.textContent = ''; }
      body.textContent += (i > 0 ? '\n' : '') + logLines[i];
      i++;
      setTimeout(addLine, 1100);
    }
    addLine();
  }

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = 'Alert received — an analyst will call you within 15 minutes.';
    form.reset();
  });
})();
