# LLM 공식에서 GPT-6까지 · 응용편

「LLM 공식에서 GPT-6까지」 본편 뒤에 잇는 응용편 연구실 해설입니다. 비전공 독자가 버튼을 눌러 보며 따라오도록 만들었습니다. 목차: [index.html](https://adminmrobo.github.io/llm_applied_lab/)

| 편 | 제목 | 형식 | 페이지 |
|---|---|---|---|
| A1 | RAG 연구실 — 사서가 찾아온 문장으로 LLM이 답한다 | 1:1 대결 (초파리 vs 주판봇) | [A1_rag_lab.html](https://adminmrobo.github.io/llm_applied_lab/A1_rag_lab.html) |
| A2 | 미세조정 연구실 — 회사의 답변 양식을 몸에 익히는 LLM | 팀 대항전 3라운드 (초파리·시아 vs 주판봇·모아) | [A2_finetune_lab.html](https://adminmrobo.github.io/llm_applied_lab/A2_finetune_lab.html) |
| A3 | 평가 연구실 — 「10문항 중 9개」는 얼마나 믿을 만한가 | 개인전 리그 4인, 미공개 X1~X3 블라인드 심사 | [A3_eval_lab.html](https://adminmrobo.github.io/llm_applied_lab/A3_eval_lab.html) |
| A4 | 에이전트 연구실 — 도구를 쓰고, 확인하고, 멈출 줄 아는 AI | 협동 레이드 (여섯 식구 전원, 한 명씩 빼 보기) | [A4_agent_lab.html](https://adminmrobo.github.io/llm_applied_lab/A4_agent_lab.html) |

## 편마다 구성
- **A1**: LLM 혼자 답하기 → 키워드 검색 → 임베딩과 코사인 유사도 → 청크와 상위 k개 → RAG 완성. 대결 「글자로 찾을까, 뜻으로 찾을까」(주판봇 승, 3/8 대 7/8).
- **A2**: 퓨샷 예시 → 지도 미세조정(손실 −ln p와 무게 고치기) → 학습률·에포크·기록 실수(과적합) → LoRA. 팀 대항전: 정확도 11 대 12, 호출당 글자 432 대 26, 규칙이 바뀐 날 3 대 0 → 미세조정 팀 2:1.
- **A3**: EM·F1 → 블라인드 쌍대 비교와 엘로 점수 → LLM 심판의 위치·길이 편향 → 신뢰구간과 문항 수. 리그: 사람 심사 1위 모아(22승), 초파리·주판봇 공동 2위(18승), 한 번 본 LLM 심판의 1위는 주판봇.
- **A4**: 도구 호출 → ReAct 고리와 걸음 예산 → 곱해지는 실수와 확인 → 프롬프트 주입과 세 겹 안전장치. 레이드: 시아(확인)가 빠지면 기대 해결 5.64 → 4.13건으로 가장 크게 무너짐.

가상 회사 Pebble Lamp Co.의 문서·문의·주문·답변·심사표는 모두 설명용 예시 데이터입니다.

## 폴더
- `A?_*.html` — 한 파일로 완결된 해설 페이지 (지식 색인 `#kg`, 온톨로지·서지 꾸러미 `#export`, 픽셀 깨짐 보정 코드 px-fix v1 포함)
- `src/shared/` — A2~A4 공용 틀 (스타일, 캐릭터·용어·퀴즈·지식 색인·꾸러미 스크립트, 조립 `build_page.py`, 지식 색인 도구 `kgkit.py`)
- `src/A2`~`src/A4` — 편마다 `body.html`(본문), `page.js`(실험), `core.js`(계산, node로 검산 가능), `gen.py`·`data.json`(예시 데이터), `kg_def.py`(지식 색인·서지), `sprites.txt`(쓰는 표정 그림)
- `src/verify_numbers.js` — 본문에 적은 숫자 105개를 다시 계산해 확인 (`node src/verify_numbers.js`)
- `docs/` — 그림 명세서·표지 지시문(`IMG_COVER_A2_A4.md`), 페르소나 평가(`PERSONA_A2_A4.md`), A1 문서
- `genspark_A1`~`genspark_A4` — Genspark 그림 요청문, `genspark_refs/` — 참고 그림 8장과 공통 블록
- `kg/` — 편마다 지식 그래프 JSON

## 만들기
```
cd src
python3 shared/build_page.py A2   # A3, A4도 같음 (캐릭터 팩 경로: 환경 변수 LAB_PACK)
node verify_numbers.js
```
A1은 `src/build.py`(옛 방식)로 만듭니다.

## 출처
- A1: Lewis 외 (2020) RAG · Johnson 외 FAISS · LangChain RetrievalQA · ML Tut RAG 인포그래픽
- A2: Hu 외 (2021) LoRA · Ouyang 외 (2022) InstructGPT · Brown 외 (2020) GPT-3
- A3: Rajpurkar 외 (2016) SQuAD · Zheng 외 (2023) LLM-as-a-Judge · Chiang 외 (2024) Chatbot Arena
- A4: Yao 외 (2023) ReAct · Schick 외 (2023) Toolformer · Greshake 외 (2023) 간접 프롬프트 주입

캐릭터 그림: adminmrobo/fruitfly-lab-expressions (캐릭터 설정·그림 저작권 안상선)

글 · 안상선 (https://adminmrobo.github.io/who_am_i/who_am_i.html) · (주)M-Robo 대표
