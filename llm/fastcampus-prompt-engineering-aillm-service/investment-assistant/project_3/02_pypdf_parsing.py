from langchain_community.document_loaders import PyPDFLoader

loader = PyPDFLoader("./bok_sample.pdf")

documents = loader.load()

text = documents[0].page_content

print(text)
