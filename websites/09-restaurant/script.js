// Osteria Rosso — mobile nav, menu tabs, reservation form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const menuData = {
    antipasti: [
      ['Burrata al Pomodoro', 'Creamy burrata, heirloom tomatoes, basil oil', '$16'],
      ['Carpaccio di Manzo', 'Thin-sliced beef, arugula, shaved parmesan', '$18'],
      ['Arancini della Nonna', 'Saffron rice balls, slow-cooked ragù', '$12'],
    ],
    primi: [
      ['Tagliatelle al Ragù', 'Hand-cut pasta, six-hour beef and pork ragù', '$24'],
      ['Cacio e Pepe', 'Tonnarelli, pecorino romano, black pepper', '$19'],
      ['Risotto ai Funghi', 'Porcini and wild mushroom risotto', '$22'],
    ],
    secondi: [
      ['Branzino al Forno', 'Wood-fired sea bass, lemon, capers', '$32'],
      ['Osso Buco', 'Braised veal shank, saffron risotto', '$36'],
      ['Pollo alla Griglia', 'Grilled free-range chicken, salsa verde', '$26'],
    ],
    dolci: [
      ['Tiramisù della Casa', 'Espresso-soaked ladyfingers, mascarpone', '$10'],
      ['Panna Cotta', 'Vanilla bean panna cotta, berry coulis', '$9'],
      ['Affogato', 'Vanilla gelato drowned in hot espresso', '$8'],
    ],
  };
  const menuList = document.getElementById('menuList');
  function renderMenu(cat) {
    menuList.innerHTML = menuData[cat]
      .map(([name, desc, price]) => `<div class="menu-item"><div><h3>${name}</h3><p>${desc}</p></div><span class="price">${price}</span></div>`)
      .join('');
  }
  renderMenu('antipasti');
  document.querySelectorAll('.menu-tab').forEach((tab) => tab.addEventListener('click', () => {
    document.querySelectorAll('.menu-tab').forEach((t) => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    tab.classList.add('active'); tab.setAttribute('aria-selected', 'true');
    renderMenu(tab.dataset.cat);
  }));

  const form = document.getElementById('reserveForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('rname').value.trim() || 'Guest';
    const date = document.getElementById('date').value;
    document.getElementById('reserveNote').textContent = date
      ? `Grazie, ${name} — your table is requested for ${date}. We'll email a confirmation shortly.`
      : 'Please select a date for your reservation.';
  });
})();
