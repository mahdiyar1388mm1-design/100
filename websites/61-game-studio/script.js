// Dreamforge Studios — interactive 3D cube, auto-rotation, mobile nav, application form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const cube = document.getElementById('cube');
  const stage = document.getElementById('cubeStage');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let autoAngle = 25;
  let tiltX = -15;
  let tiltY = 25;
  let userActive = false;

  if (cube) {
    if (!reduceMotion) {
      function autoRotate() {
        if (!userActive) {
          autoAngle += 0.25;
          cube.style.transform = `rotateX(-15deg) rotateY(${autoAngle}deg)`;
        }
        requestAnimationFrame(autoRotate);
      }
      requestAnimationFrame(autoRotate);

      stage.addEventListener('pointermove', (e) => {
        userActive = true;
        const rect = stage.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;
        tiltY = autoAngle + relX * 60;
        tiltX = -relY * 60;
        cube.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      });
      stage.addEventListener('pointerleave', () => { userActive = false; });
    }
  }

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = "Application received — our recruiting team will be in touch.";
    form.reset();
  });
})();
