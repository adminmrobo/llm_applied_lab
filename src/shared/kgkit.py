"""응용편 공용 지식 색인 도구 (A1 build.py에서 분리, 분야 llm 뼈대에 broader로 건다)"""
import json
class KG:
    def __init__(s, page, domain=("llm",)):
        s.page=page; s.domain=list(domain); s.nodes=[]; s.E=[]
    def N(s, id, type, ko, en, anchor, definition=None, level=None, family="sequence", alt=None, evidence=None, conf="high", match=None, backbone=False):
        n={"id":id,"type":type,"label":{"ko":ko,"en":en},"page":s.page if not backbone else "backbone_llm","anchor":anchor,
           "family":family,"domain":s.domain,"anchorType":"D","flyStrength":"none","status":"known","confidence":conf}
        if definition: n["definition"]={"ko":definition}
        if level: n["level"]=level
        if alt: n["altLabel"]={"ko":alt}
        if evidence: n["evidence"]=evidence
        if match: n["match"]=match
        s.nodes.append(n); return n
    def e(s, sub, p, o, anchor, conf="high", ev=None):
        d={"s":sub,"p":p,"o":o,"anchor":anchor,"confidence":conf}
        if ev: d["evidence"]=ev
        s.E.append(d)
    def check(s):
        ids={n["id"] for n in s.nodes}
        assert len(ids)==len(s.nodes), "중복 ID"
        for x in s.E: assert x["s"] in ids and x["o"] in ids, x
        deg={i:0 for i in ids}
        for x in s.E: deg[x["s"]]+=1; deg[x["o"]]+=1
        iso=[i for i,d in deg.items() if d==0]; assert not iso, iso
        rel=sum(1 for x in s.E if x["p"]=="lab:relatedTo")/len(s.E); assert rel<=0.15, rel
        return rel
    def build(s, registry):
        rel=s.check()
        KG={"version":"1.0","page":s.page,"registry":registry,"nodes":s.nodes,"edges":s.E}
        ctx={"skos":"http://www.w3.org/2004/02/skos/core#","schema":"https://schema.org/","dct":"http://purl.org/dc/terms/","prov":"http://www.w3.org/ns/prov#","lab":"urn:lab:"}
        MAPT={"Work":"schema:ScholarlyArticle","Claim":"schema:Claim","Dataset":"schema:Dataset","Question":"schema:Question"}
        graph=[]
        for n in s.nodes:
            o={"@id":n["id"],"@type":["lab:"+n["type"],MAPT.get(n["type"],"skos:Concept")],
               "skos:prefLabel":[{"@value":n["label"]["ko"],"@language":"ko"},{"@value":n["label"]["en"],"@language":"en"}]}
            if "definition" in n: o["skos:definition"]={"@value":n["definition"]["ko"],"@language":"ko"}
            for x in s.E:
                if x["s"]==n["id"]:
                    k={"lab:partOf":"dct:isPartOf","lab:relatedTo":"skos:related","lab:assertedIn":"schema:citation","lab:broader":"skos:broader"}.get(x["p"],x["p"])
                    o.setdefault(k,[]).append({"@id":x["o"]})
            graph.append(o)
        return KG,{"@context":ctx,"@graph":graph},rel
BACKBONE={
 "lab:area/llm-training":("Area","사전학습과 정렬","Pretraining and alignment"),
 "lab:topic/instruction-tuning":("Topic","지시 튜닝","Instruction tuning"),
 "lab:topic/rlhf":("Topic","사람 피드백 강화학습(RLHF)","RLHF"),
 "lab:topic/preference-optimization":("Topic","선호 최적화(DPO 등)","Preference optimization (DPO etc.)"),
 "lab:area/llm-prompting":("Area","프롬프트 공학","Prompt engineering"),
 "lab:topic/few-shot":("Topic","퓨샷 예시","Few-shot examples"),
 "lab:topic/structured-output":("Topic","구조화 출력","Structured output"),
 "lab:area/llm-evaluation-llm":("Area","LLM 평가와 안전","LLM evaluation and safety"),
 "lab:topic/llm-benchmarks":("Topic","벤치마크","Benchmarks"),
 "lab:topic/llm-as-judge":("Topic","LLM 심사관","LLM-as-a-judge"),
 "lab:topic/hallucination":("Topic","환각","Hallucination"),
 "lab:topic/jailbreak-defense":("Topic","탈옥과 방어","Jailbreaks and defenses"),
 "lab:area/llm-agents":("Area","에이전트","Agents"),
 "lab:topic/tool-use":("Topic","도구 사용","Tool use"),
 "lab:topic/planning-agents":("Topic","계획과 반복 실행","Planning and iteration"),
 "lab:topic/multi-agent":("Topic","다중 에이전트","Multi-agent systems"),
 "lab:topic/agent-evaluation":("Topic","에이전트 평가","Agent evaluation"),
 "lab:area/llm-retrieval":("Area","검색 증강과 기억","Retrieval and memory"),
}
def add_backbone(kg, ids):
    for i in ids:
        t,ko,en=BACKBONE[i]
        kg.N(i,t,ko,en,"#kg",family="backbone",backbone=True)
