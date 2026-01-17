// Toggle simple foldout sections (keeps prior behavior)
function toggleSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;
  const nowHidden = section.classList.toggle('hidden');

  const foldout = document.querySelector(`.foldout[data-target="${sectionId}"]`);
  if (foldout) {
    foldout.classList.toggle('open', !nowHidden);
  }
}

// Menu toggle for small screens and other UI behaviors
document.addEventListener('DOMContentLoaded', () => {
  // If previewing via file://, rewrite folder links to index.html
  if (location.protocol === 'file:') {
    document.querySelectorAll('a[href]').forEach(a => {
      const href = a.getAttribute('href');
      if (!href) return;
      // skip absolute URLs and special schemes
      if (/^[a-zA-Z]+:\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      if (href === './' || href === '../' || href.endsWith('/')) {
        a.setAttribute('href', href + 'index.html');
      }
    });
  }

  // foldouts
  document.querySelectorAll('.foldout').forEach(f => {
    f.addEventListener('click', () => {
      const id = f.getAttribute('data-target');
      toggleSection(id);
    });
  });

  const menuBtn = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
  }

  // Initialize canvas particles
  initParticles('bg-canvas');
});

// Simple particle background (lightweight)
function initParticles(canvasId){
  const canvas = document.getElementById(canvasId);
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles;

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function create(){
    particles = [];
    const count = Math.max(16, Math.floor((w*h)/90000));
    for(let i=0;i<count;i++){
      particles.push({
        x: Math.random()*w,
        y: Math.random()*h,
        r: 0.6 + Math.random()*2.2,
        vx: (Math.random()-0.5)*0.2,
        vy: -0.15 - Math.random()*0.2,
        alpha: 0.08 + Math.random()*0.18,
      });
    }
  }

  function step(){
    ctx.clearRect(0,0,w,h);
    for(const p of particles){
      p.x += p.vx; p.y += p.vy;
      if(p.y < -10){ p.y = h + 10; p.x = Math.random()*w; }
      if(p.x < -20) p.x = w + 20;
      if(p.x > w + 20) p.x = -20;

      ctx.beginPath();
      ctx.fillStyle = `rgba(124,58,237,${p.alpha})`;
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
    }
    requestAnimationFrame(step);
  }

  function start(){
    resize();
    create();
    step();
  }

  window.addEventListener('resize', ()=>{ resize(); create(); });
  start();
}