// Burnt Bun Co. — mobile nav, combo builder
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const groups = document.querySelectorAll('.pick-row');
  function currentCombo() {
    return Array.from(groups).map((g) => g.querySelector('.pick.active'));
  }
  function updateSummary() {
    const combo = currentCombo();
    const list = document.getElementById('comboList');
    list.innerHTML = combo.map((btn) => `<li><span>${btn.dataset.name}</span><span>$${Number(btn.dataset.price).toFixed(2)}</span></li>`).join('');
    const total = combo.reduce((sum, btn) => sum + Number(btn.dataset.price), 0);
    document.getElementById('comboTotal').textContent = `$${total.toFixed(2)}`;
  }
  groups.forEach((group) => {
    group.querySelectorAll('.pick').forEach((btn) => btn.addEventListener('click', () => {
      group.querySelectorAll('.pick').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      updateSummary();
    }));
  });
  updateSummary();

  document.getElementById('comboAdd').addEventListener('click', () => {
    document.getElementById('comboNote').textContent = 'Combo added to your order — head to checkout when ready!';
  });
})();
