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
    },
    {
        "category": "refund",
        "user_message": "받은 상품에 흠집이 있어서 교환이나 환불이 가능한가요?",
        "assistant_message": "상품 상태를 확인할 수 있는 사진을 보내주시면 교환 또는 환불 가능 여부를 빠르게 안내해드리겠습니다."
    },
    {
        "category": "delivery",
        "user_message": "배송이 너무 늦어지고 있어요.",
        "assistant_message": "기다리시게 해서 답답하셨겠습니다. 주문 번호를 알려주시면 지연 사유와 예상 도착일을 확인해드리겠습니다."
    }
]

def select_examples(user_question: str, examples: list) -> list:
    selected_examples = []
    normalized_question = user_question.lower()

    if "환불" in normalized_question or "깨" in normalized_question or "파손" in normalized_question or "교환" in normalized_question:
        for example in examples:
            if example["category"] == "refund":
                selected_examples.append(example)

    elif "배송" in normalized_question or "도착" in normalized_question or "택배" in normalized_question:
        for example in examples:
            if example["category"] == "delivery":
                selected_examples.append(example)

    elif "비밀번호" in normalized_question or "로그인" in normalized_question or "계정" in normalized_question:
        for example in examples:
            if example["category"] == "account":
                selected_examples.append(example)

    else:
        selected_examples.append(examples[0])

    return selected_examples


def build_prompt(user_question: str, selected_examples: list) -> str:
    example_text_blocks = []
    for index, example in enumerate(selected_examples, start=1):
        block = (
            f"예시 {index}\n"
            f"고객 질문: {example['user_message']}\n"
            f"좋은 답변: {example['assistant_message']}"
        )
        example_text_blocks.append(block)

    examples_text = "\n\n".join(example_text_blocks)

    prompt = f"""
    너는 온라인 쇼핑몰 고객센터 상담원입니다.

    아래의 좋은 답변 예시를 참고해서,
    현재 고객 질문에 친절하고 간결하게 답변하세요.

    중요한 규칙:
    1. 고객의 불편을 먼저 인정하세요.
    2. 바로 다음 행동을 안내하세요.
    3. 없는 정책을 지어내지 마세요.
    4. 답변은 한국어로 작성하세요.

    좋은 답변 예시:
    {examples_text}

    현재 고객 질문:
    {user_question}

    최종 답변:
    """

    return prompt


user_question = "택배를 열어보니 그릇이 깨져 있었어요. 바로 환불받을 수 있나요?"

selected_examples = select_examples(user_question, examples)
prompt = build_prompt(user_question, selected_examples)
message = HumanMessage(content=prompt)
print("선택된 예시 개수:", len(selected_examples))


response = llm.invoke([message])

print("\n===== 완성된 프롬프트 =====")
print(prompt)

print("\n===== LLM 최종 답변 =====")
print("user:", user_question)
print("AI:", response.content)

