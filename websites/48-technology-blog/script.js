// Signal//Noise — topic filter, mobile nav, subscribe form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const buttons = document.querySelectorAll('.topic-btn');
  const posts = document.querySelectorAll('.post-card');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      posts.forEach((post) => {
        post.hidden = filter !== 'all' && post.dataset.topic !== filter;
      });
    });
  });

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = "Subscribed — welcome to the list.";
    form.reset();
  });
})();
