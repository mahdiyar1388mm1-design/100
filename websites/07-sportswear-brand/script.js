// Volt Athletics — mobile nav, animated counters, program tabs
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  // Animated counters on scroll into view
  const counters = document.querySelectorAll('.stat-num');
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.target);
      const duration = 1400;
      const start = performance.now();
      function step(now) {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased).toLocaleString();
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      obs.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach((c) => io.observe(c));

  // Program tabs
  const programs = {
    speed: [
      ['Week 1-2', 'Acceleration mechanics + short hills'],
      ['Week 3-5', 'Max velocity sprints, 95% effort'],
      ['Week 6-8', 'Race-pace repeats + taper'],
    ],
    strength: [
      ['Phase 1', 'Hypertrophy base, 4x per week'],
      ['Phase 2', 'Max strength, low reps / high load'],
      ['Phase 3', 'Power conversion + deload'],
    ],
    endurance: [
      ['Base', 'Aerobic volume build, zone 2 focus'],
      ['Build', 'Threshold intervals 2x per week'],
      ['Peak', 'Race simulation + taper'],
    ],
  };
  const panel = document.getElementById('tabPanel');
  function renderPanel(key) {
    panel.innerHTML = programs[key].map(([t, d]) => `<div class="plan"><h4>${t}</h4><p>${d}</p></div>`).join('');
  }
  renderPanel('speed');
  document.querySelectorAll('.tab').forEach((tab) => tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach((t) => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    tab.classList.add('active'); tab.setAttribute('aria-selected', 'true');
    renderPanel(tab.dataset.tab);
  }));
})();
