// Haven Hotels — mobile nav, booking widget
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  document.getElementById('checkBtn').addEventListener('click', () => {
    const inDate = document.getElementById('checkin').value;
    const outDate = document.getElementById('checkout').value;
    if (!inDate || !outDate) {
      alert('Please choose both a check-in and check-out date.');
      return;
    }
    document.getElementById('rooms').scrollIntoView({ behavior: 'smooth' });
  });
})();
