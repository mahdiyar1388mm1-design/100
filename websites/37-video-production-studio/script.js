// Frame & Motion — scrub preview, wipe transition, modal, mobile nav, contact form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Cinematic wipe transition on internal nav links
  const wipe = document.getElementById('wipe');
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => {
      if (reduceMotion) return;
      wipe.classList.remove('play');
      void wipe.offsetWidth;
      wipe.classList.add('play');
    });
  });

  // Scrub preview: cycle through frame stills on hover to simulate a filmstrip scrub
  if (!reduceMotion) {
    document.querySelectorAll('.reel-card').forEach((card) => {
      const seed = card.dataset.scrub;
      const img = card.querySelector('img');
      let frame = 0;
      let timer = null;
      card.addEventListener('mouseenter', () => {
        timer = setInterval(() => {
          frame = (frame + 1) % 4;
          img.src = `https://picsum.photos/seed/${seed}-${frame}/700/440`;
        }, 350);
      });
      card.addEventListener('mouseleave', () => {
        clearInterval(timer);
        frame = 0;
        img.src = `https://picsum.photos/seed/${seed}-0/700/440`;
      });
    });
  }

  const modal = document.getElementById('reelModal');
  document.getElementById('playReel').addEventListener('click', () => (modal.hidden = false));
  document.getElementById('modalClose').addEventListener('click', () => (modal.hidden = true));
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.hidden = true; });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') modal.hidden = true; });

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = "Inquiry received — our producer will follow up within 48 hours.";
    form.reset();
  });
})();
