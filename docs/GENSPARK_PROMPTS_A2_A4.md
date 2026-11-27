# Genspark 이미지 프롬프트 모음 — 응용편 A2~A4 (12장)

쓰는 법: 편마다 ① 표지 → ② 컷 2장 → ③ 아웃트로 순서로 **같은 대화**에서 요청합니다. 참고 그림은 저장소 `genspark_refs/` 폴더의 8장(ref_lab6_lineup, ref_k02_doctor, ref_k03_haru, ref_k04_fly, ref_jupanbot_E13, ref_sia_E13, ref_moa_E13, ref_spares_x1_x3)을 함께 올리고, ②·③에는 받은 표지도 그림체 기준으로 같이 올립니다. 각 코드 상자 안의 영어를 그대로 붙여 넣으면 됩니다.

받은 뒤 확인: 촘촘한 고해상도 픽셀아트(큰 네모 블록 아님) · 글자·숫자·말풍선 없음 · 낮 분위기 · 주판봇은 베이지 CRT 로봇 · 박사·조수·시아·모아 좌우 반전 없음 · 아웃트로 표정이 결과와 맞음. 고칠 때: `Same characters, same high-resolution 16-bit pixel art style and composition. Change only: {고칠 점}. Still no text.`


## A2 미세조정 연구실

### A2-1 · 표지 · 저장 이름 `cover_A2.png` (16:9)
```
16:9 wide website cover illustration, at least 1920x1080.
SCENE: a bright training room inside the daytime lab. On a long desk lie four large blank form sheets, each with a different colored header strip (purple, blue, green, amber) and simple gray lines instead of writing. Behind them a whiteboard shows only a gently descending curve drawn as a simple line (no axes labels, no numbers). A tall stack of blank record cards sits at one end of the desk.
POSES:
- Left group (the prompt team), facing right: the fruit fly researcher holds up one blank example card and points at the forms; Intern Sia stands beside him neatly fanning eight blank cards like a hand of playing cards, calm expression.
- Center, slightly behind: the Professor presents the four forms with an open palm, tiny purple sparks, confident smile. Haru stands in front of him holding a clipboard, friendly smile.
- Right group (the fine-tuning team), facing left: Intern Moa hugs the tall stack of record cards with a bright smile; AbaBot holds the wooden abacus and a few small colored sticky notes, mint screen eyes in a confident grin.
COMPOSITION: the page frame crops the top and bottom, so keep every face and hand inside the middle 50% of the height and inside 12% side margins. Keep the bottom-left corner plain and bright for a small label. Friendly rivalry, the moment before any result; nobody is winning or losing.

STYLE: high-resolution detailed 16-bit SNES-era RPG pixel art, drawn natively at the full output size (at least 1920 px wide) with small, dense pixels so that faces, hands, hair strands and props stay finely detailed even when zoomed 2x. Bold dark outlines (#1d1a22), 2-3 tone shading with small highlights. Do not draw on a tiny grid and upscale; no big chunky blocks. Match the attached references in proportions, colors and outfit details. Not a vector illustration, not anime cel painting, not watercolor, not 3D render.
MOOD: bright daytime laboratory - white walls, large sunlit windows, soft natural light, small props in lavender, mint and pink, a few magenta (#9b3fb5) and green (#13733a) accents on test tubes and monitors.

CHARACTERS (exactly as in the references):
- Professor: chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, short tied-back ponytail, white lab coat over black vest and black tie, dark trousers. Purple sparks at the fingertips only when excited.
- Haru (assistant): long pink hair with two round buns and navy streaks, blue eyes, lavender hoodie under a white lab coat, blue jeans, white sneakers.
- Fruit fly researcher: small anthropomorphic fruit fly, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings.
- AbaBot: boxy beige retro CRT-monitor robot with rounded corners, dark green screen face drawn only with mint pixel blocks, short antenna on a small square base topped with one red-brown abacus bead, gray segmented arms, two small dark gray tank treads, wooden abacus with red-brown beads.
- Intern Sia: calm girl maid intern, long straight jet-black hair with side-swept bangs, no headdress, gray eyes, small silver drop earrings, charcoal-black long-sleeved maid dress, large gray bow, long white frilled apron.
- Intern Moa: gentle girl maid intern, long ash-beige wavy hair, white frilled maid headband with a small white ribbon over the left ear, amber-brown eyes, red and navy plaid bow tie, white shirt, camel knit cardigan, white frilled apron, black skirt.
- Secret X1, X2, X3 (only when the request says so): cute solid dark navy-black silhouettes with a thin purple rim light, two round white dot eyes, pink blush pixels, one colored accessory each (X1 a small pink ribbon, X2 a teal glint on round glasses, X3 a small yellow bell). Not scary, no other features.

RULES: Height ratio Professor 1.00, Haru 0.90, Sia 0.88, Moa 0.84, AbaBot 0.72, fruit fly 0.41 (X1 0.85, X2 0.95, X3 0.60). Do not mirror the Professor, Haru, Sia or Moa; keep their hair parting, streaks, ribbons and bangs on the same side as the references. Ignore any Korean labels printed on the reference sheets; do not draw them.
Absolutely NO text, letters, numbers, speech bubbles, captions or logos anywhere (cards, screens, papers and books stay blank or show simple stripes and icons). No night scene, no neon, no dark background. AbaBot is NOT a white round-headed robot, has no black pill-shaped visor, no yellow or gold eyes, no ball antenna, no cyan chest light, no gold coins, and never floats. No microscope, no insects other than the fruit fly researcher, no real brands, no weapons, no cigarettes, no alcohol, no blood.
```

### A2-2 · 컷 · 저장 이름 `cut_A2_lv4.png` (16:9)
```
16:9, at least 1920x1080, a focused cut for the LoRA section. SCENE: a giant thick textbook lies open on the desk; instead of writing on its pages, Haru (left, facing front) carefully sticks two long thin sticky-note strips (one vertical, one horizontal, mint and pink) onto a page. AbaBot (right, facing left) peers at the strips with a curious mint "o" mouth on its screen. The textbook pages stay blank with faint gray lines. Calm, explanatory mood.

STYLE: high-resolution detailed 16-bit SNES-era RPG pixel art, drawn natively at the full output size (at least 1920 px wide) with small, dense pixels so that faces, hands, hair strands and props stay finely detailed even when zoomed 2x. Bold dark outlines (#1d1a22), 2-3 tone shading with small highlights. Do not draw on a tiny grid and upscale; no big chunky blocks. Match the attached references in proportions, colors and outfit details. Not a vector illustration, not anime cel painting, not watercolor, not 3D render.
MOOD: bright daytime laboratory - white walls, large sunlit windows, soft natural light, small props in lavender, mint and pink, a few magenta (#9b3fb5) and green (#13733a) accents on test tubes and monitors.

CHARACTERS (exactly as in the references):
- Professor: chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, short tied-back ponytail, white lab coat over black vest and black tie, dark trousers. Purple sparks at the fingertips only when excited.
- Haru (assistant): long pink hair with two round buns and navy streaks, blue eyes, lavender hoodie under a white lab coat, blue jeans, white sneakers.
- Fruit fly researcher: small anthropomorphic fruit fly, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings.
- AbaBot: boxy beige retro CRT-monitor robot with rounded corners, dark green screen face drawn only with mint pixel blocks, short antenna on a small square base topped with one red-brown abacus bead, gray segmented arms, two small dark gray tank treads, wooden abacus with red-brown beads.
- Intern Sia: calm girl maid intern, long straight jet-black hair with side-swept bangs, no headdress, gray eyes, small silver drop earrings, charcoal-black long-sleeved maid dress, large gray bow, long white frilled apron.
- Intern Moa: gentle girl maid intern, long ash-beige wavy hair, white frilled maid headband with a small white ribbon over the left ear, amber-brown eyes, red and navy plaid bow tie, white shirt, camel knit cardigan, white frilled apron, black skirt.
- Secret X1, X2, X3 (only when the request says so): cute solid dark navy-black silhouettes with a thin purple rim light, two round white dot eyes, pink blush pixels, one colored accessory each (X1 a small pink ribbon, X2 a teal glint on round glasses, X3 a small yellow bell). Not scary, no other features.

RULES: Height ratio Professor 1.00, Haru 0.90, Sia 0.88, Moa 0.84, AbaBot 0.72, fruit fly 0.41 (X1 0.85, X2 0.95, X3 0.60). Do not mirror the Professor, Haru, Sia or Moa; keep their hair parting, streaks, ribbons and bangs on the same side as the references. Ignore any Korean labels printed on the reference sheets; do not draw them.
Absolutely NO text, letters, numbers, speech bubbles, captions or logos anywhere (cards, screens, papers and books stay blank or show simple stripes and icons). No night scene, no neon, no dark background. AbaBot is NOT a white round-headed robot, has no black pill-shaped visor, no yellow or gold eyes, no ball antenna, no cyan chest light, no gold coins, and never floats. No microscope, no insects other than the fruit fly researcher, no real brands, no weapons, no cigarettes, no alcohol, no blood.
```

### A2-3 · 컷 · 저장 이름 `cut_A2_versus.png` (16:9)
```
16:9, at least 1920x1080, a horizontal versus strip before the result. SCENE: left side, the fruit fly researcher and Intern Sia both face right; the fly holds one blank example card, Sia holds a fanned set of blank cards. Right side, Intern Moa and AbaBot both face left; Moa hugs a stack of record cards, AbaBot holds the abacus with tiny sticky notes on it. Leave the middle 20% of the image empty and plain (the page will place a "VS" there). No hint of who wins; both teams look determined and friendly.

STYLE: high-resolution detailed 16-bit SNES-era RPG pixel art, drawn natively at the full output size (at least 1920 px wide) with small, dense pixels so that faces, hands, hair strands and props stay finely detailed even when zoomed 2x. Bold dark outlines (#1d1a22), 2-3 tone shading with small highlights. Do not draw on a tiny grid and upscale; no big chunky blocks. Match the attached references in proportions, colors and outfit details. Not a vector illustration, not anime cel painting, not watercolor, not 3D render.
MOOD: bright daytime laboratory - white walls, large sunlit windows, soft natural light, small props in lavender, mint and pink, a few magenta (#9b3fb5) and green (#13733a) accents on test tubes and monitors.

CHARACTERS (exactly as in the references):
- Professor: chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, short tied-back ponytail, white lab coat over black vest and black tie, dark trousers. Purple sparks at the fingertips only when excited.
- Haru (assistant): long pink hair with two round buns and navy streaks, blue eyes, lavender hoodie under a white lab coat, blue jeans, white sneakers.
- Fruit fly researcher: small anthropomorphic fruit fly, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings.
- AbaBot: boxy beige retro CRT-monitor robot with rounded corners, dark green screen face drawn only with mint pixel blocks, short antenna on a small square base topped with one red-brown abacus bead, gray segmented arms, two small dark gray tank treads, wooden abacus with red-brown beads.
- Intern Sia: calm girl maid intern, long straight jet-black hair with side-swept bangs, no headdress, gray eyes, small silver drop earrings, charcoal-black long-sleeved maid dress, large gray bow, long white frilled apron.
- Intern Moa: gentle girl maid intern, long ash-beige wavy hair, white frilled maid headband with a small white ribbon over the left ear, amber-brown eyes, red and navy plaid bow tie, white shirt, camel knit cardigan, white frilled apron, black skirt.
- Secret X1, X2, X3 (only when the request says so): cute solid dark navy-black silhouettes with a thin purple rim light, two round white dot eyes, pink blush pixels, one colored accessory each (X1 a small pink ribbon, X2 a teal glint on round glasses, X3 a small yellow bell). Not scary, no other features.

RULES: Height ratio Professor 1.00, Haru 0.90, Sia 0.88, Moa 0.84, AbaBot 0.72, fruit fly 0.41 (X1 0.85, X2 0.95, X3 0.60). Do not mirror the Professor, Haru, Sia or Moa; keep their hair parting, streaks, ribbons and bangs on the same side as the references. Ignore any Korean labels printed on the reference sheets; do not draw them.
Absolutely NO text, letters, numbers, speech bubbles, captions or logos anywhere (cards, screens, papers and books stay blank or show simple stripes and icons). No night scene, no neon, no dark background. AbaBot is NOT a white round-headed robot, has no black pill-shaped visor, no yellow or gold eyes, no ball antenna, no cyan chest light, no gold coins, and never floats. No microscope, no insects other than the fruit fly researcher, no real brands, no weapons, no cigarettes, no alcohol, no blood.
```

### A2-4 · 아웃트로 · 저장 이름 `sc_A2_outro.png` (3:2)
```
3:2 scene illustration, at least 1536x1024.
RESULT: the fine-tuning team won 2 rounds to 1.
SCENE: after the match in the training room. AbaBot is in front, both gray arms raised in joy, mint crescent eyes on its screen; Intern Moa beside him cheers with both fists up, sparkling eyes. Behind on the left, the fruit fly researcher holds a coffee cup with half-closed relaxed eyes and gives a small accepting nod (not crying, not mocked). Intern Sia stands near the fly, covering a small yawn with her hand, slightly sleepy but smiling. The Professor stands in the back center giving a thumbs-up; Haru holds three blank round score discs (one teal, one teal, one red) to her chest. Rule: the winners are in front and larger; the other team accepts graciously in the same frame.

STYLE: high-resolution detailed 16-bit SNES-era RPG pixel art, drawn natively at the full output size (at least 1920 px wide) with small, dense pixels so that faces, hands, hair strands and props stay finely detailed even when zoomed 2x. Bold dark outlines (#1d1a22), 2-3 tone shading with small highlights. Do not draw on a tiny grid and upscale; no big chunky blocks. Match the attached references in proportions, colors and outfit details. Not a vector illustration, not anime cel painting, not watercolor, not 3D render.
MOOD: bright daytime laboratory - white walls, large sunlit windows, soft natural light, small props in lavender, mint and pink, a few magenta (#9b3fb5) and green (#13733a) accents on test tubes and monitors.

CHARACTERS (exactly as in the references):
- Professor: chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, short tied-back ponytail, white lab coat over black vest and black tie, dark trousers. Purple sparks at the fingertips only when excited.
- Haru (assistant): long pink hair with two round buns and navy streaks, blue eyes, lavender hoodie under a white lab coat, blue jeans, white sneakers.
- Fruit fly researcher: small anthropomorphic fruit fly, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings.
- AbaBot: boxy beige retro CRT-monitor robot with rounded corners, dark green screen face drawn only with mint pixel blocks, short antenna on a small square base topped with one red-brown abacus bead, gray segmented arms, two small dark gray tank treads, wooden abacus with red-brown beads.
- Intern Sia: calm girl maid intern, long straight jet-black hair with side-swept bangs, no headdress, gray eyes, small silver drop earrings, charcoal-black long-sleeved maid dress, large gray bow, long white frilled apron.
- Intern Moa: gentle girl maid intern, long ash-beige wavy hair, white frilled maid headband with a small white ribbon over the left ear, amber-brown eyes, red and navy plaid bow tie, white shirt, camel knit cardigan, white frilled apron, black skirt.
- Secret X1, X2, X3 (only when the request says so): cute solid dark navy-black silhouettes with a thin purple rim light, two round white dot eyes, pink blush pixels, one colored accessory each (X1 a small pink ribbon, X2 a teal glint on round glasses, X3 a small yellow bell). Not scary, no other features.

RULES: Height ratio Professor 1.00, Haru 0.90, Sia 0.88, Moa 0.84, AbaBot 0.72, fruit fly 0.41 (X1 0.85, X2 0.95, X3 0.60). Do not mirror the Professor, Haru, Sia or Moa; keep their hair parting, streaks, ribbons and bangs on the same side as the references. Ignore any Korean labels printed on the reference sheets; do not draw them.
Absolutely NO text, letters, numbers, speech bubbles, captions or logos anywhere (cards, screens, papers and books stay blank or show simple stripes and icons). No night scene, no neon, no dark background. AbaBot is NOT a white round-headed robot, has no black pill-shaped visor, no yellow or gold eyes, no ball antenna, no cyan chest light, no gold coins, and never floats. No microscope, no insects other than the fruit fly researcher, no real brands, no weapons, no cigarettes, no alcohol, no blood.
```


## A3 평가 연구실

### A3-1 · 표지 · 저장 이름 `cover_A3.png` (16:9)
```
16:9 wide website cover illustration, at least 1920x1080.
SCENE: a small league stage built inside the bright daytime lab, with a low wooden platform and a large blank scoreboard on the back wall showing only four empty horizontal bars in four colors (gray, red, teal, camel) of equal length, no numbers.
POSES:
- On the platform, four players stand in a row: Intern Sia (far left, calm, hands folded on her apron), the fruit fly researcher (facing right, holding a short blank card), Intern Moa (holding a blank answer card with a tiny colored tag pinned to it, cheerful), AbaBot (far right, facing left, holding a very long scroll of blank paper that trails to the floor, confident grin).
- In front of the stage on the left, the Professor sits at a judge's desk with one hand raised as if to announce; Haru stands beside him holding a clipboard and a stopwatch.
COMPOSITION: keep every face and hand inside the middle 50% of the height and inside 12% side margins. Keep the bottom-left corner plain and bright for a small label. The moment before any score is revealed; nobody is winning or losing.

STYLE: high-resolution detailed 16-bit SNES-era RPG pixel art, drawn natively at the full output size (at least 1920 px wide) with small, dense pixels so that faces, hands, hair strands and props stay finely detailed even when zoomed 2x. Bold dark outlines (#1d1a22), 2-3 tone shading with small highlights. Do not draw on a tiny grid and upscale; no big chunky blocks. Match the attached references in proportions, colors and outfit details. Not a vector illustration, not anime cel painting, not watercolor, not 3D render.
MOOD: bright daytime laboratory - white walls, large sunlit windows, soft natural light, small props in lavender, mint and pink, a few magenta (#9b3fb5) and green (#13733a) accents on test tubes and monitors.

CHARACTERS (exactly as in the references):
- Professor: chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, short tied-back ponytail, white lab coat over black vest and black tie, dark trousers. Purple sparks at the fingertips only when excited.
- Haru (assistant): long pink hair with two round buns and navy streaks, blue eyes, lavender hoodie under a white lab coat, blue jeans, white sneakers.
- Fruit fly researcher: small anthropomorphic fruit fly, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings.
- AbaBot: boxy beige retro CRT-monitor robot with rounded corners, dark green screen face drawn only with mint pixel blocks, short antenna on a small square base topped with one red-brown abacus bead, gray segmented arms, two small dark gray tank treads, wooden abacus with red-brown beads.
- Intern Sia: calm girl maid intern, long straight jet-black hair with side-swept bangs, no headdress, gray eyes, small silver drop earrings, charcoal-black long-sleeved maid dress, large gray bow, long white frilled apron.
- Intern Moa: gentle girl maid intern, long ash-beige wavy hair, white frilled maid headband with a small white ribbon over the left ear, amber-brown eyes, red and navy plaid bow tie, white shirt, camel knit cardigan, white frilled apron, black skirt.
- Secret X1, X2, X3 (only when the request says so): cute solid dark navy-black silhouettes with a thin purple rim light, two round white dot eyes, pink blush pixels, one colored accessory each (X1 a small pink ribbon, X2 a teal glint on round glasses, X3 a small yellow bell). Not scary, no other features.

RULES: Height ratio Professor 1.00, Haru 0.90, Sia 0.88, Moa 0.84, AbaBot 0.72, fruit fly 0.41 (X1 0.85, X2 0.95, X3 0.60). Do not mirror the Professor, Haru, Sia or Moa; keep their hair parting, streaks, ribbons and bangs on the same side as the references. Ignore any Korean labels printed on the reference sheets; do not draw them.
Absolutely NO text, letters, numbers, speech bubbles, captions or logos anywhere (cards, screens, papers and books stay blank or show simple stripes and icons). No night scene, no neon, no dark background. AbaBot is NOT a white round-headed robot, has no black pill-shaped visor, no yellow or gold eyes, no ball antenna, no cyan chest light, no gold coins, and never floats. No microscope, no insects other than the fruit fly researcher, no real brands, no weapons, no cigarettes, no alcohol, no blood.
```

### A3-2 · 컷 · 저장 이름 `cut_A3_lv2.png` (16:9)
```
16:9, at least 1920x1080, a focused cut for the blind human judging section. SCENE: three Secret silhouettes X1, X2 and X3 (as described below, dark navy-black with purple rim light, white dot eyes, one accessory each) sit side by side behind a long judging desk. In front of each judge lie two face-down blank cards, one with a light pink back and one with a light mint back. X1 is about to tap the pink card, X2 the mint card, X3 holds a small bell. Behind them Intern Moa stands holding a covered tray, guiding politely. No faces of the answer writers are visible. Cute, quiet, not scary.

STYLE: high-resolution detailed 16-bit SNES-era RPG pixel art, drawn natively at the full output size (at least 1920 px wide) with small, dense pixels so that faces, hands, hair strands and props stay finely detailed even when zoomed 2x. Bold dark outlines (#1d1a22), 2-3 tone shading with small highlights. Do not draw on a tiny grid and upscale; no big chunky blocks. Match the attached references in proportions, colors and outfit details. Not a vector illustration, not anime cel painting, not watercolor, not 3D render.
MOOD: bright daytime laboratory - white walls, large sunlit windows, soft natural light, small props in lavender, mint and pink, a few magenta (#9b3fb5) and green (#13733a) accents on test tubes and monitors.

CHARACTERS (exactly as in the references):
- Professor: chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, short tied-back ponytail, white lab coat over black vest and black tie, dark trousers. Purple sparks at the fingertips only when excited.
- Haru (assistant): long pink hair with two round buns and navy streaks, blue eyes, lavender hoodie under a white lab coat, blue jeans, white sneakers.
- Fruit fly researcher: small anthropomorphic fruit fly, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings.
- AbaBot: boxy beige retro CRT-monitor robot with rounded corners, dark green screen face drawn only with mint pixel blocks, short antenna on a small square base topped with one red-brown abacus bead, gray segmented arms, two small dark gray tank treads, wooden abacus with red-brown beads.
- Intern Sia: calm girl maid intern, long straight jet-black hair with side-swept bangs, no headdress, gray eyes, small silver drop earrings, charcoal-black long-sleeved maid dress, large gray bow, long white frilled apron.
- Intern Moa: gentle girl maid intern, long ash-beige wavy hair, white frilled maid headband with a small white ribbon over the left ear, amber-brown eyes, red and navy plaid bow tie, white shirt, camel knit cardigan, white frilled apron, black skirt.
- Secret X1, X2, X3 (only when the request says so): cute solid dark navy-black silhouettes with a thin purple rim light, two round white dot eyes, pink blush pixels, one colored accessory each (X1 a small pink ribbon, X2 a teal glint on round glasses, X3 a small yellow bell). Not scary, no other features.

RULES: Height ratio Professor 1.00, Haru 0.90, Sia 0.88, Moa 0.84, AbaBot 0.72, fruit fly 0.41 (X1 0.85, X2 0.95, X3 0.60). Do not mirror the Professor, Haru, Sia or Moa; keep their hair parting, streaks, ribbons and bangs on the same side as the references. Ignore any Korean labels printed on the reference sheets; do not draw them.
Absolutely NO text, letters, numbers, speech bubbles, captions or logos anywhere (cards, screens, papers and books stay blank or show simple stripes and icons). No night scene, no neon, no dark background. AbaBot is NOT a white round-headed robot, has no black pill-shaped visor, no yellow or gold eyes, no ball antenna, no cyan chest light, no gold coins, and never floats. No microscope, no insects other than the fruit fly researcher, no real brands, no weapons, no cigarettes, no alcohol, no blood.
```

### A3-3 · 컷 · 저장 이름 `cut_A3_versus.png` (16:9)
```
16:9, at least 1920x1080, a horizontal lineup strip before the league result. SCENE: four players in a row on a small stage, each under a soft spotlight of a different color: Intern Sia (gray light), the fruit fly researcher facing right (red light), AbaBot facing left (teal light), Intern Moa (camel light). Everyone looks hopeful and friendly. No trophies, no medals, no ranking hints.

STYLE: high-resolution detailed 16-bit SNES-era RPG pixel art, drawn natively at the full output size (at least 1920 px wide) with small, dense pixels so that faces, hands, hair strands and props stay finely detailed even when zoomed 2x. Bold dark outlines (#1d1a22), 2-3 tone shading with small highlights. Do not draw on a tiny grid and upscale; no big chunky blocks. Match the attached references in proportions, colors and outfit details. Not a vector illustration, not anime cel painting, not watercolor, not 3D render.
MOOD: bright daytime laboratory - white walls, large sunlit windows, soft natural light, small props in lavender, mint and pink, a few magenta (#9b3fb5) and green (#13733a) accents on test tubes and monitors.

CHARACTERS (exactly as in the references):
- Professor: chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, short tied-back ponytail, white lab coat over black vest and black tie, dark trousers. Purple sparks at the fingertips only when excited.
- Haru (assistant): long pink hair with two round buns and navy streaks, blue eyes, lavender hoodie under a white lab coat, blue jeans, white sneakers.
- Fruit fly researcher: small anthropomorphic fruit fly, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings.
- AbaBot: boxy beige retro CRT-monitor robot with rounded corners, dark green screen face drawn only with mint pixel blocks, short antenna on a small square base topped with one red-brown abacus bead, gray segmented arms, two small dark gray tank treads, wooden abacus with red-brown beads.
- Intern Sia: calm girl maid intern, long straight jet-black hair with side-swept bangs, no headdress, gray eyes, small silver drop earrings, charcoal-black long-sleeved maid dress, large gray bow, long white frilled apron.
- Intern Moa: gentle girl maid intern, long ash-beige wavy hair, white frilled maid headband with a small white ribbon over the left ear, amber-brown eyes, red and navy plaid bow tie, white shirt, camel knit cardigan, white frilled apron, black skirt.
- Secret X1, X2, X3 (only when the request says so): cute solid dark navy-black silhouettes with a thin purple rim light, two round white dot eyes, pink blush pixels, one colored accessory each (X1 a small pink ribbon, X2 a teal glint on round glasses, X3 a small yellow bell). Not scary, no other features.

RULES: Height ratio Professor 1.00, Haru 0.90, Sia 0.88, Moa 0.84, AbaBot 0.72, fruit fly 0.41 (X1 0.85, X2 0.95, X3 0.60). Do not mirror the Professor, Haru, Sia or Moa; keep their hair parting, streaks, ribbons and bangs on the same side as the references. Ignore any Korean labels printed on the reference sheets; do not draw them.
Absolutely NO text, letters, numbers, speech bubbles, captions or logos anywhere (cards, screens, papers and books stay blank or show simple stripes and icons). No night scene, no neon, no dark background. AbaBot is NOT a white round-headed robot, has no black pill-shaped visor, no yellow or gold eyes, no ball antenna, no cyan chest light, no gold coins, and never floats. No microscope, no insects other than the fruit fly researcher, no real brands, no weapons, no cigarettes, no alcohol, no blood.
```

### A3-4 · 아웃트로 · 저장 이름 `sc_A3_outro.png` (3:2)
```
3:2 scene illustration, at least 1536x1024.
RESULT: Intern Moa took 1st place; the fruit fly researcher and AbaBot tied for 2nd; Sia finished 4th as the baseline.
SCENE: after the league on the small stage. Intern Moa is in front center with sparkling eyes and both hands clasped happily, holding a small plain golden star badge (no text). Behind her on the left, the fruit fly researcher holds a coffee cup and nods with a small accepting smile; on the right, AbaBot shrugs with a flat relaxed line-mouth on its screen, not upset. Intern Sia stands at the side with a quiet proud smile, hands folded. The Professor in the back points to Moa with a firm, fair gesture; Haru holds a blank scoreboard tablet. In the far background, three small Secret silhouettes X1, X2, X3 sit in an audience row clapping (purple rim light, white dot eyes). Rule: the winner is in front and larger; others accept graciously.

STYLE: high-resolution detailed 16-bit SNES-era RPG pixel art, drawn natively at the full output size (at least 1920 px wide) with small, dense pixels so that faces, hands, hair strands and props stay finely detailed even when zoomed 2x. Bold dark outlines (#1d1a22), 2-3 tone shading with small highlights. Do not draw on a tiny grid and upscale; no big chunky blocks. Match the attached references in proportions, colors and outfit details. Not a vector illustration, not anime cel painting, not watercolor, not 3D render.
MOOD: bright daytime laboratory - white walls, large sunlit windows, soft natural light, small props in lavender, mint and pink, a few magenta (#9b3fb5) and green (#13733a) accents on test tubes and monitors.

CHARACTERS (exactly as in the references):
- Professor: chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, short tied-back ponytail, white lab coat over black vest and black tie, dark trousers. Purple sparks at the fingertips only when excited.
- Haru (assistant): long pink hair with two round buns and navy streaks, blue eyes, lavender hoodie under a white lab coat, blue jeans, white sneakers.
- Fruit fly researcher: small anthropomorphic fruit fly, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings.
- AbaBot: boxy beige retro CRT-monitor robot with rounded corners, dark green screen face drawn only with mint pixel blocks, short antenna on a small square base topped with one red-brown abacus bead, gray segmented arms, two small dark gray tank treads, wooden abacus with red-brown beads.
- Intern Sia: calm girl maid intern, long straight jet-black hair with side-swept bangs, no headdress, gray eyes, small silver drop earrings, charcoal-black long-sleeved maid dress, large gray bow, long white frilled apron.
- Intern Moa: gentle girl maid intern, long ash-beige wavy hair, white frilled maid headband with a small white ribbon over the left ear, amber-brown eyes, red and navy plaid bow tie, white shirt, camel knit cardigan, white frilled apron, black skirt.
- Secret X1, X2, X3 (only when the request says so): cute solid dark navy-black silhouettes with a thin purple rim light, two round white dot eyes, pink blush pixels, one colored accessory each (X1 a small pink ribbon, X2 a teal glint on round glasses, X3 a small yellow bell). Not scary, no other features.

RULES: Height ratio Professor 1.00, Haru 0.90, Sia 0.88, Moa 0.84, AbaBot 0.72, fruit fly 0.41 (X1 0.85, X2 0.95, X3 0.60). Do not mirror the Professor, Haru, Sia or Moa; keep their hair parting, streaks, ribbons and bangs on the same side as the references. Ignore any Korean labels printed on the reference sheets; do not draw them.
Absolutely NO text, letters, numbers, speech bubbles, captions or logos anywhere (cards, screens, papers and books stay blank or show simple stripes and icons). No night scene, no neon, no dark background. AbaBot is NOT a white round-headed robot, has no black pill-shaped visor, no yellow or gold eyes, no ball antenna, no cyan chest light, no gold coins, and never floats. No microscope, no insects other than the fruit fly researcher, no real brands, no weapons, no cigarettes, no alcohol, no blood.
```


## A4 에이전트 연구실

### A4-1 · 표지 · 저장 이름 `cover_A4.png` (16:9)
```
16:9 wide website cover illustration, at least 1920x1080.
SCENE: a bright control corner inside the daytime lab, like a friendly help desk. A large wall board shows six blank ticket cards in a row connected by a looping arrow made of simple lines. On the desk: a small calculator, a closed binder, a magnifying glass, a teapot, and a big round approval stamp with a blank face.
POSES (one team, everyone working together):
- The fruit fly researcher (left, facing right) points at the looping arrow, planning.
- AbaBot works the calculator with one arm and holds the wooden abacus with the other, focused mint eyes.
- Intern Sia holds a magnifying glass over one ticket card, firm and alert.
- Intern Moa writes in a small notebook, a teapot beside her.
- The Professor holds the big approval stamp raised, ready but not stamping, tiny purple sparks.
- Haru stands in front with a clipboard, giving a cheerful report pose.
COMPOSITION: keep every face and hand inside the middle 50% of the height and inside 12% side margins. Keep the bottom-left corner plain and bright for a small label. Cooperative mood; no rivalry.

STYLE: high-resolution detailed 16-bit SNES-era RPG pixel art, drawn natively at the full output size (at least 1920 px wide) with small, dense pixels so that faces, hands, hair strands and props stay finely detailed even when zoomed 2x. Bold dark outlines (#1d1a22), 2-3 tone shading with small highlights. Do not draw on a tiny grid and upscale; no big chunky blocks. Match the attached references in proportions, colors and outfit details. Not a vector illustration, not anime cel painting, not watercolor, not 3D render.
MOOD: bright daytime laboratory - white walls, large sunlit windows, soft natural light, small props in lavender, mint and pink, a few magenta (#9b3fb5) and green (#13733a) accents on test tubes and monitors.

CHARACTERS (exactly as in the references):
- Professor: chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, short tied-back ponytail, white lab coat over black vest and black tie, dark trousers. Purple sparks at the fingertips only when excited.
- Haru (assistant): long pink hair with two round buns and navy streaks, blue eyes, lavender hoodie under a white lab coat, blue jeans, white sneakers.
- Fruit fly researcher: small anthropomorphic fruit fly, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings.
- AbaBot: boxy beige retro CRT-monitor robot with rounded corners, dark green screen face drawn only with mint pixel blocks, short antenna on a small square base topped with one red-brown abacus bead, gray segmented arms, two small dark gray tank treads, wooden abacus with red-brown beads.
- Intern Sia: calm girl maid intern, long straight jet-black hair with side-swept bangs, no headdress, gray eyes, small silver drop earrings, charcoal-black long-sleeved maid dress, large gray bow, long white frilled apron.
- Intern Moa: gentle girl maid intern, long ash-beige wavy hair, white frilled maid headband with a small white ribbon over the left ear, amber-brown eyes, red and navy plaid bow tie, white shirt, camel knit cardigan, white frilled apron, black skirt.
- Secret X1, X2, X3 (only when the request says so): cute solid dark navy-black silhouettes with a thin purple rim light, two round white dot eyes, pink blush pixels, one colored accessory each (X1 a small pink ribbon, X2 a teal glint on round glasses, X3 a small yellow bell). Not scary, no other features.

RULES: Height ratio Professor 1.00, Haru 0.90, Sia 0.88, Moa 0.84, AbaBot 0.72, fruit fly 0.41 (X1 0.85, X2 0.95, X3 0.60). Do not mirror the Professor, Haru, Sia or Moa; keep their hair parting, streaks, ribbons and bangs on the same side as the references. Ignore any Korean labels printed on the reference sheets; do not draw them.
Absolutely NO text, letters, numbers, speech bubbles, captions or logos anywhere (cards, screens, papers and books stay blank or show simple stripes and icons). No night scene, no neon, no dark background. AbaBot is NOT a white round-headed robot, has no black pill-shaped visor, no yellow or gold eyes, no ball antenna, no cyan chest light, no gold coins, and never floats. No microscope, no insects other than the fruit fly researcher, no real brands, no weapons, no cigarettes, no alcohol, no blood.
```

### A4-2 · 컷 · 저장 이름 `cut_A4_lv4.png` (16:9)
```
16:9, at least 1920x1080, a focused cut for the safeguards section. SCENE: a big red button inside a clear protective case sits on a pedestal. In front of it stand three translucent glowing gates in a row (mint, blue, purple), each slightly offset like layered shields. A floating blank paper note with a sneaky curly arrow drawing tries to reach the button but bounces off the first gate. The fruit fly researcher (left, facing right) crosses his arms calmly beside the first gate; the Professor (right) holds the approval stamp behind the last gate. No text on the note or button.

STYLE: high-resolution detailed 16-bit SNES-era RPG pixel art, drawn natively at the full output size (at least 1920 px wide) with small, dense pixels so that faces, hands, hair strands and props stay finely detailed even when zoomed 2x. Bold dark outlines (#1d1a22), 2-3 tone shading with small highlights. Do not draw on a tiny grid and upscale; no big chunky blocks. Match the attached references in proportions, colors and outfit details. Not a vector illustration, not anime cel painting, not watercolor, not 3D render.
MOOD: bright daytime laboratory - white walls, large sunlit windows, soft natural light, small props in lavender, mint and pink, a few magenta (#9b3fb5) and green (#13733a) accents on test tubes and monitors.

CHARACTERS (exactly as in the references):
- Professor: chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, short tied-back ponytail, white lab coat over black vest and black tie, dark trousers. Purple sparks at the fingertips only when excited.
- Haru (assistant): long pink hair with two round buns and navy streaks, blue eyes, lavender hoodie under a white lab coat, blue jeans, white sneakers.
- Fruit fly researcher: small anthropomorphic fruit fly, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings.
- AbaBot: boxy beige retro CRT-monitor robot with rounded corners, dark green screen face drawn only with mint pixel blocks, short antenna on a small square base topped with one red-brown abacus bead, gray segmented arms, two small dark gray tank treads, wooden abacus with red-brown beads.
- Intern Sia: calm girl maid intern, long straight jet-black hair with side-swept bangs, no headdress, gray eyes, small silver drop earrings, charcoal-black long-sleeved maid dress, large gray bow, long white frilled apron.
- Intern Moa: gentle girl maid intern, long ash-beige wavy hair, white frilled maid headband with a small white ribbon over the left ear, amber-brown eyes, red and navy plaid bow tie, white shirt, camel knit cardigan, white frilled apron, black skirt.
- Secret X1, X2, X3 (only when the request says so): cute solid dark navy-black silhouettes with a thin purple rim light, two round white dot eyes, pink blush pixels, one colored accessory each (X1 a small pink ribbon, X2 a teal glint on round glasses, X3 a small yellow bell). Not scary, no other features.

RULES: Height ratio Professor 1.00, Haru 0.90, Sia 0.88, Moa 0.84, AbaBot 0.72, fruit fly 0.41 (X1 0.85, X2 0.95, X3 0.60). Do not mirror the Professor, Haru, Sia or Moa; keep their hair parting, streaks, ribbons and bangs on the same side as the references. Ignore any Korean labels printed on the reference sheets; do not draw them.
Absolutely NO text, letters, numbers, speech bubbles, captions or logos anywhere (cards, screens, papers and books stay blank or show simple stripes and icons). No night scene, no neon, no dark background. AbaBot is NOT a white round-headed robot, has no black pill-shaped visor, no yellow or gold eyes, no ball antenna, no cyan chest light, no gold coins, and never floats. No microscope, no insects other than the fruit fly researcher, no real brands, no weapons, no cigarettes, no alcohol, no blood.
```

### A4-3 · 컷 · 저장 이름 `cut_A4_raid.png` (16:9)
```
16:9, at least 1920x1080, a horizontal team strip before the raid. SCENE: the six lab members stand shoulder to shoulder facing the viewer, each holding their role prop: fruit fly with a pointer stick, AbaBot with the calculator, Sia with a magnifying glass, Moa with a notebook, the Professor with the round stamp, Haru with a clipboard. Behind them, through a service window, three small Secret silhouettes X1, X2, X3 wait as customers holding blank ticket cards. Determined, friendly mood, the moment before the work starts.

STYLE: high-resolution detailed 16-bit SNES-era RPG pixel art, drawn natively at the full output size (at least 1920 px wide) with small, dense pixels so that faces, hands, hair strands and props stay finely detailed even when zoomed 2x. Bold dark outlines (#1d1a22), 2-3 tone shading with small highlights. Do not draw on a tiny grid and upscale; no big chunky blocks. Match the attached references in proportions, colors and outfit details. Not a vector illustration, not anime cel painting, not watercolor, not 3D render.
MOOD: bright daytime laboratory - white walls, large sunlit windows, soft natural light, small props in lavender, mint and pink, a few magenta (#9b3fb5) and green (#13733a) accents on test tubes and monitors.

CHARACTERS (exactly as in the references):
- Professor: chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, short tied-back ponytail, white lab coat over black vest and black tie, dark trousers. Purple sparks at the fingertips only when excited.
- Haru (assistant): long pink hair with two round buns and navy streaks, blue eyes, lavender hoodie under a white lab coat, blue jeans, white sneakers.
- Fruit fly researcher: small anthropomorphic fruit fly, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings.
- AbaBot: boxy beige retro CRT-monitor robot with rounded corners, dark green screen face drawn only with mint pixel blocks, short antenna on a small square base topped with one red-brown abacus bead, gray segmented arms, two small dark gray tank treads, wooden abacus with red-brown beads.
- Intern Sia: calm girl maid intern, long straight jet-black hair with side-swept bangs, no headdress, gray eyes, small silver drop earrings, charcoal-black long-sleeved maid dress, large gray bow, long white frilled apron.
- Intern Moa: gentle girl maid intern, long ash-beige wavy hair, white frilled maid headband with a small white ribbon over the left ear, amber-brown eyes, red and navy plaid bow tie, white shirt, camel knit cardigan, white frilled apron, black skirt.
- Secret X1, X2, X3 (only when the request says so): cute solid dark navy-black silhouettes with a thin purple rim light, two round white dot eyes, pink blush pixels, one colored accessory each (X1 a small pink ribbon, X2 a teal glint on round glasses, X3 a small yellow bell). Not scary, no other features.

RULES: Height ratio Professor 1.00, Haru 0.90, Sia 0.88, Moa 0.84, AbaBot 0.72, fruit fly 0.41 (X1 0.85, X2 0.95, X3 0.60). Do not mirror the Professor, Haru, Sia or Moa; keep their hair parting, streaks, ribbons and bangs on the same side as the references. Ignore any Korean labels printed on the reference sheets; do not draw them.
Absolutely NO text, letters, numbers, speech bubbles, captions or logos anywhere (cards, screens, papers and books stay blank or show simple stripes and icons). No night scene, no neon, no dark background. AbaBot is NOT a white round-headed robot, has no black pill-shaped visor, no yellow or gold eyes, no ball antenna, no cyan chest light, no gold coins, and never floats. No microscope, no insects other than the fruit fly researcher, no real brands, no weapons, no cigarettes, no alcohol, no blood.
```

### A4-4 · 아웃트로 · 저장 이름 `sc_A4_outro.png` (3:2)
```
3:2 scene illustration, at least 1536x1024.
RESULT: the cooperative raid was cleared; the checker (Intern Sia) turned out to be the most important role.
SCENE: after work at the help desk. Intern Sia is in front center with a calm proud smile, the magnifying glass held up like a small badge. AbaBot beside her scratches its head with pink blush stripes on its screen, slightly embarrassed but happy. The fruit fly researcher crosses his arms with a satisfied look. Intern Moa serves tea in pink cups to everyone with closed happy eyes. The Professor in the back raises both hands with purple sparks; Haru holds the clipboard and smiles. On the wall board, six blank ticket cards now each show a simple green check mark symbol (symbols only, no letters). In the background window, three small Secret silhouettes X1, X2, X3 wave goodbye.

STYLE: high-resolution detailed 16-bit SNES-era RPG pixel art, drawn natively at the full output size (at least 1920 px wide) with small, dense pixels so that faces, hands, hair strands and props stay finely detailed even when zoomed 2x. Bold dark outlines (#1d1a22), 2-3 tone shading with small highlights. Do not draw on a tiny grid and upscale; no big chunky blocks. Match the attached references in proportions, colors and outfit details. Not a vector illustration, not anime cel painting, not watercolor, not 3D render.
MOOD: bright daytime laboratory - white walls, large sunlit windows, soft natural light, small props in lavender, mint and pink, a few magenta (#9b3fb5) and green (#13733a) accents on test tubes and monitors.

CHARACTERS (exactly as in the references):
- Professor: chibi scientist, thin teal rectangular glasses, spiky black hair with one white streak, short tied-back ponytail, white lab coat over black vest and black tie, dark trousers. Purple sparks at the fingertips only when excited.
- Haru (assistant): long pink hair with two round buns and navy streaks, blue eyes, lavender hoodie under a white lab coat, blue jeans, white sneakers.
- Fruit fly researcher: small anthropomorphic fruit fly, black body, big red compound eyes, blue helmet with a gold stripe and pink and blue cables, white lab coat over a black vest, black gloves, transparent wings.
- AbaBot: boxy beige retro CRT-monitor robot with rounded corners, dark green screen face drawn only with mint pixel blocks, short antenna on a small square base topped with one red-brown abacus bead, gray segmented arms, two small dark gray tank treads, wooden abacus with red-brown beads.
- Intern Sia: calm girl maid intern, long straight jet-black hair with side-swept bangs, no headdress, gray eyes, small silver drop earrings, charcoal-black long-sleeved maid dress, large gray bow, long white frilled apron.
- Intern Moa: gentle girl maid intern, long ash-beige wavy hair, white frilled maid headband with a small white ribbon over the left ear, amber-brown eyes, red and navy plaid bow tie, white shirt, camel knit cardigan, white frilled apron, black skirt.
- Secret X1, X2, X3 (only when the request says so): cute solid dark navy-black silhouettes with a thin purple rim light, two round white dot eyes, pink blush pixels, one colored accessory each (X1 a small pink ribbon, X2 a teal glint on round glasses, X3 a small yellow bell). Not scary, no other features.

RULES: Height ratio Professor 1.00, Haru 0.90, Sia 0.88, Moa 0.84, AbaBot 0.72, fruit fly 0.41 (X1 0.85, X2 0.95, X3 0.60). Do not mirror the Professor, Haru, Sia or Moa; keep their hair parting, streaks, ribbons and bangs on the same side as the references. Ignore any Korean labels printed on the reference sheets; do not draw them.
Absolutely NO text, letters, numbers, speech bubbles, captions or logos anywhere (cards, screens, papers and books stay blank or show simple stripes and icons). No night scene, no neon, no dark background. AbaBot is NOT a white round-headed robot, has no black pill-shaped visor, no yellow or gold eyes, no ball antenna, no cyan chest light, no gold coins, and never floats. No microscope, no insects other than the fruit fly researcher, no real brands, no weapons, no cigarettes, no alcohol, no blood.
```
