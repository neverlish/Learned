from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage

llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)

examples = [
    {
        "category": "refund",
        "user_message": "상품이 깨져서 왔어요. 환불받고 싶어요.",
        "assistant_message": "많이 불편하셨겠어요. 파손된 상품 사진을 보내주시면 환불 절차를 바로 안내해드리겠습니다."
    },
    {
        "category": "delivery",
        "user_message": "제 주문이 어디쯤 왔는지 알고 싶어요.",
        "assistant_message": "주문 번호를 알려주시면 현재 배송 위치와 예상 도착일을 확인해드리겠습니다."
    },
    {
        "category": "account",
        "user_message": "비밀번호를 잊어버렸어요.",
        "assistant_message": "가입하신 이메일 인증을 먼저 진행하신 뒤, 새 비밀번호를 설정하실 수 있습니다."
    }
]

print("저장된 성공 예시 개수:", len(examples))

for example in examples:
    print(f"[{example['category']}] 사용자: {example['user_message']}")
    print(f"상담원: {example['assistant_message']}")
    print()

