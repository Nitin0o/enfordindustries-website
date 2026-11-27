(()=>{'use strict';
const basePath=location.pathname.split('/').filter(Boolean).length>1?'../':'';
const pathName=location.pathname.split('/').filter(Boolean).pop()||'index.html';
const siteNav=[
 ['The Group','group.html'],
 ['Businesses','businesses.html'],
 ['Products','catalogue.html'],
 ['Applications','applications.html'],
 ['Consultancy','consultancy.html'],
 ['Contact','contact.html'],
 ['Locations','locations.html']
];
const headerShell=document.querySelector('header.nav');
if(headerShell){
 headerShell.classList.remove('wrap');
 headerShell.innerHTML=
  '<a class="brandlock" href="'+basePath+'index.html" aria-label="ENFORD Group home"><img class="logo" src="'+basePath+'brand/enford-logo.svg" alt="ENFORD"></a>'+
  '<nav class="navlinks" aria-label="Main navigation">'+siteNav.map(([label,file])=>'<a href="'+basePath+file+'"'+(pathName===file?' class="active"':'')+'>'+label+'</a>').join('')+'</nav>'+
  '<button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false"><span>☰</span></button>'+
  '<a class="btn btn-primary" href="'+basePath+'contact.html">Discuss a Requirement</a>';
}
const siteFooter=document.querySelector('footer');
if(siteFooter){
 siteFooter.className='footer enford-footer';
 siteFooter.innerHTML=
  '<div class="wrap">'+
   '<div class="enford-footer-brand"><a href="'+basePath+'index.html" aria-label="ENFORD home"><img class="logo" src="'+basePath+'brand/enford-logo.svg" alt="ENFORD"></a><p>Ingredients, specialty chemicals and industrial materials for manufacturing businesses.</p></div>'+
   '<div class="enford-footer-column"><strong>Explore</strong><a href="'+basePath+'group.html">The Group</a><a href="'+basePath+'businesses.html">Business Divisions</a><a href="'+basePath+'catalogue.html">Product Catalogue</a><a href="'+basePath+'industries.html">Industries</a></div>'+
   '<div class="enford-footer-column"><strong>Services</strong><a href="'+basePath+'applications.html">Application Support</a><a href="'+basePath+'consultancy.html">Consultancy</a><a href="'+basePath+'locations.html">Locations</a><a href="'+basePath+'contact.html">Contact ENFORD</a></div>'+
   '<div class="enford-footer-column enford-footer-contact"><strong>Contact</strong><a href="tel:+917585870505">+91 75858 70505</a><a href="mailto:contact@enfordindustries.com">contact@enfordindustries.com</a><a href="https://wa.me/917585870505" target="_blank" rel="noopener">WhatsApp ENFORD</a></div>'+
   '<div class="enford-footer-bottom"><span>© '+new Date().getFullYear()+' ENFORD Industries Private Limited. All rights reserved.</span><span><a href="'+basePath+'privacy.html">Privacy Notice</a><a href="'+basePath+'image-credits.html">Image Credits</a></span></div>'+
  '</div>';
}
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const header=document.querySelector('.nav');const onScroll=()=>{if(header)header.classList.toggle('scrolled',window.scrollY>12);const b=document.querySelector('.backtop');if(b)b.classList.toggle('show',window.scrollY>500)};window.addEventListener('scroll',onScroll,{passive:true});onScroll();
let toggle=document.querySelector('.menu-toggle');
const links=document.querySelector('.navlinks');
if(!toggle&&links){
 toggle=document.createElement('button');
 toggle.className='menu-toggle';
 toggle.type='button';
 toggle.setAttribute('aria-label','Open navigation');
 toggle.setAttribute('aria-expanded','false');
 toggle.innerHTML='<span aria-hidden="true"></span>';
 links.parentNode.insertBefore(toggle,links);
}
const menuBackdrop=document.createElement('button');
menuBackdrop.type='button';
menuBackdrop.className='nav-menu-backdrop';
menuBackdrop.setAttribute('aria-label','Close navigation menu');
document.body.appendChild(menuBackdrop);
const closeMenu=()=>{
 if(!toggle||!links)return;
 links.classList.remove('open');
 toggle.setAttribute('aria-expanded','false');
 toggle.setAttribute('aria-label','Open navigation');
 menuBackdrop.classList.remove('visible');
 document.body.classList.remove('menu-open');
};
const openMenu=()=>{
 if(!toggle||!links)return;
 links.classList.add('open');
 toggle.setAttribute('aria-expanded','true');
 toggle.setAttribute('aria-label','Close navigation');
 menuBackdrop.classList.add('visible');
 document.body.classList.add('menu-open');
};
if(toggle&&links){
 toggle.addEventListener('click',()=>links.classList.contains('open')?closeMenu():openMenu());
 menuBackdrop.addEventListener('click',closeMenu);
 links.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
 document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
 window.addEventListener('resize',()=>{if(window.innerWidth>1050)closeMenu()},{passive:true});
}
if(!reduced&&'IntersectionObserver'in window){const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');obs.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -35px 0px'});document.querySelectorAll('.reveal').forEach(el=>obs.observe(el))}else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in-view'));
document.querySelectorAll('.js-year').forEach(el=>el.textContent=new Date().getFullYear());
let back=document.querySelector('.backtop');if(!back){back=document.createElement('button');back.className='backtop';back.type='button';back.setAttribute('aria-label','Back to top');back.textContent='↑';document.body.append(back)}back.addEventListener('click',()=>window.scrollTo({top:0,behavior:reduced?'auto':'smooth'}));
if(!document.querySelector('.whatsapp-float')){const wa=document.createElement('a');wa.className='whatsapp-float';wa.href='https://wa.me/917585870505?text=Hello%20ENFORD%20Team%2C%20I%20would%20like%20to%20discuss%20a%20product%20or%20application%20requirement.';wa.target='_blank';wa.rel='noopener';wa.setAttribute('aria-label','Chat with ENFORD on WhatsApp');wa.innerHTML='<svg viewBox="0 0 24 24" width="25" height="25" fill="currentColor" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 2 17.7L.4 23.5l5.9-1.5A11.8 11.8 0 0 0 20.5 3.5Zm-8.4 17a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.5.9.9-3.4-.2-.4a9.8 9.8 0 1 1 8.2 4.5Zm5.4-7.3c-.3-.2-1.7-.9-2-.9-.2-.1-.4-.2-.6.2-.2.3-.7.9-.8 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.4-2.3-1.4-.8-.7-1.4-1.6-1.5-1.9-.2-.3 0-.4.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.5-.4-.6-.4h-.5c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 2-1.3.2-.7.2-1.2.2-1.3-.1-.2-.3-.3-.6-.4Z"/></svg>';document.body.append(wa)}
const hs=document.getElementById('home-search'),hb=document.getElementById('home-search-btn');if(hs&&hb){const go=()=>{const v=hs.value.trim();if(v)location.href='catalogue.html?q='+encodeURIComponent(v);else location.href='catalogue.html'};hb.addEventListener('click',go);hs.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();go()}})}
const enquiryType=document.getElementById('type');const presetType=new URLSearchParams(location.search).get('type');const typeMap={'food-consultancy':'Food consultancy','industrial-consultancy':'Industrial consultancy','application-support':'Application support','custom-formulation':'Custom formulation'};if(enquiryType&&typeMap[presetType])enquiryType.value=typeMap[presetType];
document.querySelectorAll('.wa-form').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const f=new FormData(form);const lines=['Hello ENFORD Team, I would like to discuss a product / application requirement.','',...Array.from(f.entries()).filter(([k,v])=>String(v).trim()).map(([k,v])=>k.replace(/_/g,' ')+': '+v),'','Please let me know the next steps.'];window.open('https://wa.me/917585870505?text='+encodeURIComponent(lines.join('\n')),'_blank','noopener')}));

// Legacy product and category pages are routed to the main Consultancy page.
document.querySelectorAll('a[href*="consultancy-network.html"]').forEach(a=>{
  const old=a.getAttribute('href')||'';
  a.setAttribute('href',old.startsWith('../')?'../consultancy.html':'consultancy.html');
  if(/specialist|directory|ecosystem/i.test(a.textContent))a.textContent='Consultancy';
});
// Keep the photo credits in one place, while making the page reachable from older catalogue templates.
document.querySelectorAll('.footlinks').forEach(nav=>{
  if(!nav.querySelector('a[href*="image-credits.html"]')){
    const a=document.createElement('a');
    a.href=(location.pathname.includes('/products/')||location.pathname.includes('/categories/'))?'../image-credits.html':'image-credits.html';
    a.textContent='Image Credits';
    nav.append(a);
  }
});
})();