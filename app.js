
// All-in-one app script — rebuilt for reliability
document.addEventListener('DOMContentLoaded', () => {
  const $ = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));
  const show = el => el.classList.add('active');
  const hide = el => el.classList.remove('active');
  const toast = (msg, type='success') => {
    const box = document.getElementById('message-box');
    const icon = document.getElementById('message-icon');
    const text = document.getElementById('message-text');
    text.textContent = msg;
    box.style.backgroundColor = type === 'error' ? '#dc2626' : '#16a34a';
    icon.className = type === 'error' ? 'fas fa-exclamation-circle mr-2' : 'fas fa-check-circle mr-2';
    box.classList.remove('hidden');
    setTimeout(() => box.classList.add('hidden'), 2200);
  };
  const openModal = (title, bodyHtml) => {
    const modal = document.getElementById('generic-modal');
    const titleEl = document.getElementById('modal-title');
    const bodyEl = document.getElementById('modal-body');
    titleEl.textContent = title;
    bodyEl.innerHTML = bodyHtml;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  };
  const closeModal = () => {
    const modal = document.getElementById('generic-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  };
  document.getElementById('close-modal').addEventListener('click', closeModal);
  document.getElementById('generic-modal').addEventListener('click', (e) => { if (e.target.id === 'generic-modal') closeModal(); });

  const sections = {
    home: document.getElementById('home-section'),
    clans: document.getElementById('clans-section'),
    'spiritual-finder': document.getElementById('spiritual-finder-section'),
    'trip-builder': document.getElementById('trip-builder-section'),
    'ai-assistant': document.getElementById('ai-assistant-section'),
    legends: document.getElementById('legends-section'),
    'tartan-designer': document.getElementById('tartan-designer-section'),
    recipes: document.getElementById('recipes-section'),
    marketplace: document.getElementById('marketplace-section'),
  };
  const switchTo = (key) => {
    Object.values(sections).forEach(hide);
    Object.keys(sections).forEach(k => sections[k].setAttribute('aria-hidden', k===key ? 'false' : 'true'));
    show(sections[key]);
    $$('.nav-link').forEach(btn => btn.classList.remove('active'));
    $$('.nav-link').forEach(btn => {
      const t = btn.getAttribute('data-target');
      btn.setAttribute('aria-current', t === key ? 'page' : 'false');
      if (t === key) btn.classList.add('active');
    });
  };
  $$('.nav-link').forEach(el => el.addEventListener('click', () => {
    const t = el.getAttribute('data-target');
    if (t && sections[t] ) switchTo(t);
  }));
  switchTo('home');

  // --- Clans & Map ---
  const fallbackClans = [
    { id:'mackenzie', name:'Clan MacKenzie', motto:'Luceo Non Uro', region:'Highlands', seats:['Eilean Donan Castle','Castle Leod'], blurb:'Powerful Highland clan of Kintail & Ross.', lat:57.273, lon:-5.516 },
    { id:'campbell', name:'Clan Campbell', motto:'Ne Obliviscaris', region:'Argyll', seats:['Inveraray Castle','Castle Campbell'], blurb:'Dominant Argyll dynasty; Dukes of Argyll.', lat:56.231, lon:-5.072 },
    { id:'macdonald', name:'Clan MacDonald', motto:'Per mare, per terras', region:'Hebrides', seats:['Finlaggan','Dunstaffnage'], blurb:'Lords of the Isles; maritime power.', lat:55.800, lon:-6.287 },
    { id:'fraser', name:'Clan Fraser of Lovat', motto:'Je suis prest', region:'The Aird', seats:['Beaufort Castle'], blurb:'Formidable Jacobite clan from the Beauly Firth.', lat:57.480, lon:-4.460 },
    { id:'macleod', name:'Clan MacLeod', motto:'Hold Fast', region:'Skye', seats:['Dunvegan Castle'], blurb:'Island lords famed for the Fairy Flag.', lat:57.450, lon:-6.592 },
    { id:'gordon', name:'Clan Gordon', motto:'Bydand', region:'Northeast', seats:['Huntly Castle'], blurb:'Cock o’ the North; powerhouse of Aberdeenshire.', lat:57.447, lon:-2.784 },
    { id:'cameron', name:'Clan Cameron', motto:'Aonaibh ri chèile', region:'Lochaber', seats:['Achnacarry'], blurb:'Warlike Lochaber clan; led by Gentle Lochiel.', lat:56.885, lon:-5.227 },
    { id:'stewart', name:'Clan Stewart', motto:'Virescit vulnere virtus', region:'Lowlands & Highlands', seats:['Stirling Castle','Holyroodhouse'], blurb:'Royal house of Scotland for 300+ years.', lat:56.120, lon:-3.940 },
    { id:'scott', name:'Clan Scott', motto:'Amo', region:'Borders', seats:['Branxholme'], blurb:'Mighty Border reivers; Sir Walter Scott’s line.', lat:55.520, lon:-2.760 },
  ];
  async function loadClans() {
    try {
      const res = await fetch('./data/clans.json');
      if (!res.ok) throw new Error('nojson');
      return await res.json();
    } catch { return fallbackClans; }
  }

  let clans = [];
  const clanList = $('#clan-sidebar-list');
  let clanMap, clanMarkers = {};
  function renderClansSidebar() {
    clanList.innerHTML = clans.map(c => `
      <button class="w-full text-left p-3 rounded-lg hover:bg-yellow-50 transition all mb-2 border border-yellow-200" data-id="${c.id}">
        <div class="flex items-center justify-between">
          <div>
            <div class="font-semibold">${c.name}</div>
            <div class="text-xs text-gray-500">${c.region} • "${c.motto}"</div>
          </div>
          <i class="fas fa-chevron-right text-gray-400"></i>
        </div>
      </button>`).join('');
  }
  function initClanMap() {
    try {
      clanMap = L.map('clanMap', { scrollWheelZoom: false }).setView([56.8, -4.2], 6);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap' }).addTo(clanMap);
      clans.forEach(c => {
        const m = L.marker([c.lat, c.lon]).addTo(clanMap).bindPopup(`<strong>${c.name}</strong><br>${c.blurb}`);
        clanMarkers[c.id] = m;
      });
    } catch (e) {
      document.getElementById('clanMap').innerHTML = '<div class="error-message">Map failed to load. Please check your internet connection.</div>';
    }
  }
  function renderClanDetails(c) {
    const info = $('#map-info');
    info.innerHTML = `
      <div class="content-card p-4 rounded-xl border">
        <h4 class="text-xl font-title font-bold text-yellow-800 mb-2">${c.name}</h4>
        <div class="text-sm text-gray-600 mb-2"><em>Motto:</em> ${c.motto}</div>
        <div class="text-sm text-gray-600 mb-2"><em>Region:</em> ${c.region}</div>
        <div class="text-sm text-gray-600 mb-2"><em>Seats:</em> ${c.seats.join(', ')}</div>
        <p class="mt-2 text-gray-700">${c.blurb}</p>
        <div class="mt-4">
          <button class="btn-primary px-4 py-2 rounded-lg" id="plan-trip-for-${c.id}"><i class="fas fa-route mr-2"></i>Plan trip here</button>
        </div>
      </div>`;
    const btn = document.getElementById(`plan-trip-for-${c.id}`);
    btn?.addEventListener('click', () => {
      switchTo('trip-builder');
      toast(`Added ${c.name} to your trip plan`);
      addTripPOI({name: c.seats[0] || c.name, lat:c.lat, lon:c.lon, type:'heritage'});
    });
  }
  clanList.addEventListener('click', (e) => {
    const b = e.target.closest('[data-id]'); if (!b) return;
    const id = b.getAttribute('data-id');
    const c = clans.find(x => x.id === id); if (!c) return;
    renderClanDetails(c);
    if (clanMap && clanMarkers[id]) { clanMap.setView([c.lat, c.lon], 8); clanMarkers[id].openPopup(); }
    document.querySelectorAll('#clan-sidebar-list button').forEach(x => x.classList.remove('active-item'));
    b.classList.add('active-item');
  });

  // --- Spiritual Finder ---
  const quizQ = [
    { q: 'Your ideal Scottish landscape?', a:[ {t:'Island & sea', v:'macdonald'}, {t:'Mountain passes', v:'cameron'}, {t:'Castles & lochs', v:'mackenzie'}, {t:'Historic towns', v:'stewart'} ]},
    { q: 'Pick a motto vibe:', a:[ {t:'Persevere', v:'fraser'}, {t:'Unite', v:'cameron'}, {t:'Hold Fast', v:'macleod'}, {t:'By land & sea', v:'macdonald'} ]},
    { q: 'Clan personality?', a:[ {t:'Strategist', v:'campbell'}, {t:'Explorer', v:'gordon'}, {t:'Romantic', v:'scott'}, {t:'Stoic leader', v:'mackenzie'} ]},
  ];
  const quizHost = document.getElementById('spiritual-quiz-container');
  const quizResult = document.getElementById('spiritual-quiz-result');
  let answers = [];
  const renderQuiz = (i=0) => {
    if (i >= quizQ.length) {
      const tally = answers.reduce((acc,v)=> (acc[v]=(acc[v]||0)+1, acc), {});
      const best = Object.entries(tally).sort((a,b)=>b[1]-a[1])[0][0];
      const c = clans.find(x => x.id===best) || clans[0];
      quizHost.innerHTML = ''; quizResult.classList.remove('hidden');
      quizResult.innerHTML = `
        <div class="content-card p-6 rounded-2xl border">
          <h3 class="text-2xl font-title font-bold mb-2">Your spiritual clan is: ${c.name}</h3>
          <p class="text-gray-700 mb-3">${c.blurb}</p>
          <button class="btn-primary px-5 py-3 rounded-lg" id="view-clan-now"><i class="fas fa-map mr-2"></i>View on Map</button>
        </div>`;
      document.getElementById('view-clan-now').addEventListener('click', () => {
        switchTo('clans'); renderClanDetails(c);
        if (clanMap && clanMarkers[c.id]) { clanMap.setView([c.lat, c.lon], 8); clanMarkers[c.id].openPopup(); }
      });
      return;
    }
    const step = quizQ[i];
    quizResult.classList.add('hidden');
    quizHost.innerHTML = `
      <div class="bg-gray-50 p-6 rounded-2xl border">
        <h4 class="text-xl font-title font-bold mb-4">${i+1}. ${step.q}</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${step.a.map(opt => `<button class="quiz-option px-4 py-3 rounded-lg bg-white" data-v="${opt.v}">${opt.t}</button>`).join('')}
        </div>
      </div>`;
    $$('.quiz-option', quizHost).forEach(btn => btn.addEventListener('click', () => { answers.push(btn.getAttribute('data-v')); renderQuiz(i+1); }));
  };

  // --- Trip Builder ---
  let tripMap, tripLayer, tripPOIs = [];
  function initTripMap() {
    try {
      tripMap = L.map('tripBuilderMap', { scrollWheelZoom: false }).setView([56.8, -4.2], 6);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap' }).addTo(tripMap);
      tripLayer = L.layerGroup().addTo(tripMap);
    } catch (e) {
      document.getElementById('tripBuilderMap').innerHTML = '<div class="error-message">Map failed to load. Please check your internet connection.</div>';
    }
  }
  const defaultPOIs = [
    {name:'Eilean Donan Castle', lat:57.273, lon:-5.516, type:'heritage'},
    {name:'Inveraray Castle', lat:56.231, lon:-5.072, type:'heritage'},
    {name:'Finlaggan (Islay)', lat:55.800, lon:-6.287, type:'heritage'},
    {name:'Dunvegan Castle', lat:57.450, lon:-6.592, type:'heritage'},
    {name:'Talisker Distillery', lat:57.302, lon:-6.356, type:'whisky'},
    {name:'Glenfinnan Viaduct', lat:56.871, lon:-5.431, type:'scenery'},
    {name:'Stirling Castle', lat:56.120, lon:-3.940, type:'heritage'},
    {name:'Old Course, St Andrews', lat:56.343, lon:-2.803, type:'golf'},
  ];
  function addTripPOI(poi) {
    tripPOIs.push(poi);
    if (tripMap && tripLayer) {
      const m = L.marker([poi.lat, poi.lon]).bindPopup(`<strong>${poi.name}</strong><br>${poi.type}`);
      tripLayer.addLayer(m);
    }
  }
  function redrawTrip() {
    if (tripLayer) {
      tripLayer.clearLayers();
      tripPOIs.forEach(p => {
        const m = L.marker([p.lat, p.lon]).bindPopup(`<strong>${p.name}</strong><br>${p.type}`);
        tripLayer.addLayer(m);
      });
      if (tripPOIs.length >= 2) {
        const coords = tripPOIs.map(p => [p.lat, p.lon]);
        L.polyline(coords, { weight: 4 }).addTo(tripLayer);
        const groupBounds = L.latLngBounds(coords);
        tripMap.fitBounds(groupBounds, { padding:[20,20] });
      }
    }
  }
  const typeSel = document.getElementById('trip-type');
  const durSel = document.getElementById('trip-duration');
  const groupSel = document.getElementById('group-size');
  const buildBtn = document.getElementById('build-trip-btn');
  const summaryBox = document.getElementById('trip-summary');
  const detailsBox = document.getElementById('trip-details');
  const totalPriceEl = document.getElementById('total-price');
  function computePrice(type, days, group) {
    const basePerPersonPerDay = { heritage: 220, luxury: 450, whisky: 300, golf: 350, corporate: 380 }[type] || 250;
    const subtotal = basePerPersonPerDay * Number(days) * Number(group);
    const margin = type === 'luxury' ? 1.35 : 1.20;
    return Math.round(subtotal * margin);
  }
  buildBtn.addEventListener('click', () => {
    const type = typeSel.value;
    const days = parseInt(durSel.value, 10);
    const group = parseInt(groupSel.value, 10);
    const price = computePrice(type, days, group);
    totalPriceEl.textContent = price.toLocaleString('en-GB');
    const pick = defaultPOIs.filter(p => {
      if (type==='whisky') return p.type==='whisky' || p.type==='heritage';
      if (type==='golf') return p.type==='golf' || p.type==='heritage';
      if (type==='heritage' || type==='luxury' || type==='corporate') return p.type!=='golf';
      return true;
    }).slice(0,4);
    tripPOIs = []; pick.forEach(addTripPOI); redrawTrip();
    detailsBox.innerHTML = pick.map((p, i) => `
      <div class="trip-item">
        <div class="flex items-center justify-between">
          <div><div class="font-semibold">${i+1}. ${p.name}</div><div class="text-xs text-gray-500 capitalize">${p.type}</div></div>
          <button class="btn-primary px-3 py-2 rounded-lg add-product" data-name="${p.name}"><i class="fas fa-plus-circle mr-1"></i>Add</button>
        </div>
      </div>`).join('');
    summaryBox.classList.remove('hidden');
  });
  document.getElementById('book-trip-btn')?.addEventListener('click', () => { bumpCart(1); toast('Trip reserved — we’ll follow up by email.'); });
  document.getElementById('trip-summary').addEventListener('click', (e) => {
    const btn = e.target.closest('.add-product'); if (!btn) return;
    bumpCart(1); toast(`Added "${btn.getAttribute('data-name')}" to your plan`);
  });

  // --- AI Assistant (toy) ---
  const chatBox = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('send-chat-btn');
  const quickBtns = Array.from(document.querySelectorAll('.quick-chat-btn'));
  function addMsg(text, who='assistant') {
    const div = document.createElement('div');
    div.className = `chat-message ${who}`;
    div.innerHTML = who === 'assistant'
      ? `<div class="flex items-start space-x-3"><i class="fas fa-robot text-2xl text-yellow-400 mt-1"></i><div><p class="font-bold text-sm text-yellow-300 mb-1">Och-I</p><p>${text}</p></div></div>`
      : `<div class="flex items-start space-x-3"><div class="bg-transparent"><p>${text}</p></div></div>`;
    chatBox.appendChild(div); chatBox.scrollTop = chatBox.scrollHeight;
  }
  function replyTo() {
    const answers = [
      "Grand choice! If you like castles, try Eilean Donan and Stirling — pure class.",
      "For whisky, Skye’s Talisker and Speyside’s big hitters never disappoint.",
      "Thinking clan roots? MacKenzie and MacDonald cover a lot of Highland ground.",
      "Fancy a Jacobite route? Glenfinnan, Culloden, and Beauly make a cracking trio."
    ];
    const pick = answers[Math.floor(Math.random()*answers.length)];
    setTimeout(()=> addMsg(pick, 'assistant'), 300);
  }
  sendBtn.addEventListener('click', () => { const text = chatInput.value.trim(); if (!text) return; addMsg(text, 'user'); chatInput.value = ''; replyTo(text); });
  chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendBtn.click(); });
  quickBtns.forEach(b => b.addEventListener('click', () => { const m = b.getAttribute('data-message'); addMsg(m, 'user'); replyTo(m); }));

  // --- Legends ---
  const legends = [
    { id:'bruce', name:'Robert the Bruce', summary:'King of Scots; the spider’s lesson; Bannockburn 1314.'},
    { id:'wallace', name:'William Wallace', summary:'Guardian of Scotland; Stirling Bridge hero.'},
    { id:'brahan', name:'The Brahan Seer', summary:'Coinneach Odhar; prophecies & clan lore.'},
    { id:'nessie', name:'Loch Ness Monster', summary:'Elusive Highland cryptid of the deep.'},
    { id:'selkie', name:'Selkie', summary:'Shape-shifting seal folk of the isles.'},
    { id:'cailleach', name:'Cailleach', summary:'Winter hag; shaper of mountains.'},
  ];
  const legendSide = document.getElementById('legends-sidebar');
  legendSide.innerHTML = legends.map(l => `
    <button class="w-full text-left p-3 rounded-lg hover:bg-yellow-50 transition all mb-2 border border-yellow-200" data-id="${l.id}">
      <div class="font-semibold">${l.name}</div>
      <div class="text-xs text-gray-500">${l.summary}</div></button>`).join('');
  const legendsMain = document.getElementById('legends-main-content');
  legendSide.addEventListener('click', (e) => {
    const b = e.target.closest('[data-id]'); if (!b) return;
    const l = legends.find(x => x.id === b.getAttribute('data-id'));
    legendsMain.innerHTML = `<div class="content-card p-6 rounded-2xl border animate-fade-in"><h3 class="text-2xl font-title font-bold mb-2">${l.name}</h3><p class="text-gray-700">${l.summary} (Full story coming soon.)</p></div>`;
  });

  // --- Recipes ---
  const recipes = [
    {name:'Cullen Skink', area:'islands', desc:'Smoky haddock soup from Moray & Banff.', img:'🥣'},
    {name:'Cranachan', area:'festive', desc:'Whipped cream, raspberries, oats & whisky.', img:'🍓'},
    {name:'Scotch Broth', area:'highlands', desc:'Barley, lamb, root veg — hearty!', img:'🍲'},
    {name:'Arbroath Smokie Salad', area:'lowlands', desc:'Warm smoked haddock with tatties.', img:'🐟'},
    {name:'Venison Pie', area:'highlands', desc:'Rich, peppery, utterly Scottish.', img:'🥧'},
    {name:'Cloutie Dumpling', area:'festive', desc:'Steamed spiced pudding.', img:'🎄'},
    {name:'Haggis, Neeps & Tatties', area:'borders', desc:'The classic combo.', img:'🧅'},
    {name:'Shortbread', area:'lowlands', desc:'Buttery crumbly perfection.', img:'🍪'},
    {name:'Porridge', area:'highlands', desc:'Oats with a pinch of salt.', img:'🥣'},
  ];
  const recipeGrid = document.getElementById('recipe-grid');
  function renderRecipes(filter='all') {
    const list = recipes.filter(r => filter==='all' || r.area===filter);
    recipeGrid.innerHTML = list.map(r => `
      <div class="content-card p-4 rounded-2xl border">
        <div class="text-5xl mb-3 text-center">${r.img}</div>
        <h4 class="font-semibold">${r.name}</h4>
        <div class="text-xs text-gray-500 capitalize">${r.area}</div>
        <p class="text-sm text-gray-700 mt-2">${r.desc}</p>
      </div>`).join('');
  }
  document.querySelectorAll('#recipe-categories .recipe-category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#recipe-categories .recipe-category-btn').forEach(b=>b.setAttribute('aria-pressed','false'));
      btn.setAttribute('aria-pressed','true');
      renderRecipes(btn.getAttribute('data-category'));
    });
  });
  renderRecipes('all');

  // --- Marketplace ---
  const products = [
    {name:'Handwoven Tartan Scarf', price:45, tag:'Textiles'},
    {name:'Clan Crest Badge (Pewter)', price:18, tag:'Crests'},
    {name:'Heather Honey (500g)', price:9, tag:'Food'},
    {name:'Sgian Dubh (Display)', price:35, tag:'Decor'},
    {name:'Whisky Tasting Set', price:29, tag:'Experiences'},
    {name:'Celtic Knot Mug', price:12, tag:'Home'},
  ];
  const productGrid = document.getElementById('product-grid');
  productGrid.innerHTML = products.map(p => `
    <div class="content-card p-4 rounded-2xl border flex items-center justify-between">
      <div><div class="font-semibold">${p.name}</div><div class="text-xs text-gray-500">${p.tag}</div><div class="mt-2 price-tag inline-block">£${p.price}</div></div>
      <button class="btn-primary px-4 py-2 rounded-lg add-cart"><i class="fas fa-cart-plus mr-2"></i>Add</button>
    </div>`).join('');

  // --- Cart ---
  let cartCount = 0;
  const cartEl = document.getElementById('cart-count');
  const bumpCart = (n=1) => { cartCount += n; cartEl.textContent = String(cartCount); };
  document.getElementById('cart-button')?.addEventListener('click', () => {
    openModal('Your Cart', `<p class="p-2">Items in cart: <strong>${cartCount}</strong> (demo)</p>`);
  });
  productGrid.addEventListener('click', (e) => {
    if (e.target.closest('.add-cart')) { bumpCart(1); toast('Added to cart'); }
  });

  // --- Tartan Designer ---
  const palette = ['#0b3d91','#2d5016','#cc0000','#ffd700','#0a0a0a','#14532d','#1d4ed8','#9a3412','#7c2d12','#1f2937','#065f46','#7c3aed'];
  const colorPal = document.getElementById('color-palette');
  const threadInput = document.getElementById('thread-count');
  const addStripeBtn = document.getElementById('add-stripe-btn');
  const clearPatternBtn = document.getElementById('clear-pattern-btn');
  const patternList = document.getElementById('pattern-list');
  const canvas = document.getElementById('tartan-canvas');
  const ctx = canvas.getContext('2d');
  let selectedColor = palette[0];
  let pattern = [];
  colorPal.innerHTML = palette.map(c => `<button class="color-box w-10 h-10 rounded-lg" style="background:${c}" data-c="${c}" aria-label="Select ${c}"></button>`).join('');
  function setSelected(btn) {
    document.querySelectorAll('.color-box').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected'); selectedColor = btn.getAttribute('data-c');
  }
  const firstBtn = document.querySelector('.color-box'); if (firstBtn) setSelected(firstBtn);
  colorPal.addEventListener('click', (e) => { const b = e.target.closest('.color-box'); if (b) setSelected(b); });
  function renderPatternList() {
    patternList.innerHTML = pattern.map((p,i) => `
      <div class="flex items-center justify-between py-1">
        <div><span class="inline-block w-4 h-4 rounded-sm mr-2" style="background:${p.color}"></span>${p.color} × ${p.count}</div>
        <button class="text-red-600 text-sm remove-stripe" data-i="${i}"><i class="fas fa-times"></i></button>
      </div>`).join('');
  }
  patternList.addEventListener('click', (e) => {
    const rm = e.target.closest('.remove-stripe'); if (!rm) return;
    const i = parseInt(rm.getAttribute('data-i'), 10); pattern.splice(i,1);
    renderPatternList(); drawTartan();
  });
  function drawTartan() {
    const width = canvas.width = canvas.clientWidth; const height = canvas.height = 400;
    if (!pattern.length) { ctx.fillStyle = '#f8fafc'; ctx.fillRect(0,0,width,height); ctx.fillStyle = '#9ca3af'; ctx.fillText('Add stripes to preview your tartan', 10, 20); return; }
    const sett = pattern.concat([...pattern].slice(0,-1).reverse());
    const total = sett.reduce((a,p)=>a+p.count,0);
    let x = 0;
    for (const p of sett) { const w = Math.max(1, Math.round((p.count/total)*width)); ctx.fillStyle = p.color; ctx.fillRect(x, 0, w, height); x += w; }
    x = 0;
    for (const p of sett) { const h = Math.max(1, Math.round((p.count/total)*height)); ctx.fillStyle = p.color + '66'; ctx.fillRect(0, x, width, h); x += h; }
    ctx.strokeStyle = '#00000011';
    for (let i=0;i<width;i+=12){ ctx.beginPath(); ctx.moveTo(i,0); ctx.lineTo(i,height); ctx.stroke(); }
    for (let j=0;j<height;j+=12){ ctx.beginPath(); ctx.moveTo(0,j); ctx.lineTo(width,j); ctx.stroke(); }
  }
  addStripeBtn.addEventListener('click', () => { const count = parseInt(threadInput.value, 10) || 8; pattern.push({ color: selectedColor, count }); renderPatternList(); drawTartan(); });
  clearPatternBtn.addEventListener('click', () => { pattern = []; renderPatternList(); drawTartan(); });
  document.getElementById('save-tartan-btn').addEventListener('click', () => {
    const a = document.createElement('a'); a.href = canvas.toDataURL('image/png');
    a.download = (document.getElementById('tartan-name').value || 'tartan') + '.png'; a.click(); toast('Tartan saved as image');
  });
  document.getElementById('share-tartan-btn').addEventListener('click', () => {
    const data = encodeURIComponent(JSON.stringify(pattern));
    const url = location.origin + location.pathname + '#tartan=' + data;
    navigator.clipboard.writeText(url).then(() => toast('Share link copied'));
  });
  if (location.hash.startsWith('#tartan=')) {
    try { pattern = JSON.parse(decodeURIComponent(location.hash.slice(8))); renderPatternList(); drawTartan(); switchTo('tartan-designer'); toast('Loaded tartan from shared link'); } catch {}
  } else { drawTartan(); }

  // Init async flow
  (async () => {
    clans = await loadClans();
    renderClansSidebar();
    initClanMap();
    renderQuiz(0);
    initTripMap();
  })();
});
