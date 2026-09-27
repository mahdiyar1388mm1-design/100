// Noir & Sel — mobile nav, pairing toggle price, reservation form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const toggle = document.getElementById('pairingToggle');
  const total = document.getElementById('menuTotal');
  toggle.addEventListener('change', () => {
    total.textContent = toggle.checked ? '$345' : '$225';
  });

  const form = document.getElementById('reserveForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('rname').value.trim() || 'Guest';
    document.getElementById('reserveNote').textContent = `Thank you, ${name}. Our maître d' will confirm your table by email within 24 hours.`;
    form.reset();
  });
})();
