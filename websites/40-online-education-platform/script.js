// LearnLoop — progress ring animation, mobile nav, learning path tabs
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const ringFg = document.getElementById('ringFg');
  const circumference = 326.7;
  const pct = 0.72;
  requestAnimationFrame(() => {
    ringFg.style.strokeDashoffset = String(circumference * (1 - pct));
  });

  const paths = {
    design: [
      ['UX Design Fundamentals', '4 weeks'],
      ['Visual Design Systems', '3 weeks'],
      ['Prototyping with Figma', '2 weeks'],
      ['Portfolio Capstone', '3 weeks'],
    ],
    data: [
      ['SQL for Analysts', '3 weeks'],
      ['Python for Data', '4 weeks'],
      ['Data Visualization', '2 weeks'],
      ['Capstone Project', '3 weeks'],
    ],
    pm: [
      ['Product Fundamentals', '3 weeks'],
      ['User Research Methods', '2 weeks'],
      ['Roadmapping & Strategy', '3 weeks'],
      ['Launch Capstone', '2 weeks'],
    ],
  };

  const tabs = document.querySelectorAll('.path-tab');
  const panel = document.getElementById('pathPanel');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const steps = paths[tab.dataset.path];
      panel.innerHTML = `<ol class="path-steps">${steps.map(([name, dur]) => `<li><strong>${name}</strong><span>${dur}</span></li>`).join('')}</ol>`;
    });
  });
})();
