// VitalCare — mobile nav, video visit button, request form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  document.querySelector('.visit-card .btn').addEventListener('click', () => {
    document.getElementById('visit').scrollIntoView({ behavior: 'smooth' });
  });

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = "Connecting you with the next available doctor — check your email for the visit link.";
    form.reset();
  });
})();
