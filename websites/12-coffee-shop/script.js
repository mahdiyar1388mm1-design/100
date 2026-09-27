// Fern & Fold — mobile nav, brew method tabs, loyalty punch card
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const brewData = {
    pourover: '<ol><li>Rinse a paper filter with hot water, discard the rinse.</li><li>Add 22g medium-fine ground coffee.</li><li>Bloom with 50ml water for 30 seconds.</li><li>Pour remaining 300ml in slow circles over 3 minutes.</li></ol>',
    espresso: '<ol><li>Dose 18g finely ground coffee into the portafilter.</li><li>Tamp evenly with 15kg of pressure.</li><li>Extract for 27–30 seconds to 36g yield.</li><li>Serve immediately, crema intact.</li></ol>',
    coldbrew: '<ol><li>Coarse grind 100g coffee per litre of water.</li><li>Steep at room temperature for 16 hours.</li><li>Filter through a paper-lined sieve twice.</li><li>Serve over ice, diluted to taste.</li></ol>',
  };
  const panel = document.getElementById('brewPanel');
  function renderBrew(key) { panel.innerHTML = brewData[key]; }
  renderBrew('pourover');
  document.querySelectorAll('.brew-tab').forEach((tab) => tab.addEventListener('click', () => {
    document.querySelectorAll('.brew-tab').forEach((t) => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    tab.classList.add('active'); tab.setAttribute('aria-selected', 'true');
    renderBrew(tab.dataset.brew);
  }));

  // Loyalty punch card
  const card = document.getElementById('punchCard');
  const TOTAL = 9;
  let stamped = Number(localStorage.getItem('fernfold-stamps') || 0);
  function renderCard() {
    card.innerHTML = '';
    for (let i = 0; i < TOTAL; i++) {
      const btn = document.createElement('button');
      btn.className = 'cup' + (i < stamped ? ' filled' : '');
      btn.textContent = i < stamped ? '☕' : (i + 1);
      btn.setAttribute('aria-label', i < stamped ? `Stamp ${i + 1} used` : `Punch stamp ${i + 1}`);
      btn.addEventListener('click', () => {
        if (i === stamped && stamped < TOTAL) {
          stamped++;
          localStorage.setItem('fernfold-stamps', stamped);
          renderCard();
          document.getElementById('punchNote').textContent = stamped === TOTAL ? "Card complete — your next coffee is free! 🎉" : `${TOTAL - stamped} more to a free coffee.`;
        }
      });
      card.appendChild(btn);
    }
  }
  renderCard();
})();
