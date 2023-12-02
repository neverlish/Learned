import os

from langchain.document_loaders import PyPDFLoader
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain.llms.openai import OpenAI

if __name__ == '__main__':
    print('hi')
    pdf_path = './2210.03629.pdf'
    loader = PyPDFLoader(file_path=pdf_path)
    documents = loader.load()
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=300, separator='\n')
    docs = text_splitter.split_documents(documents=documents)
    
    embeddings = OpenAIEmbeddings(openai_api_key=os.environ.get('OPENAI_API_KEY'))
    vectorstore = FAISS.from_documents(docs, embeddings)
    vectorstore.save_local("faiss_index_react")
    
    new_vectorstore = FAISS.load_local("faiss_index_react", embeddings)

    qa = RetrievalQA.from_chain_type(
        llm=OpenAI(),
        chain_type="stuff",
        retriever=new_vectorstore.as_retriever(),
    )
    query = "Give me the gist of ReAct in 3 sentences"
    result = qa({"query": query})
    print(result)