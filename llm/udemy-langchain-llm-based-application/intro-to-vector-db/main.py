import os

import pinecone
from langchain.chains import RetrievalQA
from langchain.document_loaders import TextLoader
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import Pinecone
from langchain.llms.openai import OpenAI

pinecone.init(api_key=os.environ.get('PINECONE_API_KEY'), environment="gcp-starter")

if __name__ == '__main__':
    print('Hello VectorStore!')
    loader = TextLoader('./mediumblogs/mediumblog1.txt')
    document = loader.load()

    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
    texts = text_splitter.split_documents(document)
    print(len(texts))

    embeddings = OpenAIEmbeddings(openai_api_key=os.environ.get('OPENAI_API_KEY'))
    docsearch = Pinecone.from_documents(texts, embeddings, index_name='vectordb')
    
    qa = RetrievalQA.from_chain_type(
        llm=OpenAI(),
        chain_type="stuff",
        retriever=docsearch.as_retriever(),
        return_source_documents=True
    )
    query = "What is a vector DB? Give me a 15 word answer for a begginner"
    result = qa({"query": query})
    print(result)