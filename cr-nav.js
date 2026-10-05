(function(){
  const links=[
    ['STARTSEITE','index.html'],
    ['KOLLEKTION','kollektion.html'],
    ['KONTO','profil.html'],
    ['WARENKORB','cart.html'],
    ['VERSAND','versandbedingungen.html'],
    ['ZAHLUNG & SICHERHEIT','zahlungssicherheit.html'],
    ['WIDERRUF','wiederruf.html'],
    ['AGB','agb.html'],
    ['DATENSCHUTZ','datenschutz.html'],
    ['IMPRESSUM','impressum.html'],
    ['STREITSCHLICHTUNG','streitschlichtung.html'],
    ['ADMIN','admin.html']
  ];
  function init(){
    if(document.getElementById('crGlobalMenu')) return;
    const css=document.createElement('style');
    css.textContent=`
      .cr-menu-btn{position:fixed;right:18px;top:18px;z-index:10050;width:46px;height:46px;border:1px solid rgba(185,154,97,.45);background:rgba(9,8,6,.9);backdrop-filter:blur(14px);display:grid;place-items:center;cursor:pointer;transition:.25s}
      .cr-menu-btn:hover{border-color:#cdb37b;background:#14110d}.cr-menu-btn span{display:block;width:20px;height:1px;background:#cdb37b;margin:4px auto;transition:.28s}
      .cr-menu-btn.open span:nth-child(1){transform:translateY(5px) rotate(45deg)}.cr-menu-btn.open span:nth-child(2){opacity:0}.cr-menu-btn.open span:nth-child(3){transform:translateY(-5px) rotate(-45deg)}
      .cr-menu-overlay{position:fixed;inset:0;z-index:10040;background:rgba(7,6,5,.985);backdrop-filter:blur(18px);opacity:0;visibility:hidden;transition:.3s;overflow:auto}
      .cr-menu-overlay.open{opacity:1;visibility:visible}.cr-menu-inner{max-width:1180px;margin:auto;padding:105px 28px 50px;display:grid;grid-template-columns:1.1fr 1fr;gap:70px;min-height:100vh;align-items:start}
      .cr-menu-brand{position:sticky;top:105px}.cr-menu-brand img{width:92px;height:92px;object-fit:contain}.cr-menu-brand h2{font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(38px,6vw,72px);font-weight:400;line-height:.94;letter-spacing:-1px;margin:18px 0;color:#f2eadf}.cr-menu-brand p{max-width:410px;color:#8d857c;font:300 12px/1.9 'Josefin Sans',Arial,sans-serif;letter-spacing:.4px}
      .cr-menu-links{display:grid;border-top:1px solid rgba(185,154,97,.22)}.cr-menu-links a{display:flex;align-items:center;justify-content:space-between;gap:20px;text-decoration:none;padding:17px 2px;border-bottom:1px solid rgba(255,255,255,.07);color:#dcd3c8;font:300 12px/1.4 'Josefin Sans',Arial,sans-serif;letter-spacing:2px;transition:.2s}.cr-menu-links a:after{content:'↗';color:#8f7650;transition:.2s}.cr-menu-links a:hover{color:#d4b878;padding-left:9px}.cr-menu-links a:hover:after{transform:translate(2px,-2px)}
      .cr-menu-note{margin-top:20px;padding:15px;border:1px solid rgba(185,154,97,.18);color:#756e66;font:300 9px/1.8 'Josefin Sans',Arial,sans-serif;letter-spacing:1px}.cr-admin-link{color:#d4b878!important}
      body.cr-menu-lock{overflow:hidden}
      @media(max-width:760px){.cr-menu-btn{right:12px;top:12px;width:42px;height:42px}.cr-menu-inner{grid-template-columns:1fr;gap:34px;padding:84px 20px 34px}.cr-menu-brand{position:static}.cr-menu-brand img{width:70px;height:70px}.cr-menu-brand h2{font-size:42px}.cr-menu-links a{padding:15px 0;font-size:10px}}
    `;
    document.head.appendChild(css);
    const btn=document.createElement('button');btn.className='cr-menu-btn';btn.setAttribute('aria-label','Menü öffnen');btn.setAttribute('aria-expanded','false');btn.innerHTML='<span></span><span></span><span></span>';
    const overlay=document.createElement('div');overlay.className='cr-menu-overlay';overlay.id='crGlobalMenu';overlay.innerHTML=`<div class="cr-menu-inner"><div class="cr-menu-brand"><a href="index.html"><img src="logo.PNG" alt="Chevalier & Roth"></a><h2>Chevalier<br>& Roth</h2><p>Maison de Mode · Luxembourg<br>Eine ruhige Garderobe mit klaren Linien und erreichbarer Eleganz.</p></div><div><nav class="cr-menu-links">${links.map(([n,h])=>`<a href="${h}" class="${h==='admin.html'?'cr-admin-link':''}">${n}</a>`).join('')}</nav><div class="cr-menu-note">Alle wichtigen Shop-, Service- und Rechtseiten sind über dieses Menü erreichbar.</div></div></div>`;
    document.body.append(btn,overlay);
    const setOpen=v=>{btn.classList.toggle('open',v);overlay.classList.toggle('open',v);document.body.classList.toggle('cr-menu-lock',v);btn.setAttribute('aria-expanded',String(v));btn.setAttribute('aria-label',v?'Menü schließen':'Menü öffnen')};
    btn.addEventListener('click',()=>setOpen(!overlay.classList.contains('open')));
    overlay.addEventListener('click',e=>{if(e.target===overlay)setOpen(false)});
    document.addEventListener('keydown',e=>{if(e.key==='Escape')setOpen(false)});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();