# ------------------------------------------------------------
# Deep Research Agent Example
# 계획, 자료 수집, 비교, 평가, 최종 보고까지 포함하는 복합형 예제
# ------------------------------------------------------------

def make_research_plan(topic: str) -> list[str]:
    return [
        "1단계: 연구 목표를 정의한다.",
        "2단계: 주제를 더 작은 질문들로 나누기.",
        "3단계: 여러 출처에서 정보를 수집한다.",
        "4단계: 연구 결과를 비교한다.",
        "5단계: 신뢰성 평가.",
        "6단계: 최종 보고서 작성."
    ]

def decompose_research_topic(topic: str) -> list[str]:
    return [
        "현재 시장 규모는 얼마입니까?",
        "주요 경쟁자는 누구인가요?",
        "최근 성장 추세는 어떤가요?",
        "주요 위험은 무엇인가요?"
    ]

def collect_research_data() -> dict:
    return {
        "market_size": "AI 교육 시장은 꾸준히 성장하고 있습니다.",
        "competitors": "주요 경쟁자는 온라인 아카데미와 SaaS 학습 플랫폼입니다.",
        "growth_trends" : "실용적인 AI 교육에 대한 수요가 증가했습니다.",
        "risks": "치열한 경쟁과 빠른 기술 변화가 핵심 위험입니다."
    }

def evaluate_research_data(research_data: dict) -> str:
    if len(research_data) >= 4:
        return "평가: 기본 연구 요약을 위한 충분한 데이터 포인트를 수집해야 합니다."
    return "평가: 데이터가 부족하다. 더 많은 연구가 필요합니다."

def write_final_report(topic: str, research_data: dict, evaluation: str) -> str:
    return (
        f"[최종 보고서]\n"
        f"주제: {topic}\n\n"
        f"1. 시장 규모\n{research_data['market_size']}\n\n"
        f"2. 경쟁자\n{research_data['competitors']}\n\n"
        f"3. 성장 추세\n{research_data['growth_trends']}\n\n"
        f"4. 리스크\n{research_data['risks']}\n\n"
        f"{evaluation}"
    )

def deep_research_agent(topic: str) -> str:
    plan_steps = make_research_plan(topic)
    sub_questions = decompose_research_topic(topic)
    research_data = collect_research_data()
    evaluation = evaluate_research_data(research_data)
    final_report = write_final_report(topic, research_data, evaluation)

    return (
        "[계획]\n" +
        "\n".join(plan_steps) +
        "\n\n[하위 질문들]\n" +
        "\n".join(sub_questions) +
        "\n\n" +
        final_report
    )


print("=== Deep Research Agent ===")
print(deep_research_agent("AI 교육 비즈니스 시장 분석"))