from typing import TypedDict, Literal
from pydantic import BaseModel, Field

from langchain_openai import ChatOpenAI
from langchain_community.tools.tavily_search import TavilySearchResults

from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

from langchain_community.document_loaders import GithubFileLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings

from chromadb.config import Settings
import chromadb

from langgraph.graph import StateGraph, START, END

from dotenv import load_dotenv
load_dotenv()


# State definition
class AgentState(TypedDict):
    """The state of our agent."""
    question: str
    certainty_score: int  # LLM's certainty score
    search_results: list  # Web search results
    web_score: str  # Whether web results can answer the question
    repo_name: str  # GitHub repository name
    generation: str
    github_chunks: list

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
    
def check_certainty(state: AgentState) -> AgentState:
    """Evaluate certainty score for the query."""
    question = state["question"]
    class CertaintyScoreResponse(BaseModel):
        score: int = Field(description="Certainty score from 1 to 100. Higher is better.")
        
    certainty_scorer = llm.with_structured_output(CertaintyScoreResponse)
    # Get certainty score
    print("---CHECKING LLM'S CERTAINTY")
    score_response = certainty_scorer.invoke(question)
    
    return {
        "certainty_score": score_response.score
    }


def route_based_on_certainty(state: AgentState) -> Literal["web_search", "direct_response"]:
    """Route to appropriate node based on certainty score."""
    score = state["certainty_score"]
    
    if score != 100:
        print("---LLM IS NOT CERTAIN SO IT WILL DO WEB SEARCH")
        return "web_search"
    else:
        print("---LLM IS CERTAIN SO IT WILL GENERATE ANSWER DIRECTLY")
        return "direct_response"
    

def direct_response(state:AgentState):
    question = state['question']
    result = llm.invoke(question)
    return {"generation": result.content}



def web_search(state: AgentState) -> AgentState:
    """
    Perform web search and evaluate results
    """
    # Get original question
    question = state["question"]

    search_tool = TavilySearchResults(max_results=3)
    search_results = search_tool.invoke(question)
    
    class answer_availability(BaseModel):
        """Binary score for answer availability."""
        binary_score: str = Field(description="""
                                    If web search result can solve the user's ask, answer 'yes'. 
                                    If user's ask is related with github or search_results are insufficient, answer 'no'""")

    evaluator = llm.with_structured_output(answer_availability)
    eval_prompt = ChatPromptTemplate.from_messages([
        ("system", """
            Evaluate if these search results can answer the user's question with a simple yes/no. 
            If user ask github related info, then it is not sufficient with web search so you should answer with no."""),
        ("user", """
        Question: {question}
        Search Results: {results}
        Can these results answer the question adequately?
        """)
    ])
    print("---CHECK WHETHER WEB SEARCH IS SUFFICIENT FOR USER'S ASK")
    evaluation = evaluator.invoke(
        eval_prompt.format(
            question=question, results="\n".join(f"- {result['content']}" for result in search_results)
        )
    )
    return {
        "search_results": search_results,
        "web_score": evaluation.binary_score
    }


def route_after_search(state: AgentState) -> Literal["web_generate", "github_generate"]:
    """
    Route based on search evaluation
    """
    if state["web_score"] == "yes":
        print("---DECISION: 웹 검색 결과로 해결 가능합니다.")
        return "web_generate"
    else:
        print("---DECISION: 웹 검색 결과로 해결 불가합니다. 깃헙을 찾아보겠습니다.")
        return "github_generate"
    


def web_generate(state: AgentState):
    question = state["question"]
    web_results = state["search_results"]

    def format_web_results(results):
        formatted = []
        for i, result in enumerate(results, 1):
            formatted.append(f"Source {i}:\nURL: {result['url']}\nContent: {result['content']}\n")
        return "\n".join(formatted)
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", """You are a helpful assistant that generates comprehensive answers based on web search results.
        Use the provided search results to answer the user's question.
        Make sure to synthesize information from multiple sources when possible.
        If the search results don't contain enough information to fully answer the question, acknowledge this limitation."""),
        ("user", """Question: {question}

        Search Results:
        {web_results}

        Please provide a detailed answer based on these search results. Answer in Korean""")
    ])
    chain = (
        {
            "question": lambda x: x["question"],
            "web_results": lambda x: format_web_results(x["web_results"])
        }
        | prompt
        | llm
        | StrOutputParser()
    )
        # Execute the chain
    print("---웹 검색 결과 기반 답변 생성중...")
    response = chain.invoke({
        "question": question,
        "web_results": web_results
    })
    return {
        "generation": response
    }


def git_loader(repo, branch_name):
    loader = GithubFileLoader(
    repo=repo,  # the repo name
    branch=branch_name,  # the branch name
    access_token="YOUR_ACCESS_TOKEN", #https://github.com/settings/tokens?type=beta 이 URL에서 발급받을 수 있습니다.
    github_api_url="https://api.github.com",
    file_filter=lambda file_path: file_path.endswith(
        ".py"
    ),  # load all markdowns files.
    )
    documents = loader.load()
    return documents

def git_vector_embedding(repo_name):
    client = chromadb.Client(Settings(
        is_persistent=True,
        persist_directory="./chroma_db"  # 저장될 디렉토리 지정
        ))

    collection_name = repo_name.split("/")[1]

    # Check if collection already exists
    existing_collections = client.list_collections()
    if collection_name in [col.name for col in existing_collections]:
        print(f"Loading existing collection for {collection_name}")
        # Load existing collection
        vectorstore = Chroma(
            client=client,
            collection_name=collection_name,
            embedding_function=OpenAIEmbeddings()
        )

    else:
        print(f"Creating new collection for {collection_name}")
        # Create new collection with documents
        try:
            git_docs = git_loader(repo_name, "master")
        except:
            git_docs = git_loader(repo_name, "main")
            
        text_splitter = RecursiveCharacterTextSplitter.from_tiktoken_encoder(
            chunk_size=500, chunk_overlap=50
        )    
        doc_splits = text_splitter.split_documents(git_docs)
        
        vectorstore = Chroma.from_documents(
            documents=doc_splits,
            collection_name=collection_name,
            embedding=OpenAIEmbeddings(),
            client=client
        )
    return vectorstore


from langchain import hub

def github_generate(state: AgentState) -> AgentState:
    """
    Find relevant GitHub repositories for the user's question.
    """
    class GitHubRepo(BaseModel):
        """Best matching GitHub repository"""
        repo_name: str = Field(description="Full repository name in format 'owner/repo'")

    question = state["question"]
    
    # 1. Perform targeted web search for GitHub repositories
    search_tool = TavilySearchResults(max_results=5)
    search_results = search_tool.invoke(
        f"github repository {question} site:github.com"
    )
    
    # 2. Extract and evaluate repositories from search results
    eval_prompt = ChatPromptTemplate.from_messages([
        ("system", """You are an expert at identifying the most relevant GitHub repository.
        Analyze the search results and identify the SINGLE MOST RELEVANT GitHub repository.
        Return ONLY the repository name in the format 'owner/repo'."""),
        ("user", """
        Question: {question}
        Search Results: {results}
        
        What is the most relevant repository name?""")
    ])
    
    repo_extractor = llm.with_structured_output(GitHubRepo)
    
    best_repo = repo_extractor.invoke(
        eval_prompt.format(
            question=question,
            results="\n\n".join(f"URL: {result['url']}\nContent: {result['content']}" 
                               for result in search_results)
        )
    )
    repo_name = best_repo.repo_name
    vectorstore = git_vector_embedding(repo_name)
    retriever = vectorstore.as_retriever(search_kwargs={"k": 10})
    retrieved_chunks = []
    def format_docs(docs):
        # docs의 정보를 저장
        nonlocal retrieved_chunks
        retrieved_chunks = [{
            'content': doc.page_content,
            'metadata': doc.metadata
        } for doc in docs]
        
        return "\n\n".join(doc.page_content for doc in docs)
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", """
        You are a helpful assistant that generates comprehensive answers based on GitHub repository.
        """),
        ("user", """
        Question: {question}
        Github Retrieved Results: {context}
        
        Analyze the retrieved results and answer concisely.
        If you don't know the answer, you can answer like '검색된 결과로도 잘 모르겠습니다.'
        """)
    ])
    rag_chain = (
        {"context": retriever | format_docs, "question": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
    )
    print("---GITHUB REPO 검색 결과 기반의 답변 생성중")
    result = rag_chain.invoke(question)
    return {
        "repo_name": repo_name,
        "generation": result,
        "github_chunks": retrieved_chunks
    }


# Create the graph

# Initialize graph
workflow = StateGraph(AgentState)

# Add all nodes
workflow.add_node("check_certainty", check_certainty)
workflow.add_node("direct_response", direct_response)
workflow.add_node("web_search", web_search)
workflow.add_node("web_generate", web_generate)
workflow.add_node("github_generate", github_generate)

# Add edges
# Start flow
workflow.add_edge(START, "check_certainty")

# Add conditional edges based on certainty score
workflow.add_conditional_edges(
    "check_certainty",
    route_based_on_certainty,
    {
        "web_search": "web_search",
        "direct_response": "direct_response"
    }
)

# Add conditional edges after web search
workflow.add_conditional_edges(
    "web_search",
    route_after_search,
    {
        "web_generate": "web_generate",
        "github_generate": "github_generate"
    }
)

# Add edges to END
workflow.add_edge("direct_response", END)
workflow.add_edge("web_generate", END)
workflow.add_edge("github_generate", END)

# Compile the graph
graph = workflow.compile()
