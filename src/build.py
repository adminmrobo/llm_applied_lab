import json
PAGE = "A1_rag_lab"
def N(id, type, ko, en, anchor, definition=None, level=None, family="sequence", alt=None, evidence=None, conf="high", match=None):
    n = {"id": id, "type": type, "label": {"ko": ko, "en": en}, "page": PAGE, "anchor": anchor,
         "family": family, "domain": ["ai"], "anchorType": "D", "flyStrength": "none",
         "status": "known", "confidence": conf}
    if definition: n["definition"] = {"ko": definition}
    if level: n["level"] = level
    if alt: n["altLabel"] = {"ko": alt}
    if evidence: n["evidence"] = evidence
    if match: n["match"] = match
    return n
nodes = [
 N("lab:method/closed-book-llm","Method","LLM 혼자 답하기","Closed-book LLM answering","#lv1","질문만 건네고 LLM이 학습 때 배운 것만으로 답하게 하는 방법.",1,evidence=["F05"]),
 N("lab:method/keyword-search","Method","키워드 검색","Keyword search","#lv2","질문과 같은 글자의 단어가 많은 문장을 고르는 검색.",2,evidence=["F06"]),
 N("lab:method/embedding-search","Method","뜻으로 찾기 (임베딩 검색)","Dense embedding retrieval","#lv3","문장을 뜻 벡터로 바꾸고 코사인 유사도가 높은 문장을 고르는 검색.",3,evidence=["F07"]),
 N("lab:method/chunk-topk-retrieval","Method","조각 + 상위 k개 검색","Chunked top-k retrieval","#lv4","문서를 조각으로 자르고 점수 상위 k개 조각을 가져오는 검색.",4,evidence=["F08"]),
 N("lab:topic/rag","Method","검색 증강 생성 (RAG)","Retrieval-augmented generation","#lv5","답하기 전에 관련 문장을 찾아 질문과 함께 LLM에 건네는 방법.",5,alt=["RAG"],evidence=["F01","F09"],
   match=[{"scheme":"wikidata","id":"","rel":"closeMatch","verified":False}]),
 N("lab:topic/word-embedding","Concept","임베딩","Embedding","#lv3","문장의 뜻을 숫자 줄(벡터)로 바꾸는 일. 뜻이 비슷하면 방향이 비슷하다.",3),
 N("lab:concept/cosine-similarity","Metric","코사인 유사도","Cosine similarity","#lv3","두 벡터 사이 각도의 cos. 1이면 같은 방향, 0이면 무관, −1이면 반대.",3,evidence=["F02","F03"]),
 N("lab:concept/dot-product","Term","내적","Dot product","#lv3","같은 자리 숫자끼리 곱해 모두 더한 값.",3),
 N("lab:concept/l2-norm","Term","벡터의 길이 (L2 노름)","L2 norm","#lv3","숫자를 제곱해 더한 뒤 제곱근을 씌운 값. 피타고라스 정리와 같다.",3),
 N("lab:concept/vector-database","Concept","벡터 DB","Vector database","#big","조각과 그 숫자 줄을 모아 두고 비슷한 것을 빨리 찾는 저장소.",4,evidence=["F04"]),
 N("lab:concept/chunk","Concept","청크 (조각)","Chunk","#lv4","긴 문서를 검색하기 좋게 자른 한 조각.",4),
 N("lab:concept/chunk-overlap","Term","조각 겹침","Chunk overlap","#lv4","앞 조각과 겹치게 자르는 문장(글자) 수.",4),
 N("lab:concept/top-k","Term","상위 k개 (top-k)","Top-k","#lv4","점수가 높은 순서로 k개만 가져오기.",4),
 N("lab:topic/prompting","Concept","프롬프트","Prompt","#lv5","LLM에 건네는 지시문. 여기서는 지시 + 조각 + 질문.",5),
 N("lab:concept/hallucination","Concept","환각","Hallucination","#why","근거 없이 그럴듯한 내용을 지어내는 일.",1),
 N("lab:concept/citation-check","Concept","출처 확인","Citation check","#lv5","답에 붙은 조각 번호가 프롬프트 안의 조각과 맞는지 대조하는 일.",5),
 N("lab:concept/indexing-phase","Concept","준비 단계 (색인)","Indexing phase","#big","문서 읽기·자르기·임베딩·서가에 꽂기를 미리 한 번 하는 단계.",2),
 N("lab:concept/query-phase","Concept","질문 단계","Query phase","#big","질문을 숫자로 바꾸고 찾은 조각과 함께 LLM에 건네는 단계.",2),
 N("lab:concept/next-token-probability","Concept","다음 말 확률","Next-token probability","#lv1","앞 문장이 주어졌을 때 다음에 올 말의 조건부 확률.",1),
 N("lab:task/document-qa","Task","문서 기반 질의응답","Document question answering","#first","정해진 문서 안에서 근거를 찾아 질문에 답하는 일.",1),
 N("lab:metric/top1-hit","Metric","1등 적중 수","Top-1 hit count","#duel","근거 문장을 점수 1등으로 찾은 질문 수.",3),
 N("lab:metric/context-size","Metric","보낸 문장 수","Context size (sentences)","#lv4","질문 하나에 LLM으로 보내는 문장 수.",4),
 N("lab:dataset/pebble-lamp-toy","Dataset","가상 회사 안내문 18문장","Pebble Lamp toy corpus","#lv2","설명용으로 만든 가상 회사의 영어 안내문 18문장과 질문 8개.",2),
 N("lab:tool/faiss","Method","FAISS","FAISS","#lv3","비슷한 벡터를 빠르게 찾는 공개 도구.",4,family="systems",evidence=["F04"]),
 N("lab:tool/langchain-retrieval-chain","Method","LangChain 검색 묶음","LangChain retrieval chain","#lv5","검색기와 LLM을 한 흐름으로 잇는 LangChain의 묶음.",5,family="systems",evidence=["F09"]),
 # limitations
 N("lab:limitation/no-grounding","Limitation","근거가 없다","No grounding","#lv1","맞는 답과 지어낸 답을 가려낼 수 없다.",1),
 N("lab:limitation/synonym-miss","Limitation","다른 말로 물으면 놓친다","Misses synonyms","#lv2","글자가 같아야만 찾는다.",2),
 N("lab:limitation/top1-fragile","Limitation","1등 하나는 근소한 차이에 틀린다","Top-1 is fragile","#lv3","가장 비슷한 하나만 믿으면 근소한 차이에 틀린다.",3),
 N("lab:limitation/no-answer-yet","Limitation","찾기만 하고 답은 없다","Retrieval without an answer","#lv4","조각을 찾아도 질문에 맞춘 답을 쓰지 못한다.",4),
 N("lab:limitation/retrieval-bound","Limitation","검색이 틀리면 답도 틀린다","Bounded by retrieval quality","#lv5","답의 품질은 검색 품질을 넘지 못한다.",5),
 # claims
 N("lab:claim/rag-lewis-2020","Claim","RAG라는 이름은 2020년 Lewis 외 논문에서 나왔다","RAG introduced by Lewis et al. 2020","#top",evidence=["F01"]),
 N("lab:claim/cosine-example-0997","Claim","원자료 숫자 5개짜리 예시의 코사인 유사도는 0.997이다","Infographic example cosine = 0.997","#lv3",evidence=["F03"]),
 N("lab:claim/faiss-cosine","Claim","FAISS는 길이를 1로 맞춘 벡터의 내적으로 코사인 유사도를 계산할 수 있다","FAISS supports cosine via normalized inner product","#lv3",evidence=["F04"],conf="mid"),
 N("lab:claim/retrievalqa-deprecated","Claim","RetrievalQA 묶음은 쓰지 말 것 표시가 붙었고 create_retrieval_chain이 안내된다","RetrievalQA is deprecated","#lv5",evidence=["F09"]),
 N("lab:claim/toy-kw-3-em-7","Claim","장난감 데이터에서 1등 적중은 단어 겹침 3/8, 뜻 검색 7/8이다","Toy result: keyword 3/8, embedding 7/8","#duel",evidence=["F06","F07"]),
 # questions
 N("lab:question/core","Question","LLM이 읽지 못한 우리 회사 문서로 어떻게 근거 있는 답을 받을까?","How to get grounded answers from unseen documents?","#top"),
 N("lab:question/duel","Question","글자로 찾을까, 뜻으로 찾을까?","Keyword or meaning?","#duel"),
 N("lab:question/infographic-source","Question","원자료 인포그래픽의 발행일과 주소는? (확인 필요)","Infographic publication date and URL (unverified)","#footer-src",conf="low"),
 # analogies
 N("lab:analogy/closed-book-exam","Analogy","책 없이 치르는 시험","Closed-book exam","#lv1"),
 N("lab:analogy/index-lookup","Analogy","책 뒤 찾아보기","Book index lookup","#lv2"),
 N("lab:analogy/librarian-coords","Analogy","주제 좌표가 붙은 서가와 사서","Librarian with topic coordinates","#lv3"),
 N("lab:analogy/photocopy-pages","Analogy","쪽만 복사해 오기","Photocopying pages","#lv4"),
 N("lab:analogy/open-book-exam","Analogy","오픈북 시험","Open-book exam","#lv5"),
 # works
 N("lab:work/lewis2020retrieval","Work","Lewis 외 (2020) RAG 논문","Lewis et al. 2020","#sum"),
 N("lab:work/johnson2019billion","Work","Johnson·Douze·Jégou FAISS 논문","Johnson, Douze, Jegou (2019)","#sum"),
 N("lab:work/langchain-retrievalqa-ref","Work","LangChain 레퍼런스 RetrievalQA","LangChain reference: RetrievalQA","#sum"),
 N("lab:work/mltut-rag-infographic","Work","ML Tut RAG 인포그래픽 (원자료)","ML Tut RAG infographic","#sum"),
 # simulations
 N("lab:sim/a1-closed-book","Simulation","실험 ① 책 없이 답하기","Sim 1 closed-book","#lv1"),
 N("lab:sim/a1-keyword","Simulation","실험 ② 단어 겹침","Sim 2 keyword","#lv2"),
 N("lab:sim/a1-cosine","Simulation","실험 ③ 각도와 뜻 검색","Sim 3 cosine","#lv3"),
 N("lab:sim/a1-chunk","Simulation","실험 ④ 조각·겹침·k","Sim 4 chunk","#lv4"),
 N("lab:sim/a1-prompt","Simulation","실험 ⑤ 프롬프트 조립","Sim 5 prompt","#lv5"),
]
for n in nodes:
    if n["id"].startswith("lab:topic/") or n["id"] in ("lab:topic/word-embedding",): pass
E = []
def e(s,p,o,anchor,conf="high",ev=None):
    d={"s":s,"p":p,"o":o,"anchor":anchor,"confidence":conf}
    if ev: d["evidence"]=ev
    E.append(d)
L=["lab:method/closed-book-llm","lab:method/keyword-search","lab:method/embedding-search","lab:method/chunk-topk-retrieval","lab:topic/rag"]
LIM=["lab:limitation/no-grounding","lab:limitation/synonym-miss","lab:limitation/top1-fragile","lab:limitation/no-answer-yet","lab:limitation/retrieval-bound"]
A=["#lv1","#lv2","#lv3","#lv4","#lv5"]
for i in range(5):
    e(L[i],"lab:hasLimitation",LIM[i],A[i])
    if i<4:
        e(L[i],"lab:prerequisiteOf",L[i+1],A[i+1]); e(LIM[i],"lab:addressedBy",L[i+1],A[i+1])
e("lab:limitation/retrieval-bound","lab:raises","lab:question/core","#lv5")
e("lab:limitation/no-grounding","lab:raises","lab:concept/hallucination","#why")
e("lab:method/closed-book-llm","lab:relatedTo","lab:concept/hallucination","#why")
e("lab:method/embedding-search","lab:partOf","lab:topic/rag","#big")
e("lab:method/chunk-topk-retrieval","lab:partOf","lab:topic/rag","#big")
e("lab:topic/word-embedding","lab:partOf","lab:method/embedding-search","#lv3")
e("lab:concept/cosine-similarity","lab:partOf","lab:method/embedding-search","#lv3")
e("lab:concept/dot-product","lab:partOf","lab:concept/cosine-similarity","#lv3")
e("lab:concept/l2-norm","lab:partOf","lab:concept/cosine-similarity","#lv3")
e("lab:concept/vector-database","lab:partOf","lab:concept/indexing-phase","#big")
e("lab:concept/chunk","lab:partOf","lab:concept/indexing-phase","#big")
e("lab:topic/word-embedding","lab:partOf","lab:concept/indexing-phase","#big")
e("lab:concept/indexing-phase","lab:partOf","lab:topic/rag","#big")
e("lab:concept/query-phase","lab:partOf","lab:topic/rag","#big")
e("lab:concept/top-k","lab:partOf","lab:concept/query-phase","#big")
e("lab:topic/prompting","lab:partOf","lab:concept/query-phase","#lv5")
e("lab:concept/chunk-overlap","lab:partOf","lab:concept/chunk","#lv4")
e("lab:concept/chunk","lab:partOf","lab:method/chunk-topk-retrieval","#lv4")
e("lab:concept/top-k","lab:partOf","lab:method/chunk-topk-retrieval","#lv4")
e("lab:concept/citation-check","lab:partOf","lab:topic/rag","#lv5")
e("lab:concept/citation-check","lab:addressedBy","lab:limitation/no-grounding","#lv5","mid")
e("lab:concept/next-token-probability","lab:partOf","lab:method/closed-book-llm","#lv1")
e("lab:topic/rag","lab:solves","lab:task/document-qa","#first")
e("lab:method/closed-book-llm","lab:solves","lab:task/document-qa","#lv1","mid")
e("lab:method/keyword-search","lab:contrastsWith","lab:method/embedding-search","#duel")
e("lab:method/keyword-search","lab:evaluatedBy","lab:metric/top1-hit","#duel")
e("lab:method/embedding-search","lab:evaluatedBy","lab:metric/top1-hit","#duel")
e("lab:method/chunk-topk-retrieval","lab:evaluatedBy","lab:metric/context-size","#lv4")
e("lab:method/keyword-search","lab:evaluatedOn","lab:dataset/pebble-lamp-toy","#lv2")
e("lab:method/embedding-search","lab:evaluatedOn","lab:dataset/pebble-lamp-toy","#lv3")
e("lab:tool/faiss","lab:partOf","lab:concept/vector-database","#lv3")
e("lab:tool/langchain-retrieval-chain","lab:relatedTo","lab:topic/rag","#lv5")
e("lab:question/duel","lab:raises","lab:method/embedding-search","#duel")
e("lab:limitation/synonym-miss","lab:raises","lab:question/duel","#duel")
e("lab:question/infographic-source","lab:relatedTo","lab:work/mltut-rag-infographic","#sum","low")
# claims
for c,o,w,ev in [("lab:claim/rag-lewis-2020","lab:topic/rag","lab:work/lewis2020retrieval",["F01"]),
                 ("lab:claim/cosine-example-0997","lab:concept/cosine-similarity","lab:work/mltut-rag-infographic",["F03"]),
                 ("lab:claim/faiss-cosine","lab:tool/faiss","lab:work/johnson2019billion",["F04"]),
                 ("lab:claim/retrievalqa-deprecated","lab:tool/langchain-retrieval-chain","lab:work/langchain-retrievalqa-ref",["F09"])]:
    e(c,"lab:supports",o,"#sum",ev=ev); e(c,"lab:assertedIn",w,"#sum",ev=ev)
e("lab:claim/toy-kw-3-em-7","lab:supports","lab:method/embedding-search","#duel",ev=["F06","F07"])
e("lab:claim/toy-kw-3-em-7","lab:assertedIn","lab:dataset/pebble-lamp-toy","#duel",ev=["F06","F07"])
e("lab:topic/rag","lab:assertedIn","lab:work/lewis2020retrieval","#footer")
e("lab:topic/rag","lab:assertedIn","lab:work/mltut-rag-infographic","#footer")
# analogies
for an,o,a in [("lab:analogy/closed-book-exam","lab:method/closed-book-llm","#lv1"),("lab:analogy/index-lookup","lab:method/keyword-search","#lv2"),
               ("lab:analogy/librarian-coords","lab:method/embedding-search","#lv3"),("lab:analogy/photocopy-pages","lab:method/chunk-topk-retrieval","#lv4"),
               ("lab:analogy/open-book-exam","lab:topic/rag","#lv5")]:
    e(an,"lab:analogyOf",o,a)
for s,o,a in [("lab:sim/a1-closed-book","lab:concept/next-token-probability","#lv1"),("lab:sim/a1-keyword","lab:method/keyword-search","#lv2"),
              ("lab:sim/a1-cosine","lab:concept/cosine-similarity","#lv3"),("lab:sim/a1-chunk","lab:concept/top-k","#lv4"),("lab:sim/a1-prompt","lab:topic/prompting","#lv5")]:
    e(o,"lab:demonstratedBy",s,a)
ids={n["id"] for n in nodes}
for x in E: assert x["s"] in ids and x["o"] in ids, x
deg={i:0 for i in ids}
for x in E: deg[x["s"]]+=1; deg[x["o"]]+=1
iso=[i for i,d in deg.items() if d==0]; assert not iso, iso
rel=sum(1 for x in E if x["p"]=="lab:relatedTo")/len(E); assert rel<=0.15, rel
KG={"version":"1.0","page":PAGE,"registry":"KG_00_registry 0.2 + A1 추가분","nodes":nodes,"edges":E}

ctx={"skos":"http://www.w3.org/2004/02/skos/core#","schema":"https://schema.org/","dct":"http://purl.org/dc/terms/","prov":"http://www.w3.org/ns/prov#","lab":"urn:lab:"}
MAPT={"Work":"schema:ScholarlyArticle","Claim":"schema:Claim","Dataset":"schema:Dataset","Question":"schema:Question"}
graph=[]
for n in nodes:
    o={"@id":n["id"],"@type":["lab:"+n["type"],MAPT.get(n["type"],"skos:Concept")],
       "skos:prefLabel":[{"@value":n["label"]["ko"],"@language":"ko"},{"@value":n["label"]["en"],"@language":"en"}]}
    if "definition" in n: o["skos:definition"]={"@value":n["definition"]["ko"],"@language":"ko"}
    for x in E:
        if x["s"]==n["id"]:
            k={"lab:partOf":"dct:isPartOf","lab:relatedTo":"skos:related","lab:assertedIn":"schema:citation"}.get(x["p"],x["p"])
            o.setdefault(k,[]).append({"@id":x["o"]})
    graph.append(o)
LD={"@context":ctx,"@graph":graph}

REFS=[
 {"id":"lewis2020retrieval","type":"paper-conference","title":"Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
  "author":[{"family":"Lewis","given":"Patrick"},{"family":"Perez","given":"Ethan"},{"family":"Piktus","given":"Aleksandra"},{"literal":"et al."}],
  "issued":{"date-parts":[[2020]]},"container-title":"Advances in Neural Information Processing Systems","volume":"33","URL":"https://arxiv.org/abs/2005.11401",
  "accessed":{"date-parts":[[2026,11,20]]},
  "lab":{"work":"lab:work/lewis2020retrieval","role":"background","supports":["lab:topic/rag","lab:claim/rag-lewis-2020"],
   "locs":[{"claim":"lab:claim/rag-lewis-2020","loc":"초록","verified":True}],
   "verified":{"title":True,"authors":True,"year":True,"venue":True,"doi":False,"pages":False},"checkedBy":"웹 검색 2026-11-20 (NeurIPS 2020 초록 페이지, arXiv)","note":"DOI·쪽수 미확인"}},
 {"id":"johnson2019billion","type":"article-journal","title":"Billion-scale similarity search with GPUs",
  "author":[{"family":"Johnson","given":"Jeff"},{"family":"Douze","given":"Matthijs"},{"family":"Jégou","given":"Hervé"}],
  "issued":{"date-parts":[[2019]]},"container-title":"IEEE Transactions on Big Data","volume":"7","issue":"3","page":"535-547","URL":"https://arxiv.org/abs/1702.08734",
  "accessed":{"date-parts":[[2026,11,20]]},
  "lab":{"work":"lab:work/johnson2019billion","role":"background","supports":["lab:tool/faiss","lab:claim/faiss-cosine"],
   "locs":[{"claim":"lab:claim/faiss-cosine","loc":"FAISS 저장소 README (코사인 = 정규화한 벡터의 내적)","verified":False}],
   "verified":{"title":True,"authors":True,"year":True,"venue":True,"doi":False,"pages":True},"checkedBy":"웹 검색 2026-11-20 (IEEE Xplore 초록, arXiv)","note":"2019 온라인 공개, 권호는 2021년 7권 3호. 코사인 주장은 논문이 아니라 FAISS 저장소 설명에 근거"}},
 {"id":"langchain2026retrievalqa","type":"webpage","title":"RetrievalQA — LangChain Python Reference (langchain-classic)",
  "author":[{"literal":"LangChain"}],"container-title":"LangChain Reference","URL":"https://reference.langchain.com/python/langchain-classic/chains/retrieval_qa/base/RetrievalQA",
  "accessed":{"date-parts":[[2026,11,20]]},
  "lab":{"work":"lab:work/langchain-retrievalqa-ref","role":"software","supports":["lab:tool/langchain-retrieval-chain","lab:claim/retrievalqa-deprecated"],
   "locs":[{"claim":"lab:claim/retrievalqa-deprecated","loc":"클래스 설명 (deprecated 안내와 create_retrieval_chain 예시)","verified":True}],
   "verified":{"title":True,"authors":True,"year":False,"venue":True,"doi":True,"pages":True},"checkedBy":"웹 검색 2026-11-20","note":"발행 연도 없음 (온라인 문서)"}},
 {"id":"mltut2026rag","type":"webpage","title":"Retrieval-Augmented Generation (RAG) [infographic]",
  "author":[{"literal":"ML Tut"}],
  "lab":{"work":"lab:work/mltut-rag-infographic","role":"primary","supports":["lab:topic/rag","lab:claim/cosine-example-0997"],
   "locs":[{"claim":"lab:claim/cosine-example-0997","loc":"Embedding Example 상자","verified":True}],
   "verified":{"title":True,"authors":False,"year":False,"venue":False,"doi":False,"pages":True},"checkedBy":"사용자 제공 이미지 (2026-11-16)","note":"발행일·주소 확인 필요. 그림 오른쪽 위 ML Tut 표시로 출처 추정"}},
]
META={"title":"RAG 연구실 — 사서가 찾아온 문장으로 LLM이 답한다","series":"LLM 공식에서 GPT-6까지 · 응용편","number":"A1",
 "creator":[{"name":"안상선","role":"author","affiliation":"(주)M-Robo 대표","url":"https://adminmrobo.github.io/who_am_i/who_am_i.html"}],
 "contributor":[{"name":"AI 보조 제작","role":"assistant"}],"date":"2026-11-20","version":"1.0","language":["ko"],"license":"","url":"https://adminmrobo.github.io/llm_applied_lab/A1_rag_lab.html",
 "about":["lab:topic/rag","lab:method/embedding-search","lab:concept/cosine-similarity","lab:method/chunk-topk-retrieval","lab:topic/prompting"],
 "educationalLevel":"입문","learningResourceType":"interactive explainer","basedOn":["mltut2026rag","lewis2020retrieval"],
 "suggestedCitation":"안상선 (2026). RAG 연구실 — 사서가 찾아온 문장으로 LLM이 답한다. LLM 공식에서 GPT-6까지 응용편 A1, v1.0."}

def js(o): return json.dumps(o,ensure_ascii=False).replace("</","<\\/")
t=open("template.html").read()
t=t.replace("__KGRAW__",js(KG)).replace("__KGLD__",js(LD)).replace("__REFS__",js(REFS)).replace("__META__",js(META))
t=t.replace("__SPRITE__",open("sprite96.js").read()).replace("__DATA__",js(json.load(open("data.json"))))
t=t.replace("__APPJS__",open("app.js").read())
open("A1_rag_lab.html","w").write(t)
json.dump(KG,open("kg_A1.json","w"),ensure_ascii=False,indent=1)
print("nodes",len(nodes),"edges",len(E),"relatedTo%",round(rel*100,1),"size",len(t.encode())//1024,"KB")
EOF_MARK=None
