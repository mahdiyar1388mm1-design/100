// Riverside SC — mobile nav, team tabs, registration form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const rosters = {
    soccer: [
      ['rsc-s1', 'U18 Boys — Div 1'],
      ['rsc-s2', 'U14 Girls — Div 2'],
      ['rsc-s3', 'Adult Rec League'],
    ],
    basketball: [
      ['rsc-b1', 'U16 Boys — Varsity'],
      ['rsc-b2', 'U12 Girls — Junior'],
      ['rsc-b3', 'Adult Coed League'],
    ],
    swim: [
      ['rsc-w1', 'Age Group Swim Team'],
      ['rsc-w2', 'Masters Swim Club'],
      ['rsc-w3', 'Youth Learn-to-Swim'],
    ],
  };
  const tabs = document.querySelectorAll('.team-tab');
  const panel = document.getElementById('teamPanel');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const roster = rosters[tab.dataset.team];
      panel.innerHTML = `<div class="roster-grid">${roster.map(([seed, name]) => `
        <div class="roster-card"><img src="https://picsum.photos/seed/${seed}/300/300" alt="${name} team photo" loading="lazy"><span>${name}</span></div>`).join('')}</div>`;
    });
  });

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = "Registration received — team assignment info coming by email.";
    form.reset();
  });
})();
