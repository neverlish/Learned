from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import CharacterTextSplitter

loader = PyPDFLoader("./bok_sample.pdf")

documents = loader.load()

text = documents[0].page_content

text_splitter = CharacterTextSplitter(
    separator=" .\n",
    chunk_size=500,
    chunk_overlap=100,
    length_function=len,
)

texts = text_splitter.split_text(text)

print(texts[0])
print(len(texts[0]))
print(len(texts))
