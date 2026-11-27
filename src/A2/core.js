/* A2 core — DOM 없음, node로 검산 가능 */
var A2=(function(){
function rng(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function dot(a,b){var s=0;for(var i=0;i<a.length;i++)s+=a[i]*b[i];return s}
function nrm(a){return Math.sqrt(dot(a,a))}
function cos(a,b){return dot(a,b)/(nrm(a)*nrm(b)||1)}
function softmax(z){var m=Math.max.apply(null,z),e=z.map(function(x){return Math.exp(x-m)}),s=e.reduce(function(a,b){return a+b},0);return e.map(function(x){return x/s})}
function logits(W,x){return W.map(function(r){return dot(r,x)})}
function probs(W,x){return softmax(logits(W,x))}
function argmax(a){var b=0;for(var i=1;i<a.length;i++)if(a[i]>a[b])b=i;return b}
function clone(W){return W.map(function(r){return r.slice()})}
function make(D){
  var C=D.classes,CI={};C.forEach(function(c,i){CI[c]=i});
  var TR=D.train,TE=D.test,ALL={};TR.concat(TE).forEach(function(m){ALL[m.id]=m});
  var SETS={zero:[],plain4:['R1','S1','T1','H1'],plain8:['R1','R2','S1','S2','T1','T2','H1','H2'],rule8:['R1','R4','R5','S1','T1','T3','H1','H3'],all24:TR.map(function(m){return m.id})};
  function label(m,newrule){return newrule&&m.rule&&D.newrule[m.rule]?D.newrule[m.rule]:m.y}
  var GAMMA=D.gamma||3;
  /* 예시 따라 하기 모형: 바탕 모델의 버릇(W0) + 예시와 닮은 정도(반) */
  function fewshot(m,set,newrule){var ids=SETS[set],z=logits(D.W0,m.v),bonus=C.map(function(){return 0}),via=C.map(function(){return null});
    ids.forEach(function(id){var e=ALL[id],s=cos(m.v,e.v),c=CI[label(e,newrule)];if(via[c]===null||s>bonus[c]/GAMMA){bonus[c]=GAMMA*s;via[c]=id}});
    var t=z.map(function(x,i){return x+bonus[i]}),k=argmax(t);return {pred:C[k],via:via[k],base:z,bonus:bonus,total:t}}
  function exLine(e,newrule){return '문의: '+e.ko+' → 양식: '+D.classes_ko[label(e,newrule)]}
  function promptText(m,set,newrule){var ids=SETS[set];return [D.instr].concat(ids.map(function(id){return exLine(ALL[id],newrule)})).concat(['문의: '+m.ko+' → 양식:']).join('\n')}
  function ftText(m){return '문의: '+m.ko+' → 양식:'}
  function chars(s){return Array.from(s).length}
  function acc(fn,data,newrule){var h=0;data.forEach(function(m){if(fn(m)===label(m,newrule))h++});return h}
  function loss(W,data,newrule){var s=0;data.forEach(function(m){var p=probs(W,m.v)[CI[label(m,newrule)]];s+=-Math.log(Math.max(p,1e-12))});return s/data.length}
  function gradW(W,data,newrule){var G=W.map(function(r){return r.map(function(){return 0})});
    data.forEach(function(m){var p=probs(W,m.v),y=CI[label(m,newrule)];for(var c=0;c<C.length;c++){var d=p[c]-(c===y?1:0);for(var j=0;j<m.v.length;j++)G[c][j]+=d*m.v[j]/data.length}});return G}
  /* 학습: mode 'full' 또는 'lora' (r), 처음 무게는 W0 */
  function cleaned(){return TR.map(function(m){return m.fix?Object.assign({},m,{y:m.fix}):m})}
  function train(o){var lr=o.lr,ep=o.epochs,mode=o.mode||'full',r=o.r||1,data=o.data||(o.clean?cleaned():TR),nr=o.newrule;
    var W=clone(D.W0),B=null,A=null,R=rng(7);
    if(mode==='lora'){B=C.map(function(){var a=[];for(var k=0;k<r;k++)a.push(0);return a});A=[];for(var k=0;k<r;k++){var row=[];for(var j=0;j<8;j++)row.push((R()-0.5)*0.4);A.push(row)}}
    function cur(){if(mode!=='lora')return W;return D.W0.map(function(row,c){return row.map(function(w,j){var s=0;for(var k=0;k<r;k++)s+=B[c][k]*A[k][j];return w+s})})}
    var hist=[{ep:0,tr:loss(cur(),data,nr),te:loss(cur(),TE,nr),acc:acc(function(m){return C[argmax(logits(cur(),m.v))]},TE,nr)}];
    for(var e=1;e<=ep;e++){var Wc=cur(),G=gradW(Wc,data,nr);
      if(mode!=='lora'){for(var c=0;c<C.length;c++)for(var j=0;j<8;j++)W[c][j]-=lr*G[c][j]}
      else{var dB=B.map(function(row,c){return row.map(function(_,k){var s=0;for(var j=0;j<8;j++)s+=G[c][j]*A[k][j];return s})});
        var dA=A.map(function(row,k){return row.map(function(_,j){var s=0;for(var c=0;c<C.length;c++)s+=B[c][k]*G[c][j];return s})});
        for(var c2=0;c2<C.length;c2++)for(var k2=0;k2<r;k2++)B[c2][k2]-=lr*dB[c2][k2];
        for(var k3=0;k3<r;k3++)for(var j3=0;j3<8;j3++)A[k3][j3]-=lr*dA[k3][j3]}
      var Wn=cur();hist.push({ep:e,tr:loss(Wn,data,nr),te:loss(Wn,TE,nr),acc:acc(function(m){return C[argmax(logits(Wn,m.v))]},TE,nr)})}
    var Wf=cur();return {W:Wf,hist:hist,params:mode==='lora'?r*(C.length+8):C.length*8,pred:function(m){return C[argmax(logits(Wf,m.v))]}}}
  function loraCount(d,k,r){return {full:d*k,lora:r*(d+k)}}
  return {gradW:gradW,cleaned:cleaned,C:C,CI:CI,TR:TR,TE:TE,ALL:ALL,SETS:SETS,label:label,fewshot:fewshot,promptText:promptText,ftText:ftText,chars:chars,acc:acc,loss:loss,train:train,probs:probs,logits:logits,argmax:argmax,loraCount:loraCount,cos:cos}
}
return {make:make,softmax:softmax}})();
if(typeof module!=='undefined')module.exports=A2;
