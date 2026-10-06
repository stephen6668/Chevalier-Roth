
let editingId=null;
async function refreshAdmin(){
 const ps=await CR.products(), codes=CR.codes(), orders=CR.orders();
 document.getElementById('statProducts').textContent=ps.length;
 document.getElementById('statOrders').textContent=orders.length;
 document.getElementById('statRevenue').textContent=CR.money(orders.reduce((s,o)=>s+Number(o.total||0),0));
 document.getElementById('statCodes').textContent=codes.filter(c=>c.active).length;
 document.getElementById('statLow').textContent=ps.filter(p=>Number(p.stock)<5).length;
 document.getElementById('productRows').innerHTML=ps.map(p=>`<tr><td>${CR.sanitize(p.name)}</td><td>${CR.money(p.price)}</td><td>${p.stock}</td><td>${p.active?'Active':'Hidden'}</td><td><button class="admin-btn" onclick="editProduct('${p.id}')">EDIT</button></td></tr>`).join('');
 document.getElementById('codeRows').innerHTML=codes.map(c=>`<tr><td>${CR.sanitize(c.code)}</td><td>${c.percent}%</td><td>${c.active?'Active':'Inactive'}</td><td>${c.uses}/${c.maxUses||'∞'}</td><td><button class="admin-btn" onclick="toggleCode('${c.code}')">TOGGLE</button></td></tr>`).join('');
}
async function saveProduct(){
 const ps=await CR.products();
 const data={
 id: editingId || 'p-'+Date.now(), name:v('pName'), category:v('pCategory'), price:+v('pPrice')||0,
 salePrice:v('pSale')?+v('pSale'):null, sizes:v('pSizes').split(',').map(x=>x.trim()).filter(Boolean),
 colors:v('pColors').split(',').map(x=>x.trim()).filter(Boolean), stock:+v('pStock')||0, sku:v('pSku'),
 status:(+v('pStock')||0)>0?'available':'soldout', badge:v('pBadge'), active:document.getElementById('pActive').checked,
 images:v('pImages').split(',').map(x=>x.trim()).filter(Boolean), description:v('pDesc')
 };
 const i=ps.findIndex(p=>p.id===data.id); if(i>=0)ps[i]=data; else ps.push(data);
 CR.set('products',ps); editingId=null; document.getElementById('productForm').reset(); refreshAdmin();
}
async function editProduct(id){
 const ps=await CR.products(),p=ps.find(x=>x.id===id); if(!p)return; editingId=id;
 setv('pName',p.name);setv('pCategory',p.category);setv('pPrice',p.price);setv('pSale',p.salePrice||'');
 setv('pSizes',(p.sizes||[]).join(', '));setv('pColors',(p.colors||[]).join(', '));setv('pStock',p.stock);setv('pSku',p.sku);
 setv('pBadge',p.badge||'');setv('pImages',(p.images||[]).join(', '));setv('pDesc',p.description||'');document.getElementById('pActive').checked=!!p.active;
 window.scrollTo({top:document.getElementById('productForm').offsetTop-80,behavior:'smooth'});
}
function saveCode(){
 const codes=CR.codes(), code=v('cCode').trim().toUpperCase(); if(!code)return;
 const data={code,percent:+v('cPercent')||0,active:document.getElementById('cActive').checked,starts:v('cStart')||null,expires:v('cEnd')||null,maxUses:+v('cMax')||0,uses:0,minOrder:+v('cMin')||0,products:v('cProducts').split(',').map(x=>x.trim()).filter(Boolean),categories:v('cCategories').split(',').map(x=>x.trim()).filter(Boolean),oncePerCustomer:document.getElementById('cOnce').checked};
 const i=codes.findIndex(x=>x.code===code); if(i>=0)data.uses=codes[i].uses||0, codes[i]=data; else codes.push(data); CR.set('codes',codes);refreshAdmin();
}
function toggleCode(code){const c=CR.codes();const x=c.find(y=>y.code===code);if(x)x.active=!x.active;CR.set('codes',c);refreshAdmin()}
function v(id){return document.getElementById(id).value}function setv(id,v){document.getElementById(id).value=v??''}
document.addEventListener('DOMContentLoaded',refreshAdmin);
