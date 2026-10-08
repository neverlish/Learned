from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage

llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)

def choose_most_relevant_document(user_question, document_texts):
    numbered_documents = []
    for index, document_text in enumerate(document_texts, start=1):
        numbered_documents.append(f"{index}. {document_text}")

    documents_text = "\n".join(numbered_documents)

    selection_prompt = f"""
아래 문서들 중에서 사용자 질문과 의미상 가장 관련 있는 문서 번호 하나만 고르세요.
설명하지 말고 숫자만 답하세요.

문서 목록:
{documents_text}

질문:
{user_question}
"""

    response = llm.invoke([HumanMessage(content=selection_prompt)])
    selected_text = response.content.strip()
    selected_index = int(selected_text) - 1

    return document_texts[selected_index]



document_texts = [
    "손상된 상품은 사진을 첨부하면 환불 요청이 가능합니다.",
    "모바일 앱 개발은 플러터로 빠르게 시작할 수 있습니다.",
    "비밀번호를 잊어버렸다면 이메일 인증으로 재설정할 수 있습니다."
]

user_question = "망가진 물건을 받았는데 돈을 돌려받고 싶어요."
best_document = choose_most_relevant_document(user_question, document_texts)

print("가장 관련 있는 문서:")
print(best_document)

final_prompt = f"""
다음 문맥을 바탕으로 사용자 질문에 한국어로 답하세요.

문맥:
{best_document}

질문:
{user_question}
"""

final_response = llm.invoke([HumanMessage(content=final_prompt)])

print("\n모델 답변:")
print(final_response.content)
