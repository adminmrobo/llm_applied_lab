/* ===== A2 미세조정 연구실 — 페이지 실험 ===== */
var M=A2.make(DATA),CK=DATA.classes_ko,CC={R:'#9b3fb5',S:'#1e55c8',T:'#13733a',H:'#a35c00'};
var STAMP='설명용 모형 · 실제 데이터 아님';
function avg(a){return a.reduce(function(x,y){return x+y},0)/a.length}
function setAcc(set){return M.acc(function(m){return M.fewshot(m,set).pred},M.TE)}
function setChars(set){return avg(M.TE.map(function(m){return M.chars(M.promptText(m,set))}))}
var SETLAB={zero:'예시 없음',plain4:'평범한 4개',plain8:'평범한 8개',rule8:'규칙 포함 8개',all24:'24개 전부'};

/* ---------- ① ---------- */
var S1={set:'rule8',msg:'t02'};
function r1(){var m=M.ALL[S1.msg],r=M.fewshot(m,S1.set),ok=r.pred===m.y;
  $('#q1line').innerHTML='<b>'+m.id+'</b> '+esc(m.ko)+'<small>정답 양식: '+CK[m.y]+(m.rule?' · 회사 규칙: '+m.rule:'')+'</small>';
  var c=$('#c1'),H=220,W=fit(c,H),x=c.getContext('2d');x.clearRect(0,0,W,H);var nar=W<500,L=nar?92:120,R=nar?78:70,mx=Math.max(8,Math.max.apply(null,r.total)+0.5),rowH=42;
  x.font=(nar?'12px ':'13px ')+FONT;M.C.forEach(function(k,i){var y=32+i*rowH,bw=(W-L-R)/mx;x.fillStyle='#16212b';x.textAlign='right';x.fillText(CK[k],L-8,y+16);x.textAlign='left';
    x.fillStyle='#eef2f6';x.fillRect(L,y,W-L-R,24);x.fillStyle=CC[k];x.globalAlpha=.45;x.fillRect(L,y,Math.max(0,r.base[i])*bw,24);x.globalAlpha=1;
    x.fillStyle=CC[k];x.fillRect(L+Math.max(0,r.base[i])*bw,y,r.bonus[i]*bw,24);
    x.fillStyle='#16212b';x.fillText(fmt(r.total[i])+(k===r.pred?(nar?' ←':' ← 고름'):''),L+Math.max(0,r.total[i])*bw+6,y+17)});
  x.fillStyle='#5b6874';x.font='12px '+FONT;x.fillText(nar?'연한 = 버릇, 진한 = 예시':'연한 막대 = 버릇 점수, 진한 막대 = 예시 점수',nar?8:L,H-6);stamp(x,W,STAMP);
  kpis($('#k1'),[[ok?'g':'r',CK[r.pred],'이 문의에 고른 양식'],['m',setAcc(S1.set)+'/12','시험 12건 중 맞힌 수'],['a',Math.round(setChars(S1.set))+'자','질문 하나에 보내는 평균 글자'],['r',(r.via?r.via:'없음'),'가장 닮았던 예시']]);
  $('#p1').textContent=M.promptText(m,S1.set);
  var I=[];if(!ok)I.push('<p class="r">틀렸습니다. 버릇 점수 '+fmt(r.base[M.CI[r.pred]])+'(이 쪽)가 정답 쪽 '+fmt(r.base[M.CI[m.y]])+'보다 커서, 예시 점수로도 뒤집지 못했습니다.</p>');
  else if(m.rule)I.push('<p class="g">회사 규칙 문의를 맞혔습니다. 규칙 예시('+r.via+')와 닮은 점수가 버릇을 넘었습니다.</p>');
  else I.push('<p class="g">평범한 문의입니다. 버릇과 예시가 같은 쪽을 가리킵니다.</p>');
  if(S1.set==='all24')I.push('<p class="a">예시를 다 붙이면 글자 수가 '+Math.round(setChars('all24'))+'자로 늘지만, 맞힌 수는 규칙 포함 8개와 같습니다.</p>');
  $('#ins1').innerHTML=I.join('')}
btnGroup($('#g1set'),Object.keys(SETLAB),S1.set,function(v){return SETLAB[v]},function(v){S1.set=v;r1()});
$('#g1set').insertAdjacentHTML('afterbegin','<span class="glabel">붙일 예시</span>');
btnGroup($('#g1msg'),M.TE.map(function(m){return m.id}),S1.msg,null,function(v){S1.msg=v;r1()});
$('#g1msg').insertAdjacentHTML('afterbegin','<span class="glabel">시험 문의</span>');
addMod($('#c1'),function(dt){if(dt===0)r1()});

/* ---------- ② ---------- */
var S2={W:null,ep:0,hist:[],msg:'R4'},LR2=2;
function reset2(){S2.W=DATA.W0.map(function(r){return r.slice()});S2.ep=0;S2.hist=[M.loss(S2.W,M.TR)]}
function step2(n){for(var i=0;i<n;i++){var G=M.gradW(S2.W,M.TR);for(var c=0;c<4;c++)for(var j=0;j<8;j++)S2.W[c][j]-=LR2*G[c][j];S2.ep++;S2.hist.push(M.loss(S2.W,M.TR))}r2()}
function r2(){var m=M.ALL[S2.msg],p=M.probs(S2.W,m.v),yi=M.CI[m.y],acc=M.acc(function(t){return M.C[M.argmax(M.logits(S2.W,t.v))]},M.TE);
  $('#q2line').innerHTML='<b>'+m.id+'</b> '+esc(m.ko)+'<small>기록된 정답: '+CK[m.y]+(m.rule?' · 회사 규칙: '+m.rule:'')+(m.fix?' · (모아: 실수로 적힌 기록일 수 있어요)':'')+'</small>';
  barChart($('#c2'),170,M.C.map(function(k,i){return {n:CK[k],v:p[i],t:fmt(p[i]),col:i===yi?'#13733a':'#c8d0da'}}),{max:1,stamp:STAMP});
  lineChart($('#c2b'),200,[{name:'기록 24건 평균 손실',col:'#13733a',pts:S2.hist}],{xmax:Math.max(10,S2.hist.length-1),ymax:0.9,xlab:'가르친 횟수',stamp:STAMP});
  $('#n2ep').textContent='지금까지 '+S2.ep+'회';
  kpis($('#k2'),[['g',fmt(p[yi]),'정답 양식에 준 확률 p'],['r',fmt(-Math.log(p[yi])),'이 기록의 손실 −ln p'],['m',fmt(S2.hist[S2.hist.length-1]),'기록 24건 평균 손실'],['a',acc+'/12','시험 12건 중 맞힌 수']]);
  var top=0;m.v.forEach(function(v,j){if(v>m.v[top])top=j});
  var G=M.gradW(S2.W,[m]);
  $('#eq2').innerHTML='다음 1회에 이 기록 하나가 정답 줄의 「'+DATA.dims_ko[top]+'」 무게를 미는 양: w ← w − <i>η</i> × (<em>'+fmt(p[yi])+'</em> − 1) × <b>'+fmt(m.v[top])+'</b> = w + '+fmt(-LR2*G[yi][top]*1)+' <span class="note">(기록 24건 평균으로 나눠 적용)</span>';
  $('#ins2').innerHTML=S2.ep===0?'<p class="a">아직 가르치지 않은 바탕 모델입니다. 「1회 가르치기」를 눌러 보세요.</p>':
    (p[yi]>0.5?'<p class="g">정답 양식이 가장 큰 확률을 받았습니다. 손실도 '+fmt(-Math.log(p[yi]))+'로 줄었습니다.</p>':'<p class="r">아직 다른 양식이 더 큰 확률입니다. 몇 번 더 가르쳐 보세요.</p>')}
reset2();
$('#b2one').addEventListener('click',function(){step2(1)});$('#b2ten').addEventListener('click',function(){step2(10)});$('#b2reset').addEventListener('click',function(){reset2();r2()});
btnGroup($('#g2msg'),['R4','R5','H3','T3','S1','T4'],S2.msg,null,function(v){S2.msg=v;r2()});$('#g2msg').insertAdjacentHTML('afterbegin','<span class="glabel">지켜볼 기록</span>');
addMod($('#c2b'),function(dt){if(dt===0)r2()});

/* ---------- ③ ---------- */
var S3={lr:20,ep:100,clean:false},cache3={};
function hist3(){var k=S3.lr+'|'+S3.clean;if(!cache3[k])cache3[k]=M.train({lr:S3.lr,epochs:300,clean:S3.clean}).hist;return cache3[k]}
function r3(){var h=hist3(),e=h[S3.ep],mn=h.reduce(function(a,b){return b.te<a.te?b:a});$('#v3ep').textContent=S3.ep;
  lineChart($('#c3'),240,[{name:'학습용 손실 (기록 24건)',col:'#13733a',pts:h.map(function(x){return x.tr})},{name:'시험 손실 (12건)',col:'#c9302c',pts:h.map(function(x){return x.te})}],{xmax:300,ymax:Math.max(1,Math.min(1.6,Math.max.apply(null,h.map(function(x){return x.te}))*1.05)),xlab:'에포크',mark:S3.ep,stamp:STAMP});
  kpis($('#k3'),[['g',fmt(e.tr,3),'학습용 손실'],['r',fmt(e.te,3),'시험 손실'],['m',e.acc+'/12','시험 맞힌 수'],['a',mn.ep+'바퀴','시험 손실이 가장 낮은 곳']]);
  var I=[];if(S3.lr===0.2)I.push('<p class="a">걸음이 작아 300바퀴에도 시험 손실이 '+fmt(h[300].te,2)+'입니다.</p>');
  if(S3.lr===200)I.push('<p class="r">걸음이 커서 손실이 위아래로 튑니다. 300바퀴에는 시험 '+h[300].acc+'/12건입니다.</p>');
  if(S3.lr===20&&!S3.clean&&S3.ep>=54)I.push('<p class="r">54바퀴부터 「램프 색을 바꿀 수 있나요?」를 틀립니다. 잘못 적힌 「밝기 조절」 기록을 외우는 중입니다.</p>');
  if(S3.clean)I.push('<p class="g">모아가 기록 두 건(밝기 조절 → 기술 지원, 해외 배송 → 배송)을 고쳤습니다. 같은 설정에서 시험 손실이 더 낮아집니다.</p>');
  if(e.ep>mn.ep+20&&e.te>mn.te*1.05)I.push('<p class="m">지금 시험 손실('+fmt(e.te,3)+')이 바닥('+fmt(mn.te,3)+', '+mn.ep+'바퀴)보다 높습니다. 더 오래 가르쳐서 오히려 나빠진 구간입니다.</p>');
  $('#ins3').innerHTML=I.join('')||'<p>학습률과 에포크를 바꿔 보세요.</p>'}
btnGroup($('#g3lr'),[0.2,2,20,200],S3.lr,null,function(v){S3.lr=+v;r3()});$('#g3lr').insertAdjacentHTML('afterbegin','<span class="glabel">학습률 η</span>');
$('#r3ep').addEventListener('input',function(){S3.ep=+this.value;r3()});
$('#b3clean').addEventListener('click',function(){S3.clean=!S3.clean;this.setAttribute('aria-pressed',S3.clean?'true':'false');r3()});
addMod($('#c3'),function(dt){if(dt===0)r3()});

/* ---------- ④ ---------- */
var S4={mode:'r2',d:4096,r:8},cache4={};
var MODES={full:'전체 (숫자 32개)',r1:'LoRA r = 1',r2:'LoRA r = 2',r4:'LoRA r = 4'};
function run4(k){if(!cache4[k])cache4[k]=k==='full'?M.train({lr:2,epochs:60}):M.train({lr:2,epochs:60,mode:'lora',r:+k.slice(1)});return cache4[k]}
function r4(){var t=run4(S4.mode),dW=t.W.map(function(row,c){return row.map(function(w,j){return w-DATA.W0[c][j]})}),mx=0;dW.forEach(function(r){r.forEach(function(v){mx=Math.max(mx,Math.abs(v))})});
  var c=$('#c4'),H=220,W=fit(c,H),x=c.getContext('2d');x.clearRect(0,0,W,H);var nar=W<500,L=nar?84:110,cw=Math.min(60,(W-L-12)/8),ch=34,T0=28;
  x.font=(nar?'10px ':'12px ')+FONT;DATA.dims_ko.forEach(function(d,j){x.fillStyle='#5b6874';x.save();x.translate(L+j*cw+cw/2,H-8);x.textAlign='center';x.fillText(nar?d.slice(0,2):(d.length>5?d.slice(0,5):d),0,0);x.restore()});x.font=(nar?'11px ':'12px ')+FONT;
  M.C.forEach(function(k,i){x.fillStyle='#16212b';x.textAlign='right';x.fillText(nar?CK[k].replace(' 양식','').replace('상담원 ',''):CK[k],L-6,T0+i*ch+22);x.textAlign='left';
    for(var j=0;j<8;j++){var v=dW[i][j]/(mx||1);x.fillStyle=v>=0?'rgba(19,115,58,'+Math.abs(v)+')':'rgba(201,48,44,'+Math.abs(v)+')';x.fillRect(L+j*cw+1,T0+i*ch,cw-2,ch-2);x.strokeStyle='#d5dbe2';x.strokeRect(L+j*cw+1,T0+i*ch,cw-2,ch-2)}});
  stamp(x,W,STAMP);var h=t.hist[60];
  kpis($('#k4'),[['m',t.params+'개','배운 숫자 개수'],['g',h.acc+'/12','시험 맞힌 수 (60바퀴)'],['r',fmt(h.te,3),'시험 손실'],['a',S4.mode==='full'?'—':S4.mode.slice(1),'계수 r']]);
  var fails=M.TE.filter(function(m){return t.pred(m)!==m.y}).map(function(m){return '「'+m.ko+'」'});
  $('#ins4').innerHTML=(fails.length?'<p class="r">틀린 문의: '+esc(fails.join(', '))+'</p>':'<p class="g">12건을 모두 맞혔습니다.</p>')+(S4.mode==='r4'?'<p class="a">r = 4면 배우는 숫자가 48개로, 원래 32개보다 많습니다. 작은 표에서는 아끼는 것이 없습니다.</p>':'')+(S4.mode!=='full'?'<p class="m">격자 무늬를 보세요. r = '+S4.mode.slice(1)+'이면 고친 양이 몇 가지 방향의 조합으로만 생깁니다(가로줄끼리 비슷한 모양).</p>':'')}
function r4b(){var C=M.loraCount(S4.d,S4.d,S4.r),ratio=C.lora/C.full*100;
  barChart($('#c4b'),110,[{n:'전체 미세조정',v:C.full,t:C.full.toLocaleString('ko-KR')+'개',col:'#c9302c'},{n:'LoRA r = '+S4.r,v:C.lora,t:C.lora.toLocaleString('ko-KR')+'개',col:'#13733a'}],{L:120});
  $('#eq4').innerHTML='전체 = d × d = '+S4.d+' × '+S4.d+' = <em>'+C.full.toLocaleString('ko-KR')+'</em> · LoRA = r × (d + d) = '+S4.r+' × '+(2*S4.d)+' = <b>'+C.lora.toLocaleString('ko-KR')+'</b> · 비율 <i>'+(ratio<1?ratio.toFixed(2):ratio.toFixed(1))+'%</i> <span class="note">(표 한 장 기준)</span>'}
btnGroup($('#g4mode'),Object.keys(MODES),S4.mode,function(v){return MODES[v]},function(v){S4.mode=v;r4()});$('#g4mode').insertAdjacentHTML('afterbegin','<span class="glabel">고치는 방법</span>');
btnGroup($('#g4d'),[8,768,4096,8192],S4.d,null,function(v){S4.d=+v;r4b()});$('#g4d').insertAdjacentHTML('afterbegin','<span class="glabel">표 한 변 d</span>');
btnGroup($('#g4r'),[1,4,8,64],S4.r,null,function(v){S4.r=+v;r4b()});$('#g4r').insertAdjacentHTML('afterbegin','<span class="glabel">계수 r</span>');
addMod($('#c4'),function(dt){if(dt===0)r4()});addMod($('#c4b'),function(dt){if(dt===0)r4b()});

/* ---------- 팀 대항전 ---------- */
var DUEL=(function(){var L=run4('r2'),RT=DATA.ruletest.concat([M.ALL.t11]);
  return {r1:[setAcc('rule8'),L.hist[60].acc],r2:[Math.round(setChars('rule8')),Math.round(avg(M.TE.map(function(m){return M.chars(M.ftText(m))})))],
    r3:[M.acc(function(m){return M.fewshot(m,'rule8',true).pred},RT,true),M.acc(L.pred,RT,true)]}})();
(function(){var root=$('#duelBox'),shown=false;
  $$('[data-guess]',root).forEach(function(b){b.addEventListener('click',function(){$$('[data-guess]',root).forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});$('#guessNote').textContent='고른 것만 기억합니다. 저장하지 않습니다.'})});
  var fi=$('.teams img[data-who=fly]',root),ri=$('.teams img[data-who=robo]',root),si=$('.teams img[data-who=sia]',root),mi=$('.teams img[data-who=moa]',root);
  $('.reveal',root).addEventListener('click',function(){if(shown){reset();return}
    var d=DUEL,w1=d.r1[0]>d.r1[1]?'fly':d.r1[0]<d.r1[1]?'robo':'tie',w2=d.r2[0]<d.r2[1]?'fly':d.r2[0]>d.r2[1]?'robo':'tie',w3=d.r3[0]>d.r3[1]?'fly':d.r3[0]<d.r3[1]?'robo':'tie';
    var W=[w1,w2,w3],f=W.filter(function(x){return x==='fly'}).length,r=W.filter(function(x){return x==='robo'}).length,res=f>r?'F':r>f?'R':'D';
    function wn(w){return w==='fly'?'<span class="w fly">프롬프트 팀</span>':w==='robo'?'<span class="w robo">미세조정 팀</span>':'<span class="w tie">비김</span>'}
    $('#rdOut').innerHTML='<div class="rd"><h4>1라운드 · 정확도</h4><p>프롬프트 팀 <b>'+d.r1[0]+'/12</b> · 미세조정 팀 <b>'+d.r1[1]+'/12</b> → '+wn(w1)+'</p></div>'+
      '<div class="rd"><h4>2라운드 · 호출당 글자 수</h4><p>프롬프트 팀 <b>'+d.r2[0]+'자</b> · 미세조정 팀 <b>'+d.r2[1]+'자</b> → '+wn(w2)+'</p></div>'+
      '<div class="rd"><h4>3라운드 · 규칙이 바뀐 날</h4><p>프롬프트 팀 <b>'+d.r3[0]+'/3</b> (예시 한 줄의 양식만 고침) · 미세조정 팀 <b>'+d.r3[1]+'/3</b> (다시 가르치기 전) → '+wn(w3)+'</p></div>';
    var big=Math.abs(f-r)>=2,M5={F:['arms','sigh'],R:[big?'cry':'coffee','happy'],D:['coffee','meh']}[res];Cast.set(fi,'fly',M5[0]);Cast.set(ri,'robo',M5[1]);
    Cast.set(mi,'moa',res==='R'?'cheer':'cry');Cast.set(si,'sia',res==='F'?'firm':'smile');
    Cast.set($('.asst img',root),'asst','report');
    $('.asst p',root).textContent='1라운드 '+d.r1[0]+' 대 '+d.r1[1]+', 2라운드 '+d.r2[0]+'자 대 '+d.r2[1]+'자, 3라운드 '+d.r3[0]+' 대 '+d.r3[1]+'이에요. 프롬프트 팀이 1라운드에서 놓친 건 「보증 기간 안에 배터리가 부풀었어요」 한 건이에요.';
    Cast.set($('.verdict img',root),'doc','judge');
    $('.verdict p',root).textContent=(res==='R'?'라운드 '+r+' 대 '+f+', 미세조정 팀 승.':res==='F'?'라운드 '+f+' 대 '+r+', 프롬프트 팀 승.':'라운드 '+f+' 대 '+r+', 무승부.')+' 단, 규칙이 자주 바뀌는 일이라면 3라운드의 결과를 더 무겁게 봐야 한다.';
    var g=$('[data-guess][aria-pressed=true]',root);
    $('#duelScore').innerHTML='<span>결과: '+(res==='R'?'미세조정 팀 승 (R)':res==='F'?'프롬프트 팀 승 (F)':'무승부 (D)')+'</span><span>프롬프트 팀 '+f+' : '+r+' 미세조정 팀</span>'+(g?'<span>내 예상: '+(g.dataset.guess===(res==='R'?'robo':'fly')?'맞음':'다름')+'</span>':'');
    root.classList.add('open');shown=true;this.textContent='다시 닫기'});
  function reset(){Cast.set(fi,'fly','point');Cast.set(ri,'robo','coin');Cast.set(si,'sia','firm');Cast.set(mi,'moa','cheer');Cast.set($('.asst img',root),'asst','firm');Cast.set($('.verdict img',root),'doc','front');root.classList.remove('open');shown=false;$('.reveal',root).textContent='결과 보기'}
})();

var PAGE={SLUG:'finetune',CITEID:'ahn2026finetune',
 PATH:['lab:method/few-shot-prompting','lab:method/sft','lab:concept/learning-rate-epoch','lab:method/lora'],
 GL:{
 '미세조정':['미세조정 (fine-tuning)','방법','이미 학습된 모델에 우리 기록을 더 가르쳐 무게를 조금 고치는 일.'],
 '바탕 모델':['바탕 모델 (base model)','모델','미세조정하기 전의 원래 모델. 상식은 알지만 회사 규칙은 모른다.'],
 '퓨샷':['퓨샷 (few-shot)','방법','프롬프트에 모범 예시를 몇 개 붙여 따라 하게 하는 방법.'],
 '프롬프트':['프롬프트','개념','LLM에 건네는 지시문. 여기서는 지시 + 예시 + 문의.'],
 '버릇 점수':['버릇 점수','이 페이지 용어','바탕 모델이 원래 매기는 점수. 주제 숫자와 무게를 곱해 더한 값.'],
 '코사인 유사도':['코사인 유사도','지표','두 숫자 줄의 방향이 얼마나 같은지. 1이면 같은 방향.'],
 '손실':['손실 (loss)','지표','정답에 준 확률 p로 −ln p. 작을수록 좋다.'],
 '학습률':['학습률 η','설정','한 번에 무게를 고치는 세기. 걸음 크기.'],
 '에포크':['에포크 (epoch)','설정','학습용 기록 전체를 한 바퀴 도는 것.'],
 '과적합':['과적합','현상','학습용 기록에만 맞춰져 처음 보는 문의의 성적이 떨어지는 일.'],
 'LoRA':['LoRA','방법','원래 무게는 얼리고, 고칠 양을 작은 행렬 두 개의 곱으로만 배우는 미세조정.'],
 '계수':['계수 r (rank)','설정','LoRA의 작은 표가 가진 방향의 가짓수.'],
 '소프트맥스':['소프트맥스','수학','점수를 지수함수로 키워 합이 1이 되게 나누는 계산.'],
 '무게':['무게 (가중치)','모델','주제 숫자에 곱하는 모델의 숫자. 미세조정은 이것을 고친다.']},
 CORE:['미세조정','바탕 모델','퓨샷','프롬프트','버릇 점수','코사인 유사도','손실','학습률','에포크','과적합','LoRA','계수','소프트맥스','무게'],
 QUIZ:{
 lv1:[{q:'규칙 포함 예시 8개를 붙여도 「보증 기간 안에 배터리가 부풀었어요」를 틀린 까닭은?',o:['예시가 너무 많아서','바탕 모델의 버릇 점수(기술 지원 쪽)가 예시 점수보다 커서','질문이 너무 짧아서'],a:1,why:'배터리·안전 주제에 대한 원래 버릇이 커서, 닮은 예시 점수를 더해도 뒤집히지 않았습니다.',hint:'실험 ①의 연한 막대(버릇)와 진한 막대(예시)를 비교해 보세요.'},
  {q:'예시를 8개에서 24개로 늘렸을 때 확실히 늘어난 것은?',o:['맞힌 수','질문마다 보내는 글자 수','바탕 모델의 무게'],a:1,why:'맞힌 수는 11건 그대로이고, 평균 글자 수는 432자에서 963자로 늘었습니다. 무게는 프롬프트로 바뀌지 않습니다.',hint:'실험 ①의 평균 글자 상자를 보세요.'}],
 lv2:[{q:'정답 양식에 준 확률 p가 0.26에서 0.72로 오르면 손실 −ln p는?',o:['커진다','작아진다','그대로다'],a:1,why:'−ln 0.26 ≈ 1.34, −ln 0.72 ≈ 0.33. p가 1에 가까울수록 손실은 0에 가까워집니다.',hint:'로그함수 그래프에서 p가 1에 다가갈 때를 떠올려 보세요.'},
  {q:'w ← w − η × (p − y) × x 에서 정답(y = 1)인데 p가 작을 때 w는?',o:['커진다','작아진다','바뀌지 않는다'],a:0,why:'(p − 1)이 음수라 빼면 더해집니다. 정답 쪽 무게가 커집니다.',hint:'p − 1의 부호를 보세요.'}],
 lv3:[{q:'학습 손실은 계속 줄어드는데 시험 손실이 다시 오르기 시작했다. 무엇의 신호인가?',o:['학습률이 너무 작다','학습용 기록에만 맞춰지고 있다 (과적합)','시험 문의가 너무 쉽다'],a:1,why:'처음 보는 문의의 성적이 나빠지는 것은 학습 기록의 특이한 점(여기선 기록 실수)까지 외우고 있다는 뜻입니다.',hint:'실험 ③에서 η = 20, 에포크를 끝까지 밀어 보세요.'},
  {q:'이 페이지에서 시험 성적을 가장 크게 올린 일은?',o:['에포크를 300으로 늘리기','학습률을 200으로 올리기','잘못 적힌 기록 두 건 고치기'],a:2,why:'기록을 고치자 η = 20에서 끝까지 12건을 모두 맞혔습니다. 학습률 200은 오히려 망가뜨렸습니다.',hint:'모아의 기록 정리 버튼을 눌러 보세요.'}],
 lv4:[{q:'d = 4096, r = 8일 때 LoRA가 배우는 숫자는 표 한 장당 몇 개인가?',o:['4,096개','65,536개','16,777,216개'],a:1,why:'r × (d + d) = 8 × 8192 = 65,536개. 전체(16,777,216개)의 약 0.39%입니다.',hint:'가는 띠 두 개의 넓이를 더하세요.'},
  {q:'이 페이지의 작은 모형(4 × 8)에서 r = 4 LoRA의 숫자 개수는 전체 미세조정과 비교해?',o:['더 적다','같다','더 많다'],a:2,why:'4 × (4 + 8) = 48개로 전체 32개보다 많습니다. LoRA는 표가 클 때 아낍니다.',hint:'r × (줄 수 + 열 수)를 계산하세요.'}]},
 INIT:function(){r1();r2();r3();r4();r4b()}};
