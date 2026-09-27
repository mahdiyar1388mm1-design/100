// Launchpad.io — FAQ accordion, mobile nav, form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const faqs = [
    { q: 'Do I need to know how to code?', a: 'No — Launchpad.io is fully no-code. If you do know how to code, you can eject and customize anything.' },
    { q: 'Can I use my own domain?', a: 'Yes, on the Founder plan and above you can connect any custom domain in a few clicks.' },
    { q: 'Is there a free plan?', a: 'Yes, the Free plan includes one project with Launchpad branding, forever free.' },
  ];
  const accordion = document.getElementById('accordion');
  accordion.innerHTML = faqs.map((f) => `
    <div class="acc-item">
      <button class="acc-q" aria-expanded="false">${f.q}<span>+</span></button>
      <div class="acc-a"><p>${f.a}</p></div>
    </div>`).join('');

  accordion.querySelectorAll('.acc-q').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.acc-item');
      const isOpen = item.classList.contains('open');
      accordion.querySelectorAll('.acc-item').forEach((i) => { i.classList.remove('open'); i.querySelector('.acc-q').setAttribute('aria-expanded', 'false'); });
      if (!isOpen) { item.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
    });
  });

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = "You're in — let's build your first launch page.";
    form.reset();
  });
})();
