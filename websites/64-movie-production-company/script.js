// Silverlens Pictures — Ken Burns crossfade carousel, mobile nav, pitch form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const slidesData = [
    { cat: 'FEATURE FILM', title: 'The Salt Line', desc: 'A fishing family confronts a reckoning that spans three generations.' },
    { cat: 'DOCUMENTARY', title: 'Concrete Rivers', desc: 'An intimate portrait of a city rebuilding itself after disaster.' },
    { cat: 'LIMITED SERIES', title: 'Nightfall Harbor', desc: 'A detective drifts back to his hometown to solve the case that ruined his career.' },
  ];

  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.getElementById('slideDots');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = 0;

  dotsContainer.innerHTML = slidesData.map((_, i) => `<button class="dot${i === 0 ? ' active' : ''}" aria-label="Show slide ${i + 1}" data-idx="${i}"></button>`).join('');
  const dots = document.querySelectorAll('.dot');

  function showSlide(idx) {
    current = idx;
    slides.forEach((s, i) => s.classList.toggle('active', i === idx));
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    document.getElementById('slideCat').textContent = slidesData[idx].cat;
    document.getElementById('slideTitle').textContent = slidesData[idx].title;
    document.getElementById('slideDesc').textContent = slidesData[idx].desc;
  }

  dots.forEach((dot) => dot.addEventListener('click', () => showSlide(Number(dot.dataset.idx))));

  if (!reduceMotion) {
    setInterval(() => {
      showSlide((current + 1) % slidesData.length);
    }, 6000);
  }

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = "Pitch received — our development team reviews every submission.";
    form.reset();
  });
})();
