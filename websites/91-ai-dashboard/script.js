// NeuralDesk — canvas particle background, chat demo with typing animation, animated gauge, mobile nav
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Particle network background
  const canvas = document.getElementById('bgCanvas');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    let nodes = [];
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = Math.floor((canvas.width * canvas.height) / 22000);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      }));
    }
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach((n) => {
        if (!reduceMotion) {
          n.x += n.vx; n.y += n.vy;
          if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
          if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        }
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(139,92,246,0.6)';
        ctx.fill();
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(34,211,238,${0.12 * (1 - dist / 120)})`;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
    resize();
    window.addEventListener('resize', resize);
    draw();
  }

  // Chat demo
  const chatLog = document.getElementById('chatLog');
  function addMessage(text, cls) {
    const div = document.createElement('div');
    div.className = `msg ${cls}`;
    div.textContent = text;
    chatLog.appendChild(div);
    chatLog.scrollTop = chatLog.scrollHeight;
    return div;
  }
  function typeInto(el, text, done) {
    let i = 0;
    const interval = setInterval(() => {
      el.textContent = text.slice(0, i);
      i++;
      chatLog.scrollTop = chatLog.scrollHeight;
      if (i > text.length) { clearInterval(interval); if (done) done(); }
    }, 14);
  }

  const aiReply = "Churn this quarter was driven mainly by onboarding drop-off (41%) and pricing objections (28%). I'd recommend a guided setup flow and a mid-tier plan.";

  addMessage('Summarize this quarter\'s churn drivers', 'user');
  const aiEl = addMessage('', 'ai');
  setTimeout(() => typeInto(aiEl, aiReply), 500);

  document.getElementById('sendBtn').addEventListener('click', () => {
    const input = document.getElementById('promptInput');
    const val = input.value.trim();
    if (!val) return;
    addMessage(val, 'user');
    input.value = '';
    const reply = addMessage('', 'ai');
    setTimeout(() => typeInto(reply, 'Analyzing your workspace data... here is a draft answer based on your recent documents and conversation history.'), 400);
  });

  // Animated gauge
  function drawGauge(pct) {
    const canvas = document.getElementById('gaugeCanvas');
    const ctx = canvas.getContext('2d');
    const cx = canvas.width / 2, cy = canvas.height / 2, r = 70;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0.75 * Math.PI, 2.25 * Math.PI);
    ctx.lineWidth = 16;
    ctx.strokeStyle = '#232338';
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0.75 * Math.PI, (0.75 + 1.5 * pct) * Math.PI);
    ctx.strokeStyle = '#22d3ee';
    ctx.lineWidth = 16;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.fillStyle = '#eceefb';
    ctx.font = 'bold 26px Space Grotesk, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${Math.round(pct * 100)}%`, cx, cy + 8);
  }
  let current = 0;
  const target = 0.68;
  const gaugeTimer = setInterval(() => {
    current += 0.02;
    if (current >= target) { current = target; clearInterval(gaugeTimer); }
    drawGauge(current);
  }, 20);

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = "Request received — we'll set up your workspace within one business day.";
    form.reset();
  });
})();
