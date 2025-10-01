import { clanTerritories } from "./data/clanTerritories.js";
import { tartanExamples } from "./data/tartanExamples.js";
import { tartanPatterns } from "./data/tartanPatterns.js";

(function() {
  const CANON = ["home","clan-finder","tartan-designer","recipes","myths","map","about"];
  const ALIAS = { clans: "clan-finder", legends: "myths" };
  const normalize = (id) => ALIAS[id] || id;
  const SELECTORS = {
    "home": ["#home","#hero","section[id*='home' i]","main > section:first-of-type"],
    "clan-finder": ["#clan-finder","#clanFinder","#clans","section[id*='clan' i]"],
    "tartan-designer": ["#tartan-designer","#tartanDesigner","section[id*='tartan' i]"],
    "recipes": ["#recipes","section[id*='recipe' i]"],
    "myths": ["#myths","#legends","section[id*='legend' i]","section[id*='myth' i]"],
    "map": ["#clan-map","#map","section[id*='map' i]"],
    "about": ["#about","section[id*='about' i]"]
  };
  const qs=(s)=>document.querySelector(s), qsa=(s)=>Array.from(document.querySelectorAll(s));
  const ensure=(id,el)=>{ if(el) el.setAttribute("data-section",id); };
  function wire(){ CANON.forEach(id=>ensure(id, SELECTORS[id].map(qs).find(Boolean))); const hero=qs("#hero"); if(hero) ensure("home",hero); }
  const hide=()=>qsa("[data-section]").forEach(s=>s.classList.add("hidden"));
  const show=(id)=>{ qs(`[data-section="${id}"]`)?.classList.remove("hidden"); qsa("#topNav .nav-link, #topNav [data-nav]").forEach(a=>a.classList.remove("text-amber-400","font-semibold")); qs(`#topNav [data-nav="${id}"]`)?.classList.add("text-amber-400","font-semibold"); };
  function initial(){ const raw=location.hash.replace("#",""); const id=normalize(raw); return CANON.includes(id)?id:"home"; }
  document.addEventListener("DOMContentLoaded",()=>{ wire(); hide(); show(initial()); });
  window.addEventListener("hashchange",()=>{ const id=normalize(location.hash.replace("#","")); if(CANON.includes(id)){ hide(); show(id); } });
  document.addEventListener("click",(e)=>{ const nav=e.target.closest("[data-nav]"); if(!nav) return; e.preventDefault(); const id=normalize(nav.dataset.nav); history.replaceState(null,"","#"+id); hide(); show(id); });
})();

(function(){ document.addEventListener("DOMContentLoaded",()=>{
  const hero=document.getElementById("hero"); if(hero){ hero.style.backgroundImage="url('./assets/images/castlehome.jpg')"; hero.classList.add("bg-cover","bg-center","bg-no-repeat","relative"); const ov=document.createElement("div"); ov.className="absolute inset-0 bg-black/40"; hero.prepend(ov); }
  const logo=document.getElementById("siteLogo")||document.querySelector("header img"); if(logo){ logo.src="./assets/images/hearth-crest.png"; logo.classList.add("h-8","w-auto","object-contain"); }
}); })();

(function(){ function init(){ if(window.__clanMap) return; const el=document.getElementById("clanMap"); if(!el||typeof L==='undefined') return; const map=L.map(el).setView([56.818,-4.182],6); L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'&copy; OpenStreetMap contributors'}).addTo(map); [{name:"Edinburgh Castle",coords:[55.9486,-3.1999]}].forEach(s=>L.marker(s.coords).addTo(map).bindPopup(s.name)); window.__clanMap=map; }
document.addEventListener("DOMContentLoaded",()=>{ const s=document.querySelector('[data-section="map"]'); if(s&&!s.classList.contains('hidden')) init(); });
window.addEventListener("hashchange",()=>{ if((location.hash||'').replace('#','')==='map') init(); });
})(); 

(function(){ function setPreview(src){ const img=document.getElementById("tartanPreview"); if(img) img.src=src; const a=document.getElementById("btnDownloadTartan"); if(a) a.href=src; }
function apply(){ const sel=document.getElementById("tartanSelect"); const name=sel?.value; const c=document.getElementById("tartanCanvas"); if(!name||!c) return; const p=tartanPatterns[name]; const ctx=c.getContext('2d'); ctx.fillStyle='#7a2e2e'; ctx.fillRect(0,0,c.width,c.height); const url=c.toDataURL('image/png'); const prev=document.getElementById('tartanPreview'); if(prev) prev.src=url; const a=document.getElementById('btnDownloadTartan'); if(a) a.href=url; }
document.addEventListener("DOMContentLoaded",()=>{ const sel=document.getElementById("tartanSelect"); if(sel) sel.innerHTML=Object.keys(tartanPatterns).map(n=>`<option value="${n}">${n}</option>`).join(""); document.getElementById("btnApplyTartan")?.addEventListener("click",apply); if(document.getElementById("tartanPreview") && !document.getElementById("tartanPreview").src) setPreview("./assets/images/tartans/tartan-placeholder.png"); });
})();