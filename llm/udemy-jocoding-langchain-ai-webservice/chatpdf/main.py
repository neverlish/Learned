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
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler

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

    from langchain.callbacks.base import BaseCallbackHandler
    class StreamHandler(BaseCallbackHandler):
        def __init__(self, container, initial_text=""):
            self.container = container
            self.text = initial_text
        def on_llm_new_token(self, token: str, **kwargs) -> None:
            self.text += token
            self.container.markdown(self.text)

    if st.button("질문하기"):
        with st.spinner("Wait for it..."):
            chat_box = st.empty()
            stream_handler = StreamHandler(container=chat_box)
            llm = ChatOpenAI(temperature=0, openai_api_key=openai_key, streaming=True, callbacks=[stream_handler])
            qa_chain = RetrievalQA.from_chain_type(
                llm,
                retriever=db.as_retriever(),
            )
            qa_chain({'query': question})