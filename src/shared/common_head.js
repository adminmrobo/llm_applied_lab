(function(){
'use strict';
var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function $(s,r){return (r||document).querySelector(s)}
function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function fit(c,h){var d=window.devicePixelRatio||1,w=c.clientWidth||c.parentElement.clientWidth||600;
  if(c.width!==Math.round(w*d)||c.height!==Math.round(h*d)){c.width=Math.round(w*d);c.height=Math.round(h*d);c.style.height=h+'px';}
  var x=c.getContext('2d');x.setTransform(d,0,0,d,0,0);return w;}
var FONT='"IBM Plex Sans KR",system-ui,sans-serif';
function stamp(ctx,W,txt){ctx.save();ctx.font='700 11px '+FONT;var tw=ctx.measureText(txt).width+16,x=W-tw-8,y=8;
  ctx.fillStyle='rgba(163,92,0,.08)';ctx.strokeStyle='rgba(163,92,0,.7)';ctx.beginPath();
  if(ctx.roundRect)ctx.roundRect(x,y,tw,20,10);else ctx.rect(x,y,tw,20);ctx.fill();ctx.stroke();
  ctx.fillStyle='#a35c00';ctx.textAlign='left';ctx.fillText(txt,x+8,y+14);ctx.restore();}
function jo(id,c,v){var d=String(id).slice(-1);return id+('2459'.indexOf(d)>=0?v:c)}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}

/* ---------- characters ---------- */
var Cast=(function(){
  var DEF={doc:'doc_front',asst:'asst_smile',fly:'fly_clip',robo:'robo_smile',sia:'sia_smile',moa:'moa_smile',x1:'x1_hint',x2:'x2_hint',x3:'x3_hint'};
  function src(who,mood){var k=who+'_'+mood, key=(typeof SPRITE_ALIAS!=='undefined'&&SPRITE_ALIAS[k])||k;
    if(SPRITE[key])return SPRITE[key]; var d=SPRITE_ALIAS[DEF[who]]||DEF[who]; return SPRITE[d]||'';}
  function face(img,who,mood){if(img.dataset.face!=='right')return;var k=who+'_'+mood,key=SPRITE_ALIAS[k]||k;
    img.style.transform=(typeof SPRITE_FACING!=='undefined'&&SPRITE_FACING[key]==='left')?'scaleX(-1)':'';}
  function set(img,who,mood){img.style.transition='opacity .2s';img.style.opacity=0;
    setTimeout(function(){img.src=src(who,mood);img.dataset.mood=mood;face(img,who,mood);img.style.opacity=1;},reduce?0:200);}
  function fill(){$$('img[data-who]').forEach(function(i){var s=src(i.dataset.who,i.dataset.mood||'');if(s){i.src=s;face(i,i.dataset.who,i.dataset.mood||'');}});}
  return {set:set,fill:fill,src:src};
})();
/* ---------- render loop (visible canvases only) ---------- */
var mods=[],vis=new Set(),io=new IntersectionObserver(function(es){es.forEach(function(e){e.isIntersecting?vis.add(e.target):vis.delete(e.target)})},{rootMargin:'100px'});
function addMod(el,fn){mods.push({el:el,fn:fn});io.observe(el)}
var last=0;function loop(ts){var dt=last?Math.min(0.05,(ts-last)/1000):0.016;last=ts;
  mods.forEach(function(m){if(vis.has(m.el))m.fn(dt)});requestAnimationFrame(loop)}
function kpis(el,arr){el.innerHTML=arr.map(function(k){return '<div class="kpi '+k[0]+'"><b>'+k[1]+'</b><span>'+k[2]+'</span></div>'}).join('')}
function btnGroup(el,vals,cur,lab,on){el.innerHTML='';vals.forEach(function(v){var b=document.createElement('button');b.className='bt';b.textContent=lab?lab(v):v;b.dataset.v=v;
  b.setAttribute('aria-pressed',String(v)===String(cur)?'true':'false');b.addEventListener('click',function(){$$('button',el).forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});on(v)});el.appendChild(b)});}
function fmt(x,d){return (+x).toFixed(d===undefined?2:d)}
function lineChart(cv,h,series,o){o=o||{};var W=fit(cv,h),x=cv.getContext('2d');x.clearRect(0,0,W,h);var L=44,R=12,T=14,B=30,pw=W-L-R,ph=h-T-B;
  var xs=o.xmax||Math.max.apply(null,series.map(function(s){return s.pts.length-1})),ymax=o.ymax!==undefined?o.ymax:Math.max.apply(null,series.map(function(s){return Math.max.apply(null,s.pts)}))*1.08||1,ymin=o.ymin||0;
  x.strokeStyle='#d5dbe2';x.lineWidth=1;x.font='11px '+FONT;x.fillStyle='#5b6874';
  for(var g=0;g<=4;g++){var yy=T+ph*(1-g/4);x.beginPath();x.moveTo(L,yy);x.lineTo(L+pw,yy);x.stroke();x.fillText((ymin+(ymax-ymin)*g/4).toFixed(o.yd===undefined?1:o.yd),4,yy+4)}
  x.fillText(o.xlab||'',L+pw-60,h-6);x.fillText('0',L,h-14);x.fillText(String(xs),L+pw-16,h-14);
  series.forEach(function(s){x.strokeStyle=s.col;x.lineWidth=s.w||2.5;x.setLineDash(s.dash||[]);x.beginPath();s.pts.forEach(function(v,i){var px=L+pw*i/xs,py=T+ph*(1-(Math.min(v,ymax)-ymin)/(ymax-ymin));i?x.lineTo(px,py):x.moveTo(px,py)});x.stroke();x.setLineDash([])});
  if(o.mark!==undefined){var mx=L+pw*o.mark/xs;x.strokeStyle='#a35c00';x.setLineDash([4,3]);x.beginPath();x.moveTo(mx,T);x.lineTo(mx,T+ph);x.stroke();x.setLineDash([])}
  var lx=L+8;series.forEach(function(s){if(!s.name)return;x.fillStyle=s.col;x.fillRect(lx,T+4,10,10);x.fillStyle='#16212b';x.fillText(s.name,lx+14,T+13);lx+=x.measureText(s.name).width+34});
  if(o.stamp)stamp(x,W,o.stamp);return {L:L,T:T,pw:pw,ph:ph}}
function barChart(cv,h,items,o){o=o||{};var W=fit(cv,h),x=cv.getContext('2d');x.clearRect(0,0,W,h);var L=o.L||130,R=60,T=10,rowH=(h-T-6)/items.length,mx=o.max||Math.max.apply(null,items.map(function(i){return i.v}))||1;
  x.font='13px '+FONT;items.forEach(function(it,i){var y=T+i*rowH,bh=Math.min(22,rowH-8);x.fillStyle='#16212b';x.textAlign='right';x.fillText(it.n,L-8,y+bh/2+5);x.textAlign='left';
    x.fillStyle='#eef2f6';x.fillRect(L,y,W-L-R,bh);x.fillStyle=it.col||'#13733a';x.fillRect(L,y,(W-L-R)*Math.max(0,it.v)/mx,bh);x.fillStyle='#16212b';x.fillText(it.t!==undefined?it.t:fmt(it.v),L+(W-L-R)*Math.max(0,it.v)/mx+6,y+bh/2+5)});
  if(o.stamp)stamp(x,W,o.stamp)}
/* 미공개 식구 상자 (버튼을 눌러야 보임) */
function xToggles(){$$('[data-xopen]').forEach(function(b){var box=document.getElementById(b.dataset.xopen);if(!box)return;b.setAttribute('aria-expanded','false');
  b.addEventListener('click',function(){var o=box.hasAttribute('hidden');if(o)box.removeAttribute('hidden');else box.setAttribute('hidden','');b.setAttribute('aria-expanded',o?'true':'false');b.textContent=o?(b.dataset.close||'닫기'):(b.dataset.label||b.textContent)});
  b.dataset.label=b.textContent})}
