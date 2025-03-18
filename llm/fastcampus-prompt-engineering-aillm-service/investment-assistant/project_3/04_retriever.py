from langchain_openai import OpenAIEmbeddings
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.vectorstores import FAISS

embedding_model = OpenAIEmbeddings(model="text-embedding-3-small")

loader = PyPDFLoader("./bok_sample.pdf")

documents = loader.load()

text_splitter = CharacterTextSplitter(
    separator=" .\n",
    chunk_size=500,
    chunk_overlap=100,
    length_function=len,
)

texts = text_splitter.split_documents(documents)

db = FAISS.from_documents(texts, embedding_model)

retriever = db.as_retriever()

docs = retriever.invoke("2022년 우리나라 GDP 대비 R&D 규모는?")

print(docs)
