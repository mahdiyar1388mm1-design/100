// Victoria Sterling — quote rotator, mobile nav, contact form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const quotes = [
    { text: '"The most dangerous leadership myth is that great leaders never rest."', author: 'Keynote — Forbes Under 40 Summit' },
    { text: '"Clarity is a leadership skill, not a personality trait. It can be learned."', author: 'Keynote — Global SaaS Conference' },
    { text: '"Your calendar is a values statement whether you meant it to be or not."', author: 'Keynote — Women in Leadership Forum' },
  ];
  let qi = 0;
  function showQuote(i) {
    qi = i;
    document.getElementById('quoteText').textContent = quotes[i].text;
    document.getElementById('quoteAuthor').textContent = quotes[i].author;
  }
  showQuote(0);
  setInterval(() => showQuote((qi + 1) % quotes.length), 5500);

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = "Thank you — Victoria's team will respond within three business days.";
    form.reset();
  });
})();
