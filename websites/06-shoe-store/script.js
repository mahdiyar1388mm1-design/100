// Stride.Co — mobile nav, 360 drag viewer, size selector, add to bag
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  // 360 viewer: drag to change frame (simulated via seeded images)
  const stage = document.querySelector('.viewer-stage');
  const img = document.getElementById('viewerImg');
  const FRAMES = 8;
  let frame = 0, dragging = false, startX = 0, startFrame = 0;

  function render() {
    img.src = `https://picsum.photos/seed/stride-spin-${frame}/700/560`;
    img.alt = `Vandal OG sneaker, rotating 360 degree view, frame ${frame + 1} of ${FRAMES}`;
  }
  function onDown(x) { dragging = true; startX = x; startFrame = frame; stage.style.cursor = 'grabbing'; }
  function onMove(x) {
    if (!dragging) return;
    const delta = Math.round((x - startX) / 40);
    frame = ((startFrame + delta) % FRAMES + FRAMES) % FRAMES;
    render();
  }
  function onUp() { dragging = false; stage.style.cursor = 'grab'; }

  stage.addEventListener('mousedown', (e) => onDown(e.clientX));
  window.addEventListener('mousemove', (e) => onMove(e.clientX));
  window.addEventListener('mouseup', onUp);
  stage.addEventListener('touchstart', (e) => onDown(e.touches[0].clientX), { passive: true });
  stage.addEventListener('touchmove', (e) => onMove(e.touches[0].clientX), { passive: true });
  stage.addEventListener('touchend', onUp);

  // Size select
  document.querySelectorAll('.size-grid button').forEach((btn) => btn.addEventListener('click', () => {
    document.querySelectorAll('.size-grid button').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
  }));

  document.getElementById('addBtn').addEventListener('click', () => {
    const size = document.querySelector('.size-grid .active')?.dataset.size || '9';
    document.getElementById('addNote').textContent = `Added Vandal OG · US ${size} to your bag.`;
  });
})();
