
// Trips v2 + Clan Detail Drawer
document.addEventListener('DOMContentLoaded', async () => {
  const $ = (s, c=document)=>c.querySelector(s);
  const $$ = (s, c=document)=>Array.from(c.querySelectorAll(s));

  const toast = (msg, type='success') => {
    const box = $('#message-box'), icon = $('#message-icon'), text = $('#message-text');
    text.textContent = msg;
    box.style.backgroundColor = type === 'error' ? '#dc2626' : '#16a34a';
    icon.className = type === 'error' ? 'fas fa-exclamation-circle mr-2' : 'fas fa-check-circle mr-2';
    box.classList.remove('hidden'); setTimeout(()=>box.classList.add('hidden'), 2000);
  };

  // Nav
  $$('.nav-link').forEach(b=>b.addEventListener('click',()=>{
    const t=b.getAttribute('data-target');
    if (!t) return;
    $$('main section').forEach(s=>s.classList.remove('active'));
    $('#'+t+'-section').classList.add('active');
  }));

  // Load data
  async function getJSON(p,f){try{const r=await fetch(p);if(!r.ok) throw 0; return await r.json();}catch{return f;}}
  const fallbackClans=[
    { id:'mackenzie', name:'Clan MacKenzie', motto:'Luceo Non Uro', region:'Highlands', seats:['Castle Leod','Eilean Donan'], lat:57.59, lon:-4.45, crest:'assets/images/crests/mackenzie.png', tartanColors:['#003366','#990000','#006633'], notable:['Kenneth MacKenzie','Seaforths'] },
    { id:'campbell', name:'Clan Campbell', motto:'Ne Obliviscaris', region:'Argyll', seats:['Inveraray','Castle Campbell'], lat:56.24, lon:-5.07, crest:'assets/images/crests/campbell.png', tartanColors:['#003366','#006633','#222222'], notable:['Archibald Campbell','Dukes of Argyll'] },
    { id:'macdonald', name:'Clan MacDonald', motto:'Per mare, per terras', region:'Islands', seats:['Finlaggan','Duntulm'], lat:57.60, lon:-6.34, crest:'assets/images/crests/macdonald.png', tartanColors:['#990000','#003366','#006633'], notable:['Lords of the Isles'] }
  ];
  const clans = await getJSON('./data/clans.json', fallbackClans);

  // ----- Clan Map + Drawer -----
  let map = L.map('clanMap', { scrollWheelZoom:false }).setView([56.8,-4.2], 6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; OpenStreetMap'}).addTo(map);
  const markers = {};
  clans.forEach(c => {
    const m = L.marker([c.lat, c.lon]).addTo(map).bindPopup(`<strong>${c.name}</strong><br>${(c.seats||[]).join(', ')}`);
    markers[c.id] = m;
  });
  const list = $('#clan-sidebar-list');
  list.innerHTML = clans.map(c => `
    <button class="w-full text-left p-3 rounded-lg hover:bg-yellow-50 transition all mb-2 border border-yellow-200" data-id="${c.id}">
      <div class="flex items-center gap-3">
        <img src="${c.crest||''}" width="32" height="32" onerror="this.style.display='none'">
        <div><div class="font-semibold">${c.name}</div>
        <div class="text-xs text-gray-500">${c.region} • "${c.motto||''}"</div></div>
      </div>
    </button>`).join('');
  list.addEventListener('click', e=>{
    const b = e.target.closest('[data-id]'); if (!b) return;
    $$('#clan-sidebar-list button').forEach(x=>x.classList.remove('active-item'));
    b.classList.add('active-item');
    const id = b.getAttribute('data-id'); const c = clans.find(x=>x.id===id);
    if (!c) return;
    map.setView([c.lat, c.lon], 7); markers[id]?.openPopup();
    renderClanInfo(c);
    openDrawer(c);
  });
  if (clans.length) { renderClanInfo(clans[0]); }

  function renderClanInfo(c){
    $('#map-info').innerHTML = `
      <div class="content-card p-4 rounded-xl border">
        <div class="flex items-start gap-3">
          <img src="${c.crest||''}" width="64" height="64" onerror="this.style.display='none'">
          <div>
            <h4 class="text-xl font-bold mb-1">${c.name}</h4>
            <div class="text-sm text-gray-600 mb-1"><em>Motto:</em> ${c.motto||''}</div>
            <div class="text-sm text-gray-600 mb-1"><em>Region:</em> ${c.region||''}</div>
            <div class="text-sm text-gray-600"><em>Seats:</em> ${(c.seats||[]).join(', ')}</div>
            <div class="mt-2"><button class="pill" data-open-drawer="${c.id}">Open details</button></div>
          </div>
        </div>
      </div>`;
    $('[data-open-drawer]')?.addEventListener('click', ()=>openDrawer(c));
  }

  // Drawer logic
  const drawer = $('#clan-drawer'); const closeDrawerBtn = $('#close-drawer');
  function openDrawer(c){
    $('#drawer-title').textContent = c.name;
    $('#drawer-motto').textContent = c.motto || '';
    $('#drawer-crest').src = c.crest || '';
    const colors = (c.tartanColors||[]).map(col=>`<span class="inline-block w-6 h-6 rounded" style="background:${col}"></span>`).join('');
    const figures = (c.notable||[]).map(n=>`<span class="badge mr-1 mb-1">${n}</span>`).join('');
    const seats = (c.seats||[]).map(s=>`<li class="flex items-center justify-between py-1"><span>${s}</span><button class="pill add-seat" data-name="${s}" data-lat="${c.lat}" data-lon="${c.lon}"><i class="fas fa-plus mr-1"></i>Add to itinerary</button></li>`).join('');
    $('#drawer-body').innerHTML = `
      <div class="grid gap-3">
        <div><div class="text-xs text-neutral-500 mb-1">Tartan palette</div><div class="flex gap-2">${colors||'<em>No palette</em>'}</div></div>
        <div><div class="text-xs text-neutral-500 mb-1">Notable figures</div><div class="flex flex-wrap gap-1">${figures||'<em>—</em>'}</div></div>
        <div><div class="text-xs text-neutral-500 mb-1">Seats</div><ul>${seats||'<li>—</li>'}</ul></div>
        <div class="text-sm text-neutral-600">Tip: choose a day in Trips, then “Add to itinerary”.</div>
      </div>`;
    drawer.classList.remove('hidden'); drawer.setAttribute('aria-hidden','false');
  }
  function closeDrawer(){ drawer.classList.add('hidden'); drawer.setAttribute('aria-hidden','true'); }
  closeDrawerBtn.addEventListener('click', closeDrawer);
  drawer.addEventListener('click', e=>{ if (e.target===drawer) closeDrawer(); });

  // ----- Trip Builder v2 -----
  let tripMap, tripLayer;
  tripMap = L.map('tripBuilderMap',{scrollWheelZoom:false}).setView([56.8,-4.2],6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; OpenStreetMap'}).addTo(tripMap);
  tripLayer = L.layerGroup().addTo(tripMap);

  const defaultPOIs = [
    {name:'Eilean Donan Castle', lat:57.273, lon:-5.516, type:'heritage'},
    {name:'Inveraray Castle', lat:56.231, lon:-5.072, type:'heritage'},
    {name:'Finlaggan (Islay)', lat:55.800, lon:-6.287, type:'heritage'},
    {name:'Dunvegan Castle', lat:57.450, lon:-6.592, type:'heritage'},
    {name:'Talisker Distillery', lat:57.302, lon:-6.356, type:'whisky'},
    {name:'Glenfinnan Viaduct', lat:56.871, lon:-5.431, type:'scenery'},
    {name:'Stirling Castle', lat:56.120, lon:-3.940, type:'heritage'},
    {name:'Old Course, St Andrews', lat:56.343, lon:-2.803, type:'golf'}
  ];
  const suggestionsBox = $('#poi-suggestions');
  suggestionsBox.innerHTML = defaultPOIs.map(p=>`
    <div class="card flex items-center justify-between">
      <div><div class="font-semibold">${p.name}</div><div class="text-xs text-neutral-500 capitalize">${p.type}</div></div>
      <button class="pill add-suggested" data-poi='${JSON.stringify(p)}'>Add</button>
    </div>`).join('');

  // Itinerary state
  let itinerary = []; // [{day:1, items:[{name,lat,lon,type}]}]
  function createItinerary(days){
    itinerary = Array.from({length:days}, (_,i)=>({ day:i+1, items:[] }));
    renderItinerary(); redrawTrip();
  }
  function addToDay(dayIndex, poi){
    itinerary[dayIndex].items.push(poi);
    renderItinerary(); redrawTrip();
  }
  function removeFromDay(dayIndex, idx){
    itinerary[dayIndex].items.splice(idx,1);
    renderItinerary(); redrawTrip();
  }

  // Haversine distance (km)
  function dist(a,b){
    const R=6371, toRad=x=>x*Math.PI/180;
    const dLat=toRad(b.lat-a.lat), dLon=toRad(b.lon-a.lon);
    const q=Math.sin(dLat/2)**2 + Math.cos(toRad(a.lat))*Math.cos(toRad(b.lat))*Math.sin(dLon/2)**2;
    return 2*R*Math.asin(Math.sqrt(q));
  }
  function computeTotals(){
    let totalKm=0;
    itinerary.forEach(d=>{
      for(let i=1;i<d.items.length;i++){
        totalKm += dist(d.items[i-1], d.items[i]);
      }
    });
    const hours = totalKm/60; // assume avg 60 km/h
    return { totalKm: Math.round(totalKm), hours: Math.round(hours*10)/10 };
  }

  // Price calc
  function computePrice(type, days, group){
    const basePerPersonPerDay = { heritage: 220, luxury: 450, whisky: 300, golf: 350 }[type] || 250;
    const subtotal = basePerPersonPerDay * Number(days) * Number(group);
    const margin = type === 'luxury' ? 1.35 : 1.20;
    return Math.round(subtotal * margin);
  }

  // Render itinerary UI
  function renderItinerary(){
    const wrap = $('#itinerary');
    wrap.innerHTML = itinerary.map((d,di)=>`
      <div class="content-card p-3 rounded-xl border">
        <div class="flex items-center justify-between mb-2">
          <h4 class="font-semibold">Day ${d.day}</h4>
          <div class="text-xs text-neutral-500">${d.items.length} stops</div>
        </div>
        <div class="grid gap-2">
          ${d.items.map((it,ii)=>`
            <div class="card flex items-center justify-between">
              <div>
                <div class="font-semibold">${ii+1}. ${it.name}</div>
                <div class="text-xs text-neutral-500">${it.type||''}</div>
              </div>
              <div class="flex gap-2">
                <button class="pill up" data-di="${di}" data-ii="${ii}">↑</button>
                <button class="pill down" data-di="${di}" data-ii="${ii}">↓</button>
                <button class="pill remove" data-di="${di}" data-ii="${ii}">Remove</button>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="mt-2"><button class="pill add-here" data-di="${di}"><i class="fas fa-plus mr-1"></i>Add suggestion here</button></div>
      </div>
    `).join('');

    // buttons
    wrap.querySelectorAll('.remove').forEach(b=>b.addEventListener('click',()=>removeFromDay(+b.dataset.di, +b.dataset.ii)));
    wrap.querySelectorAll('.up').forEach(b=>b.addEventListener('click',()=>{
      const di=+b.dataset.di, ii=+b.dataset.ii; if(ii===0) return;
      const arr=itinerary[di].items; [arr[ii-1], arr[ii]]=[arr[ii], arr[ii-1]]; renderItinerary(); redrawTrip();
    }));
    wrap.querySelectorAll('.down').forEach(b=>b.addEventListener('click',()=>{
      const di=+b.dataset.di, ii=+b.dataset.ii; const arr=itinerary[di].items; if(ii>=arr.length-1) return;
      [arr[ii+1], arr[ii]]=[arr[ii], arr[ii+1]]; renderItinerary(); redrawTrip();
    }));
    wrap.querySelectorAll('.add-here').forEach(b=>b.addEventListener('click',()=>{
      const di=+b.dataset.di;
      // take first suggestion by default
      const first = defaultPOIs[0];
      addToDay(di, first);
      toast(`Added ${first.name} to Day ${di+1}`);
    }));

    const totals = computeTotals();
    $('#total-distance').textContent = totals.totalKm;
    $('#total-drive').textContent = totals.hours.toString();
  }

  // Redraw route on map
  function redrawTrip(){
    tripLayer.clearLayers();
    itinerary.forEach(d=>{
      d.items.forEach(p=>tripLayer.addLayer(L.marker([p.lat,p.lon]).bindPopup(p.name)));
      if (d.items.length>=2){
        const coords = d.items.map(p=>[p.lat,p.lon]);
        L.polyline(coords,{weight:4}).addTo(tripLayer);
      }
    });
    // Fit bounds if any points
    const all = itinerary.flatMap(d=>d.items).map(p=>[p.lat,p.lon]);
    if (all.length){
      const b = L.latLngBounds(all);
      tripMap.fitBounds(b, {padding:[20,20]});
    }
  }

  // Seed suggestions and drawer "Add to itinerary"
  suggestionsBox.addEventListener('click', e=>{
    const b = e.target.closest('.add-suggested'); if (!b) return;
    const poi = JSON.parse(b.getAttribute('data-poi'));
    const dayIndex = 0; // add to Day 1 by default
    addToDay(dayIndex, poi);
    toast(`Added ${poi.name} to Day ${dayIndex+1}`);
  });
  drawer.addEventListener('click', e=>{
    const b = e.target.closest('.add-seat'); if (!b) return;
    const poi = { name:b.getAttribute('data-name'), lat:+b.getAttribute('data-lat'), lon:+b.getAttribute('data-lon'), type:'heritage' };
    const dayIndex = 0; // default to Day 1; user can move later
    addToDay(dayIndex, poi);
    toast(`Added ${poi.name} to Day ${dayIndex+1}`);
  });

  // Create itinerary + pricing
  $('#create-itinerary-btn').addEventListener('click', ()=>{
    const days = parseInt($('#trip-days').value,10);
    const group = parseInt($('#group-size').value,10);
    const type = $('#trip-type').value;
    createItinerary(days);
    const price = computePrice(type, days, group);
    $('#price-estimate').textContent = price.toLocaleString('en-GB');
    toast('Itinerary created — add stops from the drawer or suggestions.');
  });
  // Start with 5-day empty
  createItinerary(5);

  // PDF export
  $('#export-pdf-btn').addEventListener('click', ()=>{
    const { jsPDF } = window.jspdf || {};
    if (!jsPDF) { toast('PDF library not loaded', 'error'); return; }
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('The Clan Hearth — Itinerary', 14, 18);
    let y = 28;
    itinerary.forEach(d=>{
      doc.setFont(undefined,'bold'); doc.text(`Day ${d.day}`, 14, y); y+=6; doc.setFont(undefined,'normal');
      if (!d.items.length) { doc.text('  — (no stops)', 14, y); y+=6; }
      d.items.forEach((it,i)=>{ doc.text(`  ${i+1}. ${it.name} (${it.type||'stop'})`, 14, y); y+=6; });
      y+=2;
    });
    const totals = computeTotals();
    y+=2; doc.text(`Total distance: ${totals.totalKm} km`, 14, y); y+=6; doc.text(`Estimated drive time: ${totals.hours} h`, 14, y);
    doc.save('clanhearth-itinerary.pdf');
  });

  // Email handoff (opens modal with itinerary text)
  const emailModal = $('#email-modal');
  $('#email-itinerary-btn').addEventListener('click', ()=>{
    const lines = [];
    itinerary.forEach(d=>{
      lines.push(`Day ${d.day}`);
      if (!d.items.length) lines.push('  — (no stops)');
      d.items.forEach((it,i)=> lines.push(`  ${i+1}. ${it.name} (${it.type||'stop'})`));
    });
    const totals = computeTotals();
    lines.push('', `Total distance: ${totals.totalKm} km`, `Estimated drive time: ${totals.hours} h`);
    $('#email-itinerary-text').value = lines.join('\n');
    emailModal.classList.remove('hidden'); emailModal.classList.add('flex');
  });
  $('#close-email-modal').addEventListener('click', ()=>{ emailModal.classList.add('hidden'); emailModal.classList.remove('flex'); });
});
