// Nexora — theme toggle, mobile menu, comparison tabs, accordion
(function () {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') !== 'light';
    root.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeToggle.textContent = isDark ? '● Dark' : '☀ Light';
    themeToggle.setAttribute('aria-pressed', String(isDark));
  });

  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  menuBtn.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  // Comparison table data
  const specs = {
    air: [['Chip', 'Nexora N4 Lite (8-core)'], ['Display', '13.3" 2K IPS, 60Hz'], ['RAM', '16GB unified'], ['Battery', '18 hours'], ['Weight', '1.08 kg'], ['Price', '$899']],
    pro: [['Chip', 'Nexora N4 (10-core)'], ['Display', '14" 3K OLED, 120Hz'], ['RAM', '32GB unified'], ['Battery', '22 hours'], ['Weight', '1.28 kg'], ['Price', '$1,299']],
    max: [['Chip', 'Nexora N4 Max (14-core)'], ['Display', '16" 4K OLED, 120Hz'], ['RAM', '64GB unified'], ['Battery', '20 hours'], ['Weight', '1.9 kg'], ['Price', '$2,199']],
  };
  const table = document.getElementById('compareTable');
  function renderTable(key) {
    table.innerHTML = '<div class="row head"><span>Spec</span><span>Value</span></div>' +
      specs[key].map(([k, v]) => `<div class="row"><span>${k}</span><span>${v}</span></div>`).join('');
  }
  renderTable('air');
  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach((t) => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active'); tab.setAttribute('aria-selected', 'true');
      renderTable(tab.dataset.tab);
    });
  });

  // Accordion
  document.querySelectorAll('.acc-head').forEach((head) => {
    head.addEventListener('click', () => {
      const body = head.nextElementSibling;
      const isOpen = body.classList.contains('open');
      document.querySelectorAll('.acc-body').forEach((b) => b.classList.remove('open'));
      document.querySelectorAll('.acc-head').forEach((h) => { h.setAttribute('aria-expanded', 'false'); h.querySelector('span').textContent = '+'; });
      if (!isOpen) { body.classList.add('open'); head.setAttribute('aria-expanded', 'true'); head.querySelector('span').textContent = '−'; }
    });
  });
})();
