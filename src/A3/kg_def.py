from kgkit import KG, add_backbone
PAGE="A3_eval_lab"
kg=KG(PAGE); N=kg.N; e=kg.e
N("lab:metric/em-f1","Metric","글자 채점 (EM·F1)","Exact match and F1","#lv1","정답 문장과 글자가 똑같은지(EM), 낱말이 얼마나 겹치는지(F1)로 매기는 채점.",1,evidence=["F01"])
N("lab:method/blind-pairwise","Method","블라인드 쌍대 비교","Blind pairwise comparison","#lv2","누구 답인지 가리고 두 답 중 나은 쪽을 사람이 고르게 하는 평가.",2,evidence=["F03"])
N("lab:method/llm-judge","Method","LLM 심판","LLM-as-a-judge","#lv3","다른 LLM에게 두 답 중 나은 쪽을 고르게 하는 평가.",3,alt=["LLM 판정관","채점 로봇"],evidence=["F02"])
N("lab:concept/confidence-interval","Concept","95% 신뢰구간","95% confidence interval","#lv4","정답률 ± 1.96 × 표준오차. 문항 수가 적으면 넓다.",4)
N("lab:topic/llm-evaluation","Concept","LLM 평가","LLM evaluation","#why","자유로운 문장으로 답하는 모델의 질을 재는 일.",1)
N("lab:metric/exact-match","Metric","정확히 일치 (EM)","Exact match","#lv1","정리한 글자가 정답과 똑같으면 1.",1,evidence=["F01"])
N("lab:metric/token-f1","Metric","낱말 F1","Token-level F1","#lv1","겹친 낱말로 정밀도·재현율을 구해 조화평균한 값.",1,evidence=["F01"])
N("lab:concept/precision","Term","정밀도","Precision","#lv1","답의 낱말 중 정답에도 있는 비율.",1)
N("lab:concept/recall","Term","재현율","Recall","#lv1","정답의 낱말 중 답에 들어간 비율.",1)
N("lab:concept/answer-normalization","Term","답 정리 (소문자·구두점·관사 지우기)","Answer normalization","#lv1","비교 전에 대소문자·구두점·a/an/the를 지우는 일.",1,evidence=["F01"])
N("lab:concept/majority-vote","Term","다수결","Majority vote","#lv2","심사위원 셋 중 둘 이상이 고른 쪽을 승자로 정하기.",2)
N("lab:metric/elo","Metric","엘로 점수","Elo rating","#lv2","기대 승률과 결과의 차이 × K만큼 점수를 고치는 방식.",2,alt=["Elo"],evidence=["F03"])
N("lab:concept/expected-score","Term","기대 승률","Expected score","#lv2","1 ÷ (1 + 10^((상대 − 나) ÷ 400)).",2)
N("lab:concept/order-dependence","Concept","세는 순서에 따라 바뀌는 순위","Order dependence of Elo","#lv2","같은 경기라도 세는 순서가 바뀌면 엘로 점수가 달라지는 성질.",2)
N("lab:method/bradley-terry","Method","브래들리-테리 모형","Bradley–Terry model","#lv2","모든 맞대결을 한꺼번에 놓고 실력 점수를 구하는 방법. 경기 순서와 무관.",2,evidence=["F03"])
N("lab:concept/position-bias","Concept","위치 편향","Position bias","#lv3","앞에 놓인 답을 더 좋게 보는 버릇.",3,evidence=["F02"])
N("lab:concept/verbosity-bias","Concept","길이 편향","Verbosity bias","#lv3","긴 답을 더 좋게 보는 버릇.",3,evidence=["F02"])
N("lab:method/swap-order","Method","순서 바꿔 두 번 묻기","Position swap","#lv3","두 답의 순서를 바꿔 두 번 묻고, 엇갈리면 판정 보류로 두는 보정.",3,evidence=["F02"])
N("lab:method/length-control","Method","길이 보정","Length control","#lv3","답 길이의 영향을 빼고 비교하는 보정.",3)
N("lab:metric/agreement-rate","Metric","사람과의 일치율","Agreement with humans","#lv3","LLM 심판이 사람 다수결과 같은 쪽을 고른 경기의 비율.",3,evidence=["F02"])
N("lab:concept/standard-error","Term","표준오차","Standard error","#lv4","√(p(1−p) ÷ n). 정답률이 다시 잴 때 흔들리는 크기. 표준편차와 다르다.",4)
N("lab:concept/sample-size","Term","문항 수 n","Number of test items","#lv4","시험 문항의 개수. 폭은 √n에 반비례.",4)
N("lab:concept/contamination","Concept","시험지 유출 (오염)","Benchmark contamination","#lv4","학습 데이터에 시험 문항이 섞여 점수가 부풀려지는 일.",4)
N("lab:task/model-selection","Task","업무에 쓸 모델 고르기","Model selection for a task","#first","여러 답변기 중 업무에 맞는 것을 근거를 갖고 고르는 일.",1)
N("lab:dataset/pebble-eval10","Dataset","램프 회사 시험 10문항·답변 40개·표 180개","Pebble Lamp toy eval set","#big","설명용으로 만든 10문항, 네 선수의 답, 블라인드 심사표.",1)
for lid,ko,en,a,lv in [("lab:limitation/no-meaning","글자만 보고 뜻은 못 본다","Surface matching misses meaning","#lv1",1),("lab:limitation/human-costly","사람 심사는 비싸고 2·3위가 흔들린다","Human eval is costly and order-sensitive","#lv2",2),
  ("lab:limitation/judge-biased","LLM 심판은 앞 답·긴 답에 끌린다","Judge biases","#lv3",3),("lab:limitation/small-n","10문항으로는 순위를 단정할 수 없다","Small test sets are noisy","#lv4",4)]:
    N(lid,"Limitation",ko,en,a,level=lv)
N("lab:claim/squad-em-f1","Claim","SQuAD는 EM과 F1로 채점하고 비교 전 구두점·관사를 지운다","SQuAD scores by EM and F1","#lv1",evidence=["F01"])
N("lab:claim/judge-80","Claim","강한 LLM 심판은 사람 선호와 80% 넘게 일치하며, 위치·길이·자기 답 편향이 있다","LLM judges reach >80% agreement but show biases","#lv3",evidence=["F02"])
N("lab:claim/arena-pairwise","Claim","공개 비교 사이트는 익명 두 모델의 쌍대 투표로 순위를 매긴다","Chatbot Arena ranks by anonymous pairwise votes","#lv2",evidence=["F03"])
N("lab:claim/toy-league","Claim","장난감 리그에서 사람 승수 1위는 모아(22승), 한 번 본 LLM 심판의 1위는 주판봇(23승)","Toy league results","#duel")
N("lab:question/core","Question","문장으로 답하는 LLM을 무엇으로 채점해야 순위를 믿을 수 있을까?","How to score free-form answers reliably?","#top")
N("lab:question/duel","Question","채점법을 모두 모으면 누가 1위인가?","Who wins when all scorers are combined?","#duel")
N("lab:question/axes","Question","정확성·친절함·간결함을 한 점수로 묶어도 될까?","Should quality axes be combined into one score?","#sum")
for aid,ko,en,a in [("lab:analogy/strict-key","글자만 보는 깐깐한 채점표","Strict answer key","#lv1"),("lab:analogy/blind-taste","상표 가린 맛 테스트","Blind taste test","#lv2"),
  ("lab:analogy/first-plate","첫 접시·큰 접시에 끌리는 심사위원","Judge drawn to first and bigger plates","#lv3"),("lab:analogy/poll-margin","여론조사의 오차 범위","Poll margin of error","#lv4")]:
    N(aid,"Analogy",ko,en,a)
for wid,ko,en in [("lab:work/rajpurkar2016squad","Rajpurkar 외 (2016) SQuAD","Rajpurkar et al. 2016"),("lab:work/zheng2023judge","Zheng 외 (2023) LLM-as-a-Judge","Zheng et al. 2023"),("lab:work/chiang2024arena","Chiang 외 (2024) Chatbot Arena","Chiang et al. 2024")]:
    N(wid,"Work",ko,en,"#footer-src")
for sid,ko,a in [("lab:sim/a3-em","실험 ① 글자 채점기","#lv1"),("lab:sim/a3-elo","실험 ② 블라인드 60경기","#lv2"),("lab:sim/a3-judge","실험 ③ LLM 심판 보정","#lv3"),("lab:sim/a3-ci","실험 ④ 문항 수와 신뢰구간","#lv4")]:
    N(sid,"Simulation",ko,ko,a)
add_backbone(kg,["lab:area/llm-evaluation-llm","lab:topic/llm-benchmarks","lab:topic/llm-as-judge","lab:topic/hallucination"])
L=["lab:metric/em-f1","lab:method/blind-pairwise","lab:method/llm-judge","lab:concept/confidence-interval"]
LIM=["lab:limitation/no-meaning","lab:limitation/human-costly","lab:limitation/judge-biased","lab:limitation/small-n"]
A=["#lv1","#lv2","#lv3","#lv4"]
for i in range(4):
    e(L[i],"lab:hasLimitation",LIM[i],A[i])
    if i<3: e(L[i],"lab:prerequisiteOf",L[i+1],A[i+1]); e(LIM[i],"lab:addressedBy",L[i+1],A[i+1])
for s in L: e(s,"lab:partOf","lab:topic/llm-evaluation","#big")
e("lab:topic/llm-evaluation","lab:solves","lab:task/model-selection","#first")
e("lab:metric/exact-match","lab:partOf","lab:metric/em-f1","#lv1"); e("lab:metric/token-f1","lab:partOf","lab:metric/em-f1","#lv1")
e("lab:concept/precision","lab:partOf","lab:metric/token-f1","#lv1"); e("lab:concept/recall","lab:partOf","lab:metric/token-f1","#lv1"); e("lab:concept/answer-normalization","lab:partOf","lab:metric/em-f1","#lv1")
e("lab:concept/majority-vote","lab:partOf","lab:method/blind-pairwise","#lv2"); e("lab:metric/elo","lab:partOf","lab:method/blind-pairwise","#lv2"); e("lab:concept/expected-score","lab:partOf","lab:metric/elo","#lv2")
e("lab:metric/elo","lab:hasLimitation","lab:concept/order-dependence","#lv2"); e("lab:concept/order-dependence","lab:addressedBy","lab:method/bradley-terry","#lv2","mid")
e("lab:metric/elo","lab:contrastsWith","lab:method/bradley-terry","#lv2")
e("lab:method/llm-judge","lab:hasLimitation","lab:concept/position-bias","#lv3"); e("lab:method/llm-judge","lab:hasLimitation","lab:concept/verbosity-bias","#lv3")
e("lab:concept/position-bias","lab:addressedBy","lab:method/swap-order","#lv3"); e("lab:concept/verbosity-bias","lab:addressedBy","lab:method/length-control","#lv3")
e("lab:method/llm-judge","lab:evaluatedBy","lab:metric/agreement-rate","#lv3")
e("lab:concept/standard-error","lab:partOf","lab:concept/confidence-interval","#lv4"); e("lab:concept/sample-size","lab:partOf","lab:concept/standard-error","#lv4")
e("lab:limitation/small-n","lab:raises","lab:concept/contamination","#lv4","mid")
for s in ["lab:metric/em-f1","lab:method/blind-pairwise","lab:method/llm-judge"]: e(s,"lab:evaluatedOn","lab:dataset/pebble-eval10","#duel")
e("lab:question/duel","lab:raises","lab:concept/confidence-interval","#duel"); e("lab:limitation/judge-biased","lab:raises","lab:question/duel","#duel")
e("lab:question/core","lab:relatedTo","lab:topic/llm-evaluation","#top"); e("lab:question/axes","lab:relatedTo","lab:method/blind-pairwise","#sum")
for c,o,w,ev in [("lab:claim/squad-em-f1","lab:metric/em-f1","lab:work/rajpurkar2016squad",["F01"]),("lab:claim/judge-80","lab:method/llm-judge","lab:work/zheng2023judge",["F02"]),("lab:claim/arena-pairwise","lab:method/blind-pairwise","lab:work/chiang2024arena",["F03"])]:
    e(c,"lab:supports",o,"#footer-src",ev=ev); e(c,"lab:assertedIn",w,"#footer-src",ev=ev)
e("lab:claim/toy-league","lab:supports","lab:concept/verbosity-bias","#duel"); e("lab:claim/toy-league","lab:assertedIn","lab:dataset/pebble-eval10","#duel")
for an,o,a in [("lab:analogy/strict-key","lab:metric/em-f1","#lv1"),("lab:analogy/blind-taste","lab:method/blind-pairwise","#lv2"),("lab:analogy/first-plate","lab:method/llm-judge","#lv3"),("lab:analogy/poll-margin","lab:concept/confidence-interval","#lv4")]:
    e(an,"lab:analogyOf",o,a)
for s,o,a in [("lab:sim/a3-em","lab:metric/token-f1","#lv1"),("lab:sim/a3-elo","lab:concept/order-dependence","#lv2"),("lab:sim/a3-judge","lab:concept/verbosity-bias","#lv3"),("lab:sim/a3-ci","lab:concept/standard-error","#lv4")]:
    e(o,"lab:demonstratedBy",s,a)
for s,o in [("lab:topic/llm-evaluation","lab:area/llm-evaluation-llm"),("lab:metric/em-f1","lab:topic/llm-benchmarks"),("lab:method/llm-judge","lab:topic/llm-as-judge"),("lab:concept/contamination","lab:topic/llm-benchmarks"),
            ("lab:limitation/no-meaning","lab:topic/hallucination"),("lab:topic/llm-benchmarks","lab:area/llm-evaluation-llm"),("lab:topic/llm-as-judge","lab:area/llm-evaluation-llm"),("lab:topic/hallucination","lab:area/llm-evaluation-llm")]:
    e(s,"lab:broader",o,"#kg")
REGISTRY="KG_00_registry 0.3 + 응용편 A3 추가분, 분야 뼈대 backbone_llm 0.1"
REFS=[
 {"id":"rajpurkar2016squad","type":"paper-conference","title":"SQuAD: 100,000+ Questions for Machine Comprehension of Text","author":[{"family":"Rajpurkar","given":"Pranav"},{"family":"Zhang","given":"Jian"},{"family":"Lopyrev","given":"Konstantin"},{"family":"Liang","given":"Percy"}],
  "issued":{"date-parts":[[2016]]},"container-title":"Proceedings of the 2016 Conference on Empirical Methods in Natural Language Processing","page":"2383-2392","DOI":"10.18653/v1/D16-1264","URL":"https://arxiv.org/abs/1606.05250","accessed":{"date-parts":[[2026,11,27]]},
  "lab":{"work":"lab:work/rajpurkar2016squad","role":"background","supports":["lab:metric/em-f1","lab:claim/squad-em-f1"],"locs":[{"claim":"lab:claim/squad-em-f1","loc":"평가 방법 절 (EM·F1, 구두점·관사 무시)","verified":False}],
   "verified":{"title":True,"authors":True,"year":True,"venue":True,"doi":True,"pages":True},"checkedBy":"웹 검색 2026-11-27 (ACL Anthology D16-1264, arXiv)","note":"정리 규칙의 정확한 쪽 위치는 미확인"}},
 {"id":"zheng2023judge","type":"paper-conference","title":"Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena","author":[{"family":"Zheng","given":"Lianmin"},{"family":"Chiang","given":"Wei-Lin"},{"family":"Sheng","given":"Ying"},{"literal":"et al."}],
  "issued":{"date-parts":[[2023]]},"container-title":"Advances in Neural Information Processing Systems 36 (Datasets and Benchmarks Track)","URL":"https://arxiv.org/abs/2306.05685","DOI":"10.48550/arXiv.2306.05685","accessed":{"date-parts":[[2026,11,27]]},
  "lab":{"work":"lab:work/zheng2023judge","role":"background","supports":["lab:method/llm-judge","lab:claim/judge-80"],"locs":[{"claim":"lab:claim/judge-80","loc":"초록","verified":True}],
   "verified":{"title":True,"authors":True,"year":True,"venue":True,"doi":True,"pages":False},"checkedBy":"웹 검색 2026-11-27 (arXiv, NeurIPS 2023 포스터 페이지)","note":"쪽수 미확인"}},
 {"id":"chiang2024arena","type":"paper-conference","title":"Chatbot Arena: An Open Platform for Evaluating LLMs by Human Preference","author":[{"family":"Chiang","given":"Wei-Lin"},{"family":"Zheng","given":"Lianmin"},{"family":"Sheng","given":"Ying"},{"literal":"et al."}],
  "issued":{"date-parts":[[2024]]},"container-title":"Proceedings of the 41st International Conference on Machine Learning, PMLR","volume":"235","page":"8359-8388","URL":"https://proceedings.mlr.press/v235/chiang24b.html","accessed":{"date-parts":[[2026,11,27]]},
  "lab":{"work":"lab:work/chiang2024arena","role":"background","supports":["lab:method/blind-pairwise","lab:metric/elo","lab:method/bradley-terry","lab:claim/arena-pairwise"],"locs":[{"claim":"lab:claim/arena-pairwise","loc":"초록","verified":True}],
   "verified":{"title":True,"authors":True,"year":True,"venue":True,"doi":False,"pages":True},"checkedBy":"웹 검색 2026-11-27 (PMLR 235, arXiv 2403.04132)","note":"DOI 없음 (PMLR)"}},
]
META={"file":"A3_eval_lab.html",
 "html":{"TITLE":"평가 연구실 — 「10문항 중 9개」는 얼마나 믿을 만한가","H1":"평가 연구실 — 「10문항 중 9개」는 얼마나 믿을 만한가","NUM":"3","ID":"A3","FILE":"A3_eval_lab.html","DATE":"2026-11-27","DATESLASH":"2026/11/27",
  "DESC":"LLM 평가를 처음 보는 사람을 위한 연구실 해설. EM·F1 글자 채점, 블라인드 쌍대 비교와 엘로 점수, LLM 심판의 위치·길이 편향, 신뢰구간과 문항 수를 직접 눌러 보고, 네 선수의 개인전 리그로 정리한다.",
  "OGDESC":"채점법이 바뀌면 1등도 바뀐다 — EM·F1, 블라인드 심사, LLM 심판, 오차 막대를 직접 눌러 보는 연구실 해설."},
 "meta":{"title":"평가 연구실 — 「10문항 중 9개」는 얼마나 믿을 만한가","series":"LLM 공식에서 GPT-6까지 · 응용편","number":"A3",
 "creator":[{"name":"안상선","role":"author","affiliation":"(주)M-Robo 대표","url":"https://adminmrobo.github.io/who_am_i/who_am_i.html"}],
 "contributor":[{"name":"AI 보조 제작","role":"assistant"}],"date":"2026-11-27","version":"1.0","language":["ko"],"license":"","url":"https://adminmrobo.github.io/llm_applied_lab/A3_eval_lab.html",
 "about":["lab:topic/llm-evaluation","lab:metric/em-f1","lab:method/blind-pairwise","lab:method/llm-judge","lab:concept/confidence-interval"],
 "educationalLevel":"입문","learningResourceType":"interactive explainer","basedOn":["rajpurkar2016squad","zheng2023judge","chiang2024arena"],
 "suggestedCitation":"안상선 (2026). 평가 연구실 — 「10문항 중 9개」는 얼마나 믿을 만한가. LLM 공식에서 GPT-6까지 응용편 A3, v1.0."}}
