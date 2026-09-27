// Alex Kim — typing effect, mobile nav, contact form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const text = 'Alex Kim — Backend & Systems Engineer';
  const el = document.getElementById('typedName');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    el.textContent = text;
  } else {
    let i = 0;
    function type() {
      el.textContent = text.slice(0, i);
      i++;
      if (i <= text.length) setTimeout(type, 45);
    }
    type();
  }

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = '> 200 OK — message sent, thanks!';
    form.reset();
  });
})();
