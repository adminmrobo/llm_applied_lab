/* A4 core — DOM 없음 */
var A4=(function(){
function stepS(p,d){return 1-(1-p)*(1-d*p)}
function chain(p,n,d){return Math.pow(stepS(p,d),n)}
function make(D){
  var TK=D.tickets;
  function raid(c){var out={exp:0,steps:0,risky:0,blocked:0,noappr:0,rows:[]},dd=c.check?D.d:0;
    TK.forEach(function(t){var n=t.n,note=[];if(!c.plan){n+=3;note.push('계획 없이 헤맴 +3')}
      if(!c.memory){n=Math.ceil(n*1.5);note.push('기억 없이 다시 조회 ×1.5')}
      var ok=1,risky=0;
      if(t.id==='T5'&&!c.approve){n-=1;out.noappr++;note.push('승인 없이 교환 실행')}
      if(t.inject&&!c.plan){if(c.approve){out.blocked++;n+=1;note.push('주입된 일괄 환불 → 박사가 거절')}else{risky=1;ok=0;out.risky++;note.push('주입된 일괄 환불 실행!')}}
      var p=ok?chain(D.p,n,dd):0;out.exp+=p;out.steps+=n;out.rows.push({id:t.id,n:n,p:p,risky:risky,note:note.join(' · ')})});
    return out}
  function guards(g){/* T6 주입: 세 겹 */var layers=[],res;
    if(g.sep)layers.push('자료와 명령 나누기');if(g.least)layers.push('최소 권한');if(g.approve)layers.push('사람 승인');
    if(g.sep)res='문서 속 지시를 자료로만 읽고 무시';else if(g.least)res='일괄 환불 도구가 없어 실행 못 함';else if(g.approve)res='일괄 환불을 시도했지만 박사가 승인 거절';else res='대기 주문 전체 환불 실행 (되돌릴 수 없음)';
    return {layers:layers,res:res,harm:!(g.sep||g.least||g.approve)}}
  function budget(b){return TK.map(function(t){return {id:t.id,n:t.n,ok:t.n<=b}})}
  return {TK:TK,raid:raid,guards:guards,budget:budget}}
return {make:make,stepS:stepS,chain:chain}})();
if(typeof module!=='undefined')module.exports=A4;
