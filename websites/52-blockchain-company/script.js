// ChainPoint — pseudo-3D rotating node network (canvas), mobile nav, contact form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const canvas = document.getElementById('nodeCanvas');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (canvas && canvas.getContext && !reduceMotion) {
    const ctx = canvas.getContext('2d');
    const hero = canvas.parentElement;
    let width, height, dpr;
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = hero.clientWidth;
      height = hero.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    // Generate points on a 3D sphere
    const NODE_COUNT = 60;
    let seed = 11;
    function rand() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
    const nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      const r = 220;
      nodes.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
      });
    }

    let angleY = 0;
    let targetTiltX = 0;
    let tiltX = 0;
    let pointerActive = false;

    hero.addEventListener('pointermove', (e) => {
      const rect = hero.getBoundingClientRect();
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      targetTiltX = relY * 0.6;
      pointerActive = true;
    });
    hero.addEventListener('pointerleave', () => { pointerActive = false; targetTiltX = 0; });

    function project(p) {
      // rotate around Y axis
      const cosY = Math.cos(angleY), sinY = Math.sin(angleY);
      let x = p.x * cosY - p.z * sinY;
      let z = p.x * sinY + p.z * cosY;
      let y = p.y;
      // tilt around X axis
      const cosX = Math.cos(tiltX), sinX = Math.sin(tiltX);
      const y2 = y * cosX - z * sinX;
      const z2 = y * sinX + z * cosX;
      const scale = 500 / (500 + z2);
      return {
        x: width / 2 + x * scale,
        y: height / 2 + y2 * scale,
        scale,
        z: z2,
      };
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      angleY += 0.0025;
      tiltX += (targetTiltX - tiltX) * 0.05;

      const projected = nodes.map(project);

      // draw connections between nearby nodes
      ctx.lineWidth = 1;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i], b = projected[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            const alpha = (1 - dist / 90) * 0.35 * Math.min(a.scale, b.scale);
            ctx.strokeStyle = `rgba(92,124,255,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // draw nodes (back to front)
      projected
        .map((p, i) => ({ ...p, i }))
        .sort((a, b) => a.z - b.z)
        .forEach((p) => {
          const radius = Math.max(1.2, 2.6 * p.scale);
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = p.z > 0 ? 'rgba(92,240,208,0.9)' : 'rgba(92,124,255,0.6)';
          ctx.fill();
        });

      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  } else if (canvas) {
    canvas.style.display = 'none';
  }

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = "Request received — our solutions team will follow up within one business day.";
    form.reset();
  });
})();
