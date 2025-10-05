
document.addEventListener('DOMContentLoaded', async () => {
  const mount=document.getElementById('app');
  mount.outerHTML=`
<header class="p-3 bg-neutral-900 text-neutral-100 sticky top-0">The Clan Hearth — v2.3.1</header>
<main class="max-w-6xl mx-auto p-4">
  <section id="clans-section">
    <div class="mb-3 flex items-center justify-between">
      <div><button id="tab-index" class="pill tab-active">A–Z Index</button> <button id="tab-map" class="pill">Map</button></div>
      <div class="flex gap-2">
        <input id="clan-search" placeholder="Search clans or surnames..." class="border rounded px-3 py-2 w-64" />
        <select id="filter-region" class="border rounded px-2 py-2"><option value="all">All regions</option><option>Highlands</option><option>Islands</option><option>Lowlands</option><option>Borders</option><option>Argyll</option><option>Aberdeenshire</option></select>
      </div>
    </div>
    <div id="alpha-bar" class="mb-2"></div>
    <div id="clan-index-view"><div id="clan-index-grid" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3"></div><div id="index-empty" class="hidden">No results</div></div>
    <div id="clan-map-view" class="hidden"><div id="clanMap" class="mapbox"></div><div id="map-info" class="mt-2"></div></div>
  </section>
  <hr class="my-6">
  <section id="trip-builder-section">
    <div id="tripBuilderMap" class="mapbox"></div>
    <div id="poi-suggestions" class="my-2"></div>
    <div id="itinerary" class="grid md:grid-cols-2 gap-3"></div>
    <div class="mt-2 text-sm">£<span id="price-estimate">0</span> • <span id="total-distance">0</span> km • <span id="total-drive">0</span> h</div>
    <div class="mt-2 flex flex-wrap gap-2">
      <button id="create-itinerary-btn" class="pill">Create</button>
      <button id="save-itinerary-btn" class="pill">Save named</button>
      <button id="load-itinerary-btn" class="pill">Load named</button>
      <button id="optimize-route-btn" class="pill">Optimize</button>
      <button id="export-pdf-btn" class="pill">Export PDF</button>
      <select id="trip-type" class="pill"><option value="heritage">Heritage</option><option value="whisky">Whisky</option><option value="golf">Golf</option><option value="luxury">Luxury</option></select>
      <select id="trip-days" class="pill"><option>3</option><option selected>5</option><option>7</option><option>10</option></select>
      <select id="group-size" class="pill"><option>2</option><option selected>4</option><option>6</option><option>8</option></select>
    </div>
  </section>
</main>
<div id="message-box" class="hidden"><i id="message-icon" class="mr-2"></i><span id="message-text"></span></div>`;

  const $=(s,c=document)=>c.querySelector(s); const $$=(s,c=document)=>Array.from(c.querySelectorAll(s));
  const toast=(m,t='success')=>{const b=$('#message-box'),i=$('#message-icon'),x=$('#message-text');x.textContent=m;b.style.backgroundColor=t==='error'?'#dc2626':'#16a34a';i.className=t==='error'?'fas fa-exclamation-circle mr-2':'fas fa-check-circle mr-2';b.classList.remove('hidden');setTimeout(()=>b.classList.add('hidden'),2000)};

  const slug = s => String(s||'').toLowerCase().replace(/&/g,' and ').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
  const macVariants=x=>{const v=[]; if(/^mac/.test(x)) v.push(x.replace(/^mac/,'mc')); if(/^mc/.test(x)) v.push(x.replace(/^mc/,'mac')); return v; };
  const candidatesFor = clan => { const base=slug(clan.name.replace(/\\(.*?\\)/g,'')); const ss=(clan.surnames||[]).map(slug); const core=[base].concat(ss); const plus=core.flatMap(v=>[v,...macVariants(v)]); return Array.from(new Set(plus.concat(plus.map(v=>v.replace(/-/g,''))))); };
  const firstAvailable = srcs => srcs.map(src=>`<img src="${src}" loading="lazy" onerror="this.dataset.bad=1; const nx=this.nextElementSibling; if(nx && nx.tagName==='IMG'){ this.remove(); nx.style.display=''; } else { this.style.display='none'; }" style="">`).join('') + '<img style="display:none">';

  async function getJSON(p,f){ try{ const r=await fetch(p,{cache:'no-cache'}); if(!r.ok) throw 0; return await r.json(); } catch { return f; } }
  const clans=await getJSON('./data/clans.json', []);
  const surnamesMap=await getJSON('./data/surnames.json', {});

  // Tabs
  const tabIndexBtn=$('#tab-index'), tabMapBtn=$('#tab-map'), indexView=$('#clan-index-view'), mapView=$('#clan-map-view');
  function activateTab(which){ if(which==='index'){ tabIndexBtn.classList.add('tab-active'); tabMapBtn.classList.remove('tab-active'); indexView.classList.remove('hidden'); mapView.classList.add('hidden'); } else { tabMapBtn.classList.add('tab-active'); tabIndexBtn.classList.remove('tab-active'); indexView.classList.add('hidden'); mapView.classList.remove('hidden'); if(!window.__mapInit) initMap(); } }
  tabIndexBtn?.addEventListener('click',()=>activateTab('index')); tabMapBtn?.addEventListener('click',()=>activateTab('map'));

  // Alpha bar
  const letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''); const alpha=$('#alpha-bar'); if(alpha) alpha.innerHTML=letters.map(L=>`<button class="pill" data-letter="${L}">${L}</button>`).join('');

  // Index/search
  const grid=$('#clan-index-grid'), empty=$('#index-empty'), qInput=$('#clan-search'), regionSel=$('#filter-region');
  function highlight(text,q){ if(!q) return text; const re=new RegExp(`(${q.replace(/[.*+?^${}()|[\\]\\\\]/g,'\\\\$&')})`,'ig'); return text.replace(re,'<span class="bg-yellow-200">$1</span>'); }
  function cardHTML(c,q){ const emblem=firstAvailable(candidatesFor(c).map(v=>`assets/images/emblems/${v}-emblem.jpg`)); const tartan=firstAvailable(candidatesFor(c).map(v=>`assets/images/tartans/${v}-tartan.jpg`)); const seats=Array.isArray(c.seats)?c.seats.join(', '):String(c.seat||''); return `<article class="card" id="clan-${c.id}"><div class="flex items-start gap-3"><div style="width:56px;height:56px;overflow:hidden;border-radius:.5rem;border:1px solid #eee">${emblem}</div><div class="flex-1"><h4 class="font-semibold">${highlight(c.name,q)}</h4><div class="text-xs text-neutral-500">${c.region||''} ${c.motto?(' • "'+highlight(c.motto,q)+'"'):''}</div><div class="mt-2 text-sm">${seats?('Seats: '+highlight(seats,q)) : ''}</div><div class="mt-2 flex gap-2"><button class="pill open-drawer" data-id="${c.id}">Details</button><button class="pill view-on-map" data-id="${c.id}">View on map</button></div></div></div><div class="w-full h-20 object-cover rounded mt-3" style="overflow:hidden;border-radius:.5rem;border:1px solid #eee">${tartan}</div></article>`; }
  function filterClans(){ const q=(qInput?.value||'').trim().toLowerCase(); const r=(regionSel?.value||'all').toLowerCase(); let list=clans.filter(c=>{ const reg=(c.region||'').toLowerCase(); const regionOk=(r==='all')||reg.includes(r); const alias=(surnamesMap[c.id]||[]).join(' ').toLowerCase(); const text=`${c.name} ${c.motto||''} ${c.region||''} ${alias} ${Array.isArray(c.seats)?c.seats.join(' '):(c.seat||'')}`.toLowerCase(); return regionOk && (!q || text.includes(q)); }).sort((a,b)=>a.name.localeCompare(b.name)); grid.innerHTML=list.map(c=>cardHTML(c,q)).join(''); empty.classList.toggle('hidden', list.length>0); }
  filterClans();
  qInput?.addEventListener('input', filterClans); regionSel?.addEventListener('change', filterClans);
  alpha?.addEventListener('click', e=>{ const b=e.target.closest('[data-letter]'); if(!b) return; const L=b.dataset.letter; const list=clans.filter(c=>c.name.toUpperCase().startsWith(L)); grid.innerHTML=list.map(c=>cardHTML(c,(qInput?.value||'').trim().toLowerCase())).join(''); });

  grid?.addEventListener('click', e=>{
    const d=e.target.closest('.open-drawer'); if(d){ const c=clans.find(x=>x.id===d.dataset.id); if(c) openDrawer(c); }
    const vm=e.target.closest('.view-on-map'); if(vm){ const id=vm.dataset.id; activateTab('map'); setTimeout(()=>zoomToClan(id), 30); }
  });

  // Drawer
  const drawer=document.createElement('div'); // already exists in trimmed build? (not used in minimal)
  function openDrawer(c){ alert(`${c.name}\\n${c.motto||''}\\n${c.region||''}`); }

  // Map
  let map, markers={};
  function initMap(){ if(window.__mapInit) return; window.__mapInit=true; map=L.map('clanMap',{scrollWheelZoom:false}).setView([56.8,-4.2],6); L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; OpenStreetMap'}).addTo(map); clans.forEach(c=>{ const lat=typeof c.lat==='number'?c.lat:56.8, lon=typeof c.lon==='number'?c.lon:-4.2; const m=L.marker([lat,lon]).addTo(map).bindPopup(`<strong>${c.name}</strong>`); markers[c.id]=m; }); if(clans.length) zoomToClan(clans[0].id); }
  function zoomToClan(id){ const c=clans.find(x=>x.id===id); if(!c||!map) return; const lat=typeof c.lat==='number'?c.lat:56.8, lon=typeof c.lon==='number'?c.lon:-4.2; map.setView([lat,lon],7); markers[id]?.openPopup(); $('#map-info').innerHTML=`<div class="card"><div class="font-semibold">${c.name}</div><div class="text-xs">${c.region||''} ${c.motto?(' • "'+c.motto+'"'):''}</div></div>`; }

  // Trips (minimal)
  let tripMap=L.map('tripBuilderMap',{scrollWheelZoom:false}).setView([56.8,-4.2],6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; OpenStreetMap'}).addTo(tripMap);
  const tripLayer=L.layerGroup().addTo(tripMap);
  const defaultPOIs=[{name:'Eilean Donan Castle', lat:57.273, lon:-5.516, type:'heritage'},{name:'Inveraray Castle', lat:56.231, lon:-5.072, type:'heritage'}];
  document.getElementById('poi-suggestions').innerHTML=defaultPOIs.map(p=>`<button class="pill add-suggested" data-poi='${JSON.stringify(p)}'>Add ${p.name}</button>`).join(' ');
  let itinerary=[];
  function createItinerary(days){ itinerary=Array.from({length:days},(_,i)=>({day:i+1,items:[]})); renderItinerary(); redrawTrip(); }
  function addToDay(di,poi){ itinerary[di].items.push(poi); renderItinerary(); redrawTrip(); }
  function removeFromDay(di,ii){ itinerary[di].items.splice(ii,1); renderItinerary(); redrawTrip(); }
  function dist(a,b){ const R=6371,toRad=x=>x*Math.PI/180,dLat=toRad(b.lat-a.lat),dLon=toRad(b.lon-a.lon),q=Math.sin(dLat/2)**2+Math.cos(toRad(a.lat))*Math.cos(toRad(b.lat))*Math.sin(dLon/2)**2; return 2*R*Math.asin(Math.sqrt(q)); }
  function totals(){ let km=0; itinerary.forEach(d=>{ for(let i=1;i<d.items.length;i++){ km+=dist(d.items[i-1],d.items[i]); }}); return {km:Math.round(km), h:Math.round((km/60)*10)/10}; }
  function renderItinerary(){ const wrap=$('#itinerary'); wrap.innerHTML=itinerary.map((d,di)=>`<div class="card"><strong>Day ${d.day}</strong>${d.items.map((it,ii)=>`<div class="card it-item"><div class="flex items-center justify-between"><div>${ii+1}. ${it.name}</div><button class="pill remove" data-di="${di}" data-ii="${ii}">Remove</button></div></div>`).join('')}</div>`).join(''); $$('.remove',wrap).forEach(b=>b.addEventListener('click',()=>removeFromDay(+b.dataset.di,+b.dataset.ii))); const t=totals(); $('#total-distance').textContent=t.km; $('#total-drive').textContent=t.h.toString(); }
  function redrawTrip(){ tripLayer.clearLayers(); itinerary.forEach(d=>{ d.items.forEach(p=>tripLayer.addLayer(L.marker([p.lat,p.lon]).bindPopup(p.name))); if(d.items.length>=2){ L.polyline(d.items.map(p=>[p.lat,p.lon]),{weight:4}).addTo(tripLayer);} }); const all=itinerary.flatMap(d=>d.items).map(p=>[p.lat,p.lon]); if(all.length){ tripMap.fitBounds(L.latLngBounds(all),{padding:[20,20]}); } }
  document.getElementById('poi-suggestions').addEventListener('click', e=>{ const b=e.target.closest('.add-suggested'); if(!b) return; addToDay(0, JSON.parse(b.dataset.poi)); });
  document.getElementById('create-itinerary-btn').addEventListener('click', ()=>createItinerary(parseInt(document.getElementById('trip-days').value,10)));
  document.getElementById('optimize-route-btn').addEventListener('click', ()=>{ itinerary.forEach(d=>{ if(d.items.length<3)return; const start=d.items[0], rest=d.items.slice(1), ordered=[start]; let cur=start; while(rest.length){ let bi=0,b=Infinity; rest.forEach((p,i)=>{ const v=dist(cur,p); if(v<b){b=v;bi=i;} }); cur=rest.splice(bi,1)[0]; ordered.push(cur);} d.items=ordered; }); renderItinerary(); redrawTrip(); });
  createItinerary(5);
});
