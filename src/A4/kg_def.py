from kgkit import KG, add_backbone
PAGE="A4_agent_lab"
kg=KG(PAGE); N=kg.N; e=kg.e
N("lab:method/tool-calling","Method","도구 호출","Tool calling (function calling)","#lv1","LLM이 도구 이름과 입력을 적어 내면 프로그램이 실행해 결과를 돌려주는 방식.",1,alt=["function calling"],evidence=["F02"])
N("lab:method/react-loop","Method","ReAct 고리 (생각·행동·관찰)","ReAct loop","#lv2","생각 → 도구 행동 → 관찰을 되풀이하다 끝나면 답하는 에이전트 방식.",2,alt=["ReAct"],evidence=["F01"])
N("lab:method/step-verification","Method","걸음마다 확인","Step-level verification","#lv3","한 걸음의 결과를 다시 확인하고 틀리면 한 번 다시 하게 하는 방법.",3)
N("lab:method/layered-guards","Method","겹겹이 막기 (세 겹의 안전장치)","Layered safeguards","#lv4","자료와 명령 나누기, 최소 권한, 사람 승인을 함께 두는 방어.",4,evidence=["F03"])
N("lab:topic/llm-agent","Concept","LLM 에이전트","LLM agent","#why","목표를 받아 도구를 골라 쓰며 여러 단계로 일을 처리하는 AI.",1)
N("lab:concept/tool","Concept","도구","Tool","#lv1","조회·검색·계산·접수처럼 같은 입력에 같은 결과를 돌려주는 프로그램.",1)
N("lab:concept/trace","Concept","업무 일지 (추적 기록)","Agent trace","#lv2","에이전트가 남긴 생각·행동·관찰 기록.",2,evidence=["F01"])
N("lab:concept/step-budget","Term","걸음 예산","Step budget","#lv2","에이전트가 쓸 수 있는 최대 걸음 수.",2)
N("lab:concept/state-update","Term","상태 갱신","State update","#lv2","상태ₜ₊₁ = 상태ₜ + 관찰ₜ. 한 걸음마다 알아낸 것을 더한다.",2)
N("lab:concept/compounding-error","Concept","곱해지는 실수","Compounding error","#lv3","걸음마다 성공률 p면 n걸음 모두 성공할 확률은 pⁿ.",3)
N("lab:concept/retry","Term","다시 하기","Retry","#lv3","확인이 실수를 잡으면 그 걸음을 한 번 더 하는 것.",3)
N("lab:concept/prompt-injection","Concept","간접 프롬프트 주입","Indirect prompt injection","#lv4","검색·웹·메일로 들어온 글에 숨긴 지시로 LLM 앱을 조종하려는 공격.",4,evidence=["F03"])
N("lab:concept/data-instruction-separation","Concept","자료와 명령 나누기","Separating data from instructions","#lv4","문서 속 문장은 자료로만 읽고 명령으로 따르지 않는 원칙.",4,evidence=["F03"])
N("lab:concept/least-privilege","Concept","최소 권한","Least privilege","#lv4","일에 꼭 필요한 도구와 권한만 주는 원칙.",4)
N("lab:concept/human-approval","Concept","사람 승인","Human-in-the-loop approval","#lv4","되돌릴 수 없는 행동 직전에 사람이 확인·승인하는 단계.",4,alt=["HITL"])
N("lab:concept/irreversible-action","Concept","되돌릴 수 없는 행동","Irreversible action","#lv4","환불·교환·삭제처럼 실행 후 원래대로 돌리기 어려운 행동.",4)
N("lab:concept/agent-memory","Concept","기억 (메모)","Agent memory","#duel","이미 조회한 결과를 적어 두어 같은 조회를 되풀이하지 않게 하는 자리.",4)
N("lab:concept/planning","Concept","계획","Planning","#duel","다음에 무엇을 알아야 하는지 정하고 도구 순서를 고르는 자리.",2)
N("lab:metric/task-success","Metric","일 단위 성공률","Task-level success rate","#lv3","문의 하나를 처음부터 끝까지 맞게 처리한 비율. 걸음 하나의 정확도와 다르다.",3)
N("lab:metric/expected-solved","Metric","기대 해결 건수","Expected tasks solved","#duel","문의마다 끝까지 성공할 확률을 더한 값.",4)
N("lab:task/support-desk","Task","고객 문의 처리","Customer support handling","#first","조회·검색·계산·접수를 거쳐 고객 문의를 끝까지 처리하는 일.",1)
N("lab:dataset/pebble-orders","Dataset","가상 주문 6건·고객 문의 6건","Pebble Lamp toy orders and tickets","#big","설명용으로 만든 주문, 문의, 도구 결과, 업무 일지.",1)
for lid,ko,en,a,lv in [("lab:limitation/order-fixed","도구 순서를 사람이 정해야 한다","Tool order fixed by hand","#lv1",1),("lab:limitation/errors-compound","걸음마다 실수가 곱해진다","Errors compound over steps","#lv2",2),
  ("lab:limitation/injection-unseen","확인은 숨긴 지시를 못 막을 수 있다","Verification may miss injected instructions","#lv3",3),("lab:limitation/speed-tradeoff","안전장치는 속도와 맞바꾼다","Safeguards cost speed","#lv4",4)]:
    N(lid,"Limitation",ko,en,a,level=lv)
N("lab:claim/react-interleave","Claim","ReAct는 추론 흔적과 행동을 번갈아 생성해 외부 정보를 가져오며 계획을 고친다","ReAct interleaves reasoning and acting","#lv2",evidence=["F01"])
N("lab:claim/toolformer-self","Claim","Toolformer는 어떤 API를 언제 어떤 입력으로 부를지 스스로 배운다","Toolformer learns when and how to call APIs","#lv1",evidence=["F02"])
N("lab:claim/indirect-injection","Claim","검색될 데이터에 지시를 심어 LLM 통합 앱을 원격으로 조종할 수 있다","Indirect prompt injection compromises LLM apps","#lv4",evidence=["F03"])
N("lab:claim/toy-raid","Claim","장난감 레이드에서 확인 담당이 빠지면 기대 해결이 5.64건에서 4.13건으로 가장 크게 준다","Toy raid ablation result","#duel")
N("lab:question/core","Question","답만 하던 LLM에게 일을 맡기려면 무엇을 붙이고 무엇을 막아야 할까?","What to add and guard when LLMs act?","#top")
N("lab:question/duel","Question","누가 빠지면 가장 크게 무너지는가?","Which role matters most?","#duel")
N("lab:question/how-much-autonomy","Question","어디까지 사람 승인 없이 맡겨도 될까?","How much autonomy without approval?","#lv4")
for aid,ko,en,a in [("lab:analogy/lookup-clerk","기억 대신 주문 시스템을 조회하는 상담원","Clerk who looks things up","#lv1"),("lab:analogy/work-log","한 줄씩 적는 업무 일지","Work log","#lv2"),
  ("lab:analogy/check-calc","계산을 검산하는 습관","Double-checking arithmetic","#lv3"),("lab:analogy/bank-approval","권한을 나누고 큰 결재는 두 사람이 보는 은행","Bank dual control","#lv4")]:
    N(aid,"Analogy",ko,en,a)
for wid,ko,en in [("lab:work/yao2023react","Yao 외 (2023) ReAct","Yao et al. 2023"),("lab:work/schick2023toolformer","Schick 외 (2023) Toolformer","Schick et al. 2023"),("lab:work/greshake2023injection","Greshake 외 (2023) 간접 프롬프트 주입","Greshake et al. 2023")]:
    N(wid,"Work",ko,en,"#footer-src")
for sid,ko,a in [("lab:sim/a4-tool","실험 ① 혼자 vs 도구","#lv1"),("lab:sim/a4-trace","실험 ② 업무 일지와 걸음 예산","#lv2"),("lab:sim/a4-chain","실험 ③ 곱해지는 성공률","#lv3"),("lab:sim/a4-guard","실험 ④ 세 겹의 안전장치","#lv4")]:
    N(sid,"Simulation",ko,ko,a)
add_backbone(kg,["lab:area/llm-agents","lab:topic/tool-use","lab:topic/planning-agents","lab:topic/multi-agent","lab:topic/agent-evaluation","lab:topic/jailbreak-defense","lab:area/llm-evaluation-llm","lab:area/llm-retrieval"])
L=["lab:method/tool-calling","lab:method/react-loop","lab:method/step-verification","lab:method/layered-guards"]
LIM=["lab:limitation/order-fixed","lab:limitation/errors-compound","lab:limitation/injection-unseen","lab:limitation/speed-tradeoff"]
A=["#lv1","#lv2","#lv3","#lv4"]
for i in range(4):
    e(L[i],"lab:hasLimitation",LIM[i],A[i])
    if i<3: e(L[i],"lab:prerequisiteOf",L[i+1],A[i+1]); e(LIM[i],"lab:addressedBy",L[i+1],A[i+1])
for s in L: e(s,"lab:partOf","lab:topic/llm-agent","#big")
e("lab:topic/llm-agent","lab:solves","lab:task/support-desk","#first")
e("lab:concept/tool","lab:partOf","lab:method/tool-calling","#lv1")
e("lab:concept/trace","lab:partOf","lab:method/react-loop","#lv2"); e("lab:concept/step-budget","lab:partOf","lab:method/react-loop","#lv2"); e("lab:concept/state-update","lab:partOf","lab:method/react-loop","#lv2")
e("lab:concept/planning","lab:partOf","lab:method/react-loop","#duel"); e("lab:concept/agent-memory","lab:partOf","lab:method/react-loop","#duel")
e("lab:limitation/errors-compound","lab:raises","lab:concept/compounding-error","#lv3"); e("lab:concept/retry","lab:partOf","lab:method/step-verification","#lv3")
e("lab:concept/compounding-error","lab:addressedBy","lab:method/step-verification","#lv3")
e("lab:method/step-verification","lab:evaluatedBy","lab:metric/task-success","#lv3")
e("lab:limitation/injection-unseen","lab:raises","lab:concept/prompt-injection","#lv4")
for g in ["lab:concept/data-instruction-separation","lab:concept/least-privilege","lab:concept/human-approval"]: e(g,"lab:partOf","lab:method/layered-guards","#lv4")
e("lab:concept/prompt-injection","lab:addressedBy","lab:concept/data-instruction-separation","#lv4"); e("lab:concept/irreversible-action","lab:addressedBy","lab:concept/human-approval","#lv4")
e("lab:limitation/speed-tradeoff","lab:raises","lab:question/how-much-autonomy","#lv4")
e("lab:topic/llm-agent","lab:evaluatedBy","lab:metric/expected-solved","#duel"); e("lab:topic/llm-agent","lab:evaluatedOn","lab:dataset/pebble-orders","#duel")
e("lab:question/duel","lab:raises","lab:method/step-verification","#duel"); e("lab:question/core","lab:relatedTo","lab:topic/llm-agent","#top")
e("lab:metric/task-success","lab:contrastsWith","lab:metric/expected-solved","#duel","mid")
for c,o,w,ev in [("lab:claim/react-interleave","lab:method/react-loop","lab:work/yao2023react",["F01"]),("lab:claim/toolformer-self","lab:method/tool-calling","lab:work/schick2023toolformer",["F02"]),("lab:claim/indirect-injection","lab:concept/prompt-injection","lab:work/greshake2023injection",["F03"])]:
    e(c,"lab:supports",o,"#footer-src",ev=ev); e(c,"lab:assertedIn",w,"#footer-src",ev=ev)
e("lab:claim/toy-raid","lab:supports","lab:method/step-verification","#duel"); e("lab:claim/toy-raid","lab:assertedIn","lab:dataset/pebble-orders","#duel")
for an,o,a in [("lab:analogy/lookup-clerk","lab:method/tool-calling","#lv1"),("lab:analogy/work-log","lab:method/react-loop","#lv2"),("lab:analogy/check-calc","lab:method/step-verification","#lv3"),("lab:analogy/bank-approval","lab:method/layered-guards","#lv4")]:
    e(an,"lab:analogyOf",o,a)
for s,o,a in [("lab:sim/a4-tool","lab:concept/tool","#lv1"),("lab:sim/a4-trace","lab:concept/step-budget","#lv2"),("lab:sim/a4-chain","lab:concept/compounding-error","#lv3"),("lab:sim/a4-guard","lab:concept/prompt-injection","#lv4")]:
    e(o,"lab:demonstratedBy",s,a)
for s,o in [("lab:topic/llm-agent","lab:area/llm-agents"),("lab:method/tool-calling","lab:topic/tool-use"),("lab:method/react-loop","lab:topic/planning-agents"),("lab:metric/task-success","lab:topic/agent-evaluation"),
            ("lab:concept/prompt-injection","lab:topic/jailbreak-defense"),("lab:concept/planning","lab:topic/multi-agent"),
            ("lab:topic/tool-use","lab:area/llm-agents"),("lab:topic/planning-agents","lab:area/llm-agents"),("lab:topic/multi-agent","lab:area/llm-agents"),("lab:topic/agent-evaluation","lab:area/llm-agents"),
            ("lab:topic/jailbreak-defense","lab:area/llm-evaluation-llm")]:
    e(s,"lab:broader",o,"#kg")
e("lab:area/llm-retrieval","lab:prerequisiteOf","lab:area/llm-agents","#sum")
REGISTRY="KG_00_registry 0.3 + 응용편 A4 추가분, 분야 뼈대 backbone_llm 0.1"
REFS=[
 {"id":"yao2023react","type":"paper-conference","title":"ReAct: Synergizing Reasoning and Acting in Language Models","author":[{"family":"Yao","given":"Shunyu"},{"family":"Zhao","given":"Jeffrey"},{"family":"Yu","given":"Dian"},{"literal":"et al."}],
  "issued":{"date-parts":[[2023]]},"container-title":"International Conference on Learning Representations (ICLR 2023)","URL":"https://arxiv.org/abs/2210.03629","DOI":"10.48550/arXiv.2210.03629","accessed":{"date-parts":[[2026,11,27]]},
  "lab":{"work":"lab:work/yao2023react","role":"background","supports":["lab:method/react-loop","lab:claim/react-interleave"],"locs":[{"claim":"lab:claim/react-interleave","loc":"초록","verified":True}],
   "verified":{"title":True,"authors":True,"year":True,"venue":True,"doi":True,"pages":False},"checkedBy":"웹 검색 2026-11-27 (arXiv, ICLR 2023 발표 페이지)","note":"쪽수 없음"}},
 {"id":"schick2023toolformer","type":"paper-conference","title":"Toolformer: Language Models Can Teach Themselves to Use Tools","author":[{"family":"Schick","given":"Timo"},{"family":"Dwivedi-Yu","given":"Jane"},{"family":"Dessì","given":"Roberto"},{"literal":"et al."}],
  "issued":{"date-parts":[[2023]]},"container-title":"Advances in Neural Information Processing Systems","volume":"36","URL":"https://arxiv.org/abs/2302.04761","DOI":"10.48550/arXiv.2302.04761","accessed":{"date-parts":[[2026,11,27]]},
  "lab":{"work":"lab:work/schick2023toolformer","role":"background","supports":["lab:method/tool-calling","lab:claim/toolformer-self"],"locs":[{"claim":"lab:claim/toolformer-self","loc":"초록","verified":True}],
   "verified":{"title":True,"authors":True,"year":True,"venue":True,"doi":True,"pages":False},"checkedBy":"웹 검색 2026-11-27 (NeurIPS 2023 초록 페이지, arXiv)","note":"쪽수 미확인"}},
 {"id":"greshake2023injection","type":"paper-conference","title":"Not What You've Signed Up For: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection","author":[{"family":"Greshake","given":"Kai"},{"family":"Abdelnabi","given":"Sahar"},{"family":"Mishra","given":"Shailesh"},{"literal":"et al."}],
  "issued":{"date-parts":[[2023]]},"container-title":"Proceedings of the 16th ACM Workshop on Artificial Intelligence and Security (AISec '23)","page":"79-90","DOI":"10.1145/3605764.3623985","URL":"https://arxiv.org/abs/2302.12173","accessed":{"date-parts":[[2026,11,27]]},
  "lab":{"work":"lab:work/greshake2023injection","role":"background","supports":["lab:concept/prompt-injection","lab:concept/data-instruction-separation","lab:claim/indirect-injection"],"locs":[{"claim":"lab:claim/indirect-injection","loc":"초록","verified":True}],
   "verified":{"title":True,"authors":True,"year":True,"venue":True,"doi":True,"pages":True},"checkedBy":"웹 검색 2026-11-27 (arXiv, dblp AISec@CCS 2023: 79-90)","note":"저자 순서는 arXiv판 기준 (dblp는 Abdelnabi 먼저)"}},
]
META={"file":"A4_agent_lab.html",
 "html":{"TITLE":"에이전트 연구실 — 도구를 쓰고, 확인하고, 멈출 줄 아는 AI","H1":"에이전트 연구실 — 도구를 쓰고, 확인하고, 멈출 줄 아는 AI","NUM":"4","ID":"A4","FILE":"A4_agent_lab.html","DATE":"2026-11-27","DATESLASH":"2026/11/27",
  "DESC":"LLM 에이전트를 처음 보는 사람을 위한 연구실 해설. 도구 호출, 생각·행동·관찰의 ReAct 고리와 걸음 예산, 곱해지는 실수와 확인, 숨은 지시(프롬프트 주입)와 세 겹의 안전장치를 직접 눌러 보고, 연구실 식구 모두의 협동 레이드로 정리한다.",
  "OGDESC":"누가 빠지면 가장 크게 무너질까 — 도구·확인·기억·승인으로 움직이는 에이전트를 직접 눌러 보는 연구실 해설."},
 "meta":{"title":"에이전트 연구실 — 도구를 쓰고, 확인하고, 멈출 줄 아는 AI","series":"LLM 공식에서 GPT-6까지 · 응용편","number":"A4",
 "creator":[{"name":"안상선","role":"author","affiliation":"(주)M-Robo 대표","url":"https://adminmrobo.github.io/who_am_i/who_am_i.html"}],
 "contributor":[{"name":"AI 보조 제작","role":"assistant"}],"date":"2026-11-27","version":"1.0","language":["ko"],"license":"","url":"https://adminmrobo.github.io/llm_applied_lab/A4_agent_lab.html",
 "about":["lab:topic/llm-agent","lab:method/tool-calling","lab:method/react-loop","lab:method/step-verification","lab:method/layered-guards"],
 "educationalLevel":"입문","learningResourceType":"interactive explainer","basedOn":["yao2023react","schick2023toolformer","greshake2023injection"],
 "suggestedCitation":"안상선 (2026). 에이전트 연구실 — 도구를 쓰고, 확인하고, 멈출 줄 아는 AI. LLM 공식에서 GPT-6까지 응용편 A4, v1.0."}}
