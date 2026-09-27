// Lumé Beauty — mobile nav, shade quiz, before/after compare slider
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  // Quiz
  const answers = {};
  const steps = document.querySelectorAll('.quiz-step');
  const result = document.querySelector('.quiz-result');
  function goToStep(n) {
    steps.forEach((s) => s.classList.toggle('active', Number(s.dataset.step) === n));
    result.classList.remove('active');
  }
  steps.forEach((step) => {
    step.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('click', () => {
        const stepNum = Number(step.dataset.step);
        if (stepNum === 1) answers.undertone = btn.dataset.value;
        if (stepNum === 2) answers.depth = btn.dataset.value;
        if (stepNum === 3) answers.finish = btn.dataset.value;
        if (stepNum < 3) {
          goToStep(stepNum + 1);
        } else {
          steps.forEach((s) => s.classList.remove('active'));
          result.classList.add('active');
          const shadeName = `${answers.depth[0].toUpperCase()}${answers.depth.slice(1)} ${answers.undertone[0].toUpperCase()}${answers.undertone.slice(1)} — Skin Tint No.${Math.floor(Math.random() * 5) + 1}`;
          document.getElementById('resultShade').textContent = shadeName;
          document.getElementById('resultDesc').textContent = `Recommended finish: ${answers.finish}. This match is based on your undertone and depth.`;
        }
      });
    });
  });
  document.getElementById('quizRestart').addEventListener('click', () => goToStep(1));

  // Before/after compare slider
  const wrap = document.getElementById('beforeWrap');
  const range = document.getElementById('compareRange');
  const handle = document.getElementById('compareHandle');
  function update() {
    const v = range.value;
    wrap.style.width = v + '%';
    handle.style.left = v + '%';
  }
  range.addEventListener('input', update);
  update();
})();
