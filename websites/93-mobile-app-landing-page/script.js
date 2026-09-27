// PocketWallet — animated balance counters, mobile nav, form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  function animateCount(el, target, prefix = '$', decimals = 0) {
    const duration = 1200;
    const start = performance.now();
    function step(now) {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = `${prefix}${(target * p).toFixed(decimals)}`;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = `${prefix}${target.toFixed(decimals)}`;
    }
    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(document.getElementById('balanceOut'), 4285.40, '$', 2);
        animateCount(document.getElementById('weekSpend'), 312, '$', 0);
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });
  observer.observe(document.querySelector('.phone-mock'));

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = 'Text sent! Check your phone for the download link.';
    form.reset();
  });
})();
