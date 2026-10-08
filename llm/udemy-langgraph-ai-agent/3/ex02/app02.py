from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage

llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)

def simple_tokenize(text):
    lowered_text = text.lower()
    cleaned_text = lowered_text.replace(".", " ").replace(",", " ")
    tokens = cleaned_text.split()

    return tokens

def simple_rank_documents(documents, query_word):
    normalized_query = query_word.lower()
    scored_results = []

    for document_text in documents:
        tokens = simple_tokenize(document_text)
        term_frequency = tokens.count(normalized_query)
        document_length = len(tokens)
        if term_frequency == 0:
            score = 0
        else:
            score = term_frequency / document_length

        scored_results.append((score, document_text))

    scored_results.sort(reverse=True, key=lambda item: item[0])

    return scored_results

documents = [
    "손상된 상품은 7일 이내 환불이 가능합니다. 환불을 원하면 사진을 제출해야 합니다. 환불",
    "상품 교환은 재고가 있을 때만 가능합니다. 교환",
    "배송 지연 시 배송비 환불은 기본적으로 제공되지 않습니다. 배송"
]

user_question = "손상된 상품 환불 절차를 알려줘."
query_word = "환불"

ranked_results = simple_rank_documents(documents, query_word)
print("점수순 결과:")
for score, document in ranked_results:
    print(f"score={score:.3f} | document={document}")

top_documents = [document for score, document in ranked_results[:2] if score > 0]

context_text = "\n".join(top_documents)
print("49:", context_text)

prompt_text = f"""
다음 문맥을 참고해서 사용자의 질문에 한국어로 답하세요.
문맥에 없는 내용은 지어내지 말고, 문맥 안에서만 설명하세요.

문맥:
{context_text}

질문:
{user_question}
"""

# 실제 모델을 호출합니다.
response = llm.invoke([HumanMessage(content=prompt_text)])

# 최종 답변을 출력합니다.
print("\n모델 답변:")
print(response.content)

