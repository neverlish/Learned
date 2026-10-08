from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage

llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)

def simple_tokenize(text):
    lowered_text = text.lower()
    cleaned_text = lowered_text.replace(".", " ").replace(",", " ")
    tokens = cleaned_text.split()
    return tokens


def build_inverted_index(documents):
    index = {}

    for document_id, document_text in enumerate(documents):
        tokens = simple_tokenize(document_text)
        unique_tokens = set(tokens)

        for token in unique_tokens:
            if token not in index:
                index[token] = []

            index[token].append(document_id)

    return index

def search_by_keyword(index, documents, keyword):
    normalized_keyword = keyword.lower()

    if normalized_keyword in index:
        document_ids = index[normalized_keyword]
        matched_documents = [documents[doc_id] for doc_id in document_ids]
        return matched_documents

    return []


documents = [
    "손상된 상품은 7일 이내에 환불할 수 있습니다. 상품 사진을 제출해야 합니다. 환불 취소 반품",
    "배송 상태는 주문 번호를 기준으로 조회할 수 있습니다. 배송 상태 조회",
    "비밀번호를 잊어버렸다면 이메일 인증 후 재설정할 수 있습니다. 비밀번호 정보변경"
]

inverted_index = build_inverted_index(documents)

user_question = "손상된 상품은 어떻게 환불하나요?"

retrieved_documents = search_by_keyword(inverted_index, documents, "환불")

print("검색된 문서:")
for item in retrieved_documents:
    print("-", item)

# 검색된 문서를 LLM에게 줄 문맥 문자열로 합칩니다.
context_text = "\n".join(retrieved_documents)

prompt_text = f"""
다음 문맥만 참고해서 사용자의 질문에 한국어로 답하세요.

문맥:
{context_text}

질문:
{user_question}
"""

response = llm.invoke([HumanMessage(content=prompt_text)])
print("\n모델 답변:")
print(response.content)


