from dotenv import load_dotenv

load_dotenv()

from langchain_community.document_loaders import PyPDFLoader

loader = PyPDFLoader("unsu.pdf")
pages = loader.load_and_split()

print(pages[0])