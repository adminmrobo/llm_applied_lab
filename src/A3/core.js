/* A3 core — DOM 없음 */
var A3=(function(){
var ART={a:1,an:1,the:1};
function toks(t){return String(t).toLowerCase().replace(/\[[a-z]\d\]/g,' ').replace(/[^a-z0-9% ]/g,' ').split(/\s+/).filter(function(w){return w&&!ART[w]})}
function em(a,r){return toks(a).join(' ')===toks(r).join(' ')?1:0}
function overlap(a,r){var A=toks(a),R=toks(r),cnt={},c=0,hit=[];R.forEach(function(w){cnt[w]=(cnt[w]||0)+1});A.forEach(function(w){if(cnt[w]>0){cnt[w]--;c++;hit.push(w)}});return {c:c,na:A.length,nr:R.length,hit:hit,A:A,R:R}}
function f1(a,r){var o=overlap(a,r);if(!o.c)return {p:0,r:0,f:0,o:o};var p=o.c/o.na,rc=o.c/o.nr;return {p:p,r:rc,f:2*p*rc/(p+rc),o:o}}
function words(t){return toks(t).length}
function make(D){
  var S=D.sys.map(function(s){return s.id}),SI={};S.forEach(function(s,i){SI[s]=i});
  function maj(m){var c={};m.votes.forEach(function(v){c[v]=(c[v]||0)+1});return (c[m.a]||0)>=2?m.a:m.b}
  function humanWins(){var w={},n={};S.forEach(function(s){w[s]=0;n[s]=0});D.human.forEach(function(m){var x=maj(m);w[x]++;n[m.a]++;n[m.b]++});return {w:w,n:n}}
  function elo(order,K){K=K||32;var R={};S.forEach(function(s){R[s]=1000});var log=[];var ms=D.human.slice();if(order==='rev')ms.reverse();
    ms.forEach(function(m){var ea=1/(1+Math.pow(10,(R[m.b]-R[m.a])/400)),sa=maj(m)===m.a?1:0;R[m.a]+=K*(sa-ea);R[m.b]-=K*(sa-ea);log.push(JSON.parse(JSON.stringify(R)))});return {R:R,log:log}}
  function judgeOnce(q,x,y){var J=D.judge,ax=D.ans[x][q],ay=D.ans[y][q],s=J.qual*(ax.q-ay.q)+J.pos+J.len*(words(ax.en)-words(ay.en));return {pick:s>0?x:y,s:s}}
  function judge(m,mode){if(mode==='swap'){var p1=judgeOnce(m.q,m.a,m.b).pick,p2=judgeOnce(m.q,m.b,m.a).pick;return p1===p2?p1:null}
    if(mode==='swaplen'){var J=D.judge,keep=J.len;J.len=0;var r=judge(m,'swap');J.len=keep;return r}
    return judgeOnce(m.q,m.a,m.b).pick}
  function agree(mode){var ok=0,no=0,hold=0,firstPick=0;D.human.forEach(function(m){var j=judge(m,mode),h=maj(m);if(j===null)hold++;else if(j===h)ok++;else no++;if(j===m.a)firstPick++});return {ok:ok,no:no,hold:hold,first:firstPick,n:D.human.length}}
  function judgeWins(mode){var w={};S.forEach(function(s){w[s]=0});D.human.forEach(function(m){var j=judge(m,mode);if(j===null){w[m.a]+=0.5;w[m.b]+=0.5}else w[j]++});return w}
  function scores(s){var e=0,f=0,c=0;D.ans[s].forEach(function(a,i){e+=em(a.en,D.q[i].ref);f+=f1(a.en,D.q[i].ref).f;if(a.q===2)c++});return {em:e,f1:f/10,correct:c,words:D.ans[s].reduce(function(t,a){return t+words(a.en)},0)/10}}
  return {S:S,SI:SI,maj:maj,humanWins:humanWins,elo:elo,judge:judge,judgeOnce:judgeOnce,agree:agree,judgeWins:judgeWins,scores:scores}}
function ci(p,n,z){z=z||1.96;var se=Math.sqrt(p*(1-p)/n);return {se:se,lo:p-z*se,hi:p+z*se,half:z*se}}
function nNeeded(p1,p2,d,z){z=z||1.96;return Math.ceil(z*z*(p1*(1-p1)+p2*(1-p2))/(d*d))}
return {make:make,toks:toks,em:em,f1:f1,overlap:overlap,words:words,ci:ci,nNeeded:nNeeded}})();
if(typeof module!=='undefined')module.exports=A3;
