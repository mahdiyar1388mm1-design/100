// TalentBridge — job grid, mobile nav, signup form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const jobs = [
    { title: 'Product Manager', company: 'Northwind Digital', tags: ['Remote', 'Full-time'] },
    { title: 'UX Researcher', company: 'Pixelworks', tags: ['Hybrid', 'Full-time'] },
    { title: 'Growth Marketer', company: 'Surge Digital', tags: ['Remote', 'Contract'] },
  ];
  document.getElementById('jobGrid').innerHTML = jobs.map((j) => `
    <article class="job-card">
      <h3>${j.title}</h3>
      <p class="company">${j.company}</p>
      <div class="job-tags">${j.tags.map((t) => `<span class="job-tag">${t}</span>`).join('')}</div>
    </article>`).join('');

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = "Welcome to TalentBridge — check your email to finish setting up your account.";
    form.reset();
  });
})();
