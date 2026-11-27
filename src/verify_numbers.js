/* 페이지 본문에 적은 숫자를 다시 계산해 맞는지 확인 (node verify_numbers.js) */
var ok=0,bad=0;function eq(name,got,want,tol){var g=typeof got==='number'?got:got,p=(typeof want==='number')?Math.abs(got-want)<=(tol||0):got===want;if(p)ok++;else{bad++;console.log('✗',name,'got',got,'want',want)}}
var A2=require('./A2/core.js'),D2=require('./A2/data.json'),M2=A2.make(D2);
function acc(s){return M2.acc(function(m){return M2.fewshot(m,s).pred},M2.TE)}
function ch(s){var a=M2.TE.map(function(m){return M2.chars(M2.promptText(m,s))});return a.reduce(function(x,y){return x+y},0)/a.length}
eq('A2 zero',acc('zero'),9);eq('A2 plain8',acc('plain8'),9);eq('A2 rule8',acc('rule8'),11);eq('A2 all24',acc('all24'),11);eq('A2 rule8 chars',Math.round(ch('rule8')),432);eq('A2 all24 chars',Math.round(ch('all24')),963);
var r=M2.fewshot(M2.ALL.t02,'rule8');eq('A2 t02 base S',+r.base[1].toFixed(2),1.38);eq('A2 t02 base R',+r.base[0].toFixed(2),0.90);eq('A2 t02 bonus R',+r.bonus[0].toFixed(2),4.96);eq('A2 t02 bonus S',+r.bonus[1].toFixed(2),3.83);eq('A2 t02 tot R',+r.total[0].toFixed(2),5.86);eq('A2 t02 tot S',+r.total[1].toFixed(2),5.21);
eq('A2 t03 fail rule8',M2.fewshot(M2.ALL.t03,'rule8').pred,'T');
var p0=A2.softmax(M2.logits(D2.W0,M2.ALL.R4.v))[0];eq('A2 R4 p0',+p0.toFixed(2),0.26);eq('A2 R4 loss0',+(-Math.log(p0)).toFixed(2),1.34);
var F1=M2.train({lr:2,epochs:1});eq('A2 R4 p after1',+A2.softmax(M2.logits(F1.W,M2.ALL.R4.v))[0].toFixed(2),0.29);
var F60=M2.train({lr:2,epochs:60});eq('A2 R4 p after60',+A2.softmax(M2.logits(F60.W,M2.ALL.R4.v))[0].toFixed(2),0.72);eq('A2 R4 loss60',+(-Math.log(A2.softmax(M2.logits(F60.W,M2.ALL.R4.v))[0])).toFixed(2),0.32);
eq('A2 avg loss 0',+F60.hist[0].tr.toFixed(2),0.79);eq('A2 avg loss 60',+F60.hist[60].tr.toFixed(2),0.28);eq('A2 test acc 0',F60.hist[0].acc,9);eq('A2 test acc 60',F60.hist[60].acc,11);
eq('A2 2.0+... ',+(2.0-2*(0.263-1)*0.47).toFixed(2),2.69);
var h=function(lr,cl){return M2.train({lr:lr,epochs:300,clean:cl}).hist};var a=h(0.2),b=h(2),c=h(20),d=h(200),cc=h(20,true);
eq('A2 lr.2 ep10',+a[10].te.toFixed(2),0.78);eq('A2 lr2 ep10',+b[10].te.toFixed(2),0.53);eq('A2 lr20 ep10',+c[10].te.toFixed(2),0.19);eq('A2 lr200 ep20 te',+d[20].te.toFixed(3),0.001);eq('A2 lr200 ep20 tr',+d[20].tr.toFixed(2),0.77);
eq('A2 lr200 ep300 te',+d[300].te.toFixed(2),1.18);eq('A2 te0',+d[0].te.toFixed(2),0.82);eq('A2 lr.2 300',+a[300].te.toFixed(2),0.34);eq('A2 lr20 ep10 acc',c[10].acc,12);eq('A2 lr20 ep60 acc',c[60].acc,11);eq('A2 lr20 ep53 acc',c[53].acc,12);eq('A2 lr20 ep54 acc',c[54].acc,11);
eq('A2 clean 300 acc',cc[300].acc,12);eq('A2 clean 300 te',+cc[300].te.toFixed(3),0.009);eq('A2 lr200 300 acc',d[300].acc,9);
var L1=M2.train({lr:2,epochs:60,mode:'lora',r:1}),L2=M2.train({lr:2,epochs:60,mode:'lora',r:2}),L4=M2.train({lr:2,epochs:60,mode:'lora',r:4});
eq('A2 r1 params',L1.params,12);eq('A2 r1 acc',L1.hist[60].acc,10);eq('A2 r2 acc',L2.hist[60].acc,12);eq('A2 r2 params',L2.params,24);eq('A2 r4 params',L4.params,48);eq('A2 full acc60',F60.hist[60].acc,11);
eq('A2 lora 4096',M2.loraCount(4096,4096,8).lora,65536);eq('A2 full 4096',M2.loraCount(4096,4096,8).full,16777216);
var RT=D2.ruletest.concat([M2.ALL.t11]);eq('A2 R3 prompt',M2.acc(function(m){return M2.fewshot(m,'rule8',true).pred},RT,true),3);eq('A2 R3 ft',M2.acc(L2.pred,RT,true),0);
eq('A2 ft chars',Math.round(M2.TE.map(function(m){return M2.chars(M2.ftText(m))}).reduce(function(x,y){return x+y},0)/12),26);
eq('A2 e^-.79',+Math.exp(-0.787).toFixed(2),0.46,0.011);eq('A2 e^-.28',+Math.exp(-0.283).toFixed(2),0.75);
/* A3 */
var A3=require('./A3/core.js'),D3=require('./A3/data.json'),M3=A3.make(D3);
var S={};M3.S.forEach(function(s){S[s]=M3.scores(s)});
eq('A3 fly EM',S.fly.em,6);eq('A3 moa EM',S.moa.em,0);eq('A3 fly F1',+S.fly.f1.toFixed(2),0.78);eq('A3 moa F1',+S.moa.f1.toFixed(2),0.65);eq('A3 sia F1',+S.sia.f1.toFixed(2),0.41);eq('A3 robo F1',+S.robo.f1.toFixed(2),0.22);
eq('A3 robo correct',S.robo.correct,6);eq('A3 moa correct',S.moa.correct,9);eq('A3 fly correct',S.fly.correct,8);
eq('A3 sia Q10 F1',A3.f1(D3.ans.sia[9].en,D3.q[9].ref).f,0.5);eq('A3 moa Q10 F1',A3.f1(D3.ans.moa[9].en,D3.q[9].ref).f,0);
eq('A3 moa Q2 F1',+A3.f1(D3.ans.moa[1].en,D3.q[1].ref).f.toFixed(2),0.67);
var hw=M3.humanWins().w;eq('A3 hw moa',hw.moa,22);eq('A3 hw fly',hw.fly,18);eq('A3 hw robo',hw.robo,18);eq('A3 hw sia',hw.sia,2);
var ef=M3.elo('fwd').R,er=M3.elo('rev').R;eq('A3 elo f moa',Math.round(ef.moa),1090);eq('A3 elo f robo',Math.round(ef.robo),1083);eq('A3 elo f fly',Math.round(ef.fly),1044);eq('A3 elo r moa',Math.round(er.moa),1135);eq('A3 elo r fly',Math.round(er.fly),1063);eq('A3 elo r robo',Math.round(er.robo),1010);
var ag=M3.agree('one');eq('A3 agree one',ag.ok,50);var j1=M3.judgeWins('one'),j2=M3.judgeWins('swap'),j3=M3.judgeWins('swaplen');
eq('A3 j1 robo',j1.robo,23);eq('A3 j2 robo',j2.robo,23);eq('A3 j3 moa',j3.moa,21.5);eq('A3 j3 fly',j3.fly,19);eq('A3 j3 robo',j3.robo,15.5);eq('A3 hold swaplen',M3.agree('swaplen').hold,24);
var eqm=D3.human.filter(function(m){return D3.ans[m.a][m.q].q===D3.ans[m.b][m.q].q});eq('A3 eq n',eqm.length,24);eq('A3 eq first',eqm.filter(function(m){return M3.judge(m,'one')===m.a}).length,16);
eq('A3 Q1 robo first',+M3.judgeOnce(0,'robo','fly').s.toFixed(2),0.92);eq('A3 Q1 fly first',+M3.judgeOnce(0,'fly','robo').s.toFixed(2),1.08);
eq('A3 ci .9 10',+A3.ci(0.9,10).half.toFixed(2),0.19);eq('A3 ci .9 100',+A3.ci(0.9,100).half.toFixed(2),0.06);eq('A3 n needed',A3.nNeeded(0.9,0.8,0.1),97);
eq('A3 elo ex',+(32*(1-1/(1+Math.pow(10,-100/400)))).toFixed(1),11.5);
var h2={};D3.human.forEach(function(m){if(m.a==='fly'&&m.b==='robo'){var w=M3.maj(m);h2[w]=(h2[w]||0)+1}});eq('A3 h2h fly',h2.fly,5);
/* A4 */
var A4=require('./A4/core.js'),D4=require('./A4/data.json'),M4=A4.make(D4);
eq('A4 0.92^10',+A4.chain(0.92,10,0).toFixed(2),0.43);eq('A4 with check',+A4.chain(0.92,10,0.9).toFixed(2),0.87);eq('A4 s',+A4.stepS(0.92,0.9).toFixed(3),0.986);eq('A4 .95^10',+A4.chain(0.95,10,0).toFixed(2),0.60);
eq('A4 budget4',M4.budget(4).filter(function(x){return x.ok}).length,4);eq('A4 budget6',M4.budget(6).filter(function(x){return x.ok}).length,6);
var F={plan:true,exec:true,check:true,memory:true,approve:true};eq('A4 full',+M4.raid(F).exp.toFixed(2),5.64);eq('A4 -check',+M4.raid(Object.assign({},F,{check:false})).exp.toFixed(2),4.13);
eq('A4 both risky',M4.raid(Object.assign({},F,{plan:false,approve:false})).risky,1);eq('A4 guards harm',M4.guards({sep:false,least:false,approve:false}).harm,true);eq('A4 guards one',M4.guards({sep:false,least:false,approve:true}).harm,false);
eq('A4 0.006',+(0.3*0.2*0.1).toFixed(3),0.006);eq('A4 T2 days',D4.calc.T2,103);eq('A4 T4 days',D4.calc.T4,179);eq('A4 T5',D4.calc.T5,7);eq('A4 T6',D4.calc.T6,6);
console.log('검산',ok,'통과',bad,'불일치');process.exit(bad?1:0);
