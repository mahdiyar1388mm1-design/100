// Nordly Home — mobile nav, room tabs, interactive hotspots, newsletter form
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const rooms = {
    living: { img: 'nordly-living', hotspots: [
      { top: 52, left: 23, name: 'Fjeld Lounge Chair', price: '$890', desc: 'Solid oak frame, wool bouclé upholstery, hand-finished joints.' },
      { top: 66, left: 55, name: 'Aske Coffee Table', price: '$420', desc: 'Live-edge oak top on a tapered three-leg base.' },
      { top: 30, left: 78, name: 'Bo Floor Lamp', price: '$260', desc: 'Linen shade with a warm dimmable brass base.' },
    ]},
    dining: { img: 'nordly-dining', hotspots: [
      { top: 48, left: 35, name: 'Enkel Dining Table', price: '$1,180', desc: 'Extendable solid oak table, seats 6 to 8.' },
      { top: 60, left: 60, name: 'Smal Dining Chair', price: '$210', desc: 'Steam-bent oak chair with woven paper cord seat.' },
      { top: 22, left: 50, name: 'Ring Pendant Light', price: '$310', desc: 'Blown glass pendant with brushed brass ring.' },
    ]},
    bedroom: { img: 'nordly-bedroom', hotspots: [
      { top: 55, left: 40, name: 'Hvile Bed Frame', price: '$960', desc: 'Low-profile oak bed frame with integrated nightstands.' },
      { top: 35, left: 72, name: 'Myk Reading Chair', price: '$540', desc: 'Bouclé armchair on a bent-oak swivel base.' },
      { top: 70, left: 18, name: 'Uld Wool Throw', price: '$95', desc: 'Undyed wool throw, hand-finished fringe.' },
    ]},
  };

  const roomImg = document.getElementById('roomImg');
  const scene = document.querySelector('.room-scene');
  const card = document.getElementById('hotspotCard');

  function renderRoom(key) {
    const data = rooms[key];
    roomImg.src = `https://picsum.photos/seed/${data.img}/1200/750`;
    scene.querySelectorAll('.hotspot').forEach((h) => h.remove());
    data.hotspots.forEach((h) => {
      const btn = document.createElement('button');
      btn.className = 'hotspot';
      btn.style.top = h.top + '%';
      btn.style.left = h.left + '%';
      btn.textContent = '+';
      btn.dataset.name = h.name; btn.dataset.price = h.price; btn.dataset.desc = h.desc;
      btn.addEventListener('click', () => showHotspot(h));
      scene.insertBefore(btn, card);
    });
    card.hidden = true;
  }
  function showHotspot(h) {
    document.getElementById('hcName').textContent = h.name;
    document.getElementById('hcDesc').textContent = h.desc;
    document.getElementById('hcPrice').textContent = h.price;
    card.hidden = false;
  }
  document.getElementById('hotspotClose').addEventListener('click', () => (card.hidden = true));
  renderRoom('living');

  document.querySelectorAll('.room-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.room-tab').forEach((t) => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active'); tab.setAttribute('aria-selected', 'true');
      renderRoom(tab.dataset.room);
    });
  });

  const form = document.getElementById('newsletterForm');
  const note = document.getElementById('formNote');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.value.trim());
    note.textContent = valid ? 'Welcome — 10% off code sent to your inbox.' : 'Please enter a valid email address.';
    if (valid) form.reset();
  });
})();
