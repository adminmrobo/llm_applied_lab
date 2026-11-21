# A1번 「RAG 연구실 — 사서가 찾아온 문장으로 LLM이 답한다」 이미지 제작 명세서

| 항목 | 값 |
|---|---|
| 시리즈 | LLM 공식에서 GPT-6까지 · 응용편 (A1) |
| 페이지 파일 | `A1_rag_lab.html` |
| 주 앵커 | D 생활·현장 (도서관 사서) — 7-3 표의 RAG 기본 앵커 |
| 대결 결과 | **R (주판봇 승)**, 1등 적중 3/8 vs 7/8, 차이 50%p (≥10%p) |
| 시즌 | 없음 (기본 낮의 연구실) |
| 그림체 | **16비트 RPG 픽셀아트** (캐릭터 팩 18-3). 일러스트풍 결과물은 받지 않는다 |

## 1. 그림체와 고정 외형

캐릭터 팩 `CHAR_lab4.md` 18-3·18-4 그대로. 프롬프트 공통 앞머리:
*Detailed 16-bit SNES-era RPG pixel art, crisp visible pixels, bold dark outline, 2–3 tone shading, small highlights, consistent with the reference images. Not an illustration, not a painting, not 3D.*
시즌 구절: *bright daytime laboratory mood, soft natural sunlight through large windows, clean white walls, light lavender, mint and pink accents*
금지 구절: *no text, no letters, no numbers, no logos, no weapons, no cigarettes, no alcohol, no blood, no real brands*

## 2. 필요한 그림 전체

> 2026-11-21: 그림 4장 받음·반영 완료 (`assets/img/`). 썸네일·og는 표지에서 잘라 만듦. 받은 그림 검토 메모는 6장 아래.

| 키 | 판 | 크기 | 들어가는 곳 | 상태 | 대신 쓰는 그림 | 우선 |
|---|---|---|---|---|---|---|
| `cover_A1` | L | 1920×1080 → 1600×900 | 표지 (`header.cover`) | **새로 그림** — 지시문 `COVER_A1_rag_lab.md` | CSS 서가 + 캐릭터 넷 대체 표지 | P1 |
| `cut_A1_lv3` | G | 960×540 | ③단계 짝 카드 아래 (선택) | 새로 그림 | 없음 (짝 카드 글로 충분) | P2 |
| `sc_A1_outro` | E | 1200×800 | 아웃트로 위 | 새로 그림 | 말풍선 4개만 | P2 |
| `cut_A1_versus` | G | 960×540 | 대결 머리 띠 | 새로 그림 | 캐릭터 그림 둘 + VS 글자 | P3 |
| `bg_A1` | F | 1920×720 | 히어로 배경 | 표지가 있으면 생략(표지를 잘라 씀) | 벌집 무늬 | P3 |
| `thumb_A1` | I | 600×400 | 시리즈 목차 카드 | 표지에서 3:2로 자름 | — | P2 |
| `og_A1` | K | 1200×630 | 공유 미리보기 (`og:image`) | 표지에서 자름 | — | P2 |
| 표정 21종 | A~D | 96 | 말풍선·단계 대화·수식 상자·대결 | **재사용** (캐릭터 팩 @86d04ac) | — | — |
| 사서 로봇 NPC | — | 14×14 픽셀 지도 | ②~⑤ 실험 서가 캔버스 | **코드** (페이지 안 픽셀 지도) | — | — |

재사용 표정 키: `doc_front` `doc_think` `doc_judge` `doc_magic` `doc_board` · `asst_smile` `asst_shock` `asst_spark` `asst_report` `asst_firm` · `fly_clip` `fly_point` `fly_cry` `fly_magnify` `fly_coffee` `fly_arms` · `robo_smile` `robo_coin` `robo_happy` `robo_calc` `robo_sigh` (공용 — 00번 참조)

결과 후 표정(5-8 표, 주판봇 승·차이 10%p 이상): 박사 `doc_judge` · 조수 `asst_spark` · 초파리 `fly_cry` · 주판봇 `robo_happy` — 페이지에 그대로 반영됨. 아웃트로의 초파리는 인정하는 장면이라 `fly_coffee`.

## 3. 새로 그릴 그림 상세

> v2 (2026-11-21): 프롬프트 원문은 Genspark 꾸러미 `../genspark_A1/`의 txt 파일이 기준입니다. 프롬프트 감사 결과는 `PROMPT_AUDIT_A1.md`(같은 폴더).


### 3-1. `cover_A1` — 서고에서 빛나는 카드 세 장
프롬프트: `../genspark_A1/요청1_표지.txt`

### 3-2. `cut_A1_lv3` — 프롬프트: `../genspark_A1/요청2_컷_2장.txt` 1번
####  — 주제 좌표 스티커를 붙이는 사서
| 항목 | 내용 |
|---|---|
| 장면 | 조수가 책등마다 작은 색 화살표 스티커(방향만 다른 화살표)를 붙이고, 초파리가 질문 카드에 붙은 화살표와 방향이 같은 책을 돋보기로 고른다 |
| 캐릭터 | 조수(왼쪽, 정면), 초파리(오른쪽에서 왼쪽을 봄) |
| 대체 글 | 조수가 책마다 방향 화살표 스티커를 붙이고 초파리 연구원이 같은 방향의 책을 고르는 픽셀아트 컷 |


### 3-3. `sc_A1_outro` — 프롬프트: `../genspark_A1/요청3_아웃트로.txt`
####  — 주판봇 승, 초파리는 커피를 들고 인정
| 항목 | 내용 |
|---|---|
| 장면 | 서고 앞. 주판봇이 앞에서 두 팔을 들고 기뻐하고(화면에 민트색 웃는 눈), 초파리는 뒤쪽에서 커피잔을 들고 반쯤 감은 눈으로 고개를 끄덕인다. 박사는 가운데 뒤에서 엄지, 조수는 빛나는 카드 세 장을 정리한다 |
| 규칙 | 18-8: 승자가 앞·크게, 패자도 같은 화면에서 인정하는 몸짓 (조롱 금지) |
| 대체 글 | 대결 뒤 서고 앞에서 주판봇이 기뻐하고 초파리 연구원이 커피를 들고 인정하는 픽셀아트 장면 |


### 3-4. `cut_A1_versus` — 프롬프트: `../genspark_A1/요청2_컷_2장.txt` 2번
####  — 대결 머리 (결과 전)
| 항목 | 내용 |
|---|---|
| 장면 | 왼쪽 초파리(오른쪽을 봄)는 글자 조각 블록을 맞춰 보는 자세, 오른쪽 주판봇(왼쪽을 봄)은 화살표 무늬 화면. 가운데 비어 있음(VS는 HTML 글자) |
| 규칙 | 결과 전 장면 — 승패 암시 금지 |
| 대체 글 | 대결 전 초파리 연구원과 주판봇이 서로 마주 보는 픽셀아트 띠 |


## 4. 일관성 지침
- 네 캐릭터 기본 그림 4장을 늘 참고 그림으로 함께 올린다. 표지를 먼저 받아 그림체를 확인한 뒤, 같은 대화에서 3-2~3-4를 이어서 요청한다(같은 비율끼리 묶기: G판 2장 → E판 1장).
- 결과를 64×64로 줄여 표정 그림과 나란히 놓고 머리 크기·색을 비교한다. 키 비율: 박사 1.00 · 조수 0.90 · 주판봇 0.72 · 초파리 0.41.
- 생물 앵커 페이지가 아니므로 현미경·초파리 해부 소품을 넣지 않는다.

## 5. 넘겨받은 뒤 처리
`build_character_pack.py --ingest ./받은그림 --plates cover_A1=L,cut_A1_lv3=G,sc_A1_outro=E,cut_A1_versus=G --out received_A1` → 표지는 18-15 절차, 나머지는 `data-img` 자리를 새로 만들어 넣는다. 합계 표지 포함 600 KB 이하(현재 페이지 319 KB, 캐릭터 그림 104 KB 포함).

## 6. 체크리스트
- [x] HTML의 `data-img` 키(`cover_A1`)가 명세서에 있음 — 나머지 키는 그림을 받으면 자리 생성
- [x] 결과 후 표정이 5-8 표와 일치 (R, 차이 ≥10%p → `fly_cry`)
- [x] 결과 전 그림(표지·versus)에 승패 암시 없음
- [x] 모든 프롬프트에 18-4 고정 외형·픽셀아트 구절·금지 구절 (프롬프트 감사 P1~P14 통과)
- [x] 장소가 D 앵커(도서관)와 일치, 현미경 소품 없음
- [x] P1 1장 (표지)

## 7. 매니페스트
```json
{"page":"A1_rag_lab","items":[
 {"key":"cover_A1","plate":"L","priority":"P1","status":"needed","alt":"낮의 연구실 서고에서 박사·조수·초파리 연구원·주판봇이 빛줄기가 닿은 문장 카드 세 장을 바라보는 픽셀아트 표지"},
 {"key":"cut_A1_lv3","plate":"G","priority":"P2","status":"needed"},
 {"key":"sc_A1_outro","plate":"E","priority":"P2","status":"needed"},
 {"key":"cut_A1_versus","plate":"G","priority":"P3","status":"needed"},
 {"key":"thumb_A1","plate":"I","priority":"P2","status":"crop_from:cover_A1"},
 {"key":"og_A1","plate":"K","priority":"P2","status":"crop_from:cover_A1"}]}
```

## 8. 받은 그림 검토 (2026-11-21)

| 그림 | 결과 | 메모 |
|---|---|---|
| cover_A1 | 반영 | 픽셀아트·낮·글자 없음·키 순서 맞음. 빛나는 카드 세 장, 초파리 돋보기, 주판봇 베이지 CRT 모두 맞음. 주판봇 화면이 화살표 무늬 대신 `> <` 웃는 눈 |
| cut_A1_lv3 | 반영 | 명세와 다름: 조수·초파리 두 명이 아니라 넷이 모두 나오고, 돋보기는 박사가 듦. 장면의 뜻(방향 스티커로 같은 방향 책 찾기)은 살아 있어 그대로 씀 |
| cut_A1_versus | 반영 | 가운데가 비어 있고 승패 암시 없음. 다만 왼쪽에 박사·조수가 초파리 편처럼 서 있음 |
| sc_A1_outro | 반영 | 주판봇이 앞에서 두 팔 들기, 초파리는 커피를 들고 인정, 박사 엄지, 조수 카드 정리 — 명세와 일치 |
