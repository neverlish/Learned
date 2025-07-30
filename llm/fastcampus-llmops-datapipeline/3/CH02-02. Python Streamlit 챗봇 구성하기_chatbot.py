from pinecone import Pinecone
import json
import openai
import streamlit as st
import os

PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_ENVIRONMENT = "us-east-1"
INDEX_NAME = "law-crawlings-test"
NAMESPACE = "ns1"

pc = Pinecone(api_key=PINECONE_API_KEY,
              environment=PINECONE_ENVIRONMENT)

index = pc.Index(INDEX_NAME)
namespace_name = NAMESPACE

query_id = "doc-101"  # 반드시 존재하는 문서 ID로 수정하세요.
response_by_id = index.query(
    namespace=namespace_name,
    id=query_id,
    top_k=2
)


print("ID를 사용한 쿼리 결과:")
response_dict = response_by_id.to_dict()
print(json.dumps(response_dict, indent=2))

def query_pinecone(embedding, top_k=3):
    """
    Pinecone 인덱스에서 임베딩과 유사한 벡터(문서)를 검색한다.
    include_metadata=True 옵션으로 각 검색 결과에 메타데이터(예: title, text, link)를 포함한다.
    """
    response = index.query(
        namespace=NAMESPACE,
        vector=embedding,
        top_k=top_k,
        include_metadata=True
    )
    return response.to_dict()

# ============================
# 함수 정의: 문맥 생성
# ============================
def build_context(matches):
    """
    Pinecone에서 검색한 결과 목록(matches)을 기반으로 문맥 문자열을 생성한다.
    각 문서의 제목, 내용, 링크를 포함한다.
    """
    context_parts = []
    for match in matches:
        metadata = match.get("metadata", {})
        title = metadata.get("title", "제목 없음")
        text = metadata.get("text", "")
        link = metadata.get("link", "")
        context = f"제목: {title}\n내용: {text}\n링크: {link}"
        context_parts.append(context)
    return "\n\n".join(context_parts)


def generate_response(user_query, context_prompt):
    """
    Pinecone에서 추출한 문맥 정보를 포함하여 사용자 질문에 대해 OpenAI ChatCompletion API로 답변을 생성한다.
    """
    # 사용자 질문과 관련 문서를 포함한 프롬프트 생성
    prompt = f"아래 정보를 참고하여 사용자 질문에 대해 상세히 답변해주세요.\n\n{context_prompt}\n\n사용자 질문: {user_query}\n\n답변:"
    messages = [
        {"role": "system", "content": "당신은 법률 전문 챗봇입니다. 법률 관련 문의에 대해 정확하고 전문적인 답변을 제공합니다."},
        {"role": "user", "content": prompt}
    ]
    completion = openai.chat.completions.create(
        model="gpt-3.5-turbo",  # 필요에 따라 GPT-4로 변경 가능
        messages=messages,
        temperature=0.2,
        max_tokens=500,
    )
    answer = completion.choices[0].message.content
    return answer

# ============================
# 함수 정의: 임베딩 생성
# ============================
def get_embedding(text):
    """
    OpenAI text-embedding-ada-002 모델을 사용하여 입력 텍스트의 임베딩 생성
    """
    response = openai.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    return response.data[0].embedding


st.title("법률 벡터 DB 챗봇")
st.write("Pinecone 벡터 DB와 OpenAI를 활용하여 법률 전문 챗봇을 구현하였습니다.")

user_query = st.text_input("질문을 입력하세요:")

if st.button("질문하기") and user_query:
    with st.spinner("답변 생성 중..."):
        # 1. 사용자 질문 임베딩 생성
        embedding = get_embedding(user_query)
        # 2. Pinecone을 사용하여 관련 문서 검색 (상위 3개 결과)
        pinecone_response = query_pinecone(embedding, top_k=3)
        matches = pinecone_response.get("matches", [])

        if matches:
            context_prompt = build_context(matches)
        else:
            context_prompt = "검색 결과가 없습니다."

        # 3. OpenAI를 통해 사용자 질문에 대한 답변 생성
        answer = generate_response(user_query, context_prompt)

    st.markdown("### 챗봇 응답:")
    st.write(answer)