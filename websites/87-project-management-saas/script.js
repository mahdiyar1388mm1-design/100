// Taskflow — kanban board render, mobile nav, form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const columns = [
    { name: 'Backlog', cards: [
      { tag: 'feature', tagClass: 'feature', title: 'Design onboarding flow v2', avatar: 'kf-a1' },
      { tag: 'bug', tagClass: 'bug', title: 'Fix timezone bug on due dates', avatar: 'kf-a2' },
    ]},
    { name: 'In Progress', cards: [
      { tag: 'feature', tagClass: 'feature', title: 'Build sprint velocity chart', avatar: 'kf-a3' },
      { tag: 'design', tagClass: 'design', title: 'Redesign card detail modal', avatar: 'kf-a4' },
      { tag: 'feature', tagClass: 'feature', title: 'Slack notification integration', avatar: 'kf-a1' },
    ]},
    { name: 'Done', cards: [
      { tag: 'bug', tagClass: 'bug', title: 'Resolve drag-and-drop lag', avatar: 'kf-a2' },
      { tag: 'feature', tagClass: 'feature', title: 'Launch dark mode', avatar: 'kf-a3' },
    ]},
  ];

  const kanban = document.getElementById('kanban');
  kanban.innerHTML = columns.map((col) => `
    <div class="kanban-col">
      <h3>${col.name} <span>${col.cards.length}</span></h3>
      ${col.cards.map((c) => `
        <div class="kcard">
          <span class="kcard-tag ${c.tagClass}">${c.tag}</span>
          <p>${c.title}</p>
          <div class="assignee"><img src="https://picsum.photos/seed/${c.avatar}/44/44" alt="" loading="lazy"> Assigned</div>
        </div>`).join('')}
    </div>`).join('');

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = "You're in! Check your email to set up your first board.";
    form.reset();
  });
})();
