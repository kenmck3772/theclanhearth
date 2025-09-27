// Mobile nav
const navToggle = document.querySelector('.nav-toggle');// Hero image fallback (tries images/castlehome.jpg, then images/castlehome..jpg)
(function() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const candidates = ['images/castlehome.jpg', 'images/castlehome..jpg'];
  let i = 0;
  function tryNext() {
    if (i >= candidates.length) return;
    const src = candidates[i++];
    const img = new Image();
    img.onload = () => hero.style.setProperty('--hero-image', `url('${src}')`);
    img.onerror = tryNext;
    img.src = src;
  }
  tryNext();
})();
const nav = document.getElementById('site-nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

document.getElementById('year').textContent = new Date().getFullYear();

// --- Hero background fallback logic ---
(function() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const candidates = ['images/castlehome.jpg', 'images/castlehome..jpg'];
  let idx = 0;
  function tryNext() {
    if (idx >= candidates.length) return;
    const img = new Image();
    const src = candidates[idx++];
    img.onload = () => hero.style.setProperty('--hero-image', `url('${src}')`);
    img.onerror = tryNext;
    img.src = src;
  }
  tryNext();
})();

// --- Renderers ---
function el(tag, cls, html){
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html) e.innerHTML = html;
  return e;
}

function renderClans() {
  const root = document.getElementById('clan-list');
  if (!root || !Array.isArray(clansData)) return;
  clansData.forEach(c => {
    const card = el('article', 'card');
    card.appendChild(el('h3', null, c.name));
    card.appendChild(el('p', 'muted', c.motto));
    if (c.region) card.appendChild(el('p', null, `<strong>Region:</strong> ${c.region}`));
    root.appendChild(card);
  });
}

function renderMyths() {
  const root = document.getElementById('myths-list');
  if (!root || !Array.isArray(mythsData)) return;
  mythsData.forEach(m => {
    const card = el('article', 'card');
    card.appendChild(el('h3', null, m.title));
    card.appendChild(el('p', 'muted', m.blurb));
    root.appendChild(card);
  });
}

function renderRecipes() {
  const root = document.getElementById('recipes-list');
  if (!root || !Array.isArray(recipesData)) return;
  recipesData.forEach(r => {
    const card = el('article', 'card');
    card.appendChild(el('h3', null, r.name));
    if (r.note) card.appendChild(el('p', 'muted', r.note));
    root.appendChild(card);
  });
}

renderClans();
renderMyths();
renderRecipes();
