// Loopli — feature carousel, mobile nav, form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const features = [
    { title: 'No public follower counts', text: 'Nobody keeps score. Loopli is built for closeness, not clout.' },
    { title: 'Private circles only', text: 'Create small groups for family, close friends, or roommates — nothing is public by default.' },
    { title: 'No ads, ever', text: 'We charge nothing and show nothing. Your circle sees only your circle.' },
  ];
  const track = document.getElementById('featureTrack');
  track.innerHTML = features.map((f) => `<div class="feature-slide"><h3>${f.title}</h3><p>${f.text}</p></div>`).join('');
  const dots = document.getElementById('featureDots');
  dots.innerHTML = features.map((_, i) => `<button aria-label="Show feature ${i + 1}" class="${i === 0 ? 'active' : ''}"></button>`).join('');

  let idx = 0;
  function show(i) {
    idx = i;
    track.style.transform = `translateX(-${i * 100}%)`;
    dots.querySelectorAll('button').forEach((b, j) => b.classList.toggle('active', j === i));
  }
  track.style.display = 'flex';
  dots.querySelectorAll('button').forEach((btn, i) => btn.addEventListener('click', () => show(i)));
  setInterval(() => show((idx + 1) % features.length), 5000);

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = "Text sent! Check your phone for the download link.";
    form.reset();
  });
})();
