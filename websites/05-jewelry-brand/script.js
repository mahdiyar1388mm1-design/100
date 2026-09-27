// Aurelia — scrollspy dots, mobile nav, ring configurator, carousel, forms
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  // Scrollspy dots
  const dots = document.querySelectorAll('#sideDots button');
  const sections = Array.from(dots).map((d) => document.getElementById(d.dataset.target)).filter(Boolean);
  dots.forEach((d) => d.addEventListener('click', () => document.getElementById(d.dataset.target).scrollIntoView({ behavior: 'smooth' })));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        dots.forEach((d) => d.classList.toggle('active', d.dataset.target === entry.target.id));
      }
    });
  }, { threshold: 0.5 });
  sections.forEach((s) => io.observe(s));

  // Ring configurator
  const state = { metal: 'gold', cut: 'round', carat: 1 };
  const basePrices = { gold: 1800, rose: 1900, platinum: 2400 };
  const cutMultiplier = { round: 1, oval: 1.05, emerald: 1.15 };
  const preview = document.getElementById('ringPreview');
  const priceOut = document.getElementById('configPrice');
  const caratRange = document.getElementById('caratRange');
  const caratOut = document.getElementById('caratOut');

  function updatePreview() {
    preview.src = `https://picsum.photos/seed/aurelia-${state.metal}-${state.cut}/700/700`;
    preview.alt = `Ring preview: ${state.metal} band with ${state.cut} cut stone, ${state.carat} carat`;
    const price = Math.round(basePrices[state.metal] * cutMultiplier[state.cut] * (0.6 + state.carat * 0.9));
    priceOut.textContent = `$${price.toLocaleString()}`;
  }
  document.querySelectorAll('[data-metal]').forEach((btn) => btn.addEventListener('click', () => {
    document.querySelectorAll('[data-metal]').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active'); state.metal = btn.dataset.metal; updatePreview();
  }));
  document.querySelectorAll('[data-cut]').forEach((btn) => btn.addEventListener('click', () => {
    document.querySelectorAll('[data-cut]').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active'); state.cut = btn.dataset.cut; updatePreview();
  }));
  caratRange.addEventListener('input', () => {
    state.carat = Number(caratRange.value);
    caratOut.textContent = state.carat.toFixed(1);
    updatePreview();
  });
  updatePreview();

  document.getElementById('requestQuote').addEventListener('click', () => {
    document.getElementById('quoteNote').textContent = 'Thank you — a designer will email your exact quote within 24 hours.';
  });

  // Carousel
  const carousel = document.getElementById('carousel');
  document.getElementById('carNext').addEventListener('click', () => carousel.scrollBy({ left: 260, behavior: 'smooth' }));
  document.getElementById('carPrev').addEventListener('click', () => carousel.scrollBy({ left: -260, behavior: 'smooth' }));

  // Appointment form
  const apptForm = document.getElementById('apptForm');
  apptForm.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('apptNote').textContent = `Thank you, ${apptForm.name.value.split(' ')[0] || 'friend'} — we will confirm your appointment by email shortly.`;
    apptForm.reset();
  });
})();
