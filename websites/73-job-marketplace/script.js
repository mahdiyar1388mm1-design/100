// HireWave — filterable job list, mobile nav, search, post-a-job form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const jobs = [
    { title: 'Senior Frontend Engineer', company: 'Northwind Digital', location: 'Remote', type: 'Full-time', salary: 130 },
    { title: 'Marketing Coordinator', company: 'Bloomfield & Co.', location: 'Austin, TX', type: 'Full-time', salary: 55 },
    { title: 'Freelance Copywriter', company: 'Verve Media', location: 'Remote', type: 'Contract', salary: 45 },
    { title: 'Warehouse Associate', company: 'Cargoline Logistics', location: 'Chicago, IL', type: 'Part-time', salary: 42 },
    { title: 'Product Designer', company: 'Pixelworks', location: 'Remote', type: 'Full-time', salary: 105 },
    { title: 'Data Analyst', company: 'Ledgerline', location: 'New York, NY', type: 'Full-time', salary: 85 },
  ];

  const jobList = document.getElementById('jobList');
  const resultCount = document.getElementById('resultCount');
  const salaryFilter = document.getElementById('salaryFilter');
  const salaryLabel = document.getElementById('salaryLabel');
  const typeChecks = document.querySelectorAll('.f-type');

  function render() {
    const minSalary = parseInt(salaryFilter.value, 10);
    salaryLabel.textContent = `$${minSalary}k`;
    const activeTypes = [...typeChecks].filter((c) => c.checked).map((c) => c.value);
    const filtered = jobs.filter((j) => activeTypes.includes(j.type) && j.salary >= minSalary);
    resultCount.textContent = `${filtered.length} job${filtered.length === 1 ? '' : 's'}`;
    jobList.innerHTML = filtered.length
      ? filtered.map((j) => `
        <article class="job-card">
          <div>
            <h3>${j.title}</h3>
            <span class="job-meta">${j.company} · ${j.location} · ${j.type} · <span class="job-salary">$${j.salary}k+</span></span>
          </div>
          <button class="job-apply">Apply</button>
        </article>`).join('')
      : '<p class="no-results">No jobs match your filters. Try adjusting them.</p>';

    jobList.querySelectorAll('.job-apply').forEach((btn) => {
      btn.addEventListener('click', () => { btn.textContent = 'Applied ✓'; btn.disabled = true; });
    });
  }
  salaryFilter.addEventListener('input', render);
  typeChecks.forEach((c) => c.addEventListener('change', render));
  render();

  document.getElementById('searchForm').addEventListener('submit', (e) => e.preventDefault());

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = "Job posting received — it will go live after a quick review.";
    form.reset();
  });
})();
