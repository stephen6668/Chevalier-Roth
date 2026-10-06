
const CR = (() => {
  const DEFAULT_CODES = [
    {code:'WELCOME10', percent:10, active:true, starts:null, expires:null, maxUses:100, uses:0, minOrder:0, products:[], categories:[], oncePerCustomer:false}
  ];
  const defaults = {products:null,codes:DEFAULT_CODES,cart:[],orders:[],customer:null,consent:null};

  function get(key, fallback){try{return JSON.parse(localStorage.getItem('cr_'+key)) ?? fallback}catch{return fallback}}
  function set(key, value){localStorage.setItem('cr_'+key, JSON.stringify(value))}
  async function products(){
    const local=get('products',null);
    if(local) return local;
    const data=await fetch('data/products.json').then(r=>r.json());
    set('products',data); return data;
  }
  function codes(){return get('codes',DEFAULT_CODES)}
  function cart(){return get('cart',[])}
  function saveCart(v){set('cart',v);window.dispatchEvent(new Event('cr-cart'))}
  function orders(){return get('orders',[])}
  function saveOrders(v){set('orders',v)}
  function money(v){return new Intl.NumberFormat('de-LU',{style:'currency',currency:'EUR'}).format(v)}
  function sanitize(s=''){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
  function effectivePrice(p){return p.salePrice && p.salePrice < p.price ? p.salePrice : p.price}
  function validateCode(input, subtotal, items){
    const c=codes().find(x=>x.code.toUpperCase()===String(input).trim().toUpperCase());
    if(!c) return {ok:false,msg:'Ungültiger Rabattcode.'};
    const now=new Date();
    if(!c.active) return {ok:false,msg:'Dieser Code ist deaktiviert.'};
    if(c.starts && now < new Date(c.starts)) return {ok:false,msg:'Dieser Code ist noch nicht aktiv.'};
    if(c.expires && now > new Date(c.expires+'T23:59:59')) return {ok:false,msg:'Dieser Code ist abgelaufen.'};
    if(c.maxUses && c.uses>=c.maxUses) return {ok:false,msg:'Nutzungslimit erreicht.'};
    if(subtotal < Number(c.minOrder||0)) return {ok:false,msg:'Mindestbestellwert nicht erreicht.'};
    let eligible = subtotal;
    if((c.products||[]).length || (c.categories||[]).length){
      eligible=items.filter(i=>(c.products||[]).includes(i.product.id)||(c.categories||[]).includes(i.product.category))
                    .reduce((s,i)=>s+effectivePrice(i.product)*i.qty,0);
      if(!eligible) return {ok:false,msg:'Code gilt nicht für diese Produkte.'};
    }
    return {ok:true,code:c,discount:eligible*(c.percent/100),msg:`${c.percent}% Rabatt angewendet.`};
  }
  return {get,set,products,codes,cart,saveCart,orders,saveOrders,money,sanitize,effectivePrice,validateCode};
})();
