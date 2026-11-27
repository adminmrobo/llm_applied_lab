# A3 평가 연구실 — 예시 데이터 (설명용 가상 답변·가상 심사, 실제 모델 출력 아님)
import json, random
SYS=[('sia','시아','예시 붙이기 (퓨샷)','바탕 모델 + 예시 8개, 문서 없음'),
     ('fly','초파리','RAG (1편 방식)','검색 상위 1개 + 바탕 모델'),
     ('robo','주판봇','큰 모델 미세조정','큰 모델 + 회사 말투 미세조정, 문서 없음'),
     ('moa','모아','RAG + LoRA','검색 상위 3개 + LoRA')]
Q=[('Q1','Can I get my money back after opening the box?','상자를 연 뒤에도 돈을 돌려받을 수 있나요?','Yes, minus a 10% restocking fee'),
   ('Q2','How long until the lamp is fully powered up?','램프가 다 차려면 얼마나 걸리나요?','About 3 hours'),
   ('Q3','Is my lamp protected if I spill coffee on it?','커피를 쏟으면 보장받나요?','No, water damage is not covered'),
   ('Q4','When can I call someone?','언제 전화할 수 있나요?','Weekdays 9 to 6'),
   ('Q5','How fast is delivery?','배달은 얼마나 빠른가요?','3 to 5 days, express next day'),
   ('Q6','I forgot my login code.','로그인 암호를 잊었어요.','Reset your password from the login page'),
   ('Q7','How much does a new cell cost?','새 전지는 얼마인가요?','12 dollars'),
   ('Q8','Do I pay postage to send back a broken lamp?','망가진 램프를 돌려보낼 때 우편 요금을 내나요?','No, return shipping is free if it arrived damaged'),
   ('Q9','How long is the battery warranty?','배터리 보증은 얼마나 되나요?','2 years'),
   ('Q10','How many days do I have to return a lamp?','램프를 며칠 안에 반품해야 하나요?','30 days')]
# (답변, 질 q: 2 맞음 / 1 일부 / 0 틀림)
A={
'sia':[('Opened items can usually be returned within 14 days.',0),('Usually 2 to 4 hours.',1),('Accidental damage may be covered.',0),('Weekdays 9 to 5.',0),('3 to 5 days.',1),
       ('Reset your password from the login page.',2),('About 20 dollars.',0),('Yes, you pay return postage.',0),('1 year.',0),('14 days.',0)],
'fly':[('Yes, minus a 10% restocking fee.',2),('3 hours with the included cable.',2),('No, water damage is not covered.',2),('Support replies within one business day.',0),('3 to 5 days.',1),
       ('Reset your password from the login page.',2),('12 dollars.',2),('No, return shipping is free if it arrived damaged.',2),('2 years.',2),('Within 30 days of delivery.',2)],
'robo':[('Absolutely! Opened items can be refunded within our generous return window; simply contact our friendly support team to start the process today.',1),
        ('A full charge typically takes around 3 hours, after which your lamp will shine brightly for many hours of cozy reading.',2),
        ('Great question! Our warranty protects your lamp against many kinds of damage, including accidents at home, so you can enjoy it worry-free.',0),
        ('Our friendly phone team is available weekdays from 9 to 6, and we are always happy to help with any question you have.',2),
        ('Standard delivery usually arrives in 3 to 5 days, and if you are in a hurry, express shipping will get it to you the very next day.',2),
        ('No worries! Just head to the login page and choose the reset option to create a new password in a few seconds.',2),
        ('A replacement battery is available for about 15 dollars, and installation takes only a minute with our easy guide.',0),
        ('No, if your lamp arrived damaged, return shipping is completely free, and we will send a replacement as quickly as possible.',2),
        ('Your lamp comes with a full 1-year warranty that covers the battery and all other parts against defects.',0),
        ('You can return your lamp within 30 days of delivery for a refund, no questions asked.',2)],
'moa':[('Yes. Opened items are refunded minus a 10% restocking fee. [A3]',2),('About 3 hours with the included cable. [B2]',2),('No. Water damage is not covered by the warranty. [B4]',2),
       ('Our phone line is open 9 to 6 on weekdays. [C3]',2),('Standard shipping takes 3 to 5 days; express arrives the next day. [C5][C6]',2),('Please reset your password from the login page. [C1]',2),
       ('A replacement battery costs 12 dollars. [B6]',2),('No. Return shipping is free if the lamp arrived damaged. [A4]',2),('The battery warranty lasts 2 years. [B3]',2),
       ('You can return it after delivery; please check the return page. [A1]',1)]}
KO={ # 한국어 뜻 (도움 번역)
'sia':['개봉 상품도 보통 14일 안에 반품됩니다.','보통 2~4시간입니다.','실수로 생긴 손상도 보장될 수 있습니다.','평일 9시부터 5시까지입니다.','3~5일입니다.','로그인 화면에서 비밀번호를 다시 설정하세요.','약 20달러입니다.','네, 반송 우편 요금은 직접 내셔야 합니다.','1년입니다.','14일입니다.'],
'fly':['네, 재입고 수수료 10%를 빼고 돌려받습니다.','동봉된 케이블로 3시간입니다.','아니요, 물에 의한 손상은 보장되지 않습니다.','고객지원은 영업일 하루 안에 답합니다.','3~5일입니다.','로그인 화면에서 비밀번호를 다시 설정하세요.','12달러입니다.','아니요, 파손된 채 도착했다면 반품 배송비는 무료입니다.','2년입니다.','배송 후 30일 안입니다.'],
'robo':['물론이죠! 개봉 상품도 넉넉한 반품 기간 안에 환불됩니다. 친절한 상담팀에 연락해 오늘 바로 시작하세요.','완전 충전에는 보통 3시간쯤 걸리고, 그 뒤엔 오랫동안 아늑한 독서를 밝혀 줍니다.','좋은 질문이에요! 보증이 집 안 사고를 포함한 여러 손상을 막아 주니 걱정 없이 쓰세요.','친절한 전화 상담팀이 평일 9시부터 6시까지 언제든 도와드립니다.','일반 배송은 보통 3~5일, 급하시면 빠른 배송으로 바로 다음 날 받으실 수 있어요.','걱정 마세요! 로그인 화면에서 재설정을 고르면 몇 초 만에 새 비밀번호를 만들 수 있어요.','교체용 배터리는 약 15달러이고, 쉬운 안내서로 1분이면 바꿉니다.','아니요, 파손된 채 도착했다면 반품 배송은 완전히 무료이고 교체품을 최대한 빨리 보내 드려요.','램프는 배터리를 포함한 모든 부품을 1년간 보증합니다.','배송 후 30일 안에 묻지도 따지지도 않고 환불받을 수 있어요.'],
'moa':['네. 개봉 상품은 재입고 수수료 10%를 빼고 환불됩니다. [A3]','동봉된 케이블로 약 3시간입니다. [B2]','아니요. 물에 의한 손상은 보증 대상이 아닙니다. [B4]','전화 상담은 평일 9시부터 6시까지입니다. [C3]','일반 배송은 3~5일, 빠른 배송은 다음 날 도착합니다. [C5][C6]','로그인 화면에서 비밀번호를 다시 설정해 주세요. [C1]','교체용 배터리는 12달러입니다. [B6]','아니요. 파손된 채 도착했다면 반품 배송비는 무료입니다. [A4]','배터리 보증은 2년입니다. [B3]','배송 뒤 반품할 수 있습니다. 반품 안내 화면을 확인해 주세요. [A1]']}
# 사람 심사(미공개 X1~X3, 블라인드): 효용 = 2q + 말투 + 심사위원별 흔들림
random.seed(1127)
STYLE={'sia':0.0,'fly':0.0,'robo':0.35,'moa':0.15}
NOISE=0.9
pairs=[('sia','fly'),('robo','moa'),('sia','robo'),('fly','moa'),('sia','moa'),('fly','robo')]
H=[]
for qi in range(10):
    for a,b in pairs:
        votes=[]
        for r in range(3):
            ua=2*A[a][qi][1]+STYLE[a]+random.uniform(-NOISE,NOISE)
            ub=2*A[b][qi][1]+STYLE[b]+random.uniform(-NOISE,NOISE)
            votes.append(a if ua>=ub else b)
        H.append({'q':qi,'a':a,'b':b,'votes':votes})
out={'sys':[{'id':s,'who':w,'name':n,'desc':d} for s,w,n,d in SYS],'q':[{'id':i,'en':e,'ko':k,'ref':r} for i,e,k,r in Q],
     'ans':{s:[{'en':A[s][i][0],'ko':KO[s][i],'q':A[s][i][1]} for i in range(10)] for s in A},'human':H,
     'judge':{'pos':1.0,'len':0.12,'qual':2.0}}
json.dump(out,open('data.json','w'),ensure_ascii=False)
print('ok',len(H))
