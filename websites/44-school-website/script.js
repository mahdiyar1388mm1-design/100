// Brightpath School — mobile nav, grade tabs, tour request form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const grades = {
    k2: 'Play-based literacy and math foundations, with daily outdoor exploration and social-emotional learning circles.',
    35: 'Project-based science and math, collaborative writing workshops, and weekly community service outings.',
    68: 'Student-led research projects, algebra through geometry, foreign language, and middle-school leadership program.',
  };
  const tabs = document.querySelectorAll('.grade-tab');
  const panel = document.getElementById('gradePanel');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      panel.innerHTML = `<p>${grades[tab.dataset.grade]}</p>`;
    });
  });

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = "Thanks! Our admissions team will contact you to schedule your tour.";
    form.reset();
  });
})();
