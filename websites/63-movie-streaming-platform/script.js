// Reelio — streaming rows, mobile nav, hero play button, trial form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const rows = {
    trendingTrack: [
      ['Nightfall Harbor', 'rl1'], ['Ashen Vale: The Series', 'rl2'], ['Static Bloom', 'rl3'],
      ['The Long Coastline', 'rl4'], ['Undertow', 'rl5'], ['Concrete Rivers', 'rl6'],
    ],
    dramaTrack: [
      ['A Short History of Silence', 'rl7'], ['Field Notes', 'rl8'], ['Low Country', 'rl9'],
      ['Firelight', 'rl10'], ['Wading', 'rl11'], ['Static Season', 'rl12'],
    ],
    scifiTrack: [
      ['Nova Drift: Origins', 'rl13'], ['Halflight', 'rl14'], ['Glass Fields', 'rl15'],
      ['Afterimage', 'rl16'], ['Vantage Point', 'rl17'], ['Reflections No. 9', 'rl18'],
    ],
  };

  Object.entries(rows).forEach(([id, items]) => {
    const track = document.getElementById(id);
    if (!track) return;
    track.innerHTML = items.map(([title, seed]) => `
      <div class="card" tabindex="0">
        <img src="https://picsum.photos/seed/${seed}/400/225" alt="Poster for ${title}" loading="lazy">
        <div class="card-title">${title}</div>
      </div>`).join('');
  });

  document.querySelector('.hero-actions .btn').addEventListener('click', () => {
    alert('Playback is a demo placeholder in this portfolio example.');
  });

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = "You're all set — start streaming instantly.";
    form.reset();
  });
})();
