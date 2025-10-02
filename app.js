
document.addEventListener('DOMContentLoaded', async () => {
  const $ = (s, c=document)=>c.querySelector(s);
  const $$ = (s, c=document)=>Array.from(c.querySelectorAll(s));
  const show = el => el.classList.add('active');
  const hide = el => el.classList.remove('active');
  $$('.nav-link').forEach(b=>b.addEventListener('click',()=>{
    const t=b.getAttribute('data-target');
    $$('main section').forEach(hide);
    show($('#'+t+'-section'));
  }));
  show($('#clans-section'));

  // Load data
  const clans = await fetch('./data/clans.json').then(r=>r.json());
  const territories = await fetch('./data/territories.json').then(r=>r.json());

  // Sidebar
  const list = $('#clan-sidebar-list');
  list.innerHTML = clans.map(c => `
    <button class="w-full text-left p-3 rounded-lg hover:bg-yellow-50 transition all mb-2 border border-yellow-200" data-id="${c.id}">
      <div class="flex items-center gap-3">
        <img src="${c.crest}" alt="" width="36" height="36" onerror="this.style.display='none'">
        <div>
          <div class="font-semibold">${c.name}</div>
          <div class="text-xs text-gray-500">${c.region} • "${c.motto}"</div>
        </div>
      </div>
    </button>`).join('');

  // Map + layers
  let map = L.map('clanMap', { scrollWheelZoom:false }).setView([56.8,-4.2], 6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution:'&copy; OpenStreetMap'}).addTo(map);

  const terrLayer = L.geoJSON(territories, {
    style: f => ({ color: f.properties.color || '#2b6cb0', weight: 2, fillOpacity: 0.12 }),
    onEachFeature: (f, layer) => {
      layer.bindPopup(`<strong>${f.properties.name}</strong>`);
      layer._clanId = f.properties.id;
    }
  }).addTo(map);

  const markers = {};
  clans.forEach(c => {
    const m = L.marker([c.lat, c.lon]).addTo(map).bindPopup(`<strong>${c.name}</strong><br>${c.seats.join(', ')}`);
    markers[c.id] = m;
  });

  function zoomToClan(id) {
    const c = clans.find(x=>x.id===id); if (!c) return;
    map.setView([c.lat,c.lon], 7);
    markers[id].openPopup();
    // highlight polygon
    terrLayer.eachLayer(l => {
      const on = l._clanId === id;
      l.setStyle({ weight: on ? 4 : 2, fillOpacity: on ? 0.22 : 0.12, color: on ? '#ef4444' : (l.options.color || '#2b6cb0') });
    });
    // info card
    const info = $('#map-info');
    info.innerHTML = `
      <div class="content-card p-4 rounded-xl border">
        <div class="flex items-start gap-3">
          <img src="${c.crest}" alt="" width="64" height="64" onerror="this.style.display='none'">
          <div>
            <h4 class="text-xl font-bold mb-1">${c.name}</h4>
            <div class="text-sm text-gray-600 mb-1"><em>Motto:</em> ${c.motto}</div>
            <div class="text-sm text-gray-600 mb-1"><em>Region:</em> ${c.region}</div>
            <div class="text-sm text-gray-600"><em>Seats:</em> ${c.seats.join(', ')}</div>
          </div>
        </div>
      </div>`;
  }

  list.addEventListener('click', e => {
    const b = e.target.closest('[data-id]'); if (!b) return;
    $$('#clan-sidebar-list button').forEach(x=>x.classList.remove('active-item'));
    b.classList.add('active-item');
    zoomToClan(b.getAttribute('data-id'));
  });

  // Initial select first clan
  if (clans.length) {
    const first = clans[0].id;
    const firstBtn = list.querySelector('[data-id="'+first+'"]');
    if (firstBtn) firstBtn.classList.add('active-item');
    zoomToClan(first);
  }
});
