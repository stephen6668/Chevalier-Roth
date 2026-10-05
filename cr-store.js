(function(){
  const K={products:'crProductsV2',content:'crContentV2',codes:'crPromoCodesV2',cart:'crCartV2',admin:'crAdminV2'};
  const defaults={
    content:{
      brand:'CHEVALIER & ROTH',
      eyebrow:'NEW HOUSE · LUXEMBOURG',
      heroTitle:'Quiet luxury, made attainable.',
      heroText:'Zeitlose Schnitte, ruhige Farben und ein eleganter Auftritt – für Alltag, Dinner und besondere Momente.',
      heroButton:'KOLLEKTION ENTDECKEN',
      philosophyTitle:'Eleganz ohne Übertreibung.',
      philosophyText:'Chevalier & Roth verbindet klassische Old-Money-Ästhetik mit tragbaren Preisen. Weniger Logos, bessere Proportionen, eine klare Farbwelt.',
      announcement:'KOSTENLOSER VERSAND AB 120 € · 14 TAGE RÜCKGABE',
      instagram:'@chevalierandroth'
    },
    products:[
      {id:'p1',slug:'abendkleid-noir',name:'Abendkleid Noir',category:'DAMEN',price:129,compareAt:159,discount:0,active:true,badge:'NEU',description:'Fließendes Abendkleid mit klarer Silhouette und zurückhaltenden Details.',material:'Fließender Webstoff mit weichem Griff und elegantem Fall.',care:['Schonwaschgang bei niedriger Temperatur','Auf links waschen','Nicht bleichen','Liegend oder auf Bügel trocknen'],fit:'Figurnah im Oberkörper, fließend ab Taille.',sizes:['XS','S','M','L','XL'],images:['abendkleid-noir-01.jpg','abendkleid-noir-02.jpg','abendkleid-noir-03.jpg']},
      {id:'p2',slug:'klassische-pumps',name:'Klassische Pumps',category:'DAMEN',price:99,compareAt:119,discount:0,active:true,badge:'',description:'Zeitlose Pumps mit eleganter Linienführung und vielseitigem Styling.',material:'Glattes Obermaterial mit weichem Innenfutter und klassischer Form.',care:['Mit weichem Tuch reinigen','Vor Nässe schützen','Schuhspanner empfohlen'],fit:'Reguläre Passform. Bei Zwischengrößen die größere Größe wählen.',sizes:['36','37','38','39','40','41'],images:['klassische-pumps-01.jpg','klassische-pumps-02.jpg','klassische-pumps-03.jpg']},
      {id:'p3',slug:'leder-clutch',name:'Leder Clutch',category:'ACCESSOIRES',price:79,compareAt:95,discount:0,active:true,badge:'BESTSELLER',description:'Minimalistische Clutch für Abend, Dinner und formelle Anlässe.',material:'Strukturiertes Obermaterial mit sauber gearbeiteten Kanten und kompaktem Innenraum.',care:['Trocken lagern','Mit weichem Tuch reinigen','Direkte Hitze und starke Feuchtigkeit vermeiden'],fit:'One Size.',sizes:['ONE SIZE'],images:['leder-clutch-01.jpg','leder-clutch-02.jpg','leder-clutch-03.jpg']},
      {id:'p4',slug:'signature-polo-navy',name:'Signature Polo Navy',category:'HERREN',price:90,compareAt:0,discount:0,active:true,badge:'SIGNATURE',description:'Klassisches Polo in Navy mit kleinem CR-Monogramm.',material:'Weicher Baumwoll-Piqué mit atmungsaktiver Struktur.',care:['30 °C Pflegeleicht','Mit ähnlichen Farben waschen','Nicht heiß trocknen','Auf links bügeln'],fit:'Regular Fit mit sauberer Schulterlinie.',sizes:['S','M','L','XL','XXL'],images:['signature-polo-navy-01.jpg','signature-polo-navy-02.jpg','signature-polo-navy-03.jpg']},
      {id:'p5',slug:'heritage-halfzip-beige',name:'Heritage Half-Zip Beige',category:'HERREN',price:120,compareAt:0,discount:0,active:true,badge:'',description:'Eleganter Half-Zip in Beige für einen gepflegten, entspannten Look.',material:'Weicher Feinstrick mit glatter Oberfläche und angenehmem Griff.',care:['Schonwaschgang kalt','Nicht bleichen','Liegend trocknen','Bei niedriger Temperatur bügeln'],fit:'Relaxed Regular Fit – bequem, ohne oversized zu wirken.',sizes:['S','M','L','XL','XXL'],images:['heritage-halfzip-beige-01.jpg','heritage-halfzip-beige-02.jpg','heritage-halfzip-beige-03.jpg']},
      {id:'p6',slug:'tailored-trouser-stone',name:'Tailored Trouser Stone',category:'HERREN',price:100,compareAt:0,discount:0,active:true,badge:'',description:'Bequeme Anzughose mit sauberer Linie und moderner Passform.',material:'Formstabiler Hosenstoff mit glattem Fall und leichtem Komfortanteil.',care:['Schonwaschgang oder professionelle Reinigung','Nicht heiß trocknen','Bei niedriger Temperatur bügeln'],fit:'Gerades, modernes Bein mit komfortabler Bundweite.',sizes:['44','46','48','50','52','54'],images:['tailored-trouser-stone-01.jpg','tailored-trouser-stone-02.jpg','tailored-trouser-stone-03.jpg']}
    ],
    codes:[
      {code:'WELCOME10',percent:10,scope:'all',productIds:[],active:true},
      {code:'POLO15',percent:15,scope:'selected',productIds:['p4'],active:true}
    ]
  };
  const read=(k,f)=>{try{return JSON.parse(localStorage.getItem(k)) ?? f}catch(e){return f}};
  const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
  const api={
    keys:K,
    getProducts(){let v=read(K.products,null); if(!v){v=defaults.products;write(K.products,v)} return v;},
    saveProducts(v){write(K.products,v);},
    getContent(){let v=read(K.content,null); if(!v){v=defaults.content;write(K.content,v)} return Object.assign({},defaults.content,v);},
    saveContent(v){write(K.content,v);},
    getCodes(){let v=read(K.codes,null); if(!v){v=defaults.codes;write(K.codes,v)} return v;},
    saveCodes(v){write(K.codes,v);},
    getCart(){return read(K.cart,[]);}, saveCart(v){write(K.cart,v);},
    reset(){Object.values(K).forEach(k=>localStorage.removeItem(k));location.reload();},
    money(n){return new Intl.NumberFormat('de-LU',{style:'currency',currency:'EUR'}).format(Number(n||0));},
    productPrice(p){let base=Number(p.price||0), d=Math.max(0,Math.min(90,Number(p.discount||0)));return +(base*(1-d/100)).toFixed(2);},
    imageSrc(p,idx=0){return (p.images&&p.images[idx])||'';},
    escape(s){return String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));},
    uid(){return 'p'+Date.now().toString(36)+Math.random().toString(36).slice(2,6);},
    exportData(){return JSON.stringify({products:this.getProducts(),content:this.getContent(),codes:this.getCodes()},null,2);},
    importData(obj){if(obj.products) this.saveProducts(obj.products);if(obj.content)this.saveContent(obj.content);if(obj.codes)this.saveCodes(obj.codes);}
  };
  window.CR=api;
})();
