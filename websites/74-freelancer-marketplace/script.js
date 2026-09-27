// GigSphere — gig grid, mobile nav, post project form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const gigs = [
    { title: 'I will design a modern logo and brand kit', seller: 'Nova Vega', rating: 4.9, price: 120, seed: 'gig1' },
    { title: 'I will build a responsive website in React', seller: 'Kai Marsh', rating: 5.0, price: 450, seed: 'gig2' },
    { title: 'I will write SEO-optimized blog content', seller: 'Ada Osei', rating: 4.8, price: 60, seed: 'gig3' },
    { title: 'I will edit your podcast episode', seller: 'Rin Okabe', rating: 4.7, price: 80, seed: 'gig4' },
    { title: 'I will create a social media ad campaign', seller: 'Priya N.', rating: 4.9, price: 200, seed: 'gig5' },
    { title: 'I will animate a 30-second explainer video', seller: 'Owen C.', rating: 4.8, price: 350, seed: 'gig6' },
    { title: 'I will set up your e-commerce store', seller: 'Lena F.', rating: 4.9, price: 300, seed: 'gig7' },
    { title: 'I will compose original background music', seller: 'Marcus W.', rating: 5.0, price: 150, seed: 'gig8' },
  ];

  document.getElementById('gigGrid').innerHTML = gigs.map((g) => `
    <article class="gig-card">
      <img src="https://picsum.photos/seed/${g.seed}/400/300" alt="Sample work for gig: ${g.title}" loading="lazy">
      <div class="gig-body">
        <div class="gig-seller"><img src="https://picsum.photos/seed/${g.seed}-avatar/60/60" alt="Photo of ${g.seller}"><span>${g.seller}</span></div>
        <p class="gig-title">${g.title}</p>
        <div class="gig-foot"><span class="gig-rating">★ ${g.rating}</span><span class="gig-price">From $${g.price}</span></div>
      </div>
    </article>`).join('');

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = "Project posted — freelancers will start sending proposals soon.";
    form.reset();
  });
})();
