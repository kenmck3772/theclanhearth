
document.addEventListener('DOMContentLoaded', async () => {
  const $ = (s, c=document)=>c.querySelector(s);
  const $$ = (s, c=document)=>Array.from(c.querySelectorAll(s));
  const show = el => el.classList.add('active');
  const hide = el => el.classList.remove('active');
  const toast = (msg, type='success') => {
    const box = document.getElementById('message-box');
    const icon = document.getElementById('message-icon');
    const text = document.getElementById('message-text');
    text.textContent = msg;
    box.style.backgroundColor = type === 'error' ? '#dc2626' : '#16a34a';
    icon.className = type === 'error' ? 'fas fa-exclamation-circle mr-2' : 'fas fa-check-circle mr-2';
    box.classList.remove('hidden'); setTimeout(() => box.classList.add('hidden'), 2000);
  };

  $$('.nav-link').forEach(b=>b.addEventListener('click',()=>{
    const t=b.getAttribute('data-target'); if (!t) return;
    $$('main section').forEach(hide); show($('#'+t+'-section'));
    if (t==='clans') activateTab('index');
  }));
  show($('#home-section'));

  const tabIndexBtn = $('#tab-index'), tabMapBtn = $('#tab-map');
  const indexView = $('#clan-index-view'), mapView = $('#clan-map-view');
  function activateTab(which) {
    if (which==='index'){ tabIndexBtn.classList.add('tab-active'); tabMapBtn.classList.remove('tab-active'); indexView.classList.remove('hidden'); mapView.classList.add('hidden'); }
    else { tabMapBtn.classList.add('tab-active'); tabIndexBtn.classList.remove('tab-active'); indexView.classList.add('hidden'); mapView.classList.remove('hidden'); setTimeout(()=>{ if (!window.__mapInit) initMap(); }, 0); }
  }
  tabIndexBtn.addEventListener('click', ()=>activateTab('index'));
  tabMapBtn.addEventListener('click', ()=>activateTab('map'));

  async function getJSON(path, fallback){ try{ const r=await fetch(path); if(!r.ok) throw 0; return await r.json(); } catch { return fallback; } }
  const fallbackClans=[{id:'mackenzie',name:'Clan MacKenzie',motto:'Luceo Non Uro',region:'Highlands',seats:['Castle Leod','Eilean Donan'],lat:57.59,lon:-4.45,crest:'assets/images/crests/mackenzie.png'}];
  const clans = await getJSON('./data/clans.json', fallbackClans);
  const territories = await getJSON('./data/territories.json', {type:'FeatureCollection',features:[]});

  // A–Z Index
  const grid = $('#clan-index-grid'), empty=$('#index-empty'), qInput=$('#clan-search'), regionSel=$('#filter-region');
  function renderIndex(list){
    grid.innerHTML = list.map(c=>`
      <article class="card">
        <div class="flex items-start gap-3">
          <img src="${c.crest||''}" width="56" height="56" onerror="this.style.display='none'">
          <div class="flex-1">
            <h4 class="font-semibold">${c.name}</h4>
            <div class="text-xs text-neutral-500">${c.region} • "${c.motto||''}"</div>
            <div class="mt-2 text-sm">Seats: ${(c.seats||[]).join(', ')}</div>
            <div class="mt-3"><button class="pill view-on-map" data-id="${c.id}"><i class="fas fa-map mr-1"></i>View on map</button></div>
          </div>
        </div>
      </article>`).join('');
    empty.classList.toggle('hidden', list.length>0);
  }
  function filterClans(){
    const q=qInput.value.trim().toLowerCase(); const r=regionSel.value;
    const list=clans.filter(c=>{
      const regionOk = (r==='all') || (String(c.region).toLowerCase()===r.toLowerCase());
      const text = `${c.name} ${c.motto||''} ${c.region} ${(c.seats||[]).join(' ')}`.toLowerCase();
      return regionOk && (!q || text.includes(q));
    }).sort((a,b)=>a.name.localeCompare(b.name));
    renderIndex(list);
  }
  qInput.addEventListener('input', filterClans);
  regionSel.addEventListener('change', filterClans);
  renderIndex(clans.sort((a,b)=>a.name.localeCompare(b.name)));
  grid.addEventListener('click', e=>{ const b=e.target.closest('.view-on-map'); if(!b)return; activateTab('map'); setTimeout(()=>zoomToClan(b.getAttribute('data-id')), 50); });

  // Map
  let map, terrLayer, markers={};
  function initMap(){
    if (window.__mapInit) return; window.__mapInit=true;
    map=L.map('clanMap',{scrollWheelZoom:false}).setView([56.8,-4.2],6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; OpenStreetMap'}).addTo(map);
    terrLayer = L.geoJSON(territories, { style:f=>({color:f.properties?.color||'#2b6cb0',weight:2,fillOpacity:0.12}), onEachFeature:(f,l)=>{l._clanId=f.properties?.id; l.bindPopup(`<strong>${f.properties?.name||''}</strong>`);} }).addTo(map);
    clans.forEach(c=>{ const m=L.marker([c.lat,c.lon]).addTo(map).bindPopup(`<strong>${c.name}</strong><br>${(c.seats||[]).join(', ')}`); markers[c.id]=m; });
    const list=$('#clan-sidebar-list');
    list.innerHTML=clans.map(c=>`
      <button class="w-full text-left p-3 rounded-lg hover:bg-yellow-50 transition all mb-2 border border-yellow-200" data-id="${c.id}">
        <div class="flex items-center gap-3">
          <img src="${c.crest||''}" width="32" height="32" onerror="this.style.display='none'">
          <div><div class="font-semibold">${c.name}</div><div class="text-xs text-gray-500">${c.region} • "${c.motto||''}"</div></div>
        </div>
      </button>`).join('');
    list.addEventListener('click', e=>{ const b=e.target.closest('[data-id]'); if(!b)return; $$('#clan-sidebar-list button').forEach(x=>x.classList.remove('active-item')); b.classList.add('active-item'); zoomToClan(b.getAttribute('data-id')); });
    if (clans.length){ const first=clans[0].id; const firstBtn=list.querySelector('[data-id="'+first+'"]'); if(firstBtn) firstBtn.classList.add('active-item'); zoomToClan(first); }
  }
  function zoomToClan(id){
    const c=clans.find(x=>x.id===id); if(!c||!map)return;
    map.setView([c.lat,c.lon],7); markers[id]?.openPopup();
    terrLayer && terrLayer.eachLayer(l=>{ const on=l._clanId===id; l.setStyle({weight:on?4:2,fillOpacity:on?.22:.12,color:on?'#ef4444':(l.options.color||'#2b6cb0')}); });
    const info=$('#map-info');
    info.innerHTML=`<div class="content-card p-4 rounded-xl border">
      <div class="flex items-start gap-3">
        <img src="${c.crest||''}" width="64" height="64" onerror="this.style.display='none'">
        <div><h4 class="text-xl font-bold mb-1">${c.name}</h4>
          <div class="text-sm text-gray-600 mb-1"><em>Motto:</em> ${c.motto||''}</div>
          <div class="text-sm text-gray-600 mb-1"><em>Region:</em> ${c.region||''}</div>
          <div class="text-sm text-gray-600"><em>Seats:</em> ${(c.seats||[]).join(', ')}</div>
        </div></div></div>`;
  }

  // Legends grid
  (async()=>{
    const legends = await getJSON('./data/legends.json', []);
    const grid = $('#legends-grid');
    grid.innerHTML = legends.map(l=>`<article class="card"><h4 class="font-semibold mb-1">${l.name}</h4><p class="text-sm text-neutral-700">${l.summary||''}</p></article>`).join('');
  })();
});
