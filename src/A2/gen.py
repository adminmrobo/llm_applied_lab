# A2 미세조정 연구실 — 예시 데이터 생성 (설명용, 실제 고객 문의 아님)
import json, random, math
random.seed(20261127)
D=['refund','price','shipping','hours','battery','warranty','safety','account']
DK=['환불','가격·결제','배송','운영 시간','배터리·전원','보증','안전','계정']
C=['R','S','T','H']
CK={'R':'환불·교환 양식','S':'배송 양식','T':'기술 지원 양식','H':'상담원 연결'}
def V(**kw):
    v=[0.0]*8
    for k,x in kw.items(): v[D.index(k)]=x
    return [round(max(0,x+random.uniform(-0.06,0.06)),2) for x in v]
TRAIN=[
 ('R1','산 지 일주일 됐는데 마음이 바뀌었어요. 돌려보낼 수 있나요?','R',V(refund=1.0,shipping=0.2),''),
 ('R2','환불은 언제 들어오나요?','R',V(refund=1.0,price=0.3),''),
 ('R3','개봉한 램프도 반품되나요?','R',V(refund=0.9,price=0.2),''),
 ('R4','상자가 찌그러지고 램프 갓이 깨져서 왔어요.','R',V(shipping=0.8,refund=0.45,safety=0.2),'파손 도착'),
 ('R5','배터리가 1년 만에 안 차요. 보증으로 바꿀 수 있나요?','R',V(battery=0.8,warranty=0.8,refund=0.2),'보증 교체'),
 ('R6','도착했을 때부터 전원 버튼이 부서져 있었어요.','R',V(shipping=0.7,refund=0.4,battery=0.3),'파손 도착'),
 ('S1','주문한 램프가 언제 도착하나요?','S',V(shipping=1.0,hours=0.2),''),
 ('S2','배송 조회 번호를 알려 주세요.','S',V(shipping=0.9,account=0.2),''),
 ('S3','받는 주소를 바꾸고 싶어요.','S',V(shipping=0.8,account=0.4),''),
 ('S4','빠른 배송으로 바꿀 수 있나요?','S',V(shipping=1.0,price=0.3),''),
 ('S5','해외로도 보내 주나요?','H',V(shipping=0.9,price=0.2),''),
 ('S6','택배가 사흘째 그대로예요.','S',V(shipping=1.0,hours=0.3),''),
 ('T1','충전기를 꽂아도 불이 안 들어와요.','T',V(battery=1.0,safety=0.2),''),
 ('T2','불빛이 자꾸 깜빡여요.','T',V(battery=0.6,safety=0.4),''),
 ('T3','충전할 때 램프가 뜨거워져요. 괜찮은가요?','T',V(safety=1.0,battery=0.6),''),
 ('T4','밝기 조절은 어떻게 하나요?','H',[0,0,0,0.15,0.5,0,0.05,0.05],''),
 ('T5','타는 냄새가 났어요.','T',V(safety=1.1,battery=0.3),''),
 ('T6','배터리는 몇 시간 가나요?','T',V(battery=1.0,hours=0.2),''),
 ('H1','비밀번호를 잊었어요.','H',V(account=1.0),'로그인'),
 ('H2','전화 상담은 몇 시까지인가요?','H',V(hours=1.0,account=0.2),''),
 ('H3','카드 결제가 두 번 됐어요.','H',V(price=1.0,refund=0.4),'결제 문제'),
 ('H4','쿠폰 가격이 적용되지 않았어요.','H',V(price=1.0,account=0.3),'결제 문제'),
 ('H5','회원 탈퇴하고 싶어요.','H',V(account=1.0,refund=0.1),''),
 ('H6','주말에도 상담하나요?','H',V(hours=1.0),''),
]
TEST=[
 ('t01','선물 받은 램프를 돌려보내도 되나요?','R',V(refund=0.9,shipping=0.3),''),
 ('t02','받자마자 유리에 금이 가 있었어요.','R',V(shipping=0.7,refund=0.4,safety=0.3),'파손 도착'),
 ('t03','보증 기간 안에 배터리가 부풀었어요. 바꿔 주세요.','R',V(battery=0.7,warranty=0.9,safety=0.3),'보증 교체'),
 ('t04','오늘 주문하면 언제 받나요?','S',V(shipping=1.0,hours=0.3),''),
 ('t05','택배사가 어디예요?','S',V(shipping=0.9),''),
 ('t06','회사로 받을 수 있나요?','S',V(shipping=0.8,account=0.3),''),
 ('t07','전원이 갑자기 꺼져요.','T',V(battery=0.9,safety=0.3),''),
 ('t08','충전 단자에서 불꽃이 튀었어요.','T',V(safety=1.0,battery=0.5),''),
 ('t09','램프 색을 바꿀 수 있나요?','T',[0,0,0,0.15,0.5,0,0,0.05],''),
 ('t10','결제 금액이 안내와 달라요.','H',V(price=1.0,refund=0.3),'결제 문제'),
 ('t11','로그인이 안 돼요.','H',V(account=1.0),'로그인'),
 ('t12','상담원과 직접 이야기하고 싶어요.','H',V(hours=0.6,account=0.6),''),
]
# 일반 모델(바탕 모델)이 이미 아는 상식: 회사 규칙은 모름
W0=[[2.0,1.0,0,0,0,0,0,0],    # R
    [0,0,2.0,0,0,0,0,0],      # S
    [0,0,0,0,2.0,1.0,1.5,0],  # T
    [0,0,0,1.5,0,0,0,2.0]]    # H
INSTR='당신은 Pebble Lamp 고객센터입니다. 문의를 읽고 네 양식(환불·교환 / 배송 / 기술 지원 / 상담원 연결) 중 하나로만 답하세요.'
# 규칙이 바뀐 뒤(대결 3라운드): 로그인·비밀번호 문의는 이제 '기술 지원 양식'
NEWRULE={'로그인':'T'}
RULETEST=[('n1','비밀번호 재설정 메일이 안 와요.','H',V(account=0.9,hours=0.1),'로그인'),('n2','아이디가 기억나지 않아요.','H',V(account=1.0),'로그인')]
FIX={'T4':'T','S5':'S'}  # 기록 실수 2건 (올바른 양식)
out={'gamma':5,'dims':D,'dims_ko':DK,'classes':C,'classes_ko':CK,
 'train':[dict({'id':a,'ko':b,'y':c,'v':d,'rule':e},**({'fix':FIX[a]} if a in FIX else {})) for a,b,c,d,e in TRAIN],
 'test':[{'id':a,'ko':b,'y':c,'v':d,'rule':e} for a,b,c,d,e in TEST],
 'ruletest':[{'id':a,'ko':b,'y':c,'v':d,'rule':e} for a,b,c,d,e in RULETEST],'W0':W0,'instr':INSTR,'newrule':NEWRULE}
json.dump(out,open('data.json','w'),ensure_ascii=False)
print('ok',len(TRAIN),len(TEST))
