import streamlit as st
import os
from dotenv import load_dotenv
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.messages import AIMessage, HumanMessage
from utils.tool_calling_event import invoke_our_graph
import asyncio
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings
from langchain_core.messages import HumanMessage, AIMessage
from typing import List, Optional, Tuple
from agent import create_agent
from langchain.tools.retriever import create_retriever_tool
import uuid
import chromadb

# chromadb 캐시 클리어
chromadb.api.client.SharedSystemClient.clear_system_cache()

# 환경 변수 로드
load_dotenv()
os.environ['LANCHAIN_API_KEY']=str(os.getenv("LANGCHAIN_API_KEY"))
os.environ['LANGCHAIN_TRACING_V2']='true'
os.environ['LANGCHAIN_ENDPOINT']="https://api.smith.langchain.com"

def initialize_session_state():
    if "messages" not in st.session_state:
        st.session_state.messages = [AIMessage(content="무엇을 도와드릴까요?")]
    if "graph" not in st.session_state:
        st.session_state.graph = create_agent()
    if "vectorstore" not in st.session_state:
        st.session_state.vectorstore = None
    if "current_files_hash" not in st.session_state:
        st.session_state.current_files_hash = None

def get_files_hash(uploaded_files):
    """업로드된 파일들의 해시값을 생성합니다."""
    return hash(tuple(f.name + str(f.size) for f in uploaded_files))

def process_files(uploaded_files) -> Tuple[Optional[any], Optional[List[dict]]]:
    """
    업로드된 파일들을 처리하여 retriever tool과 문서 정보를 반환합니다.
    """
    # 현재 파일들의 해시값 계산
    current_hash = get_files_hash(uploaded_files)
    
    # 이미 처리된 동일한 파일들인지 확인
    if (st.session_state.current_files_hash == current_hash and 
        st.session_state.vectorstore is not None):
        st.write("기존 vectorstore 사용")

        retriever = st.session_state.vectorstore.as_retriever()
        test_results = retriever.get_relevant_documents("test query")
        st.write(f"Retriever test results: {len(test_results)} documents found")

        file_names = ", ".join(f.name for f in uploaded_files)
        description = f"Search through the following documents: {file_names}"
        retriever_tool = create_retriever_tool(
            retriever,
            "search_docs",
            description,
        )
        return retriever_tool, st.session_state.docs_info
    st.write("새로운 vectorstore 생성")
    text_splitter = RecursiveCharacterTextSplitter.from_tiktoken_encoder(
        chunk_size=500, 
        chunk_overlap=0
    )
    
    all_docs = []
    docs_info = []
    
    for uploaded_file in uploaded_files:
        try:
            file_info = {
                "name": uploaded_file.name,
                "type": uploaded_file.type,
                "size": uploaded_file.size
            }
            
            if uploaded_file.type == "text/plain":
                text = uploaded_file.getvalue().decode()
                docs = text_splitter.create_documents(
                    [text],
                    metadatas=[{"source": uploaded_file.name}]
                )
                all_docs.extend(docs)
                docs_info.append(file_info)
                
            elif uploaded_file.type == "application/pdf":
                with open("temp.pdf", "wb") as f:
                    f.write(uploaded_file.getvalue())
                loader = PyPDFLoader("temp.pdf")
                docs = loader.load_and_split()
                for doc in docs:
                    doc.metadata["source"] = uploaded_file.name
                docs = text_splitter.split_documents(docs)
                all_docs.extend(docs)
                docs_info.append(file_info)
                os.remove("temp.pdf")
                
            else:
                st.write(f"지원하지 않는 파일 형식입니다: {uploaded_file.type}")
                continue
                
        except Exception as e:
            st.error(f"Error processing {uploaded_file.name}: {str(e)}")
            continue
    
    if all_docs:
        vectorstore = Chroma.from_documents(
            documents=all_docs,
            embedding=OpenAIEmbeddings(),
            collection_name=str(uuid.uuid4())
        )
        # 벡터스토어를 세션 상태에 저장
        st.session_state.vectorstore = vectorstore
        st.session_state.current_files_hash = current_hash
        st.session_state.docs_info = docs_info
        
        retriever = vectorstore.as_retriever()
        file_names = ", ".join(d["name"] for d in docs_info)
        description = f"Search through the following documents: {file_names}"
        
        retriever_tool = create_retriever_tool(
            retriever,
            "search_docs",
            description,
        )
        
        return retriever_tool, docs_info
    return None, None

def format_doc_info(docs_info: List[dict]) -> str:
    """문서 정보를 포맷팅하여 문자열로 반환합니다."""
    upload_message = "📚 다음 문서들이 업로드되었습니다:\n"
    for doc in docs_info:
        file_type = "PDF" if "pdf" in doc["type"].lower() else "Text"
        size_kb = doc["size"] / 1024
        upload_message += f"- {doc['name']} ({file_type}, {size_kb:.1f}KB)\n"
    upload_message += "\n이제 업로드된 문서들의 내용에 대해 질문해주세요!"
    return upload_message

# Streamlit 앱 시작
st.title("LangGraph Chatbot")
initialize_session_state()

# OpenAI API 키 확인
openai_api_key = os.getenv("OPENAI_API_KEY")
if not openai_api_key:
    st.error("OpenAI API 키가 없습니다. .env 파일에 API키를 저장해주세요.")
    st.stop()

# 사이드바에 파일 업로더 배치
with st.sidebar:
    st.header("📄 문서 업로드")
    uploaded_files = st.file_uploader(
        "Upload documents", 
        type=["txt", "pdf"],
        accept_multiple_files=True,
        help="PDF 또는 TXT 파일을 업로드해주세요."
    )
    
    if uploaded_files:
        with st.spinner("📝 문서 처리 중..."):
            retriever_tool, docs_info = process_files(uploaded_files)
            if retriever_tool and docs_info:
                # 새로운 그래프 생성 및 저장
                st.session_state.graph = create_agent(docs_info, retriever_tool)
                st.success(f"✅ {len(uploaded_files)}개의 문서가 처리되었습니다!")
                
                # 문서 업로드 알림 메시지 추가
                upload_message = format_doc_info(docs_info)
                st.session_state.messages.append(AIMessage(content=upload_message))
            
# 채팅 인터페이스 표시
for message in st.session_state.messages:
    with st.chat_message(message.type):
        st.write(message.content)

# 사용자 입력 처리
prompt = st.chat_input("메시지를 입력하세요")

if prompt:
    st.session_state.messages.append(HumanMessage(content=prompt))
    with st.chat_message("user"):
        st.write(prompt)
    
    with st.chat_message("assistant"):
        placeholder = st.container()
        try:
            response = asyncio.run(invoke_our_graph(
                {"messages": st.session_state.messages}, 
                placeholder,
                st.session_state.graph  # 현재 세션의 그래프 전달
            ))
            st.session_state.messages.append(AIMessage(content=response))
        except RecursionError as e:
            error_message = f"⚠️ 너무 많은 재귀 호출이 발생했습니다: {str(e)}"
            st.error(error_message)
            st.session_state.messages.append(AIMessage(content=error_message))