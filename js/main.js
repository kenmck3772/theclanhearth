// Simple UX helpers
const navToggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}
document.getElementById('year').textContent = new Date().getFullYear();
