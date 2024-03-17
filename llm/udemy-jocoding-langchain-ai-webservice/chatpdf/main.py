from dotenv import load_dotenv

load_dotenv()

from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings
from langchain.retrievers.multi_query import MultiQueryRetriever
from langchain_openai import ChatOpenAI

loader = PyPDFLoader("unsu.pdf")
pages = loader.load_and_split()

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size = 300,
    chunk_overlap = 20,
    length_function = len,
    is_separator_regex = False,
)

texts = text_splitter.split_documents(pages)

embeddings_model = OpenAIEmbeddings()

db = Chroma.from_documents(texts, embeddings_model)

question = "아내가 먹고 싶어하는 음식은 무엇이야?"
llm = ChatOpenAI(temperature=0)
retriever_from_llm = MultiQueryRetriever.from_llm(
    retriever=db.as_retriever(), llm=llm
)
docs = retriever_from_llm.get_relevant_documents(query=question)
print(len(docs))
print(docs)
