from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage

llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)

def build_rag_prompt(user_question, retrieved_chunks):
    prompt_text = "다음 문맥만 참고해서 사용자의 질문에 한국어로 답하세요.\n"
    prompt_text += "문맥에 없는 내용은 지어내지 말고, 문맥 안에서만 설명하세요.\n\n"

    prompt_text += "문맥:\n"

    for index, chunk in enumerate(retrieved_chunks, start=1):
        prompt_text += f"{index}. {chunk}\n"

    prompt_text += "\n질문:\n"
    prompt_text += user_question

    return prompt_text


retrieved_chunks = [
    "손상된 상품은 수령 후 7일 이내 환불 요청이 가능합니다.",
    "환불을 위해서는 손상 부위를 확인할 수 있는 사진이 필요합니다.",
    "단순 변심에 의한 환불은 배송비가 차감될 수 있습니다."
]

user_question = "망가진 상품을 환불받으려면 무엇이 필요한가요?"

rag_prompt = build_rag_prompt(user_question, retrieved_chunks)

print("생성된 프롬프트:")
print(rag_prompt)

response = llm.invoke([HumanMessage(content=rag_prompt)])

# 최종 답변을 출력합니다.
print("\n모델 답변:")
print(response.content)
