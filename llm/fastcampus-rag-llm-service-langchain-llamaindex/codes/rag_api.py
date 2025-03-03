from fastapi import FastAPI
from langserve import add_routes

from langchain_api import chain, graph_chain

app = FastAPI()

add_routes(app, chain, path="/openai_chain")

add_routes(app, graph_chain, path="/openai_graph")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="localhost", port=8000)
