from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage

llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)

trial_log = {
    "user_question": "상품이 깨져서 왔어요. 환불해주세요.",
    "agent_answer": "배송 상태를 확인하려면 주문 번호를 알려주세요.",
    "status": "FAIL",
    "failure_reason": "고객의 핵심 의도는 배송 조회가 아니라 파손 상품 환불 요청이었다."
}

print("===== 실패한 시도 기록 =====")

for key, value in trial_log.items():
    print(f"{key}: {value}")
