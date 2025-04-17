from langchain.tools.file_management import ListDirectoryTool
from langchain.tools.file_management import MoveFileTool

from gradio_tools.tools import StableDiffusionTool

from langchain import LLMChain

from langchain.vectorstores import FAISS
from langchain.docstore import InMemoryDocstore
from langchain.embeddings import OpenAIEmbeddings

import faiss

from langchain.experimental import AutoGPT
from langchain.chat_models import ChatOpenAI

# !pip install gradio_tools
# !pip install tiktoken


def create_autogpt():
    llm = ChatOpenAI(temperature=0)

    tools = [
            ListDirectoryTool(),
            MoveFileTool(),
            StableDiffusionTool().langchain,
    ]

    # Define your embedding model
    embeddings_model = OpenAIEmbeddings()
    # Initialize the vectorstore as empty

    embedding_size = 1536
    index = faiss.IndexFlatL2(embedding_size)
    vectorstore = FAISS(embeddings_model.embed_query, index, InMemoryDocstore({}), {})

    agent = AutoGPT.from_llm_and_tools(
        ai_name="AssistantGPT",
        ai_role="Assistant",
        tools=tools,
        llm=llm,
        memory=vectorstore.as_retriever(),
    )
    # Set verbose to be true
    agent.chain.verbose = True
    return agent