// ===== The Clan Hearth — SPA + Clan Finder + Map highlight =====

// -------- Router (unchanged) --------
const CANON = ["home","clan-finder","tartan-designer","recipes","myths","map","about"];
const ALIAS = { "clans":"clan-finder", "legends":"myths" };
const normalize = (id) => ALIAS[id] || id;
const qs=(s)=>document.querySelector(s), qsa=(s)=>Array.from(document.querySelectorAll(s));
const ensure = (id, el) => { if (el) el.setAttribute("data-section", id); };

function wireSections(){
  const SEL = {
    "home": ["#home","#hero","section[id*='home' i]","main > section:first-of-type"],
    "clan-finder": ["#clan-finder","#clanFinder","#clans","section[id*='clan' i]"],
    "tartan-designer": ["#tartan-designer","#tartanDesigner","section[id*='tartan' i]"],
    "recipes": ["#recipes","section[id*='recipe' i]"],
    "myths": ["#myths","#legends","section[id*='legend' i]","section[id*='myth' i]"],
    "map": ["#clan-map","#map","section[id*='map' i]"],
    "about": ["#about","section[id*='about' i]"]
  };
  CANON.forEach(id => ensure(id, SEL[id].map(qs).find(Boolean)));
  if (!qsa('[data-section="home"]').length) {
    const hero = qs("#hero") || qsa("main section, body > section")[0];
    ensure("home", hero);
  }
}
const hideAll = () => qsa("[data-section]").forEach(s=>s.classList.add("hidden"));
const show = (id) => {
  qs(`[data-section="${id}"]`)?.classList.remove("hidden");
  qsa("#topNav .nav-link, #topNav [data-nav]").forEach(a => a.classList.remove("text-amber-400","font-semibold"));
  qs(`#topNav [data-nav="${id}"]`)?.classList.add("text-amber-400","font-semibold");
};
function initialSection(){
  const raw = (location.hash||"").replace("#","");
  const id = normalize(raw);
  return CANON.includes(id) ? id : "home";
}
document.addEventListener("DOMContentLoaded", () => { wireSections(); hideAll(); show(initialSection()); });
window.addEventListener("hashchange", () => {
  const id = normalize((location.hash||"").replace("#","")); if (!id) return;
  if (CANON.includes(id)) { hideAll(); show(id); }
});
document.addEventListener("click", (e) => {
  const nav = e.target.closest("[data-nav]"); if (!nav) return;
  e.preventDefault();
  const id = normalize(nav.dataset.nav);
  history.replaceState(null, "", "#" + id);
  hideAll(); show(id);
  document.querySelector(`[data-section="${id}"]`)?.scrollIntoView({ behavior: "smooth", block: "start" });
});

// -------- Hero/logo safety (keeps preload warning harmless) --------
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.getElementById("hero");
  if (hero) {
    const bg = getComputedStyle(hero).backgroundImage;
    if (!bg || bg === "none") {
      hero.style.backgroundImage = "url('./assets/images/castlehome.jpg')";
      hero.classList.add("bg-cover","bg-center","bg-no-repeat","relative");
      const overlay = document.createElement("div");
      overlay.className = "absolute inset-0 bg-black/40 pointer-events-none";
      hero.prepend(overlay);
    }
  }
  const logo = document.getElementById("siteLogo") || document.querySelector("header img");
  if (logo) {
    logo.src = "./assets/images/hearth-crest.png";
    logo.classList.add("h-8","w-auto","object-contain");
  }
});

// ===== Data layer =====
let CLANS = [];                 // from ./clans.json
let TERRITORIES = [];           // from ./map-data.json (territories + markers)
let MARKERS = [];               // optional markers (seats)
let CLAN_TO_LAYERS = {};        // { "Campbell": [leafletLayer,...], ... }

async function loadAllData(){
  const cacheBust = '?v=' + Date.now();
  const [clans, map] = await Promise.all([
    fetch('./clans.json'+cacheBust).then(r=>r.json()).catch(()=>[]),
    fetch('./map-data.json'+cacheBust).then(r=>r.json()).catch(()=>({}))
  ]);
  CLANS = Array.isArray(clans) ? clans : [];
  TERRITORIES = Array.isArray(map.territories) ? map.territories : (Array.isArray(map.polygons) ? map.polygons : []);
  MARKERS = Array.isArray(map.markers) ? map.markers : [];
  console.log(`[Data] Clans: ${CLANS.length}, Territories: ${TERRITORIES.length}, Markers: ${MARKERS.length}`);
}

// ===== Map (Leaflet) =====
async function initMap(){
  if (window.__clanMap) return window.__clanMap;
  const el = document.getElementById("clanMap");
  if (!el || typeof L === "undefined") return null;

  const map = L.map(el).setView([56.818, -4.182], 6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '&copy; OpenStreetMap contributors' }).addTo(map);

  // Build layers from TERRITORIES + MARKERS
  CLAN_TO_LAYERS = {};
  const addFor = (clan, layer) => {
    if (!clan) return;
    (CLAN_TO_LAYERS[clan] ||= []).push(layer);
  };

  (TERRITORIES || []).forEach(t => {
    if (!Array.isArray(t.coords) || !t.coords.length) return;
    const poly = L.polygon(t.coords, { color: t.color || '#92400e', weight: 2, fillOpacity: 0.15 });
    poly.addTo(map).bindPopup(t.name || 'Territory');
    (t.clans || []).forEach(c => addFor(c, poly));
  });

  (MARKERS || []).forEach(m => {
    if (!Array.isArray(m.coords)) return;
    const mk = L.marker(m.coords).addTo(map).bindPopup(m.name || 'Seat');
    (m.clans || []).forEach(c => addFor(c, mk));
  });

  window.__clanMap = map;
  return map;
}

async function highlightClanOnMap(clanName){
  const map = await initMap();
  if (!map) return;
  const layers = CLAN_TO_LAYERS[clanName] || [];
  if (!layers.length) {
    // Fallback: search for any seat coords inside clans.json
    const c = CLANS.find(x => (x.name||'').toLowerCase() === clanName.toLowerCase());
    if (c && Array.isArray(c.seats) && c.seats.length && Array.isArray(c.seats[0].coords)) {
      map.setView(c.seats[0].coords, 9);
    }
    return;
  }
  const group = L.featureGroup(layers);
  map.fitBounds(group.getBounds().pad(0.25));
  // Temporary highlight
  layers.forEach(l => l.setStyle && l.setStyle({weight: 3, color: '#d97706'}));
  setTimeout(() => layers.forEach(l => l.setStyle && l.setStyle({weight: 2, color: '#92400e'})), 1500);
}

// ===== Tartan mini (unchanged core) =====
let TARTAN = { examples: [], patterns: {} };
async function loadTartanData(){
  try {
    const d = await fetch('./data.json?v=' + Date.now()).then(r=>r.json());
    TARTAN.examples = d.tartanExamples || [];
    TARTAN.patterns = d.tartanPatterns || {};
  } catch (e) {}
}
function setPreview(src){
  const img = document.getElementById("tartanPreview"); if (img) img.src = src;
  const a = document.getElementById("btnDownloadTartan"); if (a) a.href = src;
}
function buildStripePlan(sett){ const total = sett.reduce((s,[,w])=>s+w,0); let acc = 0; return { total, plan: sett.map(([c,w])=>({c,start:(acc),width:w,end:(acc+=w)})) }; }
function drawTartanToCanvas(canvas, name, scale=8){
  const p = TARTAN.patterns[name]; if (!p) return;
  const ctx = canvas.getContext("2d"); const { total, plan } = buildStripePlan(p.sett); const W=canvas.width,H=canvas.height; ctx.clearRect(0,0,W,H);
  for (let x=0;x<W;x++){ const pos=(x/scale)%total; const seg=plan.find(s=>pos>=s.start&&pos<s.end)||plan[plan.length-1]; ctx.fillStyle=p.palette[seg.c]||p.palette[seg.code]||"#444"; ctx.fillRect(x,0,1,H); }
  ctx.globalAlpha=0.5;
  for (let y=0;y<H;y++){ const pos=(y/scale)%total; const seg=plan.find(s=>pos>=s.start&&pos<s.end)||plan[plan.length-1]; ctx.fillStyle=p.palette[seg.c]||p.palette[seg.code]||"#444"; ctx.fillRect(0,y,W,1); }
  ctx.globalAlpha=1;
}
function applySelectedTartan(){
  const sel = document.getElementById("tartanSelect"); const name = sel?.value; const c = document.getElementById("tartanCanvas"); if (!name || !c) return;
  drawTartanToCanvas(c, name, 8); const url = c.toDataURL("image/png"); const prev = document.getElementById("tartanPreview"); if (prev) prev.src = url; const a = document.getElementById("btnDownloadTartan"); if (a) a.href = url;
}

// ===== Clan Finder =====
function searchClans(q) {
  const query = (q || '').trim().toLowerCase();
  if (!query) return [];
  const results = [];
  for (const c of CLANS) {
    const name = (c.name || '').toLowerCase();
    const nameHit = name.includes(query) || query.includes(name);
    const surnames = (c.surnames || []).map(s => (s || '').toLowerCase());
    const surnameHit = surnames.some(s => s === query || s.includes(query) || query.includes(s));
    if (nameHit || surnameHit) results.push({ clan: c, score: nameHit ? 0 : 1 });
  }
  return results.sort((a,b)=>a.score-b.score).map(x=>x.clan).slice(0, 12);
}

function asList(arr, limit = 10){
  if (!Array.isArray(arr) || !arr.length) return '';
  const out = arr.slice(0, limit).join(', ');
  return out + (arr.length > limit ? '…' : '');
}

function renderClanResults(list) {
  const box = document.getElementById('clanResults');
  if (!box) return;
  if (!list.length) {
    box.innerHTML = '<p class="text-stone-500">No matches yet. Try “MacInnes”, “Campbell”, “Fraser”…</p>';
    return;
  }
  box.innerHTML = list.map(c => `
    <article class="px-3 py-2 border rounded mb-4">
      <div class="flex gap-3 items-start">
        ${c.crest ? `<img src="${c.crest}" alt="${c.name} crest" style="width:48px;height:48px;object-fit:contain">` : ''}
        <div class="flex-1">
          <h3 class="font-semibold text-lg">${c.name || ''}${c.gaelic_name ? ` <span class="text-stone-500 text-sm">(${c.gaelic_name})</span>` : ''}</h3>
          <div class="text-sm text-stone-700">
            ${c.region ? `<div><strong>Region:</strong> ${c.region}</div>` : ''}
            ${Array.isArray(c.seats) && c.seats.length ? `<div><strong>Seat(s):</strong> ${asList(c.seats.map(s=>s.name))}</div>` : ''}
            ${c.motto ? `<div><strong>Motto:</strong> ${c.motto}</div>` : ''}
            ${c.war_cry ? `<div><strong>War cry:</strong> ${c.war_cry}</div>` : ''}
            ${c.chief ? `<div><strong>Chief:</strong> ${c.chief}</div>` : ''}
            ${c.plant_badge ? `<div><strong>Plant badge:</strong> ${c.plant_badge}</div>` : ''}
            ${c.animal ? `<div><strong>Animal:</strong> ${c.animal}</div>` : ''}
            ${Array.isArray(c.septs) && c.septs.length ? `<div><strong>Septs:</strong> ${asList(c.septs, 12)}</div>` : ''}
            ${Array.isArray(c.surnames) && c.surnames.length ? `<div><strong>Variants:</strong> ${asList(c.surnames, 12)}</div>` : ''}
            ${Array.isArray(c.tartans) && c.tartans.length ? `<div><strong>Tartans:</strong> ${asList(c.tartans)}</div>` : ''}
          </div>
          <div class="mt-2 flex gap-2 text-sm">
            ${(Array.isArray(c.territories) && c.territories.length) || (Array.isArray(c.seats) && c.seats.length)
              ? `<button class="px-3 py-1 rounded border btn-view-map" data-clan="${c.name}">View on map</button>` : ''}
            ${c.source ? `<a href="${c.source}" target="_blank" rel="noopener" class="px-3 py-1 rounded border">Source</a>` : ''}
          </div>
        </div>
      </div>
    </article>
  `).join('');
  // wire buttons (event delegation)
  box.addEventListener('click', ev => {
    const btn = ev.target.closest('.btn-view-map'); if (!btn) return;
    const who = btn.getAttribute('data-clan');
    history.replaceState(null, '', '#map'); hideAll(); show('map');
    setTimeout(()=>highlightClanOnMap(who), 0);
  }, { once: true });
}

document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([loadAllData(), loadTartanData()]);
  // Tartan init
  const sel = document.getElementById("tartanSelect");
  if (sel) sel.innerHTML = Object.keys(TARTAN.patterns).map(n => `<option value="${n}">${n}</option>`).join("");
  document.getElementById("btnApplyTartan")?.addEventListener("click", () => {
    const name = document.getElementById("tartanSelect")?.value;
    const c = document.getElementById("tartanCanvas");
    if (name && c) { drawTartanToCanvas(c, name, 8); const url = c.toDataURL("image/png"); setPreview(url); }
  });
  const img = document.getElementById("tartanPreview");
  if (img && (!img.getAttribute("src") || img.getAttribute("src")==="")) setPreview("./assets/images/tartans/tartan-placeholder.png");

  // Finder init
  const finder = document.querySelector('#clan-finder input') || document.querySelector('section[id*="clan" i] input');
  if (finder) {
    const resultsBox = document.createElement('div');
    resultsBox.id = 'clanResults';
    resultsBox.className = 'mt-3';
    finder.insertAdjacentElement('afterend', resultsBox);
    renderClanResults([]);
    finder.addEventListener('input', e => renderClanResults(searchClans(e.target.value)));
  }

  // If user lands on #map first, load map layers once
  const s = document.querySelector('[data-section="map"]');
  if (s && !s.classList.contains("hidden")) initMap();
});
