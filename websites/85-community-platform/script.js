// The Commons — group grid render + search filter, mobile nav, form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const groups = [
    { emoji: '🥾', name: 'Weekend Hikers', desc: 'Trail walks every Saturday morning.', members: '312 members' },
    { emoji: '📚', name: 'Tuesday Book Club', desc: 'One novel a month, cozy discussions.', members: '84 members' },
    { emoji: '🎨', name: 'Clayworks Collective', desc: 'Open-studio pottery nights.', members: '40 members' },
    { emoji: '♟️', name: 'Downtown Chess Club', desc: 'Casual games and weekly tournaments.', members: '156 members' },
    { emoji: '🍳', name: 'Sunday Supper Club', desc: 'Rotating potlucks around the neighborhood.', members: '97 members' },
    { emoji: '🎸', name: 'Garage Jam Sessions', desc: 'All instruments and skill levels welcome.', members: '61 members' },
  ];

  const grid = document.getElementById('groupGrid');
  function render(list) {
    grid.innerHTML = list.map((g) => `
      <article class="group-card">
        <span class="emoji" aria-hidden="true">${g.emoji}</span>
        <h3>${g.name}</h3>
        <p>${g.desc}</p>
        <span>${g.members}</span>
      </article>`).join('') || '<p>No groups match your search yet — be the first to start one!</p>';
  }
  render(groups);

  const input = document.getElementById('searchInput');
  document.getElementById('searchBtn').addEventListener('click', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) return render(groups);
    render(groups.filter((g) => g.name.toLowerCase().includes(q) || g.desc.toLowerCase().includes(q)));
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('searchBtn').click();
  });

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = 'Your group page is ready to customize — check your email to finish setup.';
    form.reset();
  });
})();
