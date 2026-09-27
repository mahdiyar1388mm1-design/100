// Vortex Esports — animated neon energy-line canvas, roster tabs, mobile nav, subscribe form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const canvas = document.getElementById('fxCanvas');
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

    let seed = 3;
    function rand() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }

    const colors = ['#c8ff2e', '#ff3860'];
    function makeStreak() {
      return {
        y: rand() * height,
        x: -100,
        speed: 4 + rand() * 9,
        len: 120 + rand() * 220,
        color: colors[Math.floor(rand() * colors.length)],
        alpha: 0.15 + rand() * 0.35,
      };
    }
    const streaks = Array.from({ length: 14 }, makeStreak);

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(6,6,8,1)';
      ctx.fillRect(0, 0, width, height);
      streaks.forEach((s) => {
        s.x += s.speed;
        if (s.x - s.len > width) {
          Object.assign(s, makeStreak(), { x: -s.len });
        }
        const grad = ctx.createLinearGradient(s.x - s.len, s.y, s.x, s.y);
        grad.addColorStop(0, 'rgba(0,0,0,0)');
        grad.addColorStop(1, s.color);
        ctx.strokeStyle = grad;
        ctx.globalAlpha = s.alpha;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.x - s.len, s.y);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  } else if (canvas) {
    canvas.style.display = 'none';
  }

  const rosters = {
    valorant: [
      ['Ace', 'Duelist', 'vtx-v1'],
      ['Lynx', 'Controller', 'vtx-v2'],
      ['Rook', 'Sentinel', 'vtx-v3'],
      ['Nyx', 'Initiator', 'vtx-v4'],
      ['Vex', 'Flex', 'vtx-v5'],
    ],
    lol: [
      ['Dagger', 'Top', 'vtx-l1'],
      ['Wraith', 'Jungle', 'vtx-l2'],
      ['Solstice', 'Mid', 'vtx-l3'],
      ['Ember', 'ADC', 'vtx-l4'],
      ['Anchor', 'Support', 'vtx-l5'],
    ],
    rl: [
      ['Blitz', 'Striker', 'vtx-r1'],
      ['Nova', 'Midfield', 'vtx-r2'],
      ['Turbo', 'Defense', 'vtx-r3'],
    ],
  };

  const tabs = document.querySelectorAll('.roster-tab');
  const grid = document.getElementById('playerGrid');
  function renderRoster(game) {
    grid.innerHTML = rosters[game].map(([name, role, seed]) => `
      <article class="player-card">
        <img src="https://picsum.photos/seed/${seed}/300/300" alt="Player photo of ${name}, ${role}" loading="lazy">
        <h3>${name}</h3><span>${role}</span>
      </article>`).join('');
  }
  renderRoster('valorant');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      renderRoster(tab.dataset.game);
    });
  });

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = "You're in the Vortex army — welcome aboard.";
    form.reset();
  });
})();
