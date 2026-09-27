// PromptHub — mobile nav, category filter, search, sort
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const tools = [
    { name: 'CopyForge', cat: 'writing', rating: 4.8, reviews: 1240, desc: 'Long-form marketing copy generator with brand-voice memory.', tags: ['GPT-4', 'SEO'], icon: '✎', date: 3 },
    { name: 'PixelDream', cat: 'image', rating: 4.9, reviews: 2310, desc: 'Photoreal product image generation from text prompts.', tags: ['Diffusion', 'Commerce'], icon: '◆', date: 1 },
    { name: 'CodePilot X', cat: 'code', rating: 4.7, reviews: 980, desc: 'In-editor pair programmer trained on your own codebase.', tags: ['IDE', 'Refactor'], icon: '</>', date: 5 },
    { name: 'VoiceForge', cat: 'voice', rating: 4.6, reviews: 540, desc: 'Realistic multilingual voiceover generation in 40 languages.', tags: ['TTS', 'Dubbing'], icon: '♪', date: 8 },
    { name: 'DataSense', cat: 'data', rating: 4.8, reviews: 1670, desc: 'Ask questions about your spreadsheets in plain English.', tags: ['Analytics', 'SQL'], icon: '▤', date: 2 },
    { name: 'BlogMuse', cat: 'writing', rating: 4.5, reviews: 720, desc: 'SEO-optimized blog drafts from a single keyword.', tags: ['SEO', 'Drafts'], icon: '✎', date: 12 },
    { name: 'LogoMind', cat: 'image', rating: 4.4, reviews: 410, desc: 'Vector logo concepts generated from a brand brief.', tags: ['Branding', 'Vector'], icon: '◆', date: 20 },
    { name: 'BugSweep AI', cat: 'code', rating: 4.9, reviews: 1120, desc: 'Automated code review that catches bugs before merge.', tags: ['CI/CD', 'Review'], icon: '</>', date: 4 },
    { name: 'ChartWise', cat: 'data', rating: 4.6, reviews: 390, desc: 'Turns raw CSVs into presentation-ready charts instantly.', tags: ['Charts', 'Reports'], icon: '▤', date: 15 },
  ];

  let cat = 'all', sort = 'rating', query = '';
  const grid = document.getElementById('toolGrid');

  function render() {
    let list = tools.filter((t) => (cat === 'all' || t.cat === cat) && t.name.toLowerCase().includes(query));
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    if (sort === 'newest') list.sort((a, b) => a.date - b.date);
    if (sort === 'reviews') list.sort((a, b) => b.reviews - a.reviews);

    grid.innerHTML = list.map((t) => `
      <article class="tool-card">
        <div class="tool-head">
          <span class="tool-icon">${t.icon}</span>
          <div><h3>${t.name}</h3><span class="rating">★ ${t.rating} (${t.reviews})</span></div>
        </div>
        <p>${t.desc}</p>
        <div class="tool-tags">${t.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
      </article>`).join('') || '<p>No tools match your search.</p>';
    document.getElementById('resultCount').textContent = `${list.length} tools found`;
  }
  render();

  document.querySelectorAll('.cat-item').forEach((btn) => btn.addEventListener('click', () => {
    document.querySelectorAll('.cat-item').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    cat = btn.dataset.cat;
    render();
  }));
  document.getElementById('sortSelect').addEventListener('change', (e) => { sort = e.target.value; render(); });
  document.getElementById('searchInput').addEventListener('input', (e) => { query = e.target.value.toLowerCase(); render(); });
})();
