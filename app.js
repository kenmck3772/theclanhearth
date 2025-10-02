
// === The Clan Hearth SPA + Clan Finder (robust loader) ===
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

// Hero + logo autobind (keeps preload warning harmless)
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

// Leaflet Map (no change)
async function initMap(){
  if (window.__clanMap) return;
  const el = document.getElementById("clanMap");
  if (!el || typeof L === "undefined") return;
  const map = L.map(el).setView([56.818, -4.182], 6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '&copy; OpenStreetMap contributors' }).addTo(map);
  try {
    const locs = await fetch('./locations.json').then(r=>r.json());
    (locs||[]).forEach(s => L.marker(s.coords).addTo(map).bindPopup(s.name));
  } catch(e){}
  try {
    const geo = await fetch('./map-data.json').then(r=>r.json());
    (geo?.polygons||[]).forEach(p => L.polygon(p.coords, { color: p.color || '#92400e' }).addTo(map).bindPopup(p.name || 'Territory'));
  } catch(e){}
  window.__clanMap = map;
}
document.addEventListener("DOMContentLoaded", () => {
  const s = document.querySelector('[data-section="map"]');
  if (s && !s.classList.contains("hidden")) initMap();
});
window.addEventListener("hashchange", () => { if ((location.hash||"").replace("#","") === "map") initMap(); });
document.addEventListener("click", (e) => { if (e.target.closest("[data-nav='map']")) setTimeout(initMap, 0); });

// Tartan Designer (unchanged core)
let TARTAN = { examples: [], patterns: {} };
async function loadTartanData(){
  try {
    const d = await fetch('./data.json?v=' + Date.now()).then(r=>r.json());
    TARTAN.examples = d.tartanExamples || [];
    TARTAN.patterns = d.tartanPatterns || {};
  } catch(e){}
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
document.addEventListener("DOMContentLoaded", async () => {
  await loadTartanData();
  const sel = document.getElementById("tartanSelect");
  if (sel) sel.innerHTML = Object.keys(TARTAN.patterns).map(n => `<option value="${n}">${n}</option>`).join("");
  document.getElementById("btnApplyTartan")?.addEventListener("click", applySelectedTartan);
  const img = document.getElementById("tartanPreview");
  if (img && (!img.getAttribute("src") || img.getAttribute("src")==="")) setPreview("./assets/images/tartans/tartan-placeholder.png");
});

// --- Clan Finder: robust loader + logs ---
let CLANS = [];
async function getJSONWithFallback(paths){
  let lastErr = null;
  for (const p of paths){
    try {
      const res = await fetch(p, { cache: "no-store" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      return await res.json();
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr || new Error("All fetch attempts failed");
}
async function loadClans() {
  const candidates = [
    './clans.json?v=' + Date.now(),
    '/clans.json?v=' + Date.now(),
    'clans.json?v=' + Date.now()
  ];
  try {
    CLANS = await getJSONWithFallback(candidates);
    console.log(`[Clan Finder] Loaded ${CLANS.length} clans from clans.json`);
  } catch (e) {
    console.warn("[Clan Finder] Couldn’t load clans.json, using fallback.", e);
    CLANS = [{"name": "MacDonald", "surnames": ["MacDonald", "McDonald", "MacDonell"]}, {"name": "Campbell", "surnames": ["Campbell", "Caimbeul"]}, {"name": "Fraser", "surnames": ["Fraser", "Frazer"]}, {"name": "MacInnes", "surnames": ["MacInnes", "McInnes", "MacInnis", "McInnis"]}, {"name": "Colquhoun", "surnames": ["Colquhoun", "Calhoun", "Colhoun"]}, {"name": "Stewart", "surnames": ["Stewart", "Stuart"]}];
  }
}

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

function renderClanResults(list) {
  const box = document.getElementById('clanResults');
  if (!box) return;
  if (!list.length) {
    box.innerHTML = '<p class="text-stone-500">No matches yet. Try “McDonald”, “Campbell”, “Fraser”…</p>';
    return;
  }
  box.innerHTML = list.map(c => `
    <article class="px-3 py-2 border rounded mb-4">
      <h3 class="font-semibold text-lg">${c.name || ''}</h3>
      <div class="text-sm text-stone-700">
        ${c.region ? `<div><strong>Region:</strong> ${c.region}</div>` : ''}
        ${c.seat ? `<div><strong>Seat:</strong> ${c.seat}</div>` : ''}
        ${c.motto ? `<div><strong>Motto:</strong> ${c.motto}</div>` : ''}
        ${c.war_cry ? `<div><strong>War cry:</strong> ${c.war_cry}</div>` : ''}
        ${Array.isArray(c.septs) && c.septs.length ? `<div><strong>Septs:</strong> ${c.septs.slice(0,8).join(', ')}${c.septs.length>8?'…':''}</div>` : ''}
        ${Array.isArray(c.surnames) && c.surnames.length ? `<div><strong>Variants:</strong> ${c.surnames.slice(0,12).join(', ')}${c.surnames.length>12?'…':''}</div>` : ''}
      </div>
    </article>
  `).join('');
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadClans();
  const finder = document.querySelector('#clan-finder input') || document.querySelector('section[id*="clan" i] input');
  if (!finder) { console.warn("[Clan Finder] No input found."); return; }
  const resultsBox = document.createElement('div');
  resultsBox.id = 'clanResults';
  resultsBox.className = 'mt-3';
  finder.insertAdjacentElement('afterend', resultsBox);
  renderClanResults([]);
  finder.addEventListener('input', e => renderClanResults(searchClans(e.target.value)));
});
