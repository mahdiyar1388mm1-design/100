// SkillMarket — filterable/sortable course grid, mobile nav, teach form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const courses = [
    { title: 'Complete UI/UX Design Bootcamp', instructor: 'Naomi Ellis', category: 'Design', level: 'Beginner', price: 49, rating: 4.8, seed: 'sm1' },
    { title: 'Advanced React Patterns', instructor: 'Diego Fuentes', category: 'Development', level: 'Advanced', price: 89, rating: 4.9, seed: 'sm2' },
    { title: 'Growth Marketing Fundamentals', instructor: 'Casey Wu', category: 'Marketing', level: 'Beginner', price: 39, rating: 4.6, seed: 'sm3' },
    { title: 'Financial Modeling for Startups', instructor: 'Renee Okafor', category: 'Business', level: 'Intermediate', price: 69, rating: 4.7, seed: 'sm4' },
    { title: 'Portrait Photography Masterclass', instructor: 'Tomas Berg', category: 'Photography', level: 'Intermediate', price: 59, rating: 4.8, seed: 'sm5' },
    { title: 'Python for Data Analysis', instructor: 'Lena Fischer', category: 'Development', level: 'Beginner', price: 45, rating: 4.7, seed: 'sm6' },
    { title: 'Brand Identity Design', instructor: 'Marcus Webb', category: 'Design', level: 'Intermediate', price: 55, rating: 4.5, seed: 'sm7' },
    { title: 'SEO & Content Strategy', instructor: 'Ana Petrov', category: 'Marketing', level: 'Advanced', price: 75, rating: 4.6, seed: 'sm8' },
  ];

  const grid = document.getElementById('courseGrid');
  const resultCount = document.getElementById('resultCount');
  const priceFilter = document.getElementById('priceFilter');
  const priceLabel = document.getElementById('priceLabel');
  const levelFilter = document.getElementById('levelFilter');
  const sortSelect = document.getElementById('sortSelect');
  const searchInput = document.getElementById('searchInput');
  const categoryChecks = document.querySelectorAll('.f-category');

  function render() {
    const maxPrice = parseInt(priceFilter.value, 10);
    priceLabel.textContent = `$${maxPrice}`;
    const level = levelFilter.value;
    const query = searchInput.value.trim().toLowerCase();
    const activeCategories = [...categoryChecks].filter((c) => c.checked).map((c) => c.value);

    let filtered = courses.filter((c) =>
      activeCategories.includes(c.category) &&
      c.price <= maxPrice &&
      (level === 'all' || c.level === level) &&
      (query === '' || c.title.toLowerCase().includes(query) || c.instructor.toLowerCase().includes(query))
    );

    const sort = sortSelect.value;
    if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);

    resultCount.textContent = `${filtered.length} course${filtered.length === 1 ? '' : 's'}`;

    grid.innerHTML = filtered.length
      ? filtered.map((c) => `
        <article class="course-card">
          <img src="https://picsum.photos/seed/${c.seed}/500/310" alt="Course thumbnail for ${c.title}" loading="lazy">
          <div class="course-card-body">
            <span class="course-cat">${c.category} · ${c.level}</span>
            <h3>${c.title}</h3>
            <p class="course-instr">${c.instructor}</p>
            <div class="course-foot">
              <span class="course-rating">★ ${c.rating}</span>
              <span class="course-price">$${c.price}</span>
            </div>
          </div>
        </article>`).join('')
      : '<p class="no-results">No courses match your filters. Try widening your search.</p>';
  }

  [priceFilter, levelFilter, sortSelect, searchInput].forEach((el) => el.addEventListener('input', render));
  categoryChecks.forEach((c) => c.addEventListener('change', render));
  render();

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = "Thanks! Our instructor team will review your application soon.";
    form.reset();
  });
})();
