# 표지 지시문 — A1 RAG 연구실 (LLM 공식에서 GPT-6까지 · 응용편 1)

| 항목 | 내용 |
|---|---|
| 키 · 판 | cover_A1 · L (16:9, 가로 1920 이상) |
| 그림체 | **16비트 RPG 픽셀아트** (SNES 시대풍 도트, 굵은 어두운 외곽선, 2~3단 명암). 일러스트풍·수채화풍·3D 렌더 금지 |
| 장소 (앵커) | D 생활·현장 — 낮의 연구실 안에 꾸민 작은 도서관 서고 (키 큰 나무 책장, 연보라 실험 소품 몇 개) |
| 주제 은유 | 질문 카드에서 뻗은 가는 빛줄기가 서가의 카드 세 장(상위 k개)에 닿아 은은하게 빛난다. 카드에는 글자 없이 줄무늬만 |
| 네 캐릭터 포즈 | 박사: 가운데 뒤에서 서가를 손바닥으로 가리키며 손끝에 작은 보랏빛 불꽃 / 조수: 오른쪽 앞, 빛나는 카드 세 장과 클립보드를 품에 안고 미소 / 초파리: 왼쪽에서 오른쪽을 보며 돋보기로 카드 모서리의 꼬리표를 살핌 / 주판봇: 오른쪽에서 왼쪽을 보며 나무 주판을 들고, 초록 화면에 민트색 작은 화살표 무늬(숫자 없음) |
| 대체 글 (alt) | 낮의 연구실 서고에서 박사·조수·초파리 연구원·주판봇이 빛줄기가 닿은 문장 카드 세 장을 바라보는 픽셀아트 표지 |
| 앞 표지와 다른 점 | 본편 표지들(연구실 전경·개념 지도·칠판 장면)과 겹치지 않게 장소를 **서고**로, 소품을 **빛나는 카드 세 장**으로 바꿈. 대결 결과(주판봇 승)를 암시하는 표정·배치 없음 |

**참고 이미지 (함께 올리기):** 꾸러미 안 5장 — `ref_lab4_lineup.png`(네 캐릭터 단체), `ref_k02_doctor.png`·`ref_k03_haru.png`·`ref_k04_fly.png`(3면도), `ref_jupanbot_E13.png`(주판봇 v2). 같은 대화에서 표지를 먼저 받아 그림체를 확인한 뒤 장면 그림에 참고 그림으로 함께 올린다.

**Genspark에 붙여 넣기 ↓** (v2, 프롬프트 감사 적용 · 원본 파일 `genspark_A1/요청1_표지.txt`)
```
16:9 wide website cover illustration, at least 1920x1080.
SCENE: a small library corner built inside the bright daytime lab: tall light-wood bookshelves holding rows of blank cards with simple striped lines instead of writing; a reading desk on the left with one small blank question card on it. A thin beam of soft green light runs from that question card to exactly three cards on the shelves, which glow gently; every other card stays plain.
POSES:
- Professor: center, slightly behind, presenting the shelves with an open palm, tiny purple sparks at the fingertips, calm smile.
- Haru: right of center, front, hugging the three glowing cards and a clipboard to her chest, gentle smile.
- Fruit fly researcher: left side, facing right, leaning in with a magnifying glass toward the small tag on one glowing card, skeptical look.
- AbaBot: far right, facing left, holding the wooden abacus, screen face showing a tiny mint arrow pattern without digits, confident grin.
COMPOSITION: the page frame crops the top and bottom, so keep every face and hand inside the middle 50% of the height and inside 12% side margins. Keep the bottom-left corner plain and bright for a small label. The light falls on the three glowing cards.
Friendly rivalry, the moment before any result; nobody is winning or losing.

STYLE: detailed 16-bit SNES-era RPG pixel art, crisp visible square pixels, bold dark outlines (#1d1a22), 2-3 tone shading with small highlights. Match the attached reference images exactly in proportions, colors and pixel density. Not a vector illustration, not anime cel painting, not watercolor, not 3D render.
MOOD: bright daytime laboratory - white walls, large sunlit windows, soft natural light, small props in lavender, mint and pink.

CHARACTERS (exactly as in the references):
- Professor: chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, short tied-back ponytail, white lab coat over black vest and black tie, dark trousers.
- Haru (assistant): long pink hair with two round buns and navy streaks, blue eyes, lavender hoodie under a white lab coat, blue jeans, white sneakers.
- AbaBot: boxy beige retro CRT-monitor robot with rounded corners, dark green screen face drawn only with mint pixel blocks, short antenna on a small square base topped with one red-brown abacus bead, gray segmented arms, two small dark gray tank treads, wooden abacus with red-brown beads.
- Fruit fly researcher: small anthropomorphic fruit fly, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings.

RULES: Height ratio Professor 1.00, Haru 0.90, AbaBot 0.72, fruit fly 0.41. Do not mirror the Professor or Haru; keep their faces and hair parting as in the references. Ignore the Korean labels printed on the reference sheet; do not draw them.

Absolutely NO text, letters, numbers, speech bubbles, captions or logos anywhere (cards, screens and books stay blank or striped). No night scene, no neon, no dark background. AbaBot is NOT a white round-headed robot, has no black pill-shaped visor, no yellow or gold eyes, no ball antenna, no cyan chest light, no gold coins, and never floats. No microscope, no insects other than the fruit fly researcher, no real brands, no weapons, no cigarettes, no alcohol, no blood.
```

**고칠 때 (같은 대화에서):** `Same four characters, same 16-bit pixel art style and composition. Change only: {고칠 점}. Still no text.`

**받은 뒤 (SKILL 18-15):** 16:9 확인 → 얼굴 안전 영역 → WebP 1600×900(220 KB 이하)·960×540 → `data-img="cover_A1"` 자리 채우기(지금은 대체 표지) → `thumb_A1`(3:2), `og_A1`(1200×630)도 표지에서 잘라 만든다.
