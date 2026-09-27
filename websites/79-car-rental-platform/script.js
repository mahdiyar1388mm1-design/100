// DriveNow Rentals — multi-step booking wizard, mobile nav
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const cars = [
    { name: 'Economy — Compact', price: '€29/day' },
    { name: 'SUV — Mid-size', price: '€49/day' },
    { name: 'Luxury — Sedan', price: '€89/day' },
  ];
  const carOptions = document.getElementById('carOptions');
  carOptions.innerHTML = cars.map((c, i) => `
    <div class="car-opt${i === 0 ? ' selected' : ''}" data-idx="${i}" tabindex="0" role="button" aria-pressed="${i === 0}">
      <div><strong>${c.name}</strong><span>Automatic · 5 seats</span></div>
      <span>${c.price}</span>
    </div>`).join('');

  carOptions.addEventListener('click', (e) => {
    const opt = e.target.closest('.car-opt');
    if (!opt) return;
    document.querySelectorAll('.car-opt').forEach((o) => { o.classList.remove('selected'); o.setAttribute('aria-pressed', 'false'); });
    opt.classList.add('selected');
    opt.setAttribute('aria-pressed', 'true');
  });

  function goToStep(n) {
    document.querySelectorAll('.step-panel').forEach((p) => { p.hidden = p.dataset.panel !== String(n); });
    document.querySelectorAll('.step').forEach((s) => s.classList.toggle('active', s.dataset.step === String(n)));
  }

  document.querySelectorAll('.next-btn').forEach((btn) => {
    btn.addEventListener('click', () => goToStep(btn.dataset.next));
  });

  document.querySelectorAll('.step').forEach((s) => {
    s.addEventListener('click', () => goToStep(s.dataset.step));
  });

  document.getElementById('confirmBtn').addEventListener('click', () => {
    document.getElementById('bookingNote').textContent = 'Booking confirmed! A confirmation email is on its way.';
  });
})();
