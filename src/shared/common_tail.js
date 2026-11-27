/* ---------- glossary ---------- */
var GL=PAGE.GL,CORE=PAGE.CORE;
var glMode='core',tip=$('#tip');
function clearGl(){$$('span.jt').forEach(function(s){s.replaceWith(document.createTextNode(s.textContent))});document.body.normalize()}
function applyGl(){clearGl();if(glMode==='off')return;var keys=glMode==='core'?CORE:Object.keys(GL);
  $$('section.level:not(#kg):not(#export) .wrap, header.hero .wrap').forEach(function(scope){var seen={};
    var tw=document.createTreeWalker(scope,NodeFilter.SHOW_TEXT,{acceptNode:function(n){var p=n.parentElement;if(!p)return 2;
      if(p.closest('button,h1,h2,nav,canvas,svg,.kpis,code,pre,.jt,table.abbr,.qline,.chips,.eq,.flow,.tcard,.trace,label,.league'))return 2;return 1}});
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
var QUIZ=PAGE.QUIZ;
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
(function(){var path=PAGE.PATH;
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
$('#zipAll').addEventListener('click',function(){download(makeZip(buildPackage(scope)),'kg_'+META.number+'_'+PAGE.SLUG+'_'+scope+'.zip')});
['manifest.json','page_meta.json','kg.json','kg.jsonld','kg.ttl','nodes.csv','edges.csv','references.csl.json','references.bib','references.ris','provenance.csv','README.txt'].forEach(function(n){var b=document.createElement('button');b.className='bt';b.textContent=n;
  b.addEventListener('click',function(){var f=buildPackage(scope).filter(function(x){return x.name===n})[0];download(new Blob([f.text],{type:'text/plain;charset=utf-8'}),n)});$('#fileBtns').appendChild(b)});
var cf='plain';function citeText(){var self={id:PAGE.CITEID,type:'webpage',title:META.title,author:[{family:'안',given:'상선'}],issued:{'date-parts':[[2026]]},'container-title':META.series+' '+META.number,URL:META.url};
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
Cast.fill();xToggles();if(PAGE.INIT)PAGE.INIT();applyGl();prog();
function redraw(){mods.forEach(function(m){m.fn(0)})}
redraw();window.addEventListener('resize',redraw);requestAnimationFrame(loop);
})();
