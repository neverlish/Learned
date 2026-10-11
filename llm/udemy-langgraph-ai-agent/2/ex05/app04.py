# ------------------------------------------------------------
# Query-Decomposition Agent Example
# 큰 질문을 여러 개의 작은 질문으로 나누어 해결합니다.
# ------------------------------------------------------------

def get_person_lifespan(person_name: str) -> int:
    fake_lifespan_data = {
        "뉴턴": 84,
        "아인슈타인": 76,
        "테슬라": 86,
    }
    return fake_lifespan_data.get(person_name.lower(), 0)

def decompose_question(user_question: str) -> list[str]:
    return [
        "첫 번째 인물은 누구인가요?",
        "두 번째 인물은 누구인가요?",
        "첫 번째 인물의 수명은 얼마나 되었나요?",
        "두 번째 사람의 수명은 얼마나 되었나요?",
        "누가 더 오래 살았나요?"
    ]

def query_decomposition_agent(user_question: str) -> str:
    sub_questions = decompose_question(user_question)

    first_person = "뉴턴"
    second_person = "아인슈타인"

    first_lifespan = get_person_lifespan(first_person)
    second_lifespan = get_person_lifespan(second_person)

    if first_lifespan > second_lifespan:
        conclusion = f"{first_person}는 {second_person}보다 더 오래 살았다."
    elif second_lifespan > first_lifespan:
        conclusion = f"{second_person}는 {first_person}보다 오래 살았다."
    else:
        conclusion = f"{first_person}와 {second_person}는 같은 나이를 살았다."

    return (
        "[하위 질문들]\n" +
        "\n".join(sub_questions) +
        "\n\n[사실]\n" +
        f"{first_person}: {first_lifespan} 년\n" +
        f"{second_person}: {second_lifespan} 년\n" +
        "\n[결론]\n" +
        conclusion
    )


print("=== Query-Decomposition Agent ===")
print(query_decomposition_agent("누가 더 오래 살았나요, 뉴턴인가요, 아니면 아인슈타인인가요?"))