// Éclat Studio — overlay menu, countdown, swatch/size selector, form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const overlay = document.getElementById('overlayNav');
  const overlayClose = document.getElementById('overlayClose');
  menuBtn.addEventListener('click', () => { overlay.classList.add('open'); menuBtn.setAttribute('aria-expanded', 'true'); });
  overlayClose.addEventListener('click', () => { overlay.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); });
  overlay.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => overlay.classList.remove('open')));

  // Countdown to a fixed future point (72h demo window from first load, persisted)
  const KEY = 'eclat-drop-end';
  let end = localStorage.getItem(KEY);
  if (!end) { end = Date.now() + 1000 * 60 * 60 * 51; localStorage.setItem(KEY, end); }
  end = Number(end);
  function tick() {
    const diff = Math.max(0, end - Date.now());
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById('cd-d').textContent = String(d).padStart(2, '0');
    document.getElementById('cd-h').textContent = String(h).padStart(2, '0');
    document.getElementById('cd-m').textContent = String(m).padStart(2, '0');
    document.getElementById('cd-s').textContent = String(s).padStart(2, '0');
  }
  tick(); setInterval(tick, 1000);

  // Swatches
  const productImg = document.getElementById('productImg');
  const swatchLabel = document.getElementById('swatchLabel');
  document.querySelectorAll('.swatch').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.swatch').forEach((b) => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      productImg.src = `https://picsum.photos/seed/${btn.dataset.img}/800/1000`;
      swatchLabel.textContent = btn.dataset.label;
    });
  });

  // Size selector
  const sizeButtons = document.querySelectorAll('.size-grid button');
  sizeButtons.forEach((btn) => btn.addEventListener('click', () => {
    sizeButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
  }));

  // Add to bag
  const addBtn = document.getElementById('addBtn');
  const stockNote = document.getElementById('stockNote');
  addBtn.addEventListener('click', () => {
    const size = document.querySelector('.size-grid .active')?.dataset.size || 'S';
    const color = swatchLabel.textContent;
    stockNote.textContent = `Added: Vertige Jacket · ${color} · Size ${size}`;
  });

  // Join form
  const form = document.getElementById('joinForm');
  const note = document.getElementById('joinNote');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.joinEmail.value.trim());
    note.textContent = val ? "You're on the list — watch your inbox." : 'Enter a valid email to join.';
    if (val) form.reset();
  });
})();
