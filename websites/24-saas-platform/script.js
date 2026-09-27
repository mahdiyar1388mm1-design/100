// Flowstack — mobile nav, billing toggle
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const toggle = document.getElementById('billingToggle');
  const amounts = document.querySelectorAll('.amount[data-monthly]');
  toggle.addEventListener('change', () => {
    amounts.forEach((el) => {
      el.textContent = `$${toggle.checked ? el.dataset.annual : el.dataset.monthly}`;
    });
  });
})();
