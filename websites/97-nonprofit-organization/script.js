// Hope Bridge Foundation — animated impact counters, story rotator, donation amount selector, mobile nav
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  function animateCount(el, target) {
    const duration = 1500;
    const start = performance.now();
    function step(now) {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(target * p).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(step);
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(document.getElementById('stat1'), 412);
        animateCount(document.getElementById('stat2'), 60000);
        animateCount(document.getElementById('stat3'), 187);
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });
  observer.observe(document.querySelector('.impact-stats'));

  const stories = [
    { text: '"The well changed our village. My daughters walk to school now instead of walking three hours for water."', author: '— Amara, mother of three, Kenya' },
    { text: '"Because of the scholarship fund, I am the first person in my family to finish secondary school."', author: '— Rafael, student, Guatemala' },
  ];
  let si = 0;
  function showStory(i) {
    si = i;
    document.getElementById('storyText').textContent = stories[i].text;
    document.getElementById('storyAuthor').textContent = stories[i].author;
  }
  showStory(0);
  setInterval(() => showStory((si + 1) % stories.length), 6000);

  let selectedAmount = 25;
  document.querySelectorAll('.amount').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.amount').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      selectedAmount = Number(btn.dataset.amt);
      document.getElementById('donateBtn').textContent = `Donate $${selectedAmount}`;
    });
  });

  const form = document.getElementById('donateForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('donateNote').textContent = `Thank you for your $${selectedAmount} donation — a receipt is on its way to your inbox.`;
    form.reset();
  });
})();
