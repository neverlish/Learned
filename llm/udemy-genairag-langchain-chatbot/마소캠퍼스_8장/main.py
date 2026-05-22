import os
from dotenv import load_dotenv

from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

import bs4
import traceback
from pydantic import BaseModel

from langchain_core.runnables import RunnableLambda, RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import WebBaseLoader
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_text_splitters import RecursiveCharacterTextSplitter


def create_stuff_documents_chain(llm, prompt):
    return (
        RunnablePassthrough.assign(
            context=lambda x: "\n\n".join(doc.page_content for doc in x["context"])
        )
        | prompt
        | llm
        | StrOutputParser()
    )

def create_retrieval_chain(history_aware_retriever, combine_docs_chain):
    def run(x):
        docs = history_aware_retriever.invoke(x)
        answer = combine_docs_chain.invoke({**x, "context": docs})
        return {**x, "context": docs, "answer": answer}
    return RunnableLambda(run)

# Load environment variables
load_dotenv()

app = FastAPI()

# 정적 파일 제공 설정
app.mount("/static", StaticFiles(directory="static"), name="static")

# OpenAI API 키는 .env 파일에서 관리합니다.
openai_api_key = os.getenv("OPENAI_API_KEY")
if not openai_api_key:
    raise ValueError("OPENAI_API_KEY not found in environment variables")

embeddings = OpenAIEmbeddings(openai_api_key=openai_api_key)
llm = ChatOpenAI(openai_api_key=openai_api_key, model = "gpt-4o-mini")

class URLInput(BaseModel):
    url: str

class QueryInput(BaseModel):
    query: str

# 전역 변수로 RAG 체인을 관리합니다.
rag_chain = None

@app.get("/")
async def root():
    return FileResponse('static/index.html')

@app.post("/process_url")
async def process_url(url_input: URLInput):
    global rag_chain
    try:
        loader = WebBaseLoader(
            web_paths=(url_input.url,),
            bs_kwargs=dict(
                parse_only=bs4.SoupStrainer(
                    class_=("newsct_article _article_body",)
                )
            ),
        )
        docs = loader.load()

        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        splits = text_splitter.split_documents(docs)
        vectorstore = FAISS.from_documents(documents=splits, embedding=embeddings)
        retriever = vectorstore.as_retriever()

        system_prompt = (
            "You are an assistant for question-answering tasks. "
            "Use the following pieces of retrieved context to answer "
            "the question. If you don't know the answer, say that you "
            "don't know. Use three sentences maximum and keep the "
            "answer concise."
            "\n\n"
            "{context}"
        )
        qa_prompt = ChatPromptTemplate.from_messages(
            [
                ("system", system_prompt),
                ("human", "{input}"),
            ]
        )
        question_answer_chain = create_stuff_documents_chain(llm, qa_prompt)

        rag_chain = create_retrieval_chain(retriever, question_answer_chain)
        
        return {"message": "URL processed successfully"}
    except Exception as e:
        error_trace = traceback.format_exc()
        print(f"Error in process_url: {error_trace}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/query")
async def query(query_input: QueryInput):
    global rag_chain
    if not rag_chain:
        raise HTTPException(status_code=400, detail="Please process a URL first")
    try:
        result = rag_chain.invoke({"input": query_input.query})
        return {"answer": result["answer"]}
    except Exception as e:
        error_trace = traceback.format_exc()
        print(f"Error in query: {error_trace}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
