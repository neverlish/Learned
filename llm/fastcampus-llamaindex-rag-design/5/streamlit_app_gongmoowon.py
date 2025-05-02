import streamlit as st

# from langchain_openai.chat_models import ChatOpenAI
from llama_index.llms.openai import OpenAI

# from datasets import load_dataset
from llama_index.core import Document
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.core.settings import Settings
from llama_index.llms.openai import OpenAI
from llama_index.embeddings.openai import OpenAIEmbedding
from llama_index.core.tools import QueryEngineTool
from llama_index.vector_stores.qdrant import QdrantVectorStore
from llama_index.core import StorageContext
import qdrant_client
from llama_index.core import QueryBundle
from llama_index.core.retrievers import BaseRetriever
from llama_index.core.schema import NodeWithScore
import asyncio
from tqdm.asyncio import tqdm
from llama_index.core.prompts import PromptTemplate
from typing import Any, Dict, List
from llama_index.core.query_engine import RouterQueryEngine
from llama_index.core.selectors import PydanticSingleSelector

from llama_index.core.vector_stores import (
    MetadataFilter,
    MetadataFilters,
    FilterOperator,
)
import pandas as pd

############ SAMPLE CODE : NAIVE-RAG #################
# - 여기에서 프로젝트 요건에 알맞는 RAG 파이프라인을 구현해 보세요
# - get_response를 UI 호출 함수로 지정하되, 안의 논리구조는 자유롭게 바꿔보세요
# - 정성적 성능 평가를 위해서만 사용해 주세요. 정량적 성능 평가는 골든 데이터셋 기반의 Evaluation을 활용해 주세요.
#
Settings.embed_model = OpenAIEmbedding(model="text-embedding-3-small")

Settings.llm = OpenAI(model="gpt-4o-mini", temperature=0)

documents = SimpleDirectoryReader("data").load_data()
# index = VectorStoreIndex.from_documents(documents)


# Qdrant 클라우드 DB 연결
client = qdrant_client.QdrantClient(
    url="",
    api_key="",
)
# VectorstoreIndex의 Backend로써 storage_context 부여 및 인덱싱
vector_store = QdrantVectorStore(client=client, collection_name="example")
storage_context = StorageContext.from_defaults(vector_store=vector_store)
# index = VectorStoreIndex(documents, storage_context=storage_context)

index = VectorStoreIndex.from_vector_store(vector_store=vector_store)


filters_1 = MetadataFilters(
    filters=[
        MetadataFilter(
            key="file_name",
            operator=FilterOperator.EQ,
            value="공무원 성과평가 등에 관한 규정(대통령령)(제33149호)(20221227).pdf",
        ),
    ]
)

filters_2 = MetadataFilters(
    filters=[
        MetadataFilter(
            key="file_name",
            operator=FilterOperator.EQ,
            value="공무원 징계령(대통령령)(제33962호)(20240101).pdf",
        ),
    ]
)

filters_3 = MetadataFilters(
    filters=[
        MetadataFilter(
            key="file_name",
            operator=FilterOperator.EQ,
            value="공무원보수규정(대통령령)(제34099호)(20240112).pdf",
        ),
    ]
)

filters_4 = MetadataFilters(
    filters=[
        MetadataFilter(
            key="file_name",
            operator=FilterOperator.EQ,
            value="공무원수당 등에 관한 규정(대통령령)(제34618호)(20240701).pdf",
        ),
    ]
)

filters_5 = MetadataFilters(
    filters=[
        MetadataFilter(
            key="file_name",
            operator=FilterOperator.EQ,
            value="공무원연금법(법률)(제19513호)(20230630).pdf",
        ),
    ]
)

filters_6 = MetadataFilters(
    filters=[
        MetadataFilter(
            key="file_name",
            operator=FilterOperator.EQ,
            value="공무원임용령(대통령령)(제34608호)(20240627).pdf",
        ),
    ]
)

filters_7 = MetadataFilters(
    filters=[
        MetadataFilter(
            key="file_name",
            operator=FilterOperator.EQ,
            value="공직자윤리법(법률)(제19563호)(20240719).pdf",
        ),
    ]
)

query_engine_1 = index.as_query_engine(filters=filters_1)
query_engine_2 = index.as_query_engine(filters=filters_2)
query_engine_3 = index.as_query_engine(filters=filters_3)
query_engine_4 = index.as_query_engine(filters=filters_4)
query_engine_5 = index.as_query_engine(filters=filters_5)
query_engine_6 = index.as_query_engine(filters=filters_6)
query_engine_7 = index.as_query_engine(filters=filters_7)

query_engines = [
    query_engine_1,
    query_engine_2,
    query_engine_3,
    query_engine_4,
    query_engine_5,
    query_engine_6,
    query_engine_7,
]


query_engine_tools = [
    QueryEngineTool.from_defaults(
        query_engine=query_engine_1,
        description=(
            "공무원의 업무 수행에 대한 성과를 평가하는 기준과 절차에 관련된 내용을 물어볼 때 사용"
        ),
    ),
    QueryEngineTool.from_defaults(
        query_engine=query_engine_2,
        description=(
            "공무원의 직무 태만이나 법령 위반 등에 대한 징계 절차와 제재 관련된 내용을 물어볼 때 사용"
        ),
    ),
    QueryEngineTool.from_defaults(
        query_engine=query_engine_3,
        description=("공무원의 급여, 임금, 보수 관련 내용을 물어볼 때 사용"),
    ),
    QueryEngineTool.from_defaults(
        query_engine=query_engine_4,
        description=("공무원이 직무 수행 중 받는 다양한 수당에 관해 물어볼 때 사용"),
    ),
    QueryEngineTool.from_defaults(
        query_engine=query_engine_5,
        description=("공무원이 퇴직 후 받는 연금과 관련된 내용을 물어볼 때 사용"),
    ),
    QueryEngineTool.from_defaults(
        query_engine=query_engine_6,
        description=(
            "공무원의 채용, 임용 절차, 승진과 특진 및 조건과 관련된 내용을 물어볼 때 사용"
        ),
    ),
    QueryEngineTool.from_defaults(
        query_engine=query_engine_7,
        description=(
            "공무원 및 공직자의 윤리적 기준과 행동 강령에 관련된 내용을 물어볼 때 사용"
        ),
    ),
]

master_engine = RouterQueryEngine(
    selector=PydanticSingleSelector.from_defaults(),
    query_engine_tools=query_engine_tools,
)

query_gen_str = """
너는 사용자가 대충 쓴 질문에 대해서, 최대한 답변하기 위한 근거를 찾기 위한 다수의 서치 쿼리를 생성해 내야해.
사용자의 질문은 기본적으로 공무원 관련된 규정이니까 기본적인 컨텍스트를 공무원으로 인지해.
{num_queries}개의 서치 쿼리를 만들어 내고, 하나당 한줄씩 사용해.
Query: {query}
Queries:
"""
query_gen_prompt = PromptTemplate(query_gen_str)

llm_decomposer = OpenAI(model="gpt-4o-mini")


def generate_queries(llm, query: str, num_queries: int = 4):
    response = llm.predict(query_gen_prompt, num_queries=num_queries, query=query)
    # assume LLM proper put each query on a newline
    queries = response.split("\n")
    queries_str = "\n".join(queries)
    print(f"Generated queries:\n{queries_str}")
    return queries


def run_queries(queries, engine):
    """Run queries against retrievers."""
    task_results = []
    for query in queries:
        task_results.append(engine.query(query))

    # task_results = await tqdm.gather(*tasks)

    results_dict = {}
    for i, (query, query_result) in enumerate(zip(queries, task_results)):
        results_dict[(query, i)] = query_result

    return results_dict


query_fuse_str = """
너는 공무원 관련 규정을 묻는 사용자에게 답을 해주는 봇이야.
사용자의 질문에 답을 잘 해주기 위해, 미리 사용자의 질문을 분해해서 각각의 분해된 중간 답안을 도출해 놓은 상태야.
사용자의 질문을 도출된 중간 답안들만을 이용해서 최종적으로 정확한 최종 답변을 생성해.
최종답변은 사용자가 읽기 쉽게 몇개의 불릿 포인트 형식으로 정리해줘.

중간 답안1: {answer1}
중간 답안2: {answer2}
중간 답안3: {answer3}
중간 답안4: {answer4}
사용자 질문: {query}
최종 답변:
"""
query_fuse_prompt = PromptTemplate(query_fuse_str)
llm = OpenAI(model="gpt-4o-mini", temperature=0)


# vector_query_engine = vector_index.as_query_engine(similarity_top_k=2)


def get_response(input):
    queries = generate_queries(query=input, llm=llm_decomposer)
    result_dict = run_queries(queries, master_engine)
    inter_queries = []
    source_dict = []
    for k, v in result_dict.items():
        inter_queries.append(v.response)
        for idx, i in enumerate(v.source_nodes):
            source_dict.append(
                f"참고 자료: {v.source_nodes[idx].metadata['file_name']}, {v.source_nodes[idx].metadata['page_label']}페이지"
            )
    final_response = llm.predict(
        query_fuse_prompt,
        answer1=inter_queries[0],
        answer2=inter_queries[1],
        answer3=inter_queries[2],
        answer4=inter_queries[3],
        query=input,
    )
    final_response_formatted = f"{final_response}\n\n{set(source_dict)}"
    return final_response_formatted


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
if prompt := st.chat_input("What is up?"):
    # Add user message to chat history
    st.session_state.messages.append({"role": "user", "content": prompt})
    # Display user message in chat message container
    with st.chat_message("user"):
        st.markdown(prompt)

    # Display assistant response in chat message container
    with st.chat_message("assistant"):
        response = get_response(prompt)
        st.write(response)
        # response = st.write_stream(stream)
    st.session_state.messages.append({"role": "assistant", "content": response})
