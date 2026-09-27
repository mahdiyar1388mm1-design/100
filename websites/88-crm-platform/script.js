// Clientele CRM — pipeline stages render, contacts table render, mobile nav, form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const stages = [
    { name: 'Lead', deals: [ { name: 'Fenwick Retail', value: '$12,000' }, { name: 'Marlow Group', value: '$8,400' } ] },
    { name: 'Qualified', deals: [ { name: 'Brightline Co.', value: '$24,000' }, { name: 'Solace Health', value: '$15,750' } ] },
    { name: 'Negotiation', deals: [ { name: 'Vertex Logistics', value: '$41,200' } ] },
    { name: 'Won', deals: [ { name: 'Northgate Media', value: '$32,900' }, { name: 'Kestrel Labs', value: '$19,000' } ] },
  ];
  document.getElementById('pipelineStages').innerHTML = stages.map((s) => `
    <div class="stage">
      <h3>${s.name} <span>${s.deals.length}</span></h3>
      ${s.deals.map((d) => `<div class="deal-card"><strong>${d.name}</strong><span>${d.value}</span></div>`).join('')}
    </div>`).join('');

  const allValues = stages.flatMap((s) => s.deals.map((d) => Number(d.value.replace(/[$,]/g, ''))));
  const total = allValues.reduce((a, b) => a + b, 0);
  document.getElementById('totalValue').textContent = `$${total.toLocaleString()} total pipeline`;

  const contacts = [
    { name: 'Elena Marsh', company: 'Fenwick Retail', stage: 'lead', last: '2 days ago', value: '$12,000' },
    { name: 'Tomas Reyes', company: 'Brightline Co.', stage: 'negotiation', last: '5 hours ago', value: '$24,000' },
    { name: 'Priya Nair', company: 'Vertex Logistics', stage: 'negotiation', last: 'Yesterday', value: '$41,200' },
    { name: 'Daniel Kwan', company: 'Northgate Media', stage: 'won', last: '1 week ago', value: '$32,900' },
    { name: 'Sofia Bianchi', company: 'Solace Health', stage: 'lead', last: '3 days ago', value: '$15,750' },
  ];
  document.getElementById('contactsBody').innerHTML = contacts.map((c) => `
    <tr>
      <td>${c.name}</td>
      <td>${c.company}</td>
      <td><span class="badge ${c.stage}">${c.stage}</span></td>
      <td>${c.last}</td>
      <td>${c.value}</td>
    </tr>`).join('');

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = "Thanks — we'll reach out to schedule your demo shortly.";
    form.reset();
  });
})();
