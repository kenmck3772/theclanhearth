// Datasets
const CLANS_JSON = "clans.json";
const MAP_JSON   = "map-data.json";

const ALIAS = { stuart:"stewart", mcdonald:"macdonald", mckenzie:"mackenzie", mcleod:"macleod", mcpherson:"macpherson", mcgregor:"macgregor" };
const slugifyClan = (name) => (ALIAS[String(name||"").toLowerCase().replace(/[^a-z]/g,"")] || String(name||"").toLowerCase().replace(/[^a-z]/g,""));
const emblemPath = (clan)=> clan.emblem || `assets/images/emblems/${slugifyClan(clan.name)}-emblem.jpg`;
const tartanPath = (clan)=> clan.tartan || `assets/images/tartans/jpg/${slugifyClan(clan.name)}-tartan.jpg`;
const EMBLEM_FALLBACK = "assets/images/hearth-crest.png";
const TARTAN_FALLBACK = "assets/images/hearth-crest.png";

const searchEl   = document.getElementById("clanSearch");
const regionEl   = document.getElementById("regionFilter");
const clearBtn   = document.getElementById("clearFilters");
const indexEl    = document.getElementById("clanIndex");
const alphaNavEl = document.getElementById("alphaNav");

const modal = document.getElementById("clanModal");
const modalClose = document.getElementById("modalClose");
const modalMapBtn = document.getElementById("modalMapBtn");
const elMod = {
  emblem: document.getElementById("modalEmblem"),
  tartan: document.getElementById("modalTartan"),
  name:   document.getElementById("modalName"),
  region: document.getElementById("modalRegion"),
  motto:  document.getElementById("modalMotto"),
  septs:  document.getElementById("modalSepts"),
  seats:  document.getElementById("modalSeats"),
};

let ALL_CLANS = [];
let MAP_DATA  = { territories: [], markers: [] };
let __currentClan = null;

function groupByInitial(list){
  const groups = {};
  (list||[]).forEach(c=>{
    const ch = String(c.name||"").trim().charAt(0).toUpperCase();
    const key = /[A-Z]/.test(ch) ? ch : "#";
    (groups[key] ||= []).push(c);
  });
  Object.keys(groups).forEach(k => groups[k].sort((a,b)=>a.name.localeCompare(b.name)));
  return groups;
}
function sectionHTML(letter, items){
  const rows = items.map(c=>{
    const e = emblemPath(c);
    const motto = c.motto || c.war_cry || "";
    const region = c.region || "";
    return `
    <button class="w-full text-left flex items-center gap-4 p-3 rounded-xl border hover:bg-stone-50"
            data-clan="${c.name}">
      <img src="${e}" loading="lazy" alt="${c.name} emblem"
           onerror="this.onerror=null;this.src='${EMBLEM_FALLBACK}'"
           class="h-10 w-10 rounded-full object-cover ring-1 ring-stone-200">
      <div class="min-w-0">
        <div class="font-medium truncate">${c.name}</div>
        <div class="text-xs text-stone-600 truncate">${region}</div>
        ${motto ? `<div class="mt-1 text-[11px] text-stone-600 truncate">“${motto}”</div>` : ""}
      </div>
    </button>`;
  }).join("");

  return `
    <section id="sec-${letter}">
      <div class="flex items-center gap-2 mb-2">
        <h3 class="text-lg font-semibold">${letter}</h3>
        <span class="text-xs rounded-full bg-stone-100 px-2 py-0.5">${items.length}</span>
      </div>
      <div class="space-y-2">${rows}</div>
    </section>`;
}
function renderAlphaNav(lettersPresent, countsByLetter){
  const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  alphaNavEl.innerHTML = LETTERS.map(L=>{
    const enabled = lettersPresent.has(L);
    const count = countsByLetter[L] || 0;
    return enabled
      ? `<a href="#sec-${L}" class="rounded-md px-2 py-1 text-center hover:bg-stone-100">
           ${L}${count ? `<sup class="text-[10px] ml-0.5">${count}</sup>` : ""}
         </a>`
      : `<span class="rounded-md px-2 py-1 text-center text-stone-300 cursor-not-allowed">${L}</span>`;
  }).join("");
}
function renderClanIndex(list){
  const groups = groupByInitial(list);
  const letters = new Set(Object.keys(groups).sort());
  const counts = {};
  Object.keys(groups).forEach(k => counts[k] = groups[k].length);

  renderAlphaNav(letters, counts);

  const order = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").filter(L => groups[L]);
  indexEl.innerHTML = order.map(L => sectionHTML(L, groups[L])).join("") ||
    `<div class="text-stone-600">No results.</div>`;

  indexEl.querySelectorAll("button[data-clan]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const name = btn.getAttribute("data-clan");
      const clan = (ALL_CLANS||[]).find(c=>c.name===name);
      if (clan) openClanModal(clan);
    });
  });
}

let CURRENT_REGION = "";
function populateRegionFilter(clans){
  const regions = Array.from(new Set((clans||[])
    .map(c => (c.region || "").trim())
    .filter(Boolean)))
    .sort((a,b)=>a.localeCompare(b));
  regionEl.innerHTML = `<option value="">All regions</option>` +
    regions.map(r => `<option value="${r}">${r}</option>`).join("");
}
function filteredClans(){
  const q = (searchEl?.value || "").toLowerCase().trim();
  return (ALL_CLANS||[]).filter(c=>{
    if (CURRENT_REGION && (c.region||"") !== CURRENT_REGION) return false;
    if (!q) return true;
    const hay = [
      c.name, c.gaelic_name, c.region, c.motto, c.war_cry,
      ...(c.surnames||[]), ...(c.septs||[])
    ].filter(Boolean).join("|").toLowerCase();
    return hay.includes(q);
  });
}
function applyFilters(){ renderClanIndex(filteredClans()); }
searchEl?.addEventListener("input", applyFilters);
regionEl?.addEventListener("change", (e)=>{ CURRENT_REGION = e.target.value || ""; applyFilters(); });
clearBtn?.addEventListener("click", ()=>{
  CURRENT_REGION = "";
  if (regionEl) regionEl.value = "";
  if (searchEl) searchEl.value = "";
  applyFilters();
});

function openClanModal(clan){
  __currentClan = clan;
  elMod.name.textContent   = clan.name || "";
  elMod.region.textContent = clan.region || "";
  elMod.motto.textContent  = clan.motto || clan.war_cry || "—";
  elMod.emblem.src = emblemPath(clan); elMod.emblem.onerror = () => elMod.emblem.src = EMBLEM_FALLBACK;
  elMod.tartan.src = tartanPath(clan); elMod.tartan.onerror = () => elMod.tartan.src = TARTAN_FALLBACK;

  const chips = (clan.septs && clan.septs.length ? clan.septs : clan.surnames || []).slice(0,24);
  elMod.septs.innerHTML = chips.map(s=>`<span class="rounded-full bg-stone-100 px-2 py-1 text-xs">${s}</span>`).join("")
     || `<span class="text-stone-500 text-sm">—</span>`;

  elMod.seats.innerHTML = (clan.seats||[]).map(s=>{
    const [lat, lon] = s.coords || [];
    return `<li><button class="text-amber-700 hover:underline" data-lat="${lat}" data-lon="${lon}">${s.name}</button></li>`;
  }).join("") || `<li class="text-stone-500">—</li>`;

  elMod.seats.querySelectorAll("button[data-lat]").forEach(b=>{
    b.addEventListener("click", ()=>{
      const lat = parseFloat(b.getAttribute("data-lat"));
      const lon = parseFloat(b.getAttribute("data-lon"));
      if(!Number.isNaN(lat) && !Number.isNaN(lon)) focusMapLatLng(lat,lon);
    });
  });

  modal.classList.remove("hidden");
}
function closeClanModal(){ modal.classList.add("hidden"); __currentClan=null; }
modalClose?.addEventListener("click", closeClanModal);
modal?.addEventListener("click", (e)=>{ if(e.target===modal) closeClanModal(); });
modalMapBtn?.addEventListener("click", ()=>{ if(__currentClan){ focusClanByName(__currentClan.name); closeClanModal(); }});

let MAP, POLY_LAYERS = {}, MARKERS = [];
function initMap(){
  MAP = L.map("leaflet", { scrollWheelZoom:true, zoomControl:true }).setView([56.8,-4.2],6);
  window.__LEAFLET_MAP__ = MAP;
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {maxZoom:18, attribution:'&copy; OpenStreetMap'}).addTo(MAP);

  (MAP_DATA.territories||[]).forEach(t=>{
    const latlngs = (t.coords||[]).map(([lat,lon])=>[lat,lon]);
    const layer = L.polygon(latlngs, { color:t.color||"#444", weight:2, fillOpacity:0.15 });
    layer.addTo(MAP); POLY_LAYERS[t.id]=layer;
  });

  (MAP_DATA.markers||[]).forEach(m=>{
    const [lat,lon] = m.coords||[]; if(typeof lat!=="number"||typeof lon!=="number") return;
    const marker = L.marker([lat,lon]).addTo(MAP);
    marker.bindPopup(`<div class="font-semibold">${m.name}</div><div class="text-xs text-stone-600">${(m.clans||[]).join(", ")}</div>`);
    MARKERS.push(marker);
  });
}
function focusByTerritories(ids=[]){
  const layers = ids.map(id=>POLY_LAYERS[id]).filter(Boolean);
  if(!layers.length) return;
  const group = L.featureGroup(layers);
  MAP.fitBounds(group.getBounds().pad(0.2));
}
window.focusByTerritories = focusByTerritories;
function focusClanByName(name){
  const c = (ALL_CLANS||[]).find(x=>x.name===name);
  if(!c) return;
  if(c.territories && c.territories.length){ focusByTerritories(c.territories); }
  else if(c.seats && c.seats.length){ const s=c.seats[0].coords; if(s&&s.length===2) focusMapLatLng(s[0],s[1]); }
}
window.focusClanByName = focusClanByName;
function focusMapLatLng(lat,lon){ if(!MAP) return; MAP.setView([lat,lon],9,{animate:true}); }
window.focusMapLatLng = focusMapLatLng;

async function boot(){
  try{
    const [cRes, mRes] = await Promise.all([fetch("clans.json"), fetch("map-data.json")]);
    const [clans, map] = await Promise.all([cRes.json(), mRes.json()]);
    ALL_CLANS = clans; MAP_DATA = map;
    console.log("[Clan Finder] Loaded", ALL_CLANS.length, "clans (A→Z + counts + region filter).");
    populateRegionFilter(ALL_CLANS);
  }catch(err){
    console.error("Failed to load datasets", err);
  }
  renderClanIndex(ALL_CLANS);
  initMap();
}
document.addEventListener("DOMContentLoaded", boot);
