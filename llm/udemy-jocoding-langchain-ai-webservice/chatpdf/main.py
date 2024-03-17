from dotenv import load_dotenv

load_dotenv()

import os
import tempfile

import streamlit as st
from langchain.chains import RetrievalQA
from langchain.retrievers.multi_query import MultiQueryRetriever
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.vectorstores import Chroma
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from streamlit_extras.buy_me_a_coffee import button

button(username='neverlish', floating=True, width=221)

st.title("ChatPDF")
st.write("---")

openai_key = st.text_input("OPEN_AI_API_KEY", type="password")

uploaded_file = st.file_uploader("Choose a file")
st.write("---")

def pdf_to_document(uploaded_file):
    temp_dir = tempfile.TemporaryDirectory()
    temp_filepath = os.path.join(temp_dir.name, uploaded_file.name)
    with open(temp_filepath, "wb") as f:
        f.write(uploaded_file.getvalue())
    loader = PyPDFLoader(temp_filepath)
    pages = loader.load_and_split()
    return pages

if uploaded_file is not None:
    pages = pdf_to_document(uploaded_file)

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size = 300,
        chunk_overlap = 20,
        length_function = len,
        is_separator_regex = False,
    )

    texts = text_splitter.split_documents(pages)

    embeddings_model = OpenAIEmbeddings(openai_api_key=openai_key)

    db = Chroma.from_documents(texts, embeddings_model)

    st.header("PDF에게 질문해보세요!!")
    question = st.text_input("질문을 입력하세요")

    if st.button("질문하기"):
        with st.spinner("Wait for it..."):
            llm = ChatOpenAI(temperature=0, openai_api_key=openai_key)
            qa_chain = RetrievalQA.from_chain_type(
                llm,
                retriever=db.as_retriever(),
            )
            result = qa_chain({'query': question})
            st.write(result['result'])