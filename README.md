# LLM 공식에서 GPT-6까지 · 응용편

「LLM 공식에서 GPT-6까지」 본편 뒤에 잇는 응용편 연구실 해설입니다. 비전공 독자가 버튼을 눌러 보며 따라오도록 만들었습니다.

| 편 | 제목 | 페이지 |
|---|---|---|
| A1 | RAG 연구실 — 사서가 찾아온 문장으로 LLM이 답한다 | [A1_rag_lab.html](https://adminmrobo.github.io/llm_applied_lab/A1_rag_lab.html) |
| A2 | 미세조정 (준비 중) | — |
| A3 | 평가 (준비 중) | — |
| A4 | 에이전트 (준비 중) | — |

## A1 구성
LLM 혼자 답하기 → 키워드 검색 → 임베딩과 코사인 유사도 → 청크와 상위 k개 → RAG 완성, 다섯 단계. 대결은 「글자로 찾을까, 뜻으로 찾을까」(주판봇 승, 3/8 대 7/8).
가상 회사 안내문 18문장·질문 8개와 뜻 숫자 8개는 설명용 예시 데이터입니다.

## 폴더
- `A1_rag_lab.html` — 한 파일로 완결된 해설 페이지 (지식 색인 `#kg`, 온톨로지·서지 꾸러미 `#export` 포함)
- `docs/` — 그림 명세서, 표지 지시문, 프롬프트 감사, 페르소나 평가
- `genspark_A1/` — Genspark 요청문 3개 (참고 그림은 `adminmrobo/fruitfly-lab-expressions`)
- `kg/` — 지식 그래프, 개념 등록부 추가분
- `src/` — 예시 데이터 생성·빌드 스크립트 (`python3 build.py`)
- `cover_manifest.json` — 표지 현황판용 그림 목록

## 출처
- Lewis, P. 외 (2020). Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks. NeurIPS 33.
- Johnson, J., Douze, M., Jégou, H. Billion-scale similarity search with GPUs. IEEE Transactions on Big Data 7(3).
- LangChain 레퍼런스, RetrievalQA (deprecated).
- 원자료: ML Tut 인포그래픽 「Retrieval-Augmented Generation (RAG)」 (발행일·주소 확인 필요)

캐릭터 그림: adminmrobo/fruitfly-lab-expressions

글 · 안상선 (https://adminmrobo.github.io/who_am_i/who_am_i.html) · (주)M-Robo 대표
