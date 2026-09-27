// ShopPanel — admin KPI/orders/stock render, mobile nav, form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const kpis = [
    { label: 'Revenue', value: '$48,210' },
    { label: 'Orders', value: '1,284' },
    { label: 'Avg. order', value: '$37.50' },
    { label: 'Returns', value: '1.8%' },
  ];
  document.getElementById('kpiRow').innerHTML = kpis.map((k) =>
    `<div class="kpi"><span>${k.label}</span><strong>${k.value}</strong></div>`
  ).join('');

  const orders = [
    { id: '#10432', customer: 'Maya Torres', status: 'shipped', total: '$84.00' },
    { id: '#10431', customer: 'Liam Chen', status: 'processing', total: '$156.20' },
    { id: '#10430', customer: 'Ava Petrov', status: 'pending', total: '$42.99' },
    { id: '#10429', customer: 'Noah García', status: 'shipped', total: '$210.00' },
  ];
  document.getElementById('ordersBody').innerHTML = orders.map((o) => `
    <tr>
      <td>${o.id}</td>
      <td>${o.customer}</td>
      <td><span class="status ${o.status}">${o.status}</span></td>
      <td>${o.total}</td>
    </tr>`).join('');

  const stock = [
    { name: 'Canvas Tote — Natural', qty: 4 },
    { name: 'Ceramic Mug Set', qty: 2 },
    { name: 'Linen Throw Blanket', qty: 6 },
    { name: 'Wool Beanie — Charcoal', qty: 3 },
  ];
  document.getElementById('stockList').innerHTML = stock.map((s) =>
    `<li><span>${s.name}</span><span class="qty">${s.qty} left</span></li>`
  ).join('');

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = "You're all set — check your email to finish setting up ShopPanel.";
    form.reset();
  });
})();
