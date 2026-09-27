// ZipRide — fare estimator with ride-type multiplier, mobile nav, forms
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const baseLow = 13, baseHigh = 16;
  let mult = 1, name = 'ZipX';

  function updateFare() {
    const low = Math.round(baseLow * mult);
    const high = Math.round(baseHigh * mult);
    document.getElementById('fareOut').textContent = `€${low}–${high}`;
    document.getElementById('requestBtn').textContent = `Request ${name}`;
  }
  updateFare();

  document.querySelectorAll('.ride-type').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.ride-type').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      mult = Number(btn.dataset.mult);
      name = btn.dataset.name;
      updateFare();
    });
  });

  document.getElementById('requestBtn').addEventListener('click', () => {
    const pickup = document.getElementById('pickupIn').value.trim() || 'your location';
    const drop = document.getElementById('dropIn').value.trim() || 'your destination';
    document.getElementById('rideNote').textContent = `Finding you a ${name} driver from ${pickup} to ${drop}...`;
  });

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = 'Application received — check your email for next steps.';
    form.reset();
  });
})();
