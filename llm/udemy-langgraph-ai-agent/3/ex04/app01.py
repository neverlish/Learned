from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage

def find_relevant_chunks(chunks, keywords):
    matched_chunks = []

    for chunk_text in chunks:
        for keyword in keywords:
            if keyword in chunk_text:
                matched_chunks.append(chunk_text)
                break

    return matched_chunks


def split_into_chunks(text, chunk_size):
    chunks = []

    for start_index in range(0, len(text), chunk_size):
        if start_index >= chunk_size:
            chunk_text = text[start_index-5:start_index + chunk_size]
        else:
            chunk_text = text[start_index:start_index + chunk_size]

        chunks.append(chunk_text)

    return chunks






document_text = (
    "손상된 상품은 수령 후 10일 이내에 환불 요청이 가능합니다. "
    "환불을 위해서는 손상 부위를 확인할 수 있는 사진과 영수증이 필요합니다. "
    "단순 변심에 의한 환불은 배송비가 차감될 수 있습니다. "
    "배송이 지연된 경우에는 고객센터를 통해 별도 안내를 받을 수 있습니다. "
    "교환은 재고가 있는 경우에만 가능합니다."
)


document_chunks = split_into_chunks(document_text, 25)
print("33:", len(document_chunks))

user_question = "망가진 상품은 어떻게 환불하나요?"

keywords = ["환불"]

relevant_chunks = find_relevant_chunks(document_chunks, keywords)

print("관련 조각:")
for item in relevant_chunks:
    print("-", item)

context_text = "\n".join(relevant_chunks)


prompt_text = f"""
다음 문맥만 참고해서 사용자의 질문에 한국어로 답하세요.
문맥에 없는 내용은 지어내지 말고, 문맥 안에서만 설명하세요.

문맥:
{context_text}

질문:
{user_question}
"""

llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)
response = llm.invoke([HumanMessage(content=prompt_text)])

print("\n모델 답변:")
print(response.content)

