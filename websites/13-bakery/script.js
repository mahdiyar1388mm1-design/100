// Maple & Crumb — mobile nav, cake configurator
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const cakeVisual = document.getElementById('cakeVisual');
  const totalEl = document.getElementById('cakeTotal');
  let price = 42;

  document.querySelectorAll('[data-flavor]').forEach((btn) => btn.addEventListener('click', () => {
    document.querySelectorAll('[data-flavor]').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    cakeVisual.style.setProperty('--flavor-color', btn.style.getPropertyValue('--c'));
  }));

  document.querySelectorAll('[data-size]').forEach((btn) => btn.addEventListener('click', () => {
    document.querySelectorAll('[data-size]').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    price = Number(btn.dataset.price);
    totalEl.textContent = `$${price}`;
  }));

  const msgInput = document.getElementById('cakeMsg');
  const msgPreview = document.getElementById('cakeMsgPreview');
  msgInput.addEventListener('input', () => { msgPreview.textContent = msgInput.value || 'Happy Birthday!'; });

  document.getElementById('cakeOrder').addEventListener('click', () => {
    document.getElementById('cakeNote').textContent = `Order received — your $${price} custom cake will be ready in 72 hours.`;
  });
})();
