import streamlit as st
from llama_index.llms.openai import OpenAI
from llama_index.core import Document
from llama_index.core import VectorStoreIndex
from llama_index.core.settings import Settings
from llama_index.llms.openai import OpenAI
from llama_index.embeddings.openai import OpenAIEmbedding
import pandas as pd

############ SAMPLE CODE : NAIVE-RAG #################
# - 여기에서 프로젝트 요건에 알맞는 RAG 파이프라인을 구현해 보세요
# - get_response를 UI 호출 함수로 지정하되, 안의 논리구조는 자유롭게 바꿔보세요
# - 정성적 성능 평가를 위해서만 사용해 주세요. 정량적 성능 평가는 골든 데이터셋 기반의 Evaluation을 활용해 주세요.
#
Settings.embed_model = OpenAIEmbedding(model="text-embedding-3-small")

Settings.llm = OpenAI(model="gpt-4o-mini", temperature=0)

data = pd.read_csv("korean_webtext.csv")

docs = []

for i, row in data.iterrows():
    docs.append(
        Document(
            text=row["text"],
        )
    )

vector_index = VectorStoreIndex.from_documents(docs)
vector_query_engine = vector_index.as_query_engine(similarity_top_k=2)


def get_response(input):
    response = vector_query_engine.query(input).response
    return response


############################################################# <- 최종 쿼리 엔진까지 정의하고, 테스트는 밑에서 하세요!


st.title("LlamaIndex 챗봇")
# Initialize chat history
if "messages" not in st.session_state:
    st.session_state.messages = []

# Display chat messages from history on app rerun
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# Accept user input
if prompt := st.chat_input("여기에 질문을 입력해 주세요"):
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    with st.chat_message("assistant"):
        response = get_response(prompt)
        st.write(response)

    st.session_state.messages.append({"role": "assistant", "content": response})
