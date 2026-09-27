// Raven Automotive — canvas starfield background, draggable 3D CSS rotation showcase, color swatches, mobile nav
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  // Canvas starfield (graceful: canvas simply stays blank if unsupported)
  const canvas = document.getElementById('bgCanvas');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    let stars = [];
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = Math.floor((canvas.width * canvas.height) / 9000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.3,
        speed: Math.random() * 0.3 + 0.05,
      }));
    }
    function draw() {
      ctx.fillStyle = '#05050a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(200,190,255,0.8)';
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        if (!reduceMotion) {
          s.y += s.speed;
          if (s.y > canvas.height) s.y = 0;
        }
      });
      requestAnimationFrame(draw);
    }
    resize();
    window.addEventListener('resize', resize);
    draw();
  }

  // Draggable 3D showcase rotation
  const showcase = document.getElementById('showcase3d');
  const plate = document.getElementById('carPlate');
  let rotY = -8, rotX = 6, dragging = false, startX = 0, startY = 0, startRotY = 0, startRotX = 0;

  function applyRotation() {
    plate.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg)`;
  }
  applyRotation();

  function startDrag(x, y) {
    dragging = true;
    startX = x; startY = y;
    startRotY = rotY; startRotX = rotX;
  }
  function moveDrag(x, y) {
    if (!dragging) return;
    rotY = startRotY + (x - startX) * 0.3;
    rotX = startRotX - (y - startY) * 0.15;
    rotX = Math.max(-20, Math.min(20, rotX));
    applyRotation();
  }
  function endDrag() { dragging = false; }

  showcase.addEventListener('mousedown', (e) => startDrag(e.clientX, e.clientY));
  window.addEventListener('mousemove', (e) => moveDrag(e.clientX, e.clientY));
  window.addEventListener('mouseup', endDrag);
  showcase.addEventListener('touchstart', (e) => startDrag(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
  showcase.addEventListener('touchmove', (e) => moveDrag(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
  showcase.addEventListener('touchend', endDrag);

  // gentle idle sway if motion is fine and not being dragged
  if (!reduceMotion) {
    setInterval(() => {
      if (!dragging) {
        rotY += Math.sin(Date.now() / 2000) * 0.05;
        applyRotation();
      }
    }, 50);
  }

  document.querySelectorAll('.swatch').forEach((sw) => {
    sw.addEventListener('click', () => {
      document.getElementById('swatchLabel').textContent = `${sw.dataset.name} selected`;
    });
  });

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = 'Reservation confirmed — welcome to the Raven waitlist.';
    form.reset();
  });
})();
