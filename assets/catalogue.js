(()=>{'use strict';
const q=document.getElementById('catalogue-search');
const category=document.getElementById('catalogue-category');
const vertical=document.getElementById('catalogue-vertical');
const sort=document.getElementById('catalogue-sort');
const out=document.getElementById('catalogue-results');
const meta=document.getElementById('catalogue-meta');
const more=document.getElementById('catalogue-load-more');
if(!q||!category||!vertical||!sort||!out||!meta)return;
const PAGE_SIZE=18;
let allProducts=[];
let visibleCount=PAGE_SIZE;
const imageMap={
  "Proteins & Dairy Ingredients": {
    "src": "https://images.pexels.com/photos/32936318/pexels-photo-32936318.jpeg?auto=compress&cs=tinysrgb&w=900",
    "alt": "Cheese curds and dairy production"
  },
  "Plant Proteins": {
    "src": "https://images.pexels.com/photos/15120889/pexels-photo-15120889.jpeg?auto=compress&cs=tinysrgb&w=900",
    "alt": "Unbranded protein powder being measured"
  },
  "Hydrocolloids & Stabilizers": {
    "src": "https://images.pexels.com/photos/5947523/pexels-photo-5947523.jpeg?auto=compress&cs=tinysrgb&w=900",
    "alt": "Fine food powder and baking ingredients"
  },
  "Starches & Fibres": {
    "src": "https://images.pexels.com/photos/5947523/pexels-photo-5947523.jpeg?auto=compress&cs=tinysrgb&w=900",
    "alt": "Flour and starch ingredients"
  },
  "Sweeteners & Carbohydrates": {
    "src": "https://images.pexels.com/photos/5947523/pexels-photo-5947523.jpeg?auto=compress&cs=tinysrgb&w=900",
    "alt": "Powdered food ingredient close-up"
  },
  "Food Acids, Salts & Preservatives": {
    "src": "https://images.pexels.com/photos/15120889/pexels-photo-15120889.jpeg?auto=compress&cs=tinysrgb&w=900",
    "alt": "Fine powdered ingredient"
  },
  "Emulsifiers": {
    "src": "https://images.pexels.com/photos/3735769/pexels-photo-3735769.jpeg?auto=compress&cs=tinysrgb&w=900",
    "alt": "Laboratory formulation and ingredient handling"
  },
  "Vitamins & Minerals": {
    "src": "https://images.pexels.com/photos/3735769/pexels-photo-3735769.jpeg?auto=compress&cs=tinysrgb&w=900",
    "alt": "Laboratory sample preparation"
  },
  "Premixes & Nutraceutical Ingredients": {
    "src": "https://images.pexels.com/photos/3735769/pexels-photo-3735769.jpeg?auto=compress&cs=tinysrgb&w=900",
    "alt": "Laboratory sample preparation"
  },
  "Enzymes & Processing Aids": {
    "src": "https://images.pexels.com/photos/3735769/pexels-photo-3735769.jpeg?auto=compress&cs=tinysrgb&w=900",
    "alt": "Laboratory formulation work"
  },
  "Bakery & Food Processing": {
    "src": "https://images.pexels.com/photos/6291408/pexels-photo-6291408.jpeg?auto=compress&cs=tinysrgb&w=900",
    "alt": "Bakery dough production line"
  },
  "Oils, Fats & Bakery": {
    "src": "https://images.pexels.com/photos/31275834/pexels-photo-31275834.jpeg?auto=compress&cs=tinysrgb&w=900",
    "alt": "Golden oils in unbranded glass bottles"
  },
  "Industrial Chemicals": {
    "src": "https://images.pexels.com/photos/7598915/pexels-photo-7598915.jpeg?auto=compress&cs=tinysrgb&w=900",
    "alt": "Stainless steel industrial process tank"
  },
  "Water & Wastewater Treatment": {
    "src": "https://images.pexels.com/photos/20309517/pexels-photo-20309517.jpeg?auto=compress&cs=tinysrgb&w=900",
    "alt": "Industrial wastewater treatment tanks"
  },
  "Metal Treatment & Surface Finishing": {
    "src": "https://images.pexels.com/photos/33514501/pexels-photo-33514501.jpeg?auto=compress&cs=tinysrgb&w=900",
    "alt": "Industrial metalworking equipment"
  },
  "Aluminium, Foundry & Casting": {
    "src": "https://images.pexels.com/photos/33514501/pexels-photo-33514501.jpeg?auto=compress&cs=tinysrgb&w=900",
    "alt": "Industrial metal processing"
  },
  "Polymers, Resins & Plastics": {
    "src": "https://images.pexels.com/photos/14745095/pexels-photo-14745095.jpeg?auto=compress&cs=tinysrgb&w=900",
    "alt": "Close-up of polymer granules"
  },
  "Paints, Coatings & Construction": {
    "src": "https://images.pexels.com/photos/29842696/pexels-photo-29842696.jpeg?auto=compress&cs=tinysrgb&w=900",
    "alt": "Industrial manufacturing and pipework"
  },
  "Home Care & Institutional Cleaning": {
    "src": "https://images.pexels.com/photos/7598915/pexels-photo-7598915.jpeg?auto=compress&cs=tinysrgb&w=900",
    "alt": "Industrial chemical process equipment"
  },
  "Textile & Leather Chemicals": {
    "src": "https://images.pexels.com/photos/8246480/pexels-photo-8246480.jpeg?auto=compress&cs=tinysrgb&w=900",
    "alt": "Industrial textile yarn production line"
  },
  "Paper, Pulp & Process Chemicals": {
    "src": "https://images.pexels.com/photos/7598915/pexels-photo-7598915.jpeg?auto=compress&cs=tinysrgb&w=900",
    "alt": "Industrial process vessels and pipework"
  },
  "Rubber & Elastomer Chemicals": {
    "src": "https://images.pexels.com/photos/14745095/pexels-photo-14745095.jpeg?auto=compress&cs=tinysrgb&w=900",
    "alt": "Industrial polymer and elastomer granules"
  },
  "Lubricants & Metalworking Fluids": {
    "src": "https://images.pexels.com/photos/33514501/pexels-photo-33514501.jpeg?auto=compress&cs=tinysrgb&w=900",
    "alt": "Metalworking process equipment"
  },
  "Mining & Mineral Processing": {
    "src": "https://images.pexels.com/photos/29842696/pexels-photo-29842696.jpeg?auto=compress&cs=tinysrgb&w=900",
    "alt": "Heavy industrial material processing"
  },
  "Minerals, Fillers & Extenders": {
    "src": "https://images.pexels.com/photos/14745095/pexels-photo-14745095.jpeg?auto=compress&cs=tinysrgb&w=900",
    "alt": "Industrial granules and raw materials"
  },
  "Personal Care & Cosmetic Ingredients": {
    "src": "https://images.pexels.com/photos/3735769/pexels-photo-3735769.jpeg?auto=compress&cs=tinysrgb&w=900",
    "alt": "Laboratory formulation work"
  },
  "Construction & Industrial Additives": {
    "src": "https://images.pexels.com/photos/29842696/pexels-photo-29842696.jpeg?auto=compress&cs=tinysrgb&w=900",
    "alt": "Industrial materials production"
  },
  "Oilfield & Drilling Chemicals": {
    "src": "https://images.pexels.com/photos/7598915/pexels-photo-7598915.jpeg?auto=compress&cs=tinysrgb&w=900",
    "alt": "Industrial process plant and tanks"
  },
  "Adhesives & Sealants": {
    "src": "https://images.pexels.com/photos/3735769/pexels-photo-3735769.jpeg?auto=compress&cs=tinysrgb&w=900",
    "alt": "Laboratory formulation sample"
  },
  "Colours, Flavours & Extracts": {
    "src": "https://images.pexels.com/photos/5947523/pexels-photo-5947523.jpeg?auto=compress&cs=tinysrgb&w=900",
    "alt": "Powdered food ingredient preparation"
  },
  "Customized Solutions": {
    "src": "https://images.pexels.com/photos/3735769/pexels-photo-3735769.jpeg?auto=compress&cs=tinysrgb&w=900",
    "alt": "Laboratory formulation work"
  }
};
const verticalRules={
 food:/proteins|plant proteins|hydrocolloids|starches|sweeteners|food acids|emulsifiers|bakery|oils|colours|flavours/i,
 nutrition:/vitamins|premixes|proteins|plant proteins|nutraceutical/i,
 industrial:/industrial chemicals|home care|textile|paper|oilfield|lubricants|mining/i,
 water:/water & wastewater/i,
 materials:/polymers|paints|construction|adhesives|minerals|rubber/i,
 metal:/metal treatment|aluminium|foundry|metalworking/i,
 custom:/customized solutions/i
};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const imageFor=p=>imageMap[p.category]||imageMap['Industrial Chemicals'];
const enquiryUrl=p=>'https://wa.me/917585870505?text='+encodeURIComponent('Hello ENFORD Team, I would like to enquire about '+p.name+'.\n\nApplication / end use:\nGrade / specification required:\nRequired quantity:\nDelivery location:\nRequired documentation:\n\nPlease advise suitable sourcing options, subject to specification and availability.');
const params=new URLSearchParams(location.search);
if(params.get('q'))q.value=params.get('q');
const initialCategory=params.get('category')||'';
const initialGroup=params.get('group')||'';
const groupAliases={polymer:'materials',homecare:'industrial',construction:'materials'};
const resolvedGroup=groupAliases[initialGroup]||initialGroup;
if(resolvedGroup&&verticalRules[resolvedGroup])vertical.value=resolvedGroup;
function populateFilters(){
 [...new Set(allProducts.map(p=>p.category))].sort((a,b)=>a.localeCompare(b)).forEach(name=>{
  const option=document.createElement('option');option.value=name;option.textContent=name;category.append(option);
 });
}
function filtered(){
 const term=q.value.trim().toLocaleLowerCase();
 const cat=category.value;
 const rule=verticalRules[vertical.value]||null;
 let rows=allProducts.filter(p=>(!cat||p.category===cat)&&(!rule||rule.test(p.category))&&(!term||(p.name+' '+p.category+' '+p.description).toLocaleLowerCase().includes(term)));
 if(sort.value==='name')rows.sort((a,b)=>a.name.localeCompare(b.name));
 else if(sort.value==='category')rows.sort((a,b)=>a.category.localeCompare(b.category)||a.name.localeCompare(b.name));
 else if(term)rows.sort((a,b)=>a.name.toLowerCase().indexOf(term)-b.name.toLowerCase().indexOf(term));
 return rows;
}
function card(p){
 const im=imageFor(p);
 return '<article class="catalogue-product-card reveal in-view">'+
  '<a class="catalogue-product-image" href="products/'+encodeURIComponent(p.slug)+'.html" aria-label="View '+esc(p.name)+' details">'+
   '<img src="'+im.src+'" alt="'+esc(im.alt)+'" loading="lazy"><span class="catalogue-image-note">Category reference image</span>'+
  '</a><div class="catalogue-product-body">'+
   '<div class="catalogue-product-category">'+esc(p.category)+'</div>'+
   '<h3><a href="products/'+encodeURIComponent(p.slug)+'.html">'+esc(p.name)+'</a></h3>'+
   '<p>'+esc(p.description)+'</p>'+
   '<div class="catalogue-product-meta"><span>Grade &amp; specification confirmed per enquiry</span></div>'+
   '<div class="catalogue-product-actions"><a class="catalogue-details-link" href="products/'+encodeURIComponent(p.slug)+'.html">Product details <span aria-hidden="true">→</span></a><a class="catalogue-enquire-link" href="'+enquiryUrl(p)+'" target="_blank" rel="noopener">Enquire <span aria-hidden="true">↗</span></a></div>'+
  '</div></article>';
}
function render(){
 const rows=filtered();
 const shown=rows.slice(0,visibleCount);
 out.innerHTML=shown.map(card).join('')||'<div class="catalogue-empty"><strong>No matching product found.</strong><p>Try another keyword or category, or send ENFORD the product name and specification for a sourcing review.</p><a class="btn btn-primary" href="contact.html">Send a product enquiry</a></div>';
 meta.innerHTML='<strong>'+rows.length+'</strong> matching products <span>from '+allProducts.length+' catalogue entries</span>';
 more.hidden=shown.length>=rows.length;
 more.textContent='Show more products ('+(rows.length-shown.length)+' remaining)';
}
[q,category,vertical,sort].forEach(el=>el.addEventListener(el===q?'input':'change',()=>{visibleCount=PAGE_SIZE;render()}));
more.addEventListener('click',()=>{visibleCount+=PAGE_SIZE;render()});
fetch('products.json').then(r=>{if(!r.ok)throw Error('Could not load product data');return r.json()}).then(data=>{
 if(!Array.isArray(data))throw Error('Invalid product data');
 allProducts=data;populateFilters();if(initialCategory)category.value=initialCategory;render();
}).catch(()=>{
 meta.textContent='The product directory could not be loaded. Please contact ENFORD for assistance.';
 out.innerHTML='<div class="catalogue-empty"><strong>Catalogue temporarily unavailable.</strong><p>Please contact ENFORD for assistance.</p></div>';
});
})();