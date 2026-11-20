"""장난감 데이터: 가상 회사 Pebble Lamp Co. 안내문 18문장, 질문 8개.
개념 벡터 8칸 [refund, price, shipping, hours, battery, warranty, safety, account]
결과를 data.json으로 내고, 청킹·top-k·대결 결과를 미리 계산한다."""
import json, math, random, re

DIMS = ["refund", "price", "shipping", "hours", "battery", "warranty", "safety", "account"]
DIM_KO = ["환불", "가격", "배송", "운영 시간", "배터리", "보증", "안전", "계정"]

S = [  # id, en, ko, {dim: weight}
 ("A1","You can return a lamp within 30 days of delivery.","배송받은 지 30일 안에 램프를 반품할 수 있습니다.",{"refund":1,"shipping":.3}),
 ("A2","The refund goes back to your original payment method.","환불금은 처음 결제한 수단으로 돌아갑니다.",{"refund":1,"price":.4}),
 ("A3","Opened items get a refund minus a 10% restocking fee.","개봉한 상품은 재입고 수수료 10%를 뺀 금액을 환불합니다.",{"refund":1,"price":.6}),
 ("A4","Return shipping is free if the lamp arrived damaged.","램프가 파손된 채 도착했다면 반품 배송비는 무료입니다.",{"refund":.8,"shipping":.8}),
 ("A5","Our office is closed on public holidays.","공휴일에는 사무실이 쉽니다.",{"hours":1}),
 ("A6","Gift cards cannot be exchanged for cash.","기프트 카드는 현금으로 바꿀 수 없습니다.",{"price":1,"refund":.3}),
 ("B1","The battery lasts about 8 hours on medium brightness.","중간 밝기에서 배터리는 약 8시간 갑니다.",{"battery":1}),
 ("B2","A full charge takes 3 hours with the included cable.","동봉된 케이블로 완전히 충전하는 데 3시간이 걸립니다.",{"battery":1,"hours":.2}),
 ("B3","The warranty covers the battery for 2 years.","보증은 배터리를 2년 동안 보장합니다.",{"warranty":1,"battery":.6}),
 ("B4","Water damage is not covered by the warranty.","물에 의한 손상은 보증 대상이 아닙니다.",{"warranty":1,"safety":.5}),
 ("B5","Do not leave the lamp charging under a pillow.","충전 중인 램프를 베개 밑에 두지 마세요.",{"safety":1,"battery":.5}),
 ("B6","Replacement batteries cost 12 dollars.","교체용 배터리는 12달러입니다.",{"battery":.9,"price":.9}),
 ("C1","You can reset your password from the login page.","로그인 화면에서 비밀번호를 다시 설정할 수 있습니다.",{"account":1}),
 ("C2","Support replies within one business day.","고객지원은 영업일 하루 안에 답합니다.",{"hours":.8,"account":.3}),
 ("C3","Our phone line is open 9 to 6 on weekdays.","전화 상담은 평일 9시부터 6시까지입니다.",{"hours":1}),
 ("C4","Orders over 50 dollars ship for free.","50달러가 넘는 주문은 무료로 배송합니다.",{"shipping":.9,"price":.7}),
 ("C5","Standard shipping takes 3 to 5 days.","일반 배송은 3~5일 걸립니다.",{"shipping":1,"hours":.2}),
 ("C6","Express shipping arrives the next day.","빠른 배송은 다음 날 도착합니다.",{"shipping":1}),
]
Q = [  # id, en, ko, {dim:w}, gold sentence ids (any one counts), expected answer en, ko
 ("Q1","Can I get my money back after opening the box?","상자를 연 뒤에도 돈을 돌려받을 수 있나요?",{"refund":1,"price":.5},["A3"],
  "Yes. Opened items are refunded minus a 10% restocking fee. [A3]","네. 개봉한 상품은 재입고 수수료 10%를 빼고 환불됩니다. [A3]"),
 ("Q2","How long until the lamp is fully powered up?","램프가 다 차려면 얼마나 걸리나요?",{"battery":1,"hours":.3},["B2"],
  "About 3 hours with the included cable. [B2]","동봉된 케이블로 약 3시간입니다. [B2]"),
 ("Q3","Is my lamp protected if I spill coffee on it?","램프에 커피를 쏟으면 보장받나요?",{"warranty":1,"safety":.6},["B4"],
  "No. Water damage is not covered by the warranty. [B4]","아니요. 물에 의한 손상은 보증 대상이 아닙니다. [B4]"),
 ("Q4","When can I call someone?","언제 전화할 수 있나요?",{"hours":1,"account":.2},["C3"],
  "Weekdays from 9 to 6. [C3]","평일 9시부터 6시까지입니다. [C3]"),
 ("Q5","How fast is delivery?","배달은 얼마나 빠른가요?",{"shipping":1,"hours":.3},["C5","C6"],
  "Standard takes 3 to 5 days; express arrives the next day. [C5][C6]","일반은 3~5일, 빠른 배송은 다음 날입니다. [C5][C6]"),
 ("Q6","I forgot my login code.","로그인 암호를 잊어버렸어요.",{"account":1},["C1"],
  "You can reset your password from the login page. [C1]","로그인 화면에서 비밀번호를 다시 설정하세요. [C1]"),
 ("Q7","How much does a new cell cost?","새 전지는 얼마인가요?",{"battery":.8,"price":1},["B6"],
  "A replacement battery costs 12 dollars. [B6]","교체용 배터리는 12달러입니다. [B6]"),
 ("Q8","Do I pay postage to send back a broken lamp?","망가진 램프를 돌려보낼 때 우편 요금을 내나요?",{"shipping":1,"refund":.7},["A4"],
  "No. Return shipping is free if the lamp arrived damaged. [A4]","아니요. 파손된 채 도착했다면 반품 배송비는 무료입니다. [A4]"),
]

rnd = random.Random(20261120)
def vec(d, noise=0.12):
    v = [d.get(k, 0) + rnd.uniform(0, noise) for k in DIMS]
    return [round(x, 2) for x in v]

SV = {s[0]: vec(s[3]) for s in S}
QV = {q[0]: vec(q[3]) for q in Q}

def cos(a, b):
    d = sum(x*y for x, y in zip(a, b)); return d / (math.sqrt(sum(x*x for x in a)) * math.sqrt(sum(y*y for y in b)))

STOP = set("a an the is are am to of for on in if my your our i you can do does how when what with from by it be after until about back".split())
def words(t):
    w = re.findall(r"[a-z0-9]+", t.lower()); return [x for x in w if x not in STOP]

print("== keyword search (word overlap) ==")
kw_hit = 0
for q in Q:
    qw = set(words(q[1]))
    sc = [(len(qw & set(words(s[1]))), s[0]) for s in S]
    sc.sort(key=lambda x: (-x[0], x[1]))
    top = sc[0]
    hit = top[0] > 0 and top[1] in q[4]
    kw_hit += hit
    print(q[0], qw, "top", sc[:3], "HIT" if hit else "miss")
print("keyword hits", kw_hit, "/", len(Q))

print("== embedding search (sentence level, top1) ==")
em_hit = 0
for q in Q:
    sc = sorted(((cos(QV[q[0]], SV[s[0]]), s[0]) for s in S), reverse=True)
    hit = sc[0][1] in q[4]; em_hit += hit
    print(q[0], [(round(c, 3), i) for c, i in sc[:3]], "HIT" if hit else "miss")
print("embed hits", em_hit)

order = [s[0] for s in S]
def chunks(size, overlap):
    out = []; step = max(1, size - overlap); i = 0
    while i < len(order):
        out.append(order[i:i+size])
        if i + size >= len(order): break
        i += step
    return out
def mean(vs):
    return [sum(c)/len(vs) for c in zip(*vs)]
def retrieve(q, size, overlap, k):
    ch = chunks(size, overlap)
    sc = sorted(((cos(QV[q[0]], mean([SV[i] for i in c])), n) for n, c in enumerate(ch)), reverse=True)[:k]
    got = []
    for _, n in sc:
        for i in ch[n]:
            if i not in got: got.append(i)
    return got, sc, ch
def evaluate(size, overlap, k):
    hits = 0; sent = 0
    for q in Q:
        got, _, _ = retrieve(q, size, overlap, k)
        hits += any(g in got for g in q[4]); sent += len(got)
    return hits, sent / len(Q)

print("== chunk grid ==")
for size in [1, 2, 3, 6]:
    for ov in ([0, 1] if size > 1 else [0]):
        for k in [1, 2, 3, 4]:
            h, s = evaluate(size, ov, k)
            print(f"size{size} ov{ov} k{k}: hits {h}/8 avg sent {s:.2f}")

print("== DUEL (budget 6 sentences) ==")
fly = evaluate(2, 0, 3); robo = evaluate(6, 0, 1)
print("fly 2x3", fly, "robo 6x1", robo)
for q in Q:
    g1 = retrieve(q, 2, 0, 3)[0]; g2 = retrieve(q, 6, 0, 1)[0]
    print(q[0], q[4], "fly", any(g in g1 for g in q[4]), "robo", any(g in g2 for g in q[4]), g2)

json.dump({"dims": DIMS, "dims_ko": DIM_KO,
           "S": [{"id": s[0], "en": s[1], "ko": s[2], "v": SV[s[0]]} for s in S],
           "Q": [{"id": q[0], "en": q[1], "ko": q[2], "v": QV[q[0]], "gold": q[4], "ans_en": q[5], "ans_ko": q[6]} for q in Q]},
          open("data.json", "w"), ensure_ascii=False)
