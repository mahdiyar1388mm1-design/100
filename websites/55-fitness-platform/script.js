// PulseFit — animated stat counters, class schedule, mobile nav, trial form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  function animateCount(el, target, suffix) {
    const duration = 1200;
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(target * progress).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const statSection = document.querySelector('.stat-strip');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(document.getElementById('statUsers'), 820000, '+');
        animateCount(document.getElementById('statWorkouts'), 12500000, '+');
        animateCount(document.getElementById('statCoaches'), 340, '+');
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });
  observer.observe(statSection);

  const classes = [
    ['6:00 AM', 'Sunrise HIIT — Coach Malik'],
    ['12:00 PM', 'Power Lunch Strength — Coach Reyna'],
    ['5:30 PM', 'Full-Body Flow — Coach Tessa'],
    ['7:00 PM', 'Endurance Ride — Coach Malik'],
  ];
  document.getElementById('classSchedule').innerHTML = classes.map(([time, name]) => `
    <div class="class-row"><span class="class-time">${time}</span><span>${name}</span><button class="class-btn">Reserve</button></div>`).join('');

  document.querySelectorAll('.class-btn').forEach((btn) => {
    btn.addEventListener('click', () => { btn.textContent = 'Reserved ✓'; btn.disabled = true; });
  });

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = "Trial started — check your email to set up your first workout.";
    form.reset();
  });
})();
