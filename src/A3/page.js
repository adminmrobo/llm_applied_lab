/* ===== A3 평가 연구실 — 페이지 실험 ===== */
var M=A3.make(DATA),SN={sia:'시아',fly:'초파리',robo:'주판봇',moa:'모아'},SC={sia:'#4b5563',fly:'#c93030',robo:'#0b7a86',moa:'#a2561c'};
var STAMP='설명용 예시 · 실제 데이터 아님',QL=['틀림','일부 맞음','맞음'];
var EXL='ko';function exa(a){return EXL==='en'?a.en:a.ko}var exHooks=[];
$$('[data-exlang]').forEach(function(b){b.addEventListener('click',function(){EXL=b.dataset.exlang;$$('[data-exlang]').forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});exHooks.forEach(function(f){f()})})});

/* ---------- ① ---------- */
var S1={sys:'moa',q:1};
function chipsHTML(list,hit){var h={};(hit||[]).forEach(function(w){h[w]=(h[w]||0)+1});return list.map(function(w){var on=h[w]>0;if(on)h[w]--;return '<span class="chip '+(on?'hit':'')+'">'+esc(w)+'</span>'}).join('')}
function r1(){var q=DATA.q[S1.q],a=DATA.ans[S1.sys][S1.q],f=A3.f1(a.en,q.ref),e=A3.em(a.en,q.ref);
  $('#q1line').innerHTML='<b>'+q.id+'</b> '+esc(EXL==='en'?q.en:q.ko)+'<small>'+SN[S1.sys]+' 선수 · 사람이 본 질: '+QL[a.q]+'</small>';
  $('#q1ref').textContent=q.ref;$('#q1ans').textContent=exa(a);
  $('#q1rtok').innerHTML=chipsHTML(f.o.R,f.o.hit);$('#q1atok').innerHTML=chipsHTML(f.o.A,f.o.hit);
  kpis($('#k1'),[[e?'g':'r',String(e),'EM (똑같으면 1)'],['m',fmt(f.p),'정밀도 P = '+f.o.c+' ÷ '+f.o.na],['a',fmt(f.r),'재현율 R = '+f.o.c+' ÷ '+f.o.nr],[a.q===2?'g':'r',fmt(f.f),'F1 · 사람이 본 질: '+QL[a.q]]]);
  var rows='<tr><th>선수</th><th>EM 합계</th><th>F1 평균</th><th>사람이 맞다고 본 답</th><th>평균 낱말 수</th></tr>';
  M.S.forEach(function(s){var c=M.scores(s);rows+='<tr><td style="color:'+SC[s]+'">'+SN[s]+'</td><td>'+c.em+'/10</td><td>'+fmt(c.f1)+'</td><td>'+c.correct+'/10</td><td>'+c.words.toFixed(1)+'</td></tr>'});$('#t1').innerHTML=rows;
  var I=[];if(a.q<2&&f.f>=0.4)I.push('<p class="r">사람이 보기엔 '+QL[a.q]+'인데 F1은 '+fmt(f.f)+'입니다. 겹친 낱말('+esc(f.o.hit.join(', '))+')만 보고 점수를 줬습니다.</p>');
  if(a.q===2&&!e)I.push('<p class="a">맞는 답인데 EM은 0입니다. 글자가 정답 문장과 똑같지 않기 때문입니다.</p>');
  if(a.q===2&&f.f<0.4)I.push('<p class="a">맞는 답인데 F1이 '+fmt(f.f)+'로 낮습니다. 덧붙인 낱말이 많아 정밀도가 깎였습니다.</p>');
  if(!I.length)I.push('<p class="g">글자 채점과 사람의 판단이 크게 다르지 않은 경우입니다.</p>');$('#ins1').innerHTML=I.join('')}
btnGroup($('#g1sys'),M.S,S1.sys,function(s){return SN[s]},function(v){S1.sys=v;r1()});$('#g1sys').insertAdjacentHTML('afterbegin','<span class="glabel">선수</span>');
btnGroup($('#g1q'),DATA.q.map(function(q,i){return i}),S1.q,function(i){return DATA.q[i].id},function(v){S1.q=+v;r1()});$('#g1q').insertAdjacentHTML('afterbegin','<span class="glabel">문항</span>');
exHooks.push(r1);

/* ---------- ② ---------- */
var S2={i:0,ord:'fwd'};
function seq2(){var ms=DATA.human.slice();return S2.ord==='rev'?ms.reverse():ms}
function r2(){var ms=seq2(),E=M.elo(S2.ord),n=S2.i,cur=ms[Math.max(0,n-1)]||ms[0];
  $('#n2').textContent=n+' / 60경기';
  if(n===0){$('#q2line').innerHTML='<b>아직 경기 전</b><small>「다음 경기」를 누르면 한 경기씩 엽니다.</small>';$('#q2a').textContent='';$('#q2b').textContent='';$('#q2maj').textContent='';$('#xvotes').innerHTML=''}
  else{var q=DATA.q[cur.q],w=M.maj(cur);$('#q2line').innerHTML='<b>'+q.id+'</b> '+esc(EXL==='en'?q.en:q.ko)+'<small>'+n+'번째 경기 · 누가 쓴 답인지는 결과 뒤에 공개</small>';
    $('#q2a').textContent=exa(DATA.ans[cur.a][cur.q]);$('#q2b').textContent=exa(DATA.ans[cur.b][cur.q]);
    $('#q2maj').innerHTML='다수결: <b>답 '+(w===cur.a?'A':'B')+'</b> ('+cur.votes.filter(function(v){return v===w}).length+' 대 '+cur.votes.filter(function(v){return v!==w}).length+') · 공개: 답 A = '+SN[cur.a]+', 답 B = '+SN[cur.b];
    $('#xvotes').innerHTML=['x1','x2','x3'].map(function(x,k){return '<figure><img data-who="'+x+'" data-mood="hint" alt="미공개 '+x.toUpperCase()+' 실루엣" src="'+Cast.src(x,'hint')+'"><figcaption>'+x.toUpperCase()+' → 답 '+(cur.votes[k]===cur.a?'A':'B')+' ('+(k===1?'끄덕':'톡')+')</figcaption></figure>'}).join('')}
  var pts={};M.S.forEach(function(s){pts[s]=[1000].concat(E.log.slice(0,n).map(function(r){return r[s]}))});
  lineChart($('#c2'),230,M.S.map(function(s){return {name:SN[s],col:SC[s],pts:pts[s]}}),{xmax:60,ymin:700,ymax:1200,yd:0,xlab:'경기',stamp:STAMP});
  var R={};M.S.forEach(function(s){R[s]=pts[s][pts[s].length-1]});var wins={};M.S.forEach(function(s){wins[s]=0});ms.slice(0,n).forEach(function(m){wins[M.maj(m)]++});
  var rk=M.S.slice().sort(function(a,b){return R[b]-R[a]});
  kpis($('#k2'),rk.map(function(s,i){return [['g','m','a','r'][i],Math.round(R[s])+'점',(i+1)+'위 '+SN[s]+' · '+wins[s]+'승']}));
  $('#ins2').innerHTML=n<60?'<p>경기가 쌓일수록 점수가 벌어집니다. 「끝까지」를 누르면 60경기를 모두 셉니다.</p>':
    '<p class="'+(S2.ord==='fwd'?'a':'m')+'">'+(S2.ord==='fwd'?'앞에서부터':'뒤에서부터')+' 세면 2위는 '+SN[rk[1]]+'('+Math.round(R[rk[1]])+'점)입니다. 승수는 초파리·주판봇 모두 18승으로 같습니다. 세는 순서를 바꿔 보세요.</p>'}
$('#b2next').addEventListener('click',function(){S2.i=Math.min(60,S2.i+1);r2()});$('#b2all').addEventListener('click',function(){S2.i=60;r2()});$('#b2reset').addEventListener('click',function(){S2.i=0;r2()});
btnGroup($('#g2ord'),['fwd','rev'],S2.ord,function(v){return v==='fwd'?'앞에서부터':'뒤에서부터'},function(v){S2.ord=v;r2()});$('#g2ord').insertAdjacentHTML('afterbegin','<span class="glabel">세는 순서</span>');
addMod($('#c2'),function(dt){if(dt===0)r2()});exHooks.push(r2);

/* ---------- ③ ---------- */
var S3={mode:'one',mi:0,first:'a'},MODE3={one:'한 번 보기',swap:'순서 바꿔 두 번',swaplen:'두 번 + 길이 보정'};
var EX3=[{q:0,a:'fly',b:'robo',lab:'Q1 초파리·주판봇'},{q:2,a:'fly',b:'robo',lab:'Q3 초파리·주판봇'},{q:3,a:'fly',b:'moa',lab:'Q4 초파리·모아'},{q:9,a:'robo',b:'moa',lab:'Q10 주판봇·모아'}];
function r3(){var hw=M.humanWins().w,jw=M.judgeWins(S3.mode),ag=M.agree(S3.mode);
  var c=$('#c3'),H=250,W=fit(c,H),x=c.getContext('2d');x.clearRect(0,0,W,H);var L=W<500?56:80,R=W<500?96:40,rowH=52,mx=30;x.font=(W<500?'12px ':'13px ')+FONT;
  M.S.forEach(function(s,i){var y=34+i*rowH,bw=(W-L-R)/mx;x.fillStyle='#16212b';x.textAlign='right';x.fillText(SN[s],L-8,y+18);x.textAlign='left';
    x.fillStyle=SC[s];x.globalAlpha=.3;x.fillRect(L,y+24,hw[s]*bw,12);x.globalAlpha=1;x.fillRect(L,y,jw[s]*bw,20);
    x.fillStyle='#16212b';x.fillText('LLM 심판 '+jw[s]+'승',L+jw[s]*bw+6,y+15);x.fillStyle='#5b6874';x.fillText('사람 '+hw[s]+'승',L+hw[s]*bw+6,y+35)});
  stamp(x,W,STAMP);
  var eq=DATA.human.filter(function(m){return DATA.ans[m.a][m.q].q===DATA.ans[m.b][m.q].q}),fp=eq.filter(function(m){return M.judge(m,'one')===m.a}).length;
  kpis($('#k3'),[['g',ag.ok+'/60','사람 다수결과 같은 판정'],['r',ag.no+'경기','다른 판정'],['a',ag.hold+'경기','판정 보류 (두 번이 엇갈림)'],['m',S3.mode==='one'?Math.round(fp/eq.length*100)+'%':'—','질이 같은 '+eq.length+'경기에서 앞 답을 고른 비율']]);
  var ex=EX3[S3.mi],X=S3.first==='a'?ex.a:ex.b,Y=S3.first==='a'?ex.b:ex.a,J=DATA.judge,ax=DATA.ans[X][ex.q],ay=DATA.ans[Y][ex.q],wx=A3.words(ax.en),wy=A3.words(ay.en),
    lenOn=S3.mode!=='swaplen',sc=J.qual*(ax.q-ay.q)+J.pos+(lenOn?J.len*(wx-wy):0);
  $('#eq3').innerHTML='앞: '+SN[X]+' ('+QL[ax.q]+', '+wx+'낱말) · 뒤: '+SN[Y]+' ('+QL[ay.q]+', '+wy+'낱말) → 2 × (<b>'+ax.q+'</b> − <b>'+ay.q+'</b>) + <i>1.0</i>'+(lenOn?' + <em>0.12 × ('+wx+' − '+wy+')</em>':' <span class="note">(길이 보정: 길이 덤 뺌)</span>')+' = <b>'+(sc>=0?'+':'')+fmt(sc)+'</b> → '+(sc>0?SN[X]:SN[Y])+' 고름';
  var I=[];if(S3.mode==='one')I.push('<p class="r">한 번만 보면 주판봇이 '+jw.robo+'승으로 1위입니다. 사람 심사에서는 '+hw.robo+'승이었습니다.</p>');
  if(S3.mode==='swap')I.push('<p class="a">앞자리 덤은 걸러졌지만 주판봇은 여전히 '+jw.robo+'승입니다. 긴 답 덤이 남아 있습니다.</p>');
  if(S3.mode==='swaplen')I.push('<p class="g">길이 보정까지 하면 1위가 모아('+jw.moa+'승)로, 사람 심사와 같아집니다. 판정 보류는 반 승씩 나눴습니다.</p>');
  $('#ins3').innerHTML=I.join('')}
btnGroup($('#g3mode'),Object.keys(MODE3),S3.mode,function(v){return MODE3[v]},function(v){S3.mode=v;r3()});$('#g3mode').insertAdjacentHTML('afterbegin','<span class="glabel">심판 방식</span>');
btnGroup($('#g3match'),EX3.map(function(e,i){return i}),S3.mi,function(i){return EX3[i].lab},function(v){S3.mi=+v;r3()});$('#g3match').insertAdjacentHTML('afterbegin','<span class="glabel">경기</span>');
btnGroup($('#g3first'),['a','b'],S3.first,function(v){return v==='a'?'왼쪽 선수 먼저':'오른쪽 선수 먼저'},function(v){S3.first=v;r3()});$('#g3first').insertAdjacentHTML('afterbegin','<span class="glabel">앞에 놓을 답</span>');
addMod($('#c3'),function(dt){if(dt===0)r3()});

/* ---------- ④ ---------- */
var S4={n:10};
function r4(){var c=$('#c4'),H=220,W=fit(c,H),x=c.getContext('2d');x.clearRect(0,0,W,H);var L=80,R=30,pw=W-L-R,rowH=44,P={};
  M.S.forEach(function(s){P[s]=M.scores(s).correct/10});
  x.strokeStyle='#d5dbe2';x.font='11px '+FONT;x.fillStyle='#5b6874';for(var g=0;g<=10;g+=2){var gx=L+pw*g/10;x.beginPath();x.moveTo(gx,6);x.lineTo(gx,H-24);x.stroke();x.fillText((g/10).toFixed(1),gx-8,H-8)}
  M.S.forEach(function(s,i){var y=14+i*rowH,ci=A3.ci(P[s],S4.n),lo=Math.max(0,ci.lo),hi=Math.min(1,ci.hi);x.fillStyle=SC[s];x.globalAlpha=.25;x.fillRect(L+pw*lo,y,pw*(hi-lo),20);x.globalAlpha=1;
    x.fillRect(L+pw*P[s]-2,y-2,4,24);x.fillStyle='#16212b';x.font='13px '+FONT;x.textAlign='right';x.fillText(SN[s],L-8,y+15);x.textAlign='left';x.font='11px '+FONT;x.fillText(fmt(P[s])+' ± '+fmt(ci.half),Math.min(L+pw*hi+6,W-70),y+15)});
  stamp(x,W,'정답률은 그대로라고 가정');
  var a=A3.ci(P.moa,S4.n),b=A3.ci(P.fly,S4.n),ov=b.hi>a.lo;
  kpis($('#k4'),[['m','± '+fmt(a.half),'모아 폭 (0.9)'],['r','± '+fmt(b.half),'초파리 폭 (0.8)'],[ov?'r':'g',ov?'겹침':'안 겹침','모아와 초파리'],['a',A3.nNeeded(P.moa,P.fly,P.moa-P.fly)+'문항','0.9와 0.8을 95%로 가르려면 (각각)']]);
  $('#ins4').innerHTML=ov?'<p class="r">n = '+S4.n+'이면 두 막대가 겹칩니다. 모아가 초파리보다 낫다고 단정할 수 없습니다.</p>':'<p class="g">n = '+S4.n+'이면 막대가 떨어집니다. 정답률이 그대로라면 순서를 꽤 믿을 수 있습니다.</p>'}
btnGroup($('#g4n'),[10,30,100,300,1000],S4.n,null,function(v){S4.n=+v;r4()});$('#g4n').insertAdjacentHTML('afterbegin','<span class="glabel">문항 수 n</span>');
addMod($('#c4'),function(dt){if(dt===0)r4()});

/* ---------- 개인전 리그 ---------- */
(function(){var root=$('#duelBox'),shown=false;
  $$('[data-guess]',root).forEach(function(b){b.addEventListener('click',function(){$$('[data-guess]',root).forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});$('#guessNote').textContent='고른 것만 기억합니다. 저장하지 않습니다.'})});
  var IMG={};M.S.forEach(function(s){IMG[s]=$('img[data-who='+s+']',root)});
  $('.reveal',root).addEventListener('click',function(){if(shown){reset();return}
    var hw=M.humanWins().w,ef=M.elo('fwd').R,er=M.elo('rev').R,j1=M.judgeWins('one'),j3=M.judgeWins('swaplen');
    var rk=M.S.slice().sort(function(a,b){return hw[b]-hw[a]||(b<a?-1:1)});
    var rows='<tr><th>순위 (사람 승수)</th><th>사람 승수</th><th>EM</th><th>F1</th><th>엘로 (앞→뒤 / 뒤→앞)</th><th>LLM 심판 한 번</th><th>LLM 심판 보정</th><th>맞다고 본 답 (±95%)</th></tr>',place=0,prev=null;
    rk.forEach(function(s,i){if(hw[s]!==prev){place=i+1;prev=hw[s]}var c=M.scores(s),ci=A3.ci(c.correct/10,10);
      rows+='<tr><td><img src="'+Cast.src(s,'smile')+'" alt="">'+place+'위 '+SN[s]+'</td><td>'+hw[s]+'승</td><td>'+c.em+'</td><td>'+fmt(c.f1)+'</td><td>'+Math.round(ef[s])+' / '+Math.round(er[s])+'</td><td>'+j1[s]+'</td><td>'+j3[s]+'</td><td>'+c.correct+'/10 (± '+fmt(ci.half)+')</td></tr>'});
    $('#lgTable').innerHTML=rows;
    var top=rk[0],tie=hw[rk[1]]===hw[rk[2]];
    Cast.set(IMG.moa,'moa',top==='moa'?'sparkle':'smile');Cast.set(IMG.fly,'fly','coffee');Cast.set(IMG.robo,'robo','meh');Cast.set(IMG.sia,'sia','proud');
    Cast.set($('.asst img',root),'asst','report');
    $('.asst p',root).textContent='사람 승수는 '+M.S.slice().sort(function(a,b){return hw[b]-hw[a]}).map(function(s){return SN[s]+' '+hw[s]+'승'}).join(', ')+'이에요. 초파리와 주판봇은 맞대결도 5 대 5예요. LLM 심판을 한 번만 쓰면 주판봇이 '+j1.robo+'승으로 가장 많았어요.';
    Cast.set($('.verdict img',root),'doc','judge');
    $('.verdict p',root).textContent='1위 '+SN[top]+'. '+(tie?SN[rk[1]]+'와 '+SN[rk[2]]+'는 승수·맞대결이 같고 엘로는 세는 순서에 따라 뒤집히니 공동 2위다. ':'')+'다만 10문항의 오차 막대는 서로 겹친다. 이 순위는 「10문항 기준」이라고 적어 둔다.';
    var g=$('[data-guess][aria-pressed=true]',root);
    $('#duelScore').innerHTML='<span>1위: '+SN[top]+'</span>'+(tie?'<span>공동 2위: '+SN[rk[1]]+' · '+SN[rk[2]]+'</span>':'')+(g?'<span>내 예상: '+(g.dataset.guess===top?'맞음':'다름')+'</span>':'');
    root.classList.add('open');shown=true;this.textContent='순위표 닫기'});
  function reset(){Cast.set(IMG.moa,'moa','cheer');Cast.set(IMG.fly,'fly','point');Cast.set(IMG.robo,'robo','coin');Cast.set(IMG.sia,'sia','smile');Cast.set($('.asst img',root),'asst','firm');Cast.set($('.verdict img',root),'doc','front');root.classList.remove('open');shown=false;$('.reveal',root).textContent='순위표 열기'}
})();

var PAGE={SLUG:'eval',CITEID:'ahn2026eval',
 PATH:['lab:metric/em-f1','lab:method/blind-pairwise','lab:method/llm-judge','lab:concept/confidence-interval'],
 GL:{
 'EM':['정확히 일치 (EM)','지표','정리한 뒤 글자가 정답과 똑같으면 1, 아니면 0.'],
 'F1':['F1','지표','겹친 낱말로 매기는 부분 점수. 정밀도와 재현율의 조화평균.'],
 '정밀도':['정밀도 (precision)','지표','답의 낱말 중 정답에도 있는 비율.'],
 '재현율':['재현율 (recall)','지표','정답의 낱말 중 답에 들어간 비율.'],
 '블라인드':['블라인드 심사','방법','누가 만든 답인지 가리고 심사하는 것.'],
 '다수결':['다수결','방법','심사위원 셋 중 두 명 이상이 고른 쪽을 그 경기의 승자로 정하기.'],
 '엘로 점수':['엘로 점수 (Elo)','지표','맞대결 승패와 기대 승률의 차이로 점수를 고쳐 가는 방식.'],
 '기대 승률':['기대 승률 E','수학','두 점수 차이로 계산한 이길 확률. 1 ÷ (1 + 10^(차이÷400)).'],
 'LLM 심판':['LLM 심판 (LLM-as-a-judge)','방법','다른 LLM에게 두 답 중 나은 쪽을 고르게 하는 채점.'],
 '위치 편향':['위치 편향','현상','앞(또는 뒤)에 놓인 답을 더 좋게 보는 버릇.'],
 '길이 편향':['길이 편향','현상','긴 답을 더 좋게 보는 버릇.'],
 '신뢰구간':['95% 신뢰구간','통계','점수 ± 1.96 × 표준오차. 시험을 다시 내면 대략 이 안에 든다는 폭.'],
 '표준오차':['표준오차','통계','정답률 같은 평균값이 다시 잴 때 흔들리는 크기. 표준편차와 다르다.'],
 '오염':['시험지 유출 (오염)','현상','학습 데이터에 시험 문항이 섞여 점수가 부풀려지는 일.']},
 CORE:['EM','F1','정밀도','재현율','블라인드','다수결','엘로 점수','기대 승률','LLM 심판','위치 편향','길이 편향','신뢰구간','표준오차','오염'],
 QUIZ:{
 lv1:[{q:'정답 「30 days」, 답 「14 days」(틀린 답)의 F1은? (관사·구두점 제외)',o:['0','0.5','1'],a:1,why:'겹친 낱말은 days 하나. P = 1/2, R = 1/2, F1 = 0.5. 틀린 답도 부분 점수를 받습니다.',hint:'두 답의 낱말을 집합으로 놓고 겹치는 것을 세어 보세요.'},
  {q:'모아 답변기의 EM이 0점인데 사람은 10개 중 9개를 맞다고 봤다. 가장 그럴듯한 까닭은?',o:['모아의 답이 대부분 틀려서','출처 번호와 문장 꼴 때문에 글자가 정답과 똑같지 않아서','정답 문장이 틀려서'],a:1,why:'EM은 글자가 똑같아야 1점입니다. 뜻이 맞아도 표현이 다르면 0점입니다.',hint:'실험 ①에서 모아의 답 낱말과 정답 낱말을 비교하세요.'}],
 lv2:[{q:'두 선수가 모두 1000점일 때 한 선수가 이기면 엘로 점수는? (K = 32)',o:['1032점','1016점','1000점'],a:1,why:'기대 승률 0.5, 1000 + 32 × (1 − 0.5) = 1016.',hint:'K × (결과 − 기대 승률)을 더합니다.'},
  {q:'같은 60경기를 뒤에서부터 세었더니 2위가 바뀌었다. 무엇을 뜻하나?',o:['심사위원이 틀렸다','엘로 점수는 경기 순서에 영향을 받는다','1위도 믿을 수 없다'],a:1,why:'엘로는 최근 경기를 무겁게 칩니다. 이 페이지에서 1위(모아)는 순서와 상관없이 같았습니다.',hint:'실험 ②에서 세는 순서를 바꿔 보세요.'}],
 lv3:[{q:'LLM 심판과 사람의 경기별 일치율이 83%인데 1위가 다르게 나왔다. 왜 가능한가?',o:['일치율 계산이 틀려서','어긋난 경기들이 한 선수(긴 답) 쪽으로 쏠려서','사람 심사가 틀려서'],a:1,why:'어긋난 17%가 특정 선수에게 몰리면 승수 순위가 바뀝니다.',hint:'실험 ③의 진한 막대와 연한 막대를 비교하세요.'},
  {q:'순서를 바꿔 두 번 묻는 방법으로 걸러지는 편향은?',o:['위치 편향','길이 편향','둘 다'],a:0,why:'앞뒤를 바꾸면 앞자리 덤은 서로 지워지지만, 긴 답 덤은 두 번 모두 같은 쪽에 붙습니다.',hint:'「순서 바꿔 두 번」에서 주판봇의 승수를 보세요.'}],
 lv4:[{q:'정답률 0.9를 10문항으로 쟀을 때 95% 신뢰구간의 폭(±)은 대략?',o:['± 0.02','± 0.19','± 0.5'],a:1,why:'√(0.9 × 0.1 ÷ 10) ≈ 0.095, × 1.96 ≈ 0.19.',hint:'표준오차를 먼저 구하세요.'},
  {q:'문항 수를 4배로 늘리면 신뢰구간의 폭은?',o:['4분의 1','절반','그대로'],a:1,why:'폭은 √n에 반비례합니다. √4 = 2라서 절반이 됩니다.',hint:'식의 분모에 있는 n이 제곱근 안에 있습니다.'}]},
 INIT:function(){r1();r2();r3();r4()}};
