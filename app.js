
function basePrefix(){return location.pathname.includes('/admin/')?'../':''}
function openMenu(){document.querySelector('.menu-drawer')?.classList.add('open')}
function closeMenu(){document.querySelector('.menu-drawer')?.classList.remove('open')}
function cartCount(){const n=CR.cart().reduce((s,i)=>s+i.qty,0);document.querySelectorAll('[data-cart-count]').forEach(e=>e.textContent=n)}
function initChrome(){
  const prefix=basePrefix();
  document.body.insertAdjacentHTML('afterbegin',`
  <div class="topbar">LUXEMBOURG · TIMELESS ELEGANCE · SECURE CHECKOUT READY</div>
  <header class="header"><div class="header-inner">
    <nav class="nav"><a href="${prefix}index.html">HOME</a><a href="${prefix}shop.html">SHOP</a><a href="${prefix}collections.html">COLLECTIONS</a><a href="${prefix}about.html">ABOUT</a></nav>
    <a class="logo" href="${prefix}index.html"><img src="${prefix}assets/img/logo.PNG" alt="Chevalier & Roth"><span>CHEVALIER & ROTH</span></a>
    <nav class="nav right"><a href="${prefix}search.html">SEARCH</a><a href="${prefix}account.html">ACCOUNT</a><a href="${prefix}cart.html">BAG (<span data-cart-count>0</span>)</a></nav>
    <button class="burger" aria-label="Menü öffnen" onclick="openMenu()">☰</button>
  </div></header>
  <div class="menu-drawer"><button class="close" onclick="closeMenu()">×</button><nav class="menu-links">
    <a href="${prefix}index.html">Home</a><a href="${prefix}shop.html">Shop</a><a href="${prefix}collections.html">Collections</a>
    <a href="${prefix}about.html">About</a><a href="${prefix}contact.html">Contact</a><a href="${prefix}search.html">Search</a>
    <a href="${prefix}account.html">Account</a><a href="${prefix}cart.html">Bag</a><a href="${prefix}admin/index.html">Admin</a>
    <a href="${prefix}legal/legal.html">Legal Notice</a><a href="${prefix}legal/privacy.html">Privacy</a><a href="${prefix}legal/cookies.html">Cookies</a><a href="${prefix}legal/terms.html">Terms</a>
    <a href="${prefix}legal/shipping.html">Shipping</a><a href="${prefix}legal/payments.html">Payments</a><a href="${prefix}legal/returns.html">Returns</a>
  </nav></div>`);
  cartCount(); window.addEventListener('cr-cart',cartCount);
}
function footer(){
 const prefix=basePrefix();
 document.body.insertAdjacentHTML('beforeend',`
 <footer class="footer"><div class="footer-grid">
  <div><h3>CHEVALIER & ROTH</h3><p style="color:#8d857c;line-height:1.8">Modern heritage and quiet luxury, rooted in Luxembourg.</p><small>© 2026 Chevalier & Roth</small></div>
  <div><h4>SHOP</h4><a href="${prefix}shop.html">Shop</a><a href="${prefix}collections.html">Collections</a><a href="${prefix}search.html">Search</a></div>
  <div><h4>SERVICE</h4><a href="${prefix}contact.html">Contact</a><a href="${prefix}legal/shipping.html">Shipping</a><a href="${prefix}legal/payments.html">Payments</a><a href="${prefix}legal/returns.html">Returns</a></div>
  <div><h4>COMPANY</h4><a href="${prefix}about.html">Our Story</a><a href="${prefix}account.html">Account</a></div>
  <div><h4>LEGAL</h4><a href="${prefix}legal/legal.html">Legal Notice</a><a href="${prefix}legal/privacy.html">Privacy</a><a href="${prefix}legal/cookies.html">Cookie Policy</a><a href="${prefix}legal/terms.html">Terms</a></div>
 </div></footer>`);
}
function cookieConsent(){
 if(CR.get('consent',null)!==null)return;
 document.body.insertAdjacentHTML('beforeend',`<div class="cookie show" id="cookie"><p>Wir verwenden standardmäßig nur technisch notwendige lokale Speicherung. Nicht notwendige Tracking-Technologien werden erst nach Zustimmung aktiviert.</p><div><button class="btn outline" onclick="setConsent(false)">ABLEHNEN</button> <button class="btn" onclick="setConsent(true)">AKZEPTIEREN</button></div></div>`);
}
function setConsent(v){CR.set('consent',v);document.getElementById('cookie')?.remove()}
async function renderCards(target, limit=999, filter=null){
 let ps=(await CR.products()).filter(p=>p.active);
 if(filter)ps=ps.filter(filter); ps=ps.slice(0,limit);
 document.querySelector(target).innerHTML=ps.map(p=>`<article class="card"><a href="product.html?id=${encodeURIComponent(p.id)}" style="text-decoration:none"><div class="card-media"><img src="${p.images[0]}" alt="${CR.sanitize(p.name)}"></div><div class="card-body"><div class="card-title">${CR.sanitize(p.name)}</div><div class="meta"><span>${CR.sanitize(p.category)}</span><span>${CR.money(CR.effectivePrice(p))}</span></div>${p.badge?`<span class="badge">${CR.sanitize(p.badge)}</span>`:''}</div></a></article>`).join('');
}
document.addEventListener('DOMContentLoaded',()=>{initChrome();footer();cookieConsent()});
