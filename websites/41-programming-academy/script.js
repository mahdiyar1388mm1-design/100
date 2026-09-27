// Codecrest Academy — typing code snippet, animated stats, curriculum tabs, mobile nav, apply form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const codeText = `function launchCareer(student) {
  student.learn(['HTML', 'JS', 'React']);
  student.buildCapstone();
  return student.hire();
}

launchCareer(you);`;
  const codeEl = document.getElementById('typedCode');
  if (reduceMotion) {
    codeEl.textContent = codeText;
  } else {
    let i = 0;
    function type() {
      codeEl.textContent = codeText.slice(0, i);
      i++;
      if (i <= codeText.length) setTimeout(type, 28);
    }
    type();
  }

  const tracks = {
    frontend: [
      ['Wk 1–2', 'HTML, CSS & JavaScript foundations'],
      ['Wk 3–5', 'React & component architecture'],
      ['Wk 6–8', 'State management & testing'],
      ['Wk 9–12', 'Full-stack capstone project'],
      ['Wk 13–16', 'Portfolio, interviews & job search'],
    ],
    backend: [
      ['Wk 1–2', 'Node.js & API fundamentals'],
      ['Wk 3–5', 'Databases & authentication'],
      ['Wk 6–8', 'Microservices & message queues'],
      ['Wk 9–12', 'Scalable backend capstone'],
      ['Wk 13–16', 'System design & interviews'],
    ],
    data: [
      ['Wk 1–2', 'Python & SQL foundations'],
      ['Wk 3–5', 'ETL pipelines & warehousing'],
      ['Wk 6–8', 'Distributed data processing'],
      ['Wk 9–12', 'End-to-end pipeline capstone'],
      ['Wk 13–16', 'Portfolio & job search'],
    ],
  };
  const tabs = document.querySelectorAll('.track-tab');
  const weekList = document.getElementById('weekList');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      weekList.innerHTML = tracks[tab.dataset.track]
        .map(([wk, desc]) => `<li><span class="wk">${wk}</span><span>${desc}</span></li>`)
        .join('');
    });
  });

  const counters = document.querySelectorAll('.stat-num');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.target);
      const isDecimal = target % 1 !== 0;
      let start = 0;
      const duration = 1200;
      const startTime = performance.now();
      function step(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = target * progress;
        el.textContent = isDecimal ? value.toFixed(1) : Math.round(value).toLocaleString();
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = isDecimal ? target.toFixed(1) : target.toLocaleString();
      }
      requestAnimationFrame(step);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach((c) => observer.observe(c));

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = "Application received — admissions will reach out within 3 business days.";
    form.reset();
  });
})();
