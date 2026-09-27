// Echo Vale — waveform bars, track list "now playing" simulation, mobile nav, mailing list form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  // Generate static waveform bars (deterministic pseudo-random heights)
  const waveBar = document.getElementById('waveBar');
  const barCount = 60;
  let seed = 42;
  function rand() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  }
  for (let i = 0; i < barCount; i++) {
    const bar = document.createElement('span');
    bar.style.height = `${8 + rand() * 44}px`;
    waveBar.appendChild(bar);
  }

  const playBtn = document.getElementById('playBtn');
  const playIcon = document.getElementById('playIcon');
  const nowPlaying = document.getElementById('nowPlaying');
  const npTrack = document.getElementById('npTrack');
  let playing = false;

  function setPlaying(state, trackName) {
    playing = state;
    playBtn.setAttribute('aria-pressed', String(state));
    playIcon.textContent = state ? '❚❚' : '▶';
    nowPlaying.hidden = !state;
    if (trackName) npTrack.textContent = trackName;
    document.querySelectorAll('.track').forEach((t) => t.classList.remove('active'));
    if (state && trackName) {
      const match = [...document.querySelectorAll('.track')].find((t) => t.dataset.track === trackName);
      if (match) match.classList.add('active');
    }
  }

  playBtn.addEventListener('click', () => setPlaying(!playing, 'Undertow'));
  document.getElementById('npClose').addEventListener('click', () => setPlaying(false));

  document.querySelectorAll('.track').forEach((track) => {
    track.addEventListener('click', () => setPlaying(true, track.dataset.track));
  });

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = "You're on the list — welcome aboard!";
    form.reset();
  });
})();
