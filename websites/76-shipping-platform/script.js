// Portline Shipping — animated route dot along SVG path, live counters, track form, mobile nav
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const path = document.getElementById('routePath');
  const dot = document.getElementById('shipDot');
  const pathLength = path.getTotalLength();
  let progress = 0.62;

  function placeDot() {
    const point = path.getPointAtLength(pathLength * progress);
    dot.setAttribute('cx', point.x);
    dot.setAttribute('cy', point.y);
  }
  placeDot();

  if (!reduceMotion) {
    setInterval(() => {
      progress += 0.002;
      if (progress > 0.98) progress = 0.4;
      placeDot();
      document.getElementById('progressFill').style.width = `${Math.round(progress * 100)}%`;
      document.getElementById('progressPct').textContent = `${Math.round(progress * 100)}% complete`;
    }, 100);
  }

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
        animateCount(document.getElementById('statPorts'), 60);
        animateCount(document.getElementById('statContainers'), 40000);
        animateCount(document.getElementById('statVessels'), 128);
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });
  observer.observe(document.querySelector('.stat-grid'));

  document.getElementById('trackForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const val = document.getElementById('trackInput').value.trim() || 'PORT-88291';
    document.getElementById('trackId').textContent = val.toUpperCase();
  });

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = "Quote request received — a booking specialist will follow up within 24 hours.";
    form.reset();
  });
})();
