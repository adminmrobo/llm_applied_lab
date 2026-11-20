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
  var DEF={doc:'doc_front',asst:'asst_smile',fly:'fly_clip',robo:'robo_smile'};
  function src(who,mood){var k=who+'_'+mood, key=(typeof SPRITE_ALIAS!=='undefined'&&SPRITE_ALIAS[k])||k;
    if(SPRITE[key])return SPRITE[key]; var d=SPRITE_ALIAS[DEF[who]]||DEF[who]; return SPRITE[d]||'';}
  function face(img,who,mood){if(img.dataset.face!=='right')return;var k=who+'_'+mood,key=SPRITE_ALIAS[k]||k;
    img.style.transform=(typeof SPRITE_FACING!=='undefined'&&SPRITE_FACING[key]==='left')?'scaleX(-1)':'';}
  function set(img,who,mood){img.style.transition='opacity .2s';img.style.opacity=0;
    setTimeout(function(){img.src=src(who,mood);img.dataset.mood=mood;face(img,who,mood);img.style.opacity=1;},reduce?0:200);}
  function fill(){$$('img[data-who]').forEach(function(i){var s=src(i.dataset.who,i.dataset.mood||'');if(s){i.src=s;face(i,i.dataset.who,i.dataset.mood||'');}});}
  return {set:set,fill:fill,src:src};
})();

/* ---------- example language ---------- */
var EXL='en';
function ex(o){return EXL==='en'?o.en:o.ko}
var exHooks=[];
$$('[data-exlang]').forEach(function(b){b.addEventListener('click',function(){EXL=b.dataset.exlang;
  $$('[data-exlang]').forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});
  exHooks.forEach(function(f){f()});});});

/* ---------- math ---------- */
var S=DATA.S,Q=DATA.Q,SI={};S.forEach(function(s,i){SI[s.id]=i});
function dot(a,b){var d=0;for(var i=0;i<a.length;i++)d+=a[i]*b[i];return d}
function norm(a){return Math.sqrt(dot(a,a))}
function cos(a,b){return dot(a,b)/(norm(a)*norm(b))}
var STOP='a an the is are am to of for on in if my your our i you can do does how when what with from by it be after until about back'.split(' ');
function words(t){return (t.toLowerCase().match(/[a-z0-9]+/g)||[]).filter(function(w){return STOP.indexOf(w)<0})}
function uniq(a){var o=[];a.forEach(function(x){if(o.indexOf(x)<0)o.push(x)});return o}
function kwScores(q){var qw=uniq(words(q.en));return S.map(function(s){var sw=uniq(words(s.en));
  return {id:s.id,score:qw.filter(function(w){return sw.indexOf(w)>=0}).length,shared:qw.filter(function(w){return sw.indexOf(w)>=0})}});}
function rank(arr){return arr.slice().sort(function(a,b){return b.score-a.score||(a.id<b.id?-1:a.id>b.id?1:0)})}
function emScores(q){return S.map(function(s){return {id:s.id,score:cos(q.v,s.v)}})}
function hitTop1(q,ranked){return q.gold.indexOf(ranked[0].id)>=0}
function chunks(size,ov){var out=[],step=Math.max(1,size-ov),i=0;
  while(i<S.length){out.push(S.slice(i,i+size).map(function(s){return s.id}));if(i+size>=S.length)break;i+=step;}return out}
function mean(vs){var m=vs[0].map(function(){return 0});vs.forEach(function(v){v.forEach(function(x,i){m[i]+=x/vs.length})});return m}
function retrieve(q,size,ov,k){var ch=chunks(size,ov);
  var sc=ch.map(function(c,n){return {n:n,score:cos(q.v,mean(c.map(function(id){return S[SI[id]].v})))}});
  sc.sort(function(a,b){return b.score-a.score||a.n-b.n});var top=sc.slice(0,k),got=[];
  top.forEach(function(t){ch[t.n].forEach(function(id){if(got.indexOf(id)<0)got.push(id)})});
  return {ch:ch,sc:sc,top:top,got:got}}
function evalChunks(size,ov,k){var h=0,s=0;Q.forEach(function(q){var r=retrieve(q,size,ov,k);
  if(q.gold.some(function(g){return r.got.indexOf(g)>=0}))h++;s+=r.got.length});return {hits:h,avg:s/Q.length}}

/* ---------- render loop (visible canvases only) ---------- */
var mods=[],vis=new Set(),io=new IntersectionObserver(function(es){es.forEach(function(e){e.isIntersecting?vis.add(e.target):vis.delete(e.target)})},{rootMargin:'100px'});
function addMod(el,fn){mods.push({el:el,fn:fn});io.observe(el)}
var last=0;function loop(ts){var dt=last?Math.min(0.05,(ts-last)/1000):0.016;last=ts;
  mods.forEach(function(m){if(vis.has(m.el))m.fn(dt)});requestAnimationFrame(loop)}

/* ---------- shelf (librarian) ---------- */
var LIB=['.....kkkk.....','....kyyyyk....','...kyyyyyyk...','..kkkkkkkkkk..','...kwwwwwwk...','...kwbwwbwk...','...kwwwwwwk...','....kwrrwk....','..kkppppppkk..','.kpkppppppkpk.','.kpkppppppkpk.','..kkppppppkk..','...kgk..kgk...','...kkk..kkk...'];
var LPAL={k:'#1d1a22',y:'#e0a800',w:'#f7f1e6',b:'#1d1a22',r:'#c42a6e',p:'#7a5fd6',g:'#5b6874'};
function drawLib(ctx,x,y,sc){ctx.save();LIB.forEach(function(r,j){for(var i=0;i<r.length;i++){var c=r[i];if(c==='.')continue;ctx.fillStyle=LPAL[c];ctx.fillRect(Math.round(x+(i-7)*sc),Math.round(y+(j-14)*sc),Math.ceil(sc),Math.ceil(sc))}});ctx.restore()}
function Shelf(cv,h){var st={scores:{},top:[],chunks:null,picked:[],stampTxt:'설명용 모형 · 실제 데이터 아님',fmt:function(v){return v.toFixed(2)},max:1,libX:null,target:null,carry:false};
  function layout(W){var padL=34,padR=14,cols=6,gap=8,cw=(W-padL-padR-gap*(cols-1))/cols,ch=56,rowY=[40,40+ch+30,40+2*(ch+30)];
    return {padL:padL,cw:cw,ch:ch,gap:gap,rowY:rowY,floor:rowY[2]+ch+20}}
  function pos(L,id){var i=SI[id],r=Math.floor(i/6),c=i%6;return {x:L.padL+c*(L.cw+L.gap),y:L.rowY[r]}}
  function draw(dt){var W=fit(cv,h),ctx=cv.getContext('2d'),L=layout(W);ctx.clearRect(0,0,W,h);
    ctx.font='700 13px '+FONT;ctx.fillStyle='#5b6874';['A','B','C'].forEach(function(t,r){ctx.fillText(t,10,L.rowY[r]+32);
      ctx.fillStyle='#b98a5a';ctx.fillRect(L.padL-6,L.rowY[r]+L.ch+4,W-L.padL-8,5);ctx.fillStyle='#5b6874'});
    if(st.chunks){st.chunks.forEach(function(c,n){var a=pos(L,c[0]),b=pos(L,c[c.length-1]);var on=st.picked.indexOf(n)>=0;
      if(a.y===b.y){ctx.strokeStyle=on?'#13733a':'rgba(91,104,116,.35)';ctx.lineWidth=on?3:1.5;ctx.setLineDash(on?[]:[4,3]);
        ctx.strokeRect(a.x-3+(n%2?1:0),a.y-3-(n%2?3:0),b.x+L.cw-a.x+6,L.ch+6+(n%2?6:0));ctx.setLineDash([])}
      else{ctx.strokeStyle=on?'#13733a':'rgba(91,104,116,.35)';ctx.lineWidth=on?3:1.5;ctx.setLineDash(on?[]:[4,3]);
        ctx.strokeRect(a.x-3,a.y-3,W-a.x-14+3,L.ch+6);var e=pos(L,c[c.length-1]);ctx.strokeRect(L.padL-3,e.y-3,e.x+L.cw-L.padL+6,L.ch+6);ctx.setLineDash([])}});}
    S.forEach(function(s){var p=pos(L,s.id),sc=st.scores[s.id],isTop=st.top.indexOf(s.id)>=0;
      ctx.fillStyle=isTop?'#e7f5ec':'#ffffff';ctx.strokeStyle=isTop?'#13733a':'#d5dbe2';ctx.lineWidth=isTop?2.5:1;
      ctx.beginPath();if(ctx.roundRect)ctx.roundRect(p.x,p.y,L.cw,L.ch,6);else ctx.rect(p.x,p.y,L.cw,L.ch);ctx.fill();ctx.stroke();
      ctx.fillStyle='#16212b';ctx.font='700 12px '+FONT;ctx.fillText(s.id,p.x+6,p.y+16);
      if(sc!==undefined){var bw=(L.cw-12)*Math.max(0,sc)/st.max;ctx.fillStyle='#eef2f6';ctx.fillRect(p.x+6,p.y+L.ch-16,L.cw-12,8);
        ctx.fillStyle=isTop?'#13733a':'#9b3fb5';ctx.fillRect(p.x+6,p.y+L.ch-16,bw,8);
        ctx.fillStyle='#5b6874';ctx.font='11px '+FONT;ctx.textAlign='right';ctx.fillText(st.fmt(sc),p.x+L.cw-6,p.y+16);ctx.textAlign='left'}});
    // librarian
    var tx=st.target?pos(L,st.target).x+L.cw/2:L.padL+20; if(st.libX===null)st.libX=tx;
    var d=tx-st.libX,sp=260*(dt||0); if(reduce||dt===0)st.libX=tx; else st.libX+=Math.abs(d)<sp?d:Math.sign(d)*sp;
    var ly=L.floor+30; drawLib(ctx,st.libX,ly,2.4);
    if(st.target&&Math.abs(tx-st.libX)<1){ctx.fillStyle='#e7f5ec';ctx.strokeStyle='#13733a';ctx.lineWidth=1.5;ctx.fillRect(st.libX+14,ly-28,26,18);ctx.strokeRect(st.libX+14,ly-28,26,18);
      ctx.fillStyle='#13733a';ctx.font='700 10px '+FONT;ctx.fillText(st.target,st.libX+17,ly-15)}
    ctx.fillStyle='#5b6874';ctx.font='12px '+FONT;ctx.fillText('사서 (검색기)',8,ly+4);
    stamp(ctx,W,st.stampTxt);}
  addMod(cv,draw);st.draw=draw;return st}
var SHELF_H=330;

/* ---------- question chips ---------- */
function qChips(el,onPick,init){var cur=init;Q.forEach(function(q){var b=document.createElement('button');b.className='bt';b.textContent=q.id;
  b.setAttribute('aria-pressed',q.id===cur?'true':'false');b.addEventListener('click',function(){cur=q.id;
  $$('button',el).forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});onPick(q)});el.appendChild(b)});}
function qLine(el,q,extra){el.innerHTML='<b>'+q.id+'</b> '+esc(ex(q))+(extra?'<small>'+extra+'</small>':'')}
function kpis(el,arr){el.innerHTML=arr.map(function(k){return '<div class="kpi '+k[0]+'"><b>'+k[1]+'</b><span>'+k[2]+'</span></div>'}).join('')}
function qById(id){return Q.filter(function(q){return q.id===id})[0]}

/* ---------- ① ---------- */
var CLOSED={Q1:{en:'Usually you can return opened items within 14 days for a full refund.',ko:'보통 개봉 상품도 14일 안이면 전액 환불됩니다.'},
 Q2:{en:'Most lamps charge fully in about 1 to 2 hours.',ko:'대부분의 램프는 1~2시간이면 다 충전됩니다.'},
 Q3:{en:'Yes, accidental spills are usually covered for one year.',ko:'네, 실수로 쏟은 것은 보통 1년간 보장됩니다.'},
 Q4:{en:'You can call anytime; support is available 24/7.',ko:'언제든 전화하세요. 상담은 24시간 열려 있습니다.'},
 Q5:{en:'Delivery usually takes about a week.',ko:'배달은 보통 일주일쯤 걸립니다.'},
 Q6:{en:'Click "Forgot password" on the login page to reset it.',ko:'로그인 화면의 「비밀번호 찾기」를 눌러 다시 설정하세요.'},
 Q7:{en:'A new battery usually costs around 20 to 30 dollars.',ko:'새 배터리는 보통 20~30달러입니다.'},
 Q8:{en:'You may need to pay return shipping, depending on the store.',ko:'가게에 따라 반품 배송비를 내야 할 수 있습니다.'}};
var CLOSED_OK={Q6:true};
var q1=qById('Q3');
function r1(){qLine($('#q1line'),q1);$('#q1bad').textContent=ex(CLOSED[q1.id]);
  $('#q1good').textContent=q1.gold.map(function(g){return ex(S[SI[g]])}).join(' ');
  $('#q1gid').innerHTML=q1.gold.map(function(g){return '<span class="chip hit">근거 '+g+'</span>'}).join('');
  var ok=Object.keys(CLOSED_OK).length;
  kpis($('#k1'),[['r',CLOSED_OK[q1.id]?'일치':'불일치','이 질문: 예시 답 vs 문서'],['a',ok+'/8','문서와 맞는 예시 답'],['r','0개','답에 붙은 근거 문장'],['m','같음','맞을 때와 틀릴 때의 말투']]);
  $('#ins1').innerHTML=CLOSED_OK[q1.id]?'<p class="a">이번에는 맞았습니다. 흔한 상식과 문서가 우연히 같았습니다. 그래도 근거는 없습니다.</p>':'<p class="r">문서와 다릅니다. 말투만으로는 틀린 줄 알 수 없습니다.</p>';}
qChips($('#q1chips'),function(q){q1=q;r1()},'Q3');exHooks.push(r1);
var NEXT=[['1 year',0.46],['accidents',0.22],['2 years',0.19],['nothing',0.13]];
addMod($('#c1'),function(){var c=$('#c1'),W=fit(c,190),x=c.getContext('2d');x.clearRect(0,0,W,190);
  x.font='13px '+FONT;x.fillStyle='#16212b';x.fillText('The warranty covers ___',12,24);
  NEXT.forEach(function(n,i){var y=44+i*34,bw=(W-200)*n[1]/0.5;x.fillStyle='#16212b';x.fillText(n[0],12,y+16);
    x.fillStyle=i===0?'#c9302c':(n[0]==='2 years'?'#13733a':'#9b3fb5');x.fillRect(100,y+2,bw,20);
    x.fillStyle='#16212b';x.fillText(n[1].toFixed(2)+(i===0?'  ← 고름':'')+(n[0]==='2 years'?'  (문서 B3)':''),106+bw,y+16)});
  stamp(x,W,'예시값');});
r1();

/* ---------- ② ---------- */
var sh2=Shelf($('#c2'),SHELF_H);sh2.fmt=function(v){return String(v)};var q2=qById('Q5');
var KW_HITS=Q.filter(function(q){return hitTop1(q,rank(kwScores(q)))}).length;
function r2(){var sc=kwScores(q2),rk=rank(sc),mx=Math.max(1,rk[0].score);sh2.scores={};sc.forEach(function(s){sh2.scores[s.id]=s.score});sh2.max=Math.max(2,mx);
  sh2.top=rk[0].score>0?[rk[0].id]:[];sh2.target=sh2.top[0]||null;var hit=rk[0].score>0&&hitTop1(q2,rk);
  qLine($('#q2line'),q2,EXL==='ko'?'계산은 영어 원문으로 합니다.':'');
  var qw=uniq(words(q2.en));$('#q2words').innerHTML='<span class="glabel">질문의 단어</span>'+qw.map(function(w){return '<span class="chip'+(sc.some(function(s){return s.shared.indexOf(w)>=0})?' hit':'')+'">'+w+'</span>'}).join('');
  var ties=rk.filter(function(r){return r.score===rk[0].score}).length;
  kpis($('#k2'),[[hit?'g':'r',hit?'찾음':'놓침','이 질문 (정답 '+q2.gold.join('·')+')'],['a',rk[0].score>0?rk[0].id:'없음','1등 문장'],['m',rk[0].score+'개','1등의 겹친 단어 수'],['g',KW_HITS+'/8','8문항 중 1등으로 찾음']]);
  $('#eq2').innerHTML='점수 = n(<em>질문 단어</em> ∩ <b>문장 단어</b>) · 1등 '+(rk[0].score>0?rk[0].id:'없음')+' = '+rk[0].score+(ties>1&&rk[0].score>0?' · <i>동점 '+ties+'개</i>':'');
  var g=S[SI[q2.gold[0]]];
  $('#ins2').innerHTML=hit?'<p class="g">정답 문장 '+jo(q2.gold[0],'을','를')+' 찾았습니다. 겹친 단어: '+rk[0].shared.join(', ')+'</p>':
    '<p class="r">정답 '+q2.gold[0]+' 「'+esc(ex(g))+'」 문장을 놓쳤습니다. 뜻은 같지만 질문과 같은 글자가 없습니다.</p>'+(rk[0].score>0?'<p class="a">대신 「'+rk[0].shared.join(', ')+'」 글자가 겹친 '+rk[0].id+' 「'+esc(ex(S[SI[rk[0].id]]))+'」를 꺼냈습니다.</p>':'')+(ties>1&&rk[0].score>0?'<p class="a">점수가 같은 문장이 '+ties+'개라 1등이 순서로 정해졌습니다.</p>':'');
  sh2.draw(0);}
qChips($('#q2chips'),function(q){q2=q;r2()},'Q5');exHooks.push(r2);

/* ---------- ③ ---------- */
var A3={ang:30,len:1};
function r3a(){var c=$('#c3a'),W=fit(c,220),x=c.getContext('2d');x.clearRect(0,0,W,220);
  var ox=W/2-60,oy=180,R=130,a=A3.ang*Math.PI/180;
  x.strokeStyle='rgba(22,33,43,.08)';for(var gx=0;gx<W;gx+=24){x.beginPath();x.moveTo(gx,0);x.lineTo(gx,220);x.stroke()}for(var gy=0;gy<220;gy+=24){x.beginPath();x.moveTo(0,gy);x.lineTo(W,gy);x.stroke()}
  function arrow(ang,len,col,lab){var ex_=ox+Math.cos(ang)*R*len,ey=oy-Math.sin(ang)*R*len;x.strokeStyle=col;x.fillStyle=col;x.lineWidth=3;x.beginPath();x.moveTo(ox,oy);x.lineTo(ex_,ey);x.stroke();
    var h=Math.atan2(ey-oy,ex_-ox);x.beginPath();x.moveTo(ex_,ey);x.lineTo(ex_-10*Math.cos(h-0.4),ey-10*Math.sin(h-0.4));x.lineTo(ex_-10*Math.cos(h+0.4),ey-10*Math.sin(h+0.4));x.fill();
    x.font='700 14px '+FONT;x.fillText(lab,ex_+6,ey-4)}
  arrow(0,1,'#9b3fb5','A');arrow(a,A3.len,'#13733a','B');
  x.strokeStyle='#a35c00';x.lineWidth=1.5;x.beginPath();x.arc(ox,oy,34,-a,0);x.stroke();
  x.fillStyle='#a35c00';x.font='12px '+FONT;x.fillText(A3.ang+'°',ox+38,oy-8);
  stamp(x,W,'설명용 도식');
  var cv=Math.cos(a);$('#eq3a').innerHTML='cos('+A3.ang+'°) = <b>'+cv.toFixed(3)+'</b> · B 길이 '+A3.len.toFixed(1)+'배여도 값은 그대로 · '+(cv>0.9?'<b>거의 같은 방향</b>':cv>0.1?'비슷한 편':cv>-0.1?'<i>직각: 관계 없음</i>':'<em>반대 방향</em>');}
$('#ang').addEventListener('input',function(){A3.ang=+this.value;$('#angv').textContent=A3.ang+'°';r3a()});
$('#blen').addEventListener('input',function(){A3.len=+this.value;$('#blenv').textContent=A3.len.toFixed(1);r3a()});
addMod($('#c3a'),function(dt){if(dt===0)r3a()});
var sh3=Shelf($('#c3'),SHELF_H);sh3.fmt=function(v){return v.toFixed(3)};var q3=qById('Q5');
var EM_HITS=Q.filter(function(q){return hitTop1(q,rank(emScores(q)))}).length;
function drawVec(){var c=$('#c3v'),W=fit(c,170),x=c.getContext('2d');x.clearRect(0,0,W,170);var n=8,bw=(W-40)/n;
  q3.v.forEach(function(v,i){var bh=v*100,bx=20+i*bw;x.fillStyle='#e6eefb';x.fillRect(bx+6,130-100,bw-12,100);x.fillStyle='#1e55c8';x.fillRect(bx+6,130-bh,bw-12,bh);
    x.fillStyle='#16212b';x.font='12px '+FONT;x.textAlign='center';x.fillText(DATA.dims_ko[i],bx+bw/2,150);x.fillStyle='#5b6874';x.fillText(v.toFixed(2),bx+bw/2,124-bh<20?24:124-bh)});
  x.textAlign='left';stamp(x,W,'예시값');}
function r3(){var sc=emScores(q3),rk=rank(sc);sh3.scores={};sc.forEach(function(s){sh3.scores[s.id]=s.score});sh3.max=1;sh3.top=[rk[0].id];sh3.target=rk[0].id;
  var hit=hitTop1(q3,rk);qLine($('#q3line'),q3);drawVec();
  kpis($('#k3'),[[hit?'g':'r',hit?'찾음':'놓침','이 질문 (정답 '+q3.gold.join('·')+')'],['a',rk[0].id,'1등 문장 · '+rk[0].score.toFixed(3)],['m',rk[1].id,'2등 · '+rk[1].score.toFixed(3)],['g',EM_HITS+'/8','8문항 중 1등으로 찾음']]);
  var g=q3.gold[0],gs=sc.filter(function(s){return s.id===g})[0].score,gr=rk.map(function(r){return r.id}).indexOf(g)+1;
  $('#ins3').innerHTML=hit?'<p class="g">정답 '+jo(g,'을','를')+' 1등으로 찾았습니다. 질문과 같은 단어가 없어도 뜻의 방향이 가깝습니다.</p>':
    '<p class="r">정답 '+g+'('+gs.toFixed(3)+')'+('2459'.indexOf(g.slice(-1))>=0?'는':'은')+' '+gr+'등입니다. 1등 '+rk[0].id+'('+rk[0].score.toFixed(3)+')와 '+(rk[0].score-gs).toFixed(3)+' 차이입니다.</p><p class="a">「누군가에게 연락」이라는 뜻이 답장 시간 문장과도 가깝기 때문입니다. 후보를 여러 개 가져오면 해결됩니다(④단계).</p>';
  sh3.draw(0);}
qChips($('#q3chips'),function(q){q3=q;r3()},'Q5');exHooks.push(r3);

/* ---------- ④ ---------- */
var P4={s:1,o:0,k:1},q4=qById('Q4'),sh4=Shelf($('#c4'),SHELF_H);sh4.fmt=function(v){return v.toFixed(2)};
function optBtns(el,vals,key,lab){vals.forEach(function(v){var b=document.createElement('button');b.className='bt';b.textContent=(lab?lab(v):v);
  b.setAttribute('aria-pressed',P4[key]===v?'true':'false');b.addEventListener('click',function(){P4[key]=v;
  if(P4.o>=P4.s)P4.o=0;syncOpt();r4()});b.dataset.v=v;el.appendChild(b)})}
function syncOpt(){[['#g4s','s'],['#g4o','o'],['#g4k','k']].forEach(function(p){$$('button',$(p[0])).forEach(function(b){b.setAttribute('aria-pressed',+b.dataset.v===P4[p[1]]?'true':'false');
  if(p[1]==='o')b.disabled=(+b.dataset.v>=P4.s)})})}
optBtns($('#g4s'),[1,2,3,6],'s');optBtns($('#g4o'),[0,1],'o');optBtns($('#g4k'),[1,2,3,4],'k');syncOpt();
function r4(){var r=retrieve(q4,P4.s,P4.o,P4.k),ev=evalChunks(P4.s,P4.o,P4.k),hit=q4.gold.some(function(g){return r.got.indexOf(g)>=0});
  sh4.chunks=P4.s>1?r.ch:null;sh4.picked=r.top.map(function(t){return t.n});sh4.top=r.got;
  sh4.scores={};if(P4.s===1){r.sc.forEach(function(t){sh4.scores[r.ch[t.n][0]]=t.score})}sh4.max=1;sh4.target=r.ch[r.top[0].n][0];
  qLine($('#q4line'),q4);
  kpis($('#k4'),[[hit?'g':'r',hit?'찾음':'놓침','이 질문 (정답 '+q4.gold.join('·')+')'],['g',ev.hits+'/8','8문항 중 근거를 찾음'],['a',(Math.round(ev.avg*100)/100)+'문장','질문당 평균 보낸 문장'],['m',r.ch.length+'조각','서가의 조각 수']]);
  $('#eq4').innerHTML='조각 수 = <em>'+r.ch.length+'</em> (크기 '+P4.s+', 겹침 '+P4.o+', 간격 '+(P4.s-P4.o)+') · 가져온 조각 <b>'+P4.k+'</b>개 → 보낸 문장 <i>'+r.got.length+'</i>개: '+r.got.join(' ');
  var msg=[];if(ev.hits===8)msg.push('<p class="g">8개 질문 모두 근거 문장이 조각 안에 들어왔습니다.</p>');else msg.push('<p class="r">'+(8-ev.hits)+'개 질문은 근거를 놓쳤습니다.</p>');
  if(ev.avg>=6)msg.push('<p class="a">질문 하나에 평균 '+(Math.round(ev.avg*10)/10)+'문장을 보냅니다. 상관없는 문장도 많이 섞입니다.</p>');
  if(P4.s>=3&&P4.o===1)msg.push('<p class="m">겹침을 주면 조각의 시작점이 밀려 주제가 다른 문장이 한 조각에 섞입니다.</p>');
  $('#ins4').innerHTML=msg.join('');sh4.draw(0);}
qChips($('#q4chips'),function(q){q4=q;r4()},'Q4');exHooks.push(r4);

/* ---------- ⑤ ---------- */
var q5=qById('Q3'),step5=0,off5=false,sh5=Shelf($('#c5'),SHELF_H);sh5.fmt=function(v){return v.toFixed(2)};
function r5(){var r=retrieve(q5,1,0,3),flow=$$('#flow5 .s');flow.forEach(function(f,i){f.className='s'+(i<step5?' done':i===step5?' on':'')});
  qLine($('#q5line'),q5);
  sh5.scores={};if(!off5&&step5>=2){r.sc.forEach(function(t){sh5.scores[r.ch[t.n][0]]=t.score})}
  sh5.top=(!off5&&step5>=2)?r.got:[];sh5.target=(!off5&&step5>=2)?r.got[0]:null;
  var ctx=off5?'(search is off — no context)':r.got.map(function(id){return '['+id+'] '+S[SI[id]].en}).join('\n');
  var ctxKo=off5?'(검색 꺼짐 — 조각 없음)':r.got.map(function(id){return '['+id+'] '+S[SI[id]].ko}).join('\n');
  var instr=EXL==='en'?'Answer using only the context below.\nIf the answer is not in the context, say you don\'t know.\nCite the sentence ids you used.':'아래 조각만 보고 답하세요.\n조각에 답이 없으면 모른다고 하세요.\n쓴 문장의 번호를 붙이세요.';
  $('#pr5').textContent=step5>=3?(instr+'\n\nContext:\n'+(EXL==='en'?ctx:ctxKo)+'\n\nQuestion: '+ex(q5)):(step5>=1?'Question: '+ex(q5)+'\n(조각을 찾는 중 — 다음 단계를 누르세요)':'(다음 단계를 누르세요)');
  var ans=off5?ex(CLOSED[q5.id]):ex({en:q5.ans_en,ko:q5.ans_ko});
  var cited=(q5.ans_en.match(/\[([A-C]\d)\]/g)||[]).map(function(s){return s.slice(1,3)}),okc=!off5&&cited.every(function(c){return r.got.indexOf(c)>=0});
  $('#an5').innerHTML=step5>=4?esc(ans)+(step5>=5?'<small>'+(off5?'출처 자리가 비었습니다. 검색을 끄면 ①단계의 답으로 돌아갑니다.':'답의 번호 '+jo(cited.join('·'),'이','가')+' 프롬프트 안에 '+(okc?'있습니다 → 출처 확인됨':'없습니다 → 확인 필요'))+'</small>':''):'(아직 답을 만들지 않았습니다)';
  var all=Q.filter(function(q){var g=retrieve(q,1,0,3).got;var c=(q.ans_en.match(/\[([A-C]\d)\]/g)||[]).map(function(s){return s.slice(1,3)});return c.every(function(x){return g.indexOf(x)>=0})}).length;
  kpis($('#k5'),[[step5<5?'m':off5?'r':(okc?'g':'r'),step5<5?'대기':off5?'없음':(okc?'확인됨':'확인 필요'),'이 질문의 출처'],['g',(off5||step5<2)?'0개':r.got.length+'개','프롬프트에 붙인 조각'],['a',all+'/8','8문항 중 출처 확인됨 (예시 답)'],['m',(step5+1)+'/6','지금 단계']]);
  var tips=['질문이 들어왔습니다.','질문도 문장과 같은 방식으로 숫자 8개가 됩니다.','점수 상위 3개 문장을 가져왔습니다.','지시 + 조각 + 질문으로 프롬프트를 만들었습니다.','LLM이 조각을 읽고 답을 씁니다. 여기서는 예시 답변입니다.','답의 번호와 프롬프트 안 조각 번호를 대조합니다.'];
  $('#ins5').innerHTML='<p class="'+(off5?'r':'g')+'">'+(off5&&step5>=2?'검색이 꺼져 조각이 없습니다. ':'')+tips[step5]+'</p>';sh5.draw(0);}
qChips($('#q5chips'),function(q){q5=q;r5()},'Q3');exHooks.push(r5);
$('#p5next').addEventListener('click',function(){step5=(step5+1)%6;r5()});
$('#p5all').addEventListener('click',function(){step5=5;r5()});
$('#p5off').addEventListener('click',function(){off5=!off5;this.setAttribute('aria-pressed',off5?'true':'false');this.textContent=off5?'검색 켜기':'검색 끄기';r5()});

/* ---------- duel ---------- */
(function(){var root=$('#duelBox'),shown=false,fi=$('.head img[data-who=fly]',root),ri=$('.head img[data-who=robo]',root);
  $$('[data-guess]',root).forEach(function(b){b.addEventListener('click',function(){$$('[data-guess]',root).forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});
    $('#guessNote').textContent='고른 것만 기억합니다. 저장하지 않습니다.'})});
  function bar(n,v,col){return '<div class="b"><span>'+n+'</span><div class="track"><div class="fill" style="width:'+(v/8*100)+'%;background:'+col+'"></div></div><b>'+v+'/8</b></div>'}
  $('.reveal',root).addEventListener('click',function(){if(shown){reset();return}
    var f=KW_HITS,b=EM_HITS,res=f===b?'D':(f>b?'F':'R'),big=Math.abs(f-b)/8>=0.10;
    var M={F:['arms','sigh'],R:[big?'cry':'coffee','happy'],D:['coffee','meh']}[res];Cast.set(fi,'fly',M[0]);Cast.set(ri,'robo',M[1]);
    $('.bars',root).innerHTML=bar('초파리',f,'var(--c-fly)')+bar('주판봇',b,'var(--c-robo)');
    var ai=$('.asst img',root);Cast.set(ai,'asst','spark');
    $('.asst p',root).textContent='근거 문장을 1등으로 찾은 질문은 초파리 쪽 '+f+'개, 주판봇 쪽 '+b+'개예요. 주판봇 쪽도 Q4 하나는 놓쳤어요.';
    Cast.set($('.verdict img',root),'doc','judge');
    var who={F:'초파리 승.',R:'주판봇 승.',D:'이번 판은 나눠 갖는다.'}[res];
    $('.verdict p',root).textContent='말이 달라도 뜻이 같으면 찾아야 한다. '+who;
    var g=$('[data-guess][aria-pressed=true]',root);$('#duelScore').innerHTML='<span>결과: '+(res==='R'?'주판봇 승 (R)':res==='F'?'초파리 승 (F)':'무승부 (D)')+'</span><span>차이 '+Math.abs(f-b)+'문항</span>'+(g?'<span>내 예상: '+(g.dataset.guess===(res==='R'?'robo':'fly')?'맞음':'다름')+'</span>':'');
    root.classList.add('open');shown=true;this.textContent='다시 닫기'});
  function reset(){Cast.set(fi,'fly','point');Cast.set(ri,'robo','coin');Cast.set($('.asst img',root),'asst','firm');Cast.set($('.verdict img',root),'doc','front');root.classList.remove('open');shown=false;$('.reveal',root).textContent='결과 보기'}
})();

/* ---------- glossary ---------- */
var GL={
 'RAG':['검색 증강 생성 (RAG)','방법','답하기 전에 관련 문장을 찾아 질문과 함께 LLM에 건네는 방법.'],
 'LLM':['큰 언어 모델 (LLM)','모델','앞 글을 보고 다음 말을 이어 쓰며 답하는 모델.'],
 '환각':['환각','현상','근거 없이 그럴듯한 내용을 지어내는 일.'],
 '키워드 검색':['키워드 검색','방법','질문과 같은 글자의 단어가 많은 문장을 고르는 검색.'],
 '임베딩':['임베딩','방법','문장의 뜻을 숫자 줄(벡터)로 바꾸는 일. 뜻이 비슷하면 방향이 비슷하다.'],
 '벡터':['벡터','수학','순서가 있는 숫자 줄. 화살표로 그릴 수 있다.'],
 '코사인 유사도':['코사인 유사도','지표','두 벡터 사이 각도의 cos. 1이면 같은 방향, 0이면 무관, −1이면 반대.'],
 '내적':['내적 (A·B)','수학','같은 자리 숫자끼리 곱해 모두 더한 값.'],
 '벡터 DB':['벡터 DB','도구','조각과 그 숫자 줄을 모아 두고 비슷한 것을 빨리 찾는 저장소.'],
 '청크':['청크 (조각)','개념','긴 문서를 검색하기 좋게 자른 한 조각.'],
 'top-k':['상위 k개 (top-k)','설정','점수가 높은 순서로 k개만 가져오기.'],
 '프롬프트':['프롬프트','개념','LLM에 건네는 지시문. 여기서는 지시 + 조각 + 질문.']};
var CORE=['RAG','LLM','환각','키워드 검색','임베딩','벡터','코사인 유사도','내적','벡터 DB','청크','top-k','프롬프트'];
var glMode='core',tip=$('#tip');
function clearGl(){$$('span.jt').forEach(function(s){s.replaceWith(document.createTextNode(s.textContent))});document.body.normalize()}
function applyGl(){clearGl();if(glMode==='off')return;var keys=glMode==='core'?CORE:Object.keys(GL);
  $$('section.level:not(#kg):not(#export) .wrap, header.hero .wrap').forEach(function(scope){var seen={};
    var tw=document.createTreeWalker(scope,NodeFilter.SHOW_TEXT,{acceptNode:function(n){var p=n.parentElement;if(!p)return 2;
      if(p.closest('button,h1,h2,nav,canvas,svg,.kpis,code,pre,.jt,table.abbr,.qline,#q1chips,.chips,.eq,.flow'))return 2;return 1}});
    var nodes=[];while(tw.nextNode())nodes.push(tw.currentNode);
    nodes.forEach(function(n){keys.forEach(function(k){if(seen[k]||!n.parentNode)return;var i=n.nodeValue.indexOf(k);if(i<0)return;
      seen[k]=1;var after=n.splitText(i);after.splitText(k.length);var sp=document.createElement('span');sp.className='jt';sp.tabIndex=0;sp.dataset.k=k;sp.textContent=k;after.replaceWith(sp);n=sp.nextSibling||n})})});}
function showTip(el){var g=GL[el.dataset.k];if(!g)return;tip.innerHTML='<b>'+esc(g[0])+'</b><small>'+esc(g[1])+'</small><div>'+esc(g[2])+'</div>';tip.style.display='block';
  var r=el.getBoundingClientRect(),tw=Math.min(300,window.innerWidth-20);tip.style.left=Math.max(10,Math.min(r.left,window.innerWidth-tw-10))+'px';tip.style.top=(r.bottom+8+120>window.innerHeight?r.top-tip.offsetHeight-8:r.bottom+8)+'px'}
function hideTip(){tip.style.display='none'}
document.addEventListener('pointerover',function(e){if(e.target.classList&&e.target.classList.contains('jt'))showTip(e.target)});
document.addEventListener('pointerout',function(e){if(e.target.classList&&e.target.classList.contains('jt'))hideTip()});
document.addEventListener('focusin',function(e){if(e.target.classList&&e.target.classList.contains('jt'))showTip(e.target)});
document.addEventListener('focusout',hideTip);document.addEventListener('keydown',function(e){if(e.key==='Escape')hideTip()});
window.addEventListener('scroll',hideTip,{passive:true});
$('#stGl').addEventListener('click',function(){glMode=glMode==='core'?'all':glMode==='all'?'off':'core';this.textContent='밑줄: '+{core:'핵심',all:'전체',off:'끄기'}[glMode];applyGl()});

/* ---------- quiz ---------- */
var QUIZ={
 lv1:[{q:'①단계에서 LLM 혼자 낸 답이 틀린 가장 큰 이유는?',o:['모델이 일부러 속여서','우리 회사 문서를 학습 때 본 적이 없어서','질문이 영어라서'],a:1,why:'모델은 흔한 말을 확률로 고릅니다. 우리 문서의 내용은 그 머릿속에 없습니다.',hint:'조수의 수식 상자를 다시 보세요.'},
  {q:'다음 말 확률이 1 year 0.46, accidents 0.22, 2 years 0.19, nothing 0.13일 때 nothing의 확률이 맞는지 확인하려면?',o:['넷을 더해 1.00이 되는지 본다','가장 큰 값과 비교한다','0.5보다 작은지 본다'],a:0,why:'0.46 + 0.22 + 0.19 + 0.13 = 1.00. 확률은 모두 더하면 1입니다.',hint:'확률 전체의 합을 떠올려 보세요.'}],
 lv2:[{q:'Q7 「How much does a new cell cost?」와 B6 「Replacement batteries cost 12 dollars.」의 단어 겹침 점수는? (흔한 말 제외)',o:['0','1','2'],a:1,why:'겹치는 단어는 cost 하나라 점수는 1입니다. cell과 batteries는 글자가 다릅니다.',hint:'질문 단어 {much, cost, new, cell}에서 B6에도 있는 것을 찾으세요.'},
  {q:'키워드 검색이 Q5 「How fast is delivery?」에서 놓친 까닭은?',o:['문서에 배송 이야기가 없어서','delivery와 shipping의 글자가 달라서','질문이 너무 짧아서'],a:1,why:'뜻은 같지만 글자가 달라 겹침 점수가 0이 됩니다.',hint:'C5 문장의 단어를 보세요.'}],
 lv3:[{q:'두 화살표가 직각(90°)이면 코사인 유사도는?',o:['1','0','−1'],a:1,why:'cos 90° = 0. 방향이 서로 관계없다는 뜻입니다.',hint:'실험 ③-가의 각도를 90°로 옮겨 보세요.'},
  {q:'B 화살표의 길이만 두 배로 늘리면 코사인 유사도는?',o:['두 배가 된다','절반이 된다','그대로다'],a:2,why:'길이로 나누기 때문에 방향만 남습니다. 문장이 길고 짧은 차이를 덜어 냅니다.',hint:'식의 분모 ‖A‖ ‖B‖를 보세요.'}],
 lv4:[{q:'18문장을 크기 3, 겹침 0으로 자르면 조각은 몇 개?',o:['3개','6개','9개'],a:1,why:'18 ÷ 3 = 6. 겹침이 1이면 간격이 2가 되어 9조각입니다.',hint:'간격 = 크기 − 겹침입니다.'},
  {q:'k를 1에서 3으로 올렸을 때 함께 늘어나는 것은?',o:['LLM에 보내는 문장 수','문서의 문장 수','임베딩 숫자의 개수'],a:0,why:'찾는 근거가 늘어나는 만큼 읽을 양도 늘어납니다. 찾는 양과 읽을 양은 함께 움직입니다.',hint:'실험 ④의 「평균 보낸 문장」 상자를 보세요.'}],
 lv5:[{q:'RAG 프롬프트의 세 부분이 아닌 것은?',o:['지시','찾은 조각','모델의 가중치'],a:2,why:'RAG는 모델을 고치지 않습니다. 지시, 조각, 질문을 글로 건넬 뿐입니다.',hint:'실험 ⑤의 프롬프트 상자를 보세요.'},
  {q:'찾을 확률 0.8, 찾은 뒤 바르게 쓸 확률 0.9라면 맞는 답이 나올 확률은? (예시값)',o:['0.72','0.85','1.70'],a:0,why:'두 일이 모두 일어나야 하므로 곱합니다. 0.8 × 0.9 = 0.72.',hint:'확률의 곱셈을 쓰세요.'}]};
var qDone={},qTot=0;Object.keys(QUIZ).forEach(function(k){qTot+=QUIZ[k].length});
$$('.quiz[data-quiz]').forEach(function(box){var set=QUIZ[box.dataset.quiz]||[];
  box.innerHTML='<h3 style="color:var(--info)">확인 퀴즈</h3>'+set.map(function(it,i){return '<div class="qi" data-i="'+i+'"><p>Q'+(i+1)+'. '+esc(it.q)+'</p><div class="opts">'+it.o.map(function(o,j){return '<button class="bt" data-j="'+j+'">'+esc(o)+'</button>'}).join('')+'</div><div class="fb" aria-live="polite"></div></div>'}).join('');
  $$('.qi',box).forEach(function(qi){var it=set[+qi.dataset.i];$$('button',qi).forEach(function(b){b.addEventListener('click',function(){var j=+b.dataset.j,fb=$('.fb',qi);
    $$('button',qi).forEach(function(x){x.classList.remove('right','wrong')});
    if(j===it.a){b.classList.add('right');fb.className='fb ok';fb.textContent='정답. '+it.why;qDone[box.dataset.quiz+qi.dataset.i]=1}
    else{b.classList.add('wrong');fb.className='fb no';fb.textContent='힌트: '+it.hint}
    $('#stQuiz').textContent='퀴즈 '+Object.keys(qDone).length+'/'+qTot})})})});
$('#stQuiz').textContent='퀴즈 0/'+qTot;

/* ---------- progress ---------- */
function prog(){var h=document.documentElement,p=h.scrollTop/(h.scrollHeight-h.clientHeight||1);$('#prog').style.width=(p*100)+'%';$('#stRead').textContent='읽은 곳 '+Math.round(p*100)+'%'}
window.addEventListener('scroll',prog,{passive:true});

/* ---------- KG index ---------- */
var KG=JSON.parse($('#kg-raw').textContent),REF=JSON.parse($('#refs-csl').textContent),META=JSON.parse($('#page-meta').textContent);
var TYPEKO={Concept:'개념',Method:'방법',Task:'문제',Metric:'지표',Claim:'주장',Term:'용어',Question:'질문',Analogy:'비유',Limitation:'한계',Simulation:'실험',QuizItem:'퀴즈',Work:'문헌',Dataset:'데이터',Section:'섹션'};
var TCOL={Concept:'#9b3fb5',Method:'#13733a',Task:'#1e55c8',Metric:'#a35c00',Claim:'#c9302c',Term:'#5b6874',Question:'#c42a6e',Analogy:'#0b7a86',Limitation:'#8a2be2',Simulation:'#3b63d6',QuizItem:'#93651a',Work:'#16212b',Dataset:'#1f7a52',Section:'#999'};
var CHIPT=['Concept','Method','Task','Metric','Claim','Term','Question','Analogy','Limitation'];var tOn={};CHIPT.forEach(function(t){tOn[t]=true});
var openId=null;
$('#kgtypes').innerHTML=CHIPT.map(function(t){return '<button class="bt" data-t="'+t+'" aria-pressed="true">'+TYPEKO[t]+'</button>'}).join('');
$$('#kgtypes button').forEach(function(b){b.addEventListener('click',function(){tOn[b.dataset.t]=!tOn[b.dataset.t];b.setAttribute('aria-pressed',tOn[b.dataset.t]?'true':'false');renderKg()})});
function lab(n){return n.label.ko}
function deg(id){return KG.edges.filter(function(e){return e.s===id||e.o===id}).length}
function renderKg(){var q=$('#kgq').value.trim().toLowerCase();
  var list=KG.nodes.filter(function(n){if(CHIPT.indexOf(n.type)>=0&&!tOn[n.type])return false;if(CHIPT.indexOf(n.type)<0)return false;
    if(!q)return true;var t=(n.label.ko+' '+n.label.en+' '+((n.altLabel&&n.altLabel.ko)||[]).join(' ')+' '+((n.definition&&n.definition.ko)||'')).toLowerCase();return t.indexOf(q)>=0});
  $('#kgList').innerHTML=list.map(function(n){return '<div class="it'+(n.id===openId?' open':'')+'" id="kgi-'+n.id.replace(/[^a-z0-9]/gi,'_')+'"><b>'+esc(lab(n))+'</b><span class="kchip">'+TYPEKO[n.type]+'</span><span class="note">'+esc(n.label.en)+'</span>'+
    (n.definition?'<p>'+esc(n.definition.ko)+'</p>':'')+'<p><a href="'+n.anchor+'">설명 보러 가기 →</a> · 근거 '+((n.evidence||[]).length)+' · 관계 '+deg(n.id)+'</p></div>'}).join('')||'<p class="note">찾은 항목이 없습니다.</p>';
  var cnt={};KG.nodes.forEach(function(n){cnt[n.type]=(cnt[n.type]||0)+1});
  $('#kgstat').textContent='노드 '+KG.nodes.length+' · 관계 '+KG.edges.length+' · 보이는 항목 '+list.length;}
$('#kgq').addEventListener('input',renderKg);
// graph
var GN=KG.nodes.filter(function(n){return n.type!=='Section'&&n.type!=='QuizItem'}).slice(0,80),GI={};GN.forEach(function(n,i){GI[n.id]=i});
var GE=KG.edges.filter(function(e){return GI[e.s]!==undefined&&GI[e.o]!==undefined});
(function layoutGraph(){var r=(function(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}})(7);
  GN.forEach(function(n){n._x=r();n._y=r()});
  for(var it=0;it<200;it++){var c=0.002*(1-it/200)+0.0005;GN.forEach(function(a){a._fx=0;a._fy=0});
    for(var i=0;i<GN.length;i++)for(var j=i+1;j<GN.length;j++){var a=GN[i],b=GN[j],dx=a._x-b._x,dy=a._y-b._y,d2=dx*dx+dy*dy+1e-4,f=0.00012/d2;a._fx+=dx*f;a._fy+=dy*f;b._fx-=dx*f;b._fy-=dy*f}
    GE.forEach(function(e){var a=GN[GI[e.s]],b=GN[GI[e.o]],dx=b._x-a._x,dy=b._y-a._y,d=Math.sqrt(dx*dx+dy*dy)+1e-6,f=(d-0.11)*0.06;a._fx+=dx/d*f;a._fy+=dy/d*f;b._fx-=dx/d*f;b._fy-=dy/d*f});
    GN.forEach(function(a){a._fx+=(0.5-a._x)*0.02;a._fy+=(0.5-a._y)*0.02;a._x+=Math.max(-0.03,Math.min(0.03,a._fx));a._y+=Math.max(-0.03,Math.min(0.03,a._fy));a._x=Math.max(0.03,Math.min(0.97,a._x));a._y=Math.max(0.04,Math.min(0.96,a._y))})}})();
function drawGraph(){var c=$('#kgc'),W=fit(c,380),x=c.getContext('2d');x.clearRect(0,0,W,380);
  x.strokeStyle='rgba(91,104,116,.35)';x.lineWidth=1;GE.forEach(function(e){var a=GN[GI[e.s]],b=GN[GI[e.o]];x.beginPath();x.moveTo(a._x*W,a._y*380);x.lineTo(b._x*W,b._y*380);x.stroke()});
  GN.forEach(function(n){x.fillStyle=TCOL[n.type]||'#999';x.beginPath();x.arc(n._x*W,n._y*380,n.id===openId?7:4.5,0,7);x.fill()});
  x.font='11px '+FONT;x.fillStyle='#16212b';GN.forEach(function(n){if(n.type==='Method'||n.type==='Concept'||n.id===openId)x.fillText(lab(n).slice(0,10),n._x*W+6,n._y*380-5)})}
$('#kgc').addEventListener('pointerdown',function(ev){var c=this,r=c.getBoundingClientRect(),mx=(ev.clientX-r.left)/r.width,my=(ev.clientY-r.top)/r.height,best=null,bd=1e9;
  GN.forEach(function(n){var d=(n._x-mx)*(n._x-mx)+(n._y-my)*(n._y-my);if(d<bd){bd=d;best=n}});if(best&&bd<0.003){openId=best.id;$('#kgq').value='';if(CHIPT.indexOf(best.type)>=0){tOn[best.type]=true;$$('#kgtypes button').forEach(function(b){if(b.dataset.t===best.type)b.setAttribute('aria-pressed','true')})}
  renderKg();drawGraph();var el=document.getElementById('kgi-'+best.id.replace(/[^a-z0-9]/gi,'_'));if(el)el.scrollIntoView({block:'nearest'})}});
addMod($('#kgc'),function(dt){if(dt===0)drawGraph()});
$('#kgleg').innerHTML=CHIPT.map(function(t){return '<span><i style="background:'+TCOL[t]+'"></i>'+TYPEKO[t]+'</span>'}).join('');
(function(){var path=['lab:method/closed-book-llm','lab:method/keyword-search','lab:method/embedding-search','lab:method/chunk-topk-retrieval','lab:topic/rag'];
  $('#kgpath').innerHTML=path.map(function(id,i){var n=KG.nodes.filter(function(x){return x.id===id})[0];return '<span class="s done">'+(n?esc(lab(n)):id)+'</span>'+(i<path.length-1?'<span class="s">한계 → 다음</span>':'')}).join('');
  $('#kgqs').innerHTML=KG.nodes.filter(function(n){return n.type==='Question'}).map(function(n){return '<li><a href="'+n.anchor+'">'+esc(lab(n))+'</a></li>'}).join('')})();

/* ---------- export ---------- */
var CRC=(function(){var t=[],c;for(var n=0;n<256;n++){c=n;for(var k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c>>>0}
  return function(u8){var x=0xFFFFFFFF;for(var i=0;i<u8.length;i++)x=t[(x^u8[i])&255]^(x>>>8);return (x^0xFFFFFFFF)>>>0}})();
function makeZip(files){var enc=new TextEncoder(),parts=[],central=[],off=0;function u16(v){return [v&255,(v>>8)&255]}function u32(v){return [v&255,(v>>8)&255,(v>>16)&255,(v>>>24)&255]}
  files.forEach(function(f){var name=enc.encode(f.name),data=enc.encode(f.text),crc=CRC(data);
    var head=[].concat(u32(0x04034b50),u16(20),u16(0x0800),u16(0),u16(0),u16(0),u32(crc),u32(data.length),u32(data.length),u16(name.length),u16(0));
    parts.push(new Uint8Array(head),name,data);
    central.push([].concat(u32(0x02014b50),u16(20),u16(20),u16(0x0800),u16(0),u16(0),u16(0),u32(crc),u32(data.length),u32(data.length),u16(name.length),u16(0),u16(0),u16(0),u16(0),u32(0),u32(off)),name);
    off+=head.length+name.length+data.length});
  var cdStart=off,cdLen=0;central.forEach(function(c){if(Array.isArray(c)){parts.push(new Uint8Array(c));cdLen+=c.length}else{parts.push(c);cdLen+=c.length}});
  parts.push(new Uint8Array([].concat(u32(0x06054b50),u16(0),u16(0),u16(files.length),u16(files.length),u32(cdLen),u32(cdStart),u16(0))));
  return new Blob(parts,{type:'application/zip'})}
function download(blob,name){var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},500)}
var BIBT={'article-journal':'article','paper-conference':'inproceedings','book':'book','chapter':'incollection','webpage':'misc','dataset':'misc','report':'techreport','thesis':'phdthesis','software':'misc'};
var RIST={'article-journal':'JOUR','paper-conference':'CPAPER','book':'BOOK','chapter':'CHAP','webpage':'ELEC','dataset':'DATA','report':'RPRT','thesis':'THES','software':'COMP'};
function names(a){return (a||[]).map(function(p){return p.literal||(p.family+(p.given?', '+p.given:''))})}
function toBib(r){var f=[],add=function(k,v){if(v!==undefined&&v!==null&&v!=='')f.push('  '+k+' = {'+v+'}')};
  add('title',r.title);add('author',names(r.author).map(function(n){return n==='et al.'?'others':n}).join(' and '));add('year',r.issued&&r.issued['date-parts'][0][0]);
  add(r.type==='article-journal'?'journal':(r.type==='webpage'?'howpublished':'booktitle'),r['container-title']);add('volume',r.volume);add('number',r.issue);add('pages',r.page);add('publisher',r.publisher);add('doi',r.DOI);add('url',r.URL);
  return '@'+(BIBT[r.type]||'misc')+'{'+r.id+',\n'+f.join(',\n')+'\n}'}
function toRis(r){var L=['TY  - '+(RIST[r.type]||'GEN')],add=function(t,v){if(v)L.push(t+'  - '+v)};add('TI',r.title);names(r.author).forEach(function(n){add('AU',n)});
  add('PY',r.issued&&r.issued['date-parts'][0][0]);add('T2',r['container-title']);add('VL',r.volume);add('IS',r.issue);add('DO',r.DOI);add('UR',r.URL);L.push('ER  - ');return L.join('\r\n')}
function plainRef(r){var y=r.issued?r.issued['date-parts'][0][0]:'n.d.';return names(r.author).join(', ')+' ('+y+'). '+r.title+'.'+(r['container-title']?' '+r['container-title']+(r.volume?' '+r.volume:'')+(r.issue?'('+r.issue+')':'')+(r.page?', '+r.page:'')+'.':'')}
function filterScope(g,sc){if(sc==='all')return g;var keep;
  if(sc==='concepts')keep=g.nodes.filter(function(n){return ['Concept','Method','Term','Task','Metric'].indexOf(n.type)>=0});
  else if(sc==='claims'){var ids={};g.nodes.forEach(function(n){if(n.type==='Claim'||n.type==='Work')ids[n.id]=1});g.edges.forEach(function(e){if(ids[e.s]&&e.p==='lab:supports')ids[e.o]=1});keep=g.nodes.filter(function(n){return ids[n.id]})}
  else{var p={};g.edges.forEach(function(e){if(['lab:prerequisiteOf','lab:hasLimitation','lab:addressedBy'].indexOf(e.p)>=0){p[e.s]=1;p[e.o]=1}});keep=g.nodes.filter(function(n){return p[n.id]})}
  var K={};keep.forEach(function(n){K[n.id]=1});
  var ed=g.edges.filter(function(e){return K[e.s]&&K[e.o]&&(sc!=='prereq'||['lab:prerequisiteOf','lab:hasLimitation','lab:addressedBy'].indexOf(e.p)>=0)});
  return {version:g.version,page:g.page,scope:sc,nodes:keep,edges:ed}}
function lit(s){return '"'+String(s).replace(/\\/g,'\\\\').replace(/"/g,'\\"').replace(/\n/g,'\\n')+'"'}
function iri(id){return id.replace(/^lab:/,'lab:').replace(/[^A-Za-z0-9:_\-\/]/g,'_').replace(/\//g,'_')}
function toTurtle(g){var L=['@prefix lab: <urn:lab:> .','@prefix skos: <http://www.w3.org/2004/02/skos/core#> .','@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .',''];
  g.nodes.forEach(function(n){L.push(iri(n.id)+' a lab:'+n.type+' ;');L.push('  skos:prefLabel '+lit(n.label.ko)+'@ko , '+lit(n.label.en)+'@en'+(n.definition?' ;':' .'));if(n.definition)L.push('  skos:definition '+lit(n.definition.ko)+'@ko .')});
  L.push('');g.edges.forEach(function(e){L.push(iri(e.s)+' '+e.p+' '+iri(e.o)+' .')});return L.join('\n')}
function csvc(v){v=v===undefined||v===null?'':String(v);return /[",\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v}
function toNodesCsv(g){return 'id,type,label_ko,label_en,status,level,family,page,anchor\n'+g.nodes.map(function(n){return [n.id,n.type,n.label.ko,n.label.en,n.status,n.level,n.family,n.page,n.anchor].map(csvc).join(',')}).join('\n')}
function toEdgesCsv(g){return 'source,predicate,target,anchor,confidence\n'+g.edges.map(function(e){return [e.s,e.p,e.o,e.anchor,e.confidence].map(csvc).join(',')}).join('\n')}
function toProvCsv(g,R){var rows=['item,kind,work,loc,factCard,confidence,verified,pageAnchor'];var ids={};g.nodes.forEach(function(n){ids[n.id]=n});
  R.forEach(function(r){(r.lab.locs||[]).forEach(function(l){var n=ids[l.claim];if(!n)return;rows.push([l.claim,'node',r.id,l.loc,(n.evidence||[]).join(' '),n.confidence,l.verified?'true':'false',n.anchor].map(csvc).join(','))})});return rows.join('\n')}
function toJsonLd(g){var ld=JSON.parse($('#kg-ld').textContent);if(g.scope&&g.scope!=='all'){var K={};g.nodes.forEach(function(n){K[n.id]=1});ld['@graph']=ld['@graph'].filter(function(x){return K[x['@id']]})}return ld}
function readme(M,g,R){return [M.title,'','시리즈: '+M.series+' '+M.number+' · 버전 '+M.version+' · '+M.date,'저자: '+M.creator.map(function(c){return c.name}).join(', '),'','권장 인용: '+M.suggestedCitation,'',
  '노드 '+g.nodes.length+' · 관계 '+g.edges.length+' · 문헌 '+R.length,'','확인 필요:'].concat(todoList().map(function(t){return '- '+t})).concat(['','채워 넣을 것: '+(M.url?'':'공개 주소, ')+(M.license?'':'라이선스')]).join('\n')}
function todoList(){var t=[];REF.forEach(function(r){var v=r.lab.verified;Object.keys(v).forEach(function(k){if(!v[k])t.push(r.id+': '+k+' 미확인')})});
  KG.nodes.forEach(function(n){(n.match||[]).forEach(function(m){if(!m.verified)t.push(n.id+': '+m.scheme+' 대응 ID 미확인')})});if(!META.url)t.push('page_meta: 공개 주소 비어 있음');if(!META.license)t.push('page_meta: 라이선스 비어 있음');return t}
var scope='all';
function buildPackage(sc){var g=filterScope(KG,sc);var files=[{name:'page_meta.json',text:JSON.stringify(META,null,2)},{name:'kg.json',text:JSON.stringify(g,null,2)},{name:'kg.jsonld',text:JSON.stringify(toJsonLd(g),null,2)},
  {name:'kg.ttl',text:toTurtle(g)},{name:'nodes.csv',text:'﻿'+toNodesCsv(g)},{name:'edges.csv',text:'﻿'+toEdgesCsv(g)},{name:'references.csl.json',text:JSON.stringify(REF,null,2)},
  {name:'references.bib',text:REF.map(toBib).join('\n\n')},{name:'references.ris',text:REF.map(toRis).join('\r\n')},{name:'provenance.csv',text:'﻿'+toProvCsv(g,REF)},{name:'README.txt',text:readme(META,g,REF)}];
  files.unshift({name:'manifest.json',text:JSON.stringify({package:'lab-kg',version:META.version,page:META.number,created:new Date().toISOString().slice(0,10),scope:sc,counts:{nodes:g.nodes.length,edges:g.edges.length,refs:REF.length},files:files.map(function(f){return f.name})},null,2)});
  return files}
window.__buildPackage=buildPackage;window.__makeZip=makeZip;
$$('[data-sc]').forEach(function(b){b.addEventListener('click',function(){scope=b.dataset.sc;$$('[data-sc]').forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')})})});
$('#zipAll').addEventListener('click',function(){download(makeZip(buildPackage(scope)),'kg_'+META.number+'_rag_'+scope+'.zip')});
['manifest.json','page_meta.json','kg.json','kg.jsonld','kg.ttl','nodes.csv','edges.csv','references.csl.json','references.bib','references.ris','provenance.csv','README.txt'].forEach(function(n){var b=document.createElement('button');b.className='bt';b.textContent=n;
  b.addEventListener('click',function(){var f=buildPackage(scope).filter(function(x){return x.name===n})[0];download(new Blob([f.text],{type:'text/plain;charset=utf-8'}),n)});$('#fileBtns').appendChild(b)});
var cf='plain';function citeText(){var self={id:'ahn2026rag',type:'webpage',title:META.title,author:[{family:'안',given:'상선'}],issued:{'date-parts':[[2026]]},'container-title':META.series+' '+META.number,URL:META.url};
  return cf==='plain'?META.suggestedCitation:cf==='bib'?toBib(self):toRis(self)}
function renderCite(){$('#citeBox').value=citeText()}
$$('[data-cf]').forEach(function(b){b.addEventListener('click',function(){cf=b.dataset.cf;$$('[data-cf]').forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});renderCite()})});
$('#cpy').addEventListener('click',function(){var t=$('#citeBox');try{navigator.clipboard.writeText(t.value).then(function(){$('#cpy').textContent='복사됨'},function(){t.select()})}catch(e){t.select()}});
var ROLE={primary:'주 자료',background:'배경',data:'수치',figure:'그림',software:'도구'};
$('#refList').innerHTML=REF.map(function(r){var v=r.lab.verified,ok=Object.keys(v).every(function(k){return v[k]});
  return '<li>'+esc(plainRef(r))+(r.URL?' <a href="'+esc(r.URL)+'">링크</a>':'')+' <span class="kchip">'+ROLE[r.lab.role]+'</span><span class="badge '+(ok?'ok':'no')+'">'+(ok?'확인됨':'확인 필요')+'</span>'+
  '<details><summary>뒷받침하는 개념 '+r.lab.supports.length+'개</summary>'+r.lab.supports.map(function(id){var n=KG.nodes.filter(function(x){return x.id===id})[0];return n?'<a href="#kg" data-open="'+id+'">'+esc(lab(n))+'</a>':''}).join(' · ')+'</details></li>'}).join('');
$$('#refList [data-open]').forEach(function(a){a.addEventListener('click',function(){openId=a.dataset.open;$('#kgq').value='';renderKg();drawGraph()})});
var claims=KG.nodes.filter(function(n){return n.type==='Claim'}),srcd=claims.filter(function(n){return KG.edges.some(function(e){return e.s===n.id&&e.p==='lab:assertedIn'})});
var refOk=REF.filter(function(r){var v=r.lab.verified;return Object.keys(v).every(function(k){return v[k]})}).length,todo=todoList();
kpis($('#exk'),[['m',KG.nodes.length+'개','노드'],['g',KG.edges.length+'개','관계'],['a',REF.length+'편 · '+Math.round(refOk/REF.length*100)+'%','문헌 · 모두 확인된 비율'],['r',Math.round(srcd.length/Math.max(1,claims.length)*100)+'%','출처가 있는 주장']]);
$('#exsay').textContent='출처 없는 주장은 꾸러미에 넣지 않았어요. 확인할 항목 '+todo.length+'개는 아래에 있어요.';
$('#todo').innerHTML=todo.map(function(t){return '<li>'+esc(t)+'</li>'}).join('');
$('#verinfo').textContent='꾸러미 버전 '+META.version+' · 만든 날 '+META.date+' · 등록부 '+KG.registry;
renderCite();renderKg();

/* ---------- boot ---------- */
Cast.fill();r2();r3();r4();r5();applyGl();prog();
function redraw(){mods.forEach(function(m){m.fn(0)})}
redraw();window.addEventListener('resize',redraw);requestAnimationFrame(loop);
})();
