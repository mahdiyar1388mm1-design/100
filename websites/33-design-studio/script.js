// Studio Nova — mobile nav, waitlist form reveal
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const link = document.getElementById('waitlistLink');
  const form = document.getElementById('contactForm');
  link.addEventListener('click', (e) => {
    e.preventDefault();
    form.hidden = false;
    link.parentElement.hidden = true;
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = "You're on the list — we'll reach out when a slot opens.";
    form.reset();
  });
})();
