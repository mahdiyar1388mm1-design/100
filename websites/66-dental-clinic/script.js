// Bright Smile Dental — before/after slider, mobile nav, booking form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const range = document.getElementById('baRange');
  const beforeWrap = document.getElementById('baBeforeWrap');
  const handle = document.getElementById('baHandle');
  function update() {
    const val = range.value;
    beforeWrap.style.width = val + '%';
    handle.style.left = val + '%';
  }
  range.addEventListener('input', update);
  update();

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = "Request received — we'll call to confirm your visit.";
    form.reset();
  });
})();
