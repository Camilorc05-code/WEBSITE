// ---- Inject photo ----
document.querySelectorAll('.photo-inner img').forEach(img => {
img.src = 'assets/foto.jpeg';
});

// ---- Download CV ----
function downloadCV(){
const link = document.createElement('a');
link.href = 'assets/CV.pdf';
link.download = 'Jhojan_Camilo_Rodriguez_CV.pdf';
link.click();
}

['cvDownload','heroDownload','navDownload'].forEach(id => {
const el = document.getElementById(id);

if(el){
el.addEventListener('click', e => {
e.preventDefault();
downloadCV();
});
}
});

// ---- Cursor glow ----
const glow = document.getElementById('glow');
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

// ---- Scroll reveal ----
const obs = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if(entry.isIntersecting){
      const siblings = entry.target.parentElement.querySelectorAll('.reveal,.reveal-left');
      siblings.forEach((s, idx) => {
        setTimeout(() => s.classList.add('up'), idx * 90);
      });
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal,.reveal-left').forEach(el => obs.observe(el));

// ---- Nav scroll effect ----
window.addEventListener('scroll', () => {
  document.getElementById('navbar').style.boxShadow = window.scrollY > 50 ? '0 4px 30px rgba(0,0,0,.4)' : 'none';
});

// ---- Smooth active nav ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a:not(.nav-cta)');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if(window.scrollY >= s.offsetTop - 120) current = s.id; });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
  });
});
