const menuButton=document.querySelector('.menu');
const siteNav=document.querySelector('.nav nav');
menuButton?.addEventListener('click',()=>{
  if(!siteNav)return;
  const open=siteNav.dataset.open==='true';
  siteNav.dataset.open=String(!open);
  Object.assign(siteNav.style,{display:open?'none':'flex',position:'absolute',top:'64px',left:'0',right:'0',padding:'22px 7%',background:'#f7f7f3',flexDirection:'column',gap:'20px',boxShadow:'0 12px 20px #202a2010'});
  menuButton.setAttribute('aria-label',open?'Open menu':'Close menu');
});
siteNav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
  if(siteNav.dataset.open==='true'){siteNav.dataset.open='false';siteNav.style.display='none';menuButton?.setAttribute('aria-label','Open menu');}
}));

// Editorial scroll reveals, with a no-JS friendly fallback and reduced-motion support.
const revealTargets=document.querySelectorAll('.section-heading,.steps article,.event-card,.city-copy,.city-visual,.community-copy,.community-visual,.join>*');
if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  document.documentElement.classList.add('motion-ready');
  const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target);}
  }),{threshold:.14,rootMargin:'0px 0px -35px 0px'});
  revealTargets.forEach((item,index)=>{item.classList.add('reveal');item.style.setProperty('--reveal-delay',`${Math.min(index%4,3)*85}ms`);revealObserver.observe(item);});
}

// Let event cards respond to pointer movement without shifting the page layout.
document.querySelectorAll('.event-card').forEach(card=>{
  card.addEventListener('pointermove',event=>{
    const bounds=card.getBoundingClientRect();
    card.style.setProperty('--pointer-x',`${event.clientX-bounds.left}px`);
    card.style.setProperty('--pointer-y',`${event.clientY-bounds.top}px`);
  });
});
