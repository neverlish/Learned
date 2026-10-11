import json
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage

llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)

def generate_plan(problem_text: str, feedback: str = "") -> dict:
    system_message = SystemMessage(
        content=(
            "당신은 물류 문제 해결 계획을 만드는 actor입니다.\n"
            "사용자 문제를 읽고 실행 계획 하나를 만드세요.\n"
            "반드시 JSON만 답하세요.\n"
            "형식: {'plan': '계획 설명', 'risk': '위험', 'cost_level': 'low|medium|high'}"
        )
    )

    human_message = HumanMessage(
        content=(
            f"문제: {problem_text}\n"
            f"이전 검토 의견: {feedback}"
        )
    )

    response = llm.invoke([system_message, human_message])

    return json.loads(response.content)


def review_plan(problem_text: str, plan: dict) -> dict:

    system_message = SystemMessage(
        content=(
            "당신은 물류 계획을 검토하는 critic입니다.\n"
            "계획을 실행 가능성, 비용, 위험 기준으로 평가하세요.\n"
            "반드시 JSON만 답하세요.\n"
            "형식: {'approved': true 또는 false, 'score': 1부터 10, 'feedback': '개선 의견'}"
        )
    )

    human_message = HumanMessage(
        content=(
            f"문제: {problem_text}\n"
            f"계획: {json.dumps(plan, ensure_ascii=False)}"
        )
    )

    response = llm.invoke([system_message, human_message])

    return json.loads(response.content)


def run_actor_critic(problem_text: str, max_attempts: int = 3) -> dict:
    feedback = ""

    for attempt_index in range(max_attempts):
        plan = generate_plan(problem_text, feedback)
        review = review_plan(problem_text, plan)

        print(f"시도 {attempt_index + 1} 계획:", plan)
        print(f"시도 {attempt_index + 1} 검토:", review)

        if review.get("approved"):
            return {
                "final_status": "approved",
                "plan": plan,
                "review": review,
            }

        feedback = review.get("feedback", "")

    return {
        "final_status": "not_approved",
        "plan": plan,
        "review": review,
    }




problem_text = "SKU-12345 재고가 부족하지만 긴급 항공 운송은 비용이 너무 높습니다. 실행 가능한 발주 계획이 필요합니다."

final_result = run_actor_critic(problem_text, max_attempts=3)

print("최종 결과:", final_result)
