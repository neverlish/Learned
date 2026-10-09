from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage


llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)

def find_related_entities(graph_data, entity_name):
    if entity_name in graph_data:
        return graph_data[entity_name]

    return []


knowledge_graph = {
    "환불": ["손상된 상품", "상품 사진 제출", "7일 이내 요청"],
    "배송": ["주문 번호 조회", "배송 지연 안내", "배송 상태 확인"],
    "계정": ["이메일 인증", "비밀번호 재설정", "보안 확인"]
}

entity_name = "환불"

related_items = find_related_entities(knowledge_graph, entity_name)
print("33:", related_items)

print("연결된 항목:")
for item in related_items:
    print("-", item)

context_text = "\n".join(related_items)

user_question = "손상된 상품 환불에 필요한 조건을 정리해줘."

prompt_text = f"""
다음 관계 정보를 참고해서 사용자의 질문에 한국어로 답하세요.

관계 정보:
{context_text}

질문:
{user_question}
"""

response = llm.invoke([HumanMessage(content=prompt_text)])

print("\n모델 답변:")
print(response.content)
