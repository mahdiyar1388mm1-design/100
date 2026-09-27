// GitForge — animated terminal typing sequence, copy-to-clipboard, mobile nav, form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const lines = [
    '$ git push origin main',
    'Analyzing changes... done',
    'Running 214 tests... passed',
    'Building container image... done',
    'Deploying to production...',
    '✔ Deployed to https://app.gitforge.dev in 42s',
  ];
  const output = document.getElementById('terminalOutput');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function typeLines(lineIndex, charIndex, text) {
    if (lineIndex >= lines.length) {
      setTimeout(() => { output.textContent = ''; typeLines(0, 0, ''); }, 2500);
      return;
    }
    const line = lines[lineIndex];
    if (charIndex <= line.length) {
      output.textContent = text + line.slice(0, charIndex) + (charIndex < line.length ? '' : '\n');
      setTimeout(() => typeLines(lineIndex, charIndex + 1, charIndex < line.length ? text : text + line + '\n'), 18);
    } else {
      setTimeout(() => typeLines(lineIndex + 1, 0, text + line + '\n'), 250);
    }
  }
  if (reduceMotion) {
    output.textContent = lines.join('\n');
  } else {
    typeLines(0, 0, '');
  }

  document.getElementById('copyBtn').addEventListener('click', () => {
    const text = document.getElementById('installCmd').textContent;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById('copyBtn');
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = original; }, 1500);
      });
    }
  });

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = '$ account created — check your inbox for a verification link.';
    form.reset();
  });
})();
