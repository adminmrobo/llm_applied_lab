from kgkit import KG, add_backbone
PAGE="A2_finetune_lab"
kg=KG(PAGE)
N=kg.N; e=kg.e
N("lab:method/few-shot-prompting","Method","예시 붙이기 (퓨샷 프롬프트)","Few-shot prompting","#lv1","프롬프트에 모범 문의·답 짝을 몇 개 붙여 따라 하게 하는 방법. 모델의 무게는 바뀌지 않는다.",1,evidence=["F03"])
N("lab:method/sft","Method","지도 미세조정 (SFT)","Supervised fine-tuning","#lv2","문의와 정답 양식 짝으로 손실을 줄이도록 모델의 무게를 고치는 방법.",2,alt=["SFT","미세조정"],evidence=["F02"])
N("lab:concept/learning-rate-epoch","Concept","학습률과 에포크","Learning rate and epochs","#lv3","한 번에 고치는 세기(학습률)와 학습 기록 전체를 도는 바퀴 수(에포크).",3)
N("lab:method/lora","Method","LoRA (저계수 적응)","Low-Rank Adaptation","#lv4","원래 무게는 얼리고 고칠 양을 작은 행렬 두 개의 곱 B·A로만 배우는 미세조정.",4,alt=["LoRA"],evidence=["F01"])
N("lab:topic/fine-tuning","Concept","미세조정","Fine-tuning","#why","이미 학습된 바탕 모델에 새 기록을 더 가르쳐 무게를 고치는 일.",1)
N("lab:concept/base-model","Concept","바탕 모델","Base model","#big","미세조정하기 전의 원래 모델.",1)
N("lab:concept/in-context-learning","Concept","맥락 속 학습","In-context learning","#lv1","무게를 바꾸지 않고 프롬프트 안 예시만 보고 형식을 따라 하는 성질.",1,evidence=["F03"])
N("lab:concept/model-habit","Concept","바탕 모델의 버릇","Prior bias of the base model","#lv1","예시를 붙여도 남는 바탕 모델의 원래 경향. 이 페이지에서는 버릇 점수로 흉내 냈다.",1)
N("lab:concept/cross-entropy-loss","Metric","손실 (−ln p)","Cross-entropy loss","#lv2","정답에 준 확률 p의 음의 로그. p가 1이면 0.",2)
N("lab:concept/softmax","Term","소프트맥스","Softmax","#lv2","점수를 지수함수로 키운 뒤 합이 1이 되게 나눈 확률.",2)
N("lab:concept/gradient-step","Term","무게 고치기 한 걸음","Gradient step","#lv2","w ← w − η × (p − y) × x. 틀린 만큼, 그 주제 숫자만큼 고친다.",2)
N("lab:concept/learning-rate","Term","학습률 η","Learning rate","#lv3","한 걸음의 크기. 너무 작으면 느리고 너무 크면 튄다.",3)
N("lab:concept/epoch","Term","에포크","Epoch","#lv3","학습용 기록 전체를 한 바퀴 도는 것.",3)
N("lab:concept/overfitting","Concept","과적합","Overfitting","#lv3","학습 기록에만 맞춰져 처음 보는 문의의 성적이 떨어지는 일.",3)
N("lab:concept/label-noise","Concept","기록 실수 (잘못 적힌 정답)","Label noise","#lv3","학습 기록의 정답 양식이 잘못 적힌 경우. 오래 가르치면 실수까지 외운다.",3)
N("lab:concept/train-test-split","Concept","학습용과 시험용 나누기","Train/test split","#lv3","가르칠 기록과 성적을 잴 기록을 따로 두는 일.",3)
N("lab:concept/low-rank","Term","계수 r (rank)","Rank","#lv4","LoRA의 작은 표가 가진 방향의 가짓수.",4)
N("lab:concept/frozen-weights","Term","무게 얼리기","Frozen weights","#lv4","원래 무게는 고치지 않고 그대로 두는 것.",4)
N("lab:concept/adapter-swap","Concept","부서마다 바꿔 끼우는 고친 양","Swappable adapters","#lv4","바탕 모델 하나에 작업마다 다른 작은 표 묶음만 갈아 끼우는 쓰임.",4,evidence=["F01"])
N("lab:concept/rule-change","Concept","규칙이 바뀐 날","Policy change after training","#duel","학습 뒤 회사 규칙이 바뀌면 미세조정 모델은 다시 가르치기 전까지 옛 규칙대로 답한다.",4)
N("lab:concept/prompt-length-cost","Metric","호출당 글자 수","Prompt length per call","#lv1","질문 하나에 모델로 보내는 글자 수. 비용·속도와 비례한다.",1)
N("lab:metric/test-accuracy","Metric","시험 맞힌 수","Test accuracy","#lv1","시험 문의 12건 중 회사 양식을 맞힌 수.",1)
N("lab:metric/trainable-params","Metric","배우는 숫자 개수","Trainable parameter count","#lv4","미세조정에서 실제로 고치는 숫자의 개수.",4)
N("lab:concept/rlhf-mention","Concept","사람 피드백으로 다듬기 (RLHF)","RLHF","#sum","사람이 고른 더 나은 답 쪽으로 모델을 다듬는 방법. 이 페이지에서는 소개만 한다.",4,alt=["RLHF"],evidence=["F02"])
N("lab:dataset/pebble-tickets","Dataset","가상 회사 문의 기록 24건·시험 12건","Pebble Lamp toy support tickets","#big","설명용으로 만든 고객 문의 기록과 네 가지 답변 양식.",1)
N("lab:task/ticket-routing","Task","고객 문의 양식 고르기","Support ticket routing","#first","문의를 읽고 회사의 네 가지 답변 양식 중 하나를 고르는 일.",1)
for lid,ko,en,a,lv in [("lab:limitation/habit-remains","센 버릇은 예시로 못 뒤집는다","Prompting cannot override strong priors","#lv1",1),
  ("lab:limitation/how-much-to-train","몇 번·얼마나 세게 가르칠지 정해야 한다","Choosing learning rate and epochs","#lv2",2),
  ("lab:limitation/full-ft-heavy","숫자를 전부 고치면 무겁다","Full fine-tuning is heavy","#lv3",3),
  ("lab:limitation/retrain-on-change","규칙이 바뀌면 다시 가르쳐야 한다","Must retrain when rules change","#lv4",4)]:
    N(lid,"Limitation",ko,en,a,level=lv)
N("lab:claim/lora-10000x","Claim","GPT-3 175B 기준 LoRA는 배우는 숫자를 약 1만 분의 1로, GPU 메모리를 약 3분의 1로 줄인다","LoRA reduces trainable params by 10,000x on GPT-3","#lv4",evidence=["F01"])
N("lab:claim/instructgpt-preferred","Claim","사람 피드백으로 다듬은 1.3B InstructGPT의 답이 175B GPT-3보다 더 자주 선택되었다","1.3B InstructGPT preferred over 175B GPT-3","#sum",evidence=["F02"])
N("lab:claim/gpt3-few-shot","Claim","GPT-3는 무게를 고치지 않고 예시만으로 여러 과제를 푼다","GPT-3 few-shot without gradient updates","#lv1",evidence=["F03"])
N("lab:claim/toy-duel","Claim","장난감 데이터에서 정확도 11/12 대 12/12, 글자 432 대 26, 새 규칙 3/3 대 0/3","Toy duel results","#duel")
N("lab:question/core","Question","검색으로 안 바뀌는 회사 방식을 어떻게 모델의 버릇으로 만들까?","How to make company conventions a model habit?","#top")
N("lab:question/duel","Question","예시로 버틸까, 한 번 가르쳐 둘까?","Prompt or fine-tune?","#duel")
N("lab:question/when-stop","Question","시험 손실이 바닥인 곳을 실제 업무에서는 어떻게 미리 알까?","How to pick the stopping point in practice?","#lv3")
for aid,ko,en,a in [("lab:analogy/manual-pages","신입에게 매뉴얼 몇 장 건네기","Handing a manual to a new hire","#lv1"),("lab:analogy/red-pen","빨간 펜으로 고치며 연습시키기","Red-pen practice","#lv2"),
  ("lab:analogy/wrong-answer-key","정답이 잘못 적힌 연습 문제","Practice sheet with wrong answers","#lv3"),("lab:analogy/sticky-notes","교과서에 포스트잇만 붙이기","Sticky notes on a textbook","#lv4")]:
    N(aid,"Analogy",ko,en,a)
for wid,ko,en in [("lab:work/hu2021lora","Hu 외 (2021) LoRA","Hu et al. 2021"),("lab:work/ouyang2022instructgpt","Ouyang 외 (2022) InstructGPT","Ouyang et al. 2022"),("lab:work/brown2020fewshot","Brown 외 (2020) GPT-3","Brown et al. 2020")]:
    N(wid,"Work",ko,en,"#footer-src")
for sid,ko,a in [("lab:sim/a2-fewshot","실험 ① 예시 고르기","#lv1"),("lab:sim/a2-sft","실험 ② 한 바퀴씩 가르치기","#lv2"),("lab:sim/a2-curve","실험 ③ 학습 곡선","#lv3"),("lab:sim/a2-lora","실험 ④ LoRA와 숫자 개수","#lv4")]:
    N(sid,"Simulation",ko,ko,a)
BB=["lab:area/llm-training","lab:topic/instruction-tuning","lab:topic/rlhf","lab:area/llm-prompting","lab:topic/few-shot","lab:topic/structured-output"]
add_backbone(kg,BB)
L=["lab:method/few-shot-prompting","lab:method/sft","lab:concept/learning-rate-epoch","lab:method/lora"]
LIM=["lab:limitation/habit-remains","lab:limitation/how-much-to-train","lab:limitation/full-ft-heavy","lab:limitation/retrain-on-change"]
A=["#lv1","#lv2","#lv3","#lv4"]
for i in range(4):
    e(L[i],"lab:hasLimitation",LIM[i],A[i])
    if i<3: e(L[i],"lab:prerequisiteOf",L[i+1],A[i+1]); e(LIM[i],"lab:addressedBy",L[i+1],A[i+1])
e("lab:limitation/retrain-on-change","lab:raises","lab:question/duel","#duel")
e("lab:method/few-shot-prompting","lab:contrastsWith","lab:method/sft","#duel")
e("lab:question/duel","lab:raises","lab:concept/rule-change","#duel")
e("lab:method/sft","lab:partOf","lab:topic/fine-tuning","#why"); e("lab:method/lora","lab:partOf","lab:topic/fine-tuning","#lv4")
e("lab:topic/fine-tuning","lab:solves","lab:task/ticket-routing","#first"); e("lab:method/few-shot-prompting","lab:solves","lab:task/ticket-routing","#lv1","mid")
e("lab:concept/base-model","lab:prerequisiteOf","lab:topic/fine-tuning","#big")
e("lab:concept/in-context-learning","lab:partOf","lab:method/few-shot-prompting","#lv1")
e("lab:concept/model-habit","lab:partOf","lab:concept/base-model","#lv1")
e("lab:limitation/habit-remains","lab:raises","lab:concept/model-habit","#lv1")
e("lab:concept/cross-entropy-loss","lab:partOf","lab:method/sft","#lv2"); e("lab:concept/softmax","lab:prerequisiteOf","lab:concept/cross-entropy-loss","#lv2")
e("lab:concept/gradient-step","lab:partOf","lab:method/sft","#lv2"); e("lab:concept/learning-rate","lab:partOf","lab:concept/gradient-step","#lv3")
e("lab:concept/learning-rate","lab:partOf","lab:concept/learning-rate-epoch","#lv3"); e("lab:concept/epoch","lab:partOf","lab:concept/learning-rate-epoch","#lv3")
e("lab:concept/learning-rate-epoch","lab:partOf","lab:method/sft","#lv3")
e("lab:concept/label-noise","lab:raises","lab:concept/overfitting","#lv3"); e("lab:concept/train-test-split","lab:prerequisiteOf","lab:concept/overfitting","#lv3")
e("lab:concept/overfitting","lab:relatedTo","lab:concept/epoch","#lv3","mid")
e("lab:concept/low-rank","lab:partOf","lab:method/lora","#lv4"); e("lab:concept/frozen-weights","lab:partOf","lab:method/lora","#lv4"); e("lab:concept/adapter-swap","lab:partOf","lab:method/lora","#lv4")
e("lab:method/lora","lab:evaluatedBy","lab:metric/trainable-params","#lv4"); e("lab:method/few-shot-prompting","lab:evaluatedBy","lab:concept/prompt-length-cost","#lv1")
e("lab:method/few-shot-prompting","lab:evaluatedBy","lab:metric/test-accuracy","#lv1"); e("lab:method/sft","lab:evaluatedBy","lab:metric/test-accuracy","#lv2")
e("lab:method/sft","lab:evaluatedOn","lab:dataset/pebble-tickets","#lv2"); e("lab:method/few-shot-prompting","lab:evaluatedOn","lab:dataset/pebble-tickets","#lv1")
e("lab:concept/rlhf-mention","lab:relatedTo","lab:method/sft","#sum","mid")
e("lab:question/when-stop","lab:relatedTo","lab:concept/overfitting","#lv3")
e("lab:limitation/how-much-to-train","lab:raises","lab:question/when-stop","#lv3")
e("lab:question/core","lab:relatedTo","lab:topic/fine-tuning","#top")
for c,o,w,ev in [("lab:claim/lora-10000x","lab:method/lora","lab:work/hu2021lora",["F01"]),("lab:claim/instructgpt-preferred","lab:concept/rlhf-mention","lab:work/ouyang2022instructgpt",["F02"]),("lab:claim/gpt3-few-shot","lab:concept/in-context-learning","lab:work/brown2020fewshot",["F03"])]:
    e(c,"lab:supports",o,"#footer-src",ev=ev); e(c,"lab:assertedIn",w,"#footer-src",ev=ev)
e("lab:claim/toy-duel","lab:supports","lab:method/lora","#duel"); e("lab:claim/toy-duel","lab:assertedIn","lab:dataset/pebble-tickets","#duel")
for an,o,a in [("lab:analogy/manual-pages","lab:method/few-shot-prompting","#lv1"),("lab:analogy/red-pen","lab:method/sft","#lv2"),("lab:analogy/wrong-answer-key","lab:concept/label-noise","#lv3"),("lab:analogy/sticky-notes","lab:method/lora","#lv4")]:
    e(an,"lab:analogyOf",o,a)
for s,o,a in [("lab:sim/a2-fewshot","lab:concept/model-habit","#lv1"),("lab:sim/a2-sft","lab:concept/cross-entropy-loss","#lv2"),("lab:sim/a2-curve","lab:concept/overfitting","#lv3"),("lab:sim/a2-lora","lab:metric/trainable-params","#lv4")]:
    e(o,"lab:demonstratedBy",s,a)
for s,o in [("lab:method/sft","lab:topic/instruction-tuning"),("lab:method/lora","lab:area/llm-training"),("lab:concept/rlhf-mention","lab:topic/rlhf"),("lab:method/few-shot-prompting","lab:topic/few-shot"),("lab:task/ticket-routing","lab:topic/structured-output"),
            ("lab:topic/instruction-tuning","lab:area/llm-training"),("lab:topic/rlhf","lab:area/llm-training"),("lab:topic/few-shot","lab:area/llm-prompting"),("lab:topic/structured-output","lab:area/llm-prompting")]:
    e(s,"lab:broader",o,"#kg")
REGISTRY="KG_00_registry 0.3 + 응용편 A2 추가분, 분야 뼈대 backbone_llm 0.1"
REFS=[
 {"id":"hu2021lora","type":"paper-conference","title":"LoRA: Low-Rank Adaptation of Large Language Models","author":[{"family":"Hu","given":"Edward J."},{"family":"Shen","given":"Yelong"},{"family":"Wallis","given":"Phillip"},{"literal":"et al."}],
  "issued":{"date-parts":[[2021]]},"container-title":"International Conference on Learning Representations (ICLR 2022)","URL":"https://arxiv.org/abs/2106.09685","DOI":"10.48550/arXiv.2106.09685","accessed":{"date-parts":[[2026,11,27]]},
  "lab":{"work":"lab:work/hu2021lora","role":"background","supports":["lab:method/lora","lab:claim/lora-10000x"],"locs":[{"claim":"lab:claim/lora-10000x","loc":"초록","verified":True}],
   "verified":{"title":True,"authors":True,"year":True,"venue":True,"doi":True,"pages":False},"checkedBy":"웹 검색 2026-11-27 (arXiv, ICLR 2022 포스터 페이지)","note":"arXiv 2021 공개, ICLR 2022 발표. 쪽수 없음"}},
 {"id":"ouyang2022instructgpt","type":"paper-conference","title":"Training language models to follow instructions with human feedback","author":[{"family":"Ouyang","given":"Long"},{"family":"Wu","given":"Jeff"},{"family":"Jiang","given":"Xu"},{"literal":"et al."}],
  "issued":{"date-parts":[[2022]]},"container-title":"Advances in Neural Information Processing Systems","volume":"35","URL":"https://arxiv.org/abs/2203.02155","DOI":"10.48550/arXiv.2203.02155","accessed":{"date-parts":[[2026,11,27]]},
  "lab":{"work":"lab:work/ouyang2022instructgpt","role":"background","supports":["lab:concept/rlhf-mention","lab:claim/instructgpt-preferred"],"locs":[{"claim":"lab:claim/instructgpt-preferred","loc":"초록","verified":True}],
   "verified":{"title":True,"authors":True,"year":True,"venue":True,"doi":True,"pages":False},"checkedBy":"웹 검색 2026-11-27 (arXiv, NeurIPS 2022 포스터 페이지)","note":"쪽수 미확인"}},
 {"id":"brown2020fewshot","type":"paper-conference","title":"Language Models are Few-Shot Learners","author":[{"family":"Brown","given":"Tom B."},{"family":"Mann","given":"Benjamin"},{"family":"Ryder","given":"Nick"},{"literal":"et al."}],
  "issued":{"date-parts":[[2020]]},"container-title":"Advances in Neural Information Processing Systems","volume":"33","URL":"https://arxiv.org/abs/2005.14165","DOI":"10.48550/arXiv.2005.14165","accessed":{"date-parts":[[2026,11,27]]},
  "lab":{"work":"lab:work/brown2020fewshot","role":"background","supports":["lab:concept/in-context-learning","lab:claim/gpt3-few-shot"],"locs":[{"claim":"lab:claim/gpt3-few-shot","loc":"초록 (without any gradient updates or fine-tuning)","verified":True}],
   "verified":{"title":True,"authors":True,"year":True,"venue":True,"doi":True,"pages":False},"checkedBy":"웹 검색 2026-11-27 (arXiv, NeurIPS 2020 초록 페이지)","note":"쪽수 미확인"}},
]
META={"file":"A2_finetune_lab.html",
 "html":{"TITLE":"미세조정 연구실 — 회사의 답변 양식을 몸에 익히는 LLM","H1":"미세조정 연구실 — 회사의 답변 양식을 몸에 익히는 LLM","NUM":"2","ID":"A2","FILE":"A2_finetune_lab.html","DATE":"2026-11-27","DATESLASH":"2026/11/27",
  "DESC":"미세조정을 처음 보는 사람을 위한 연구실 해설. 퓨샷 예시, 지도 미세조정의 손실과 무게 고치기, 학습률·에포크와 과적합, LoRA를 직접 눌러 보고, 프롬프트 팀과 미세조정 팀의 3라운드 대항전으로 정리한다.",
  "OGDESC":"예시로 버틸까, 한 번 가르쳐 둘까 — 미세조정과 LoRA를 직접 눌러 보는 연구실 해설."},
 "meta":{"title":"미세조정 연구실 — 회사의 답변 양식을 몸에 익히는 LLM","series":"LLM 공식에서 GPT-6까지 · 응용편","number":"A2",
 "creator":[{"name":"안상선","role":"author","affiliation":"(주)M-Robo 대표","url":"https://adminmrobo.github.io/who_am_i/who_am_i.html"}],
 "contributor":[{"name":"AI 보조 제작","role":"assistant"}],"date":"2026-11-27","version":"1.0","language":["ko"],"license":"","url":"https://adminmrobo.github.io/llm_applied_lab/A2_finetune_lab.html",
 "about":["lab:topic/fine-tuning","lab:method/few-shot-prompting","lab:method/sft","lab:concept/overfitting","lab:method/lora"],
 "educationalLevel":"입문","learningResourceType":"interactive explainer","basedOn":["hu2021lora","ouyang2022instructgpt","brown2020fewshot"],
 "suggestedCitation":"안상선 (2026). 미세조정 연구실 — 회사의 답변 양식을 몸에 익히는 LLM. LLM 공식에서 GPT-6까지 응용편 A2, v1.0."}}
