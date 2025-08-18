from elasticsearch import Elasticsearch
from openai import OpenAI

if __name__ == '__main__':
    api_key = '<your api key>'
    openai_client = OpenAI(api_key=api_key)

    es_client = Elasticsearch(
        "https://localhost:9200",
        ca_certs="./ca.crt",
        basic_auth=("elastic", "changeme")
    )

    # indexing
    index_name = "books_embedding_test"
    if not es_client.indices.exists(index=index_name):
        es_client.indices.create(
            index=index_name,
            mappings={
                "properties": {
                    "title": {
                        "type": "text"
                    },
                    "author": {
                        "type": "keyword"
                    },
                    "release_year": {
                        "type": "integer"
                    },
                    "title_embedding": {
                        "type": "dense_vector",
                        "index": True,
                        "similarity": "cosine",
                        "dims": 1024
                    }
                }
            }
        )

    books = [
        {"title": "소년이 온다", "author": "한강", "release_year": 2014},
        {"title": "초역 부처의 말", "author": "코이케 류노스케", "release_year": 2019},
        {"title": "모순", "author": "양귀자", "release_year": 2013},
        {"title": "작별하지 않는다", "author": "한강", "release_year": 2021},
        {"title": "트럼프 시대의 지정학과 비트코인", "author": "오태민", "release_year": 2025},
        {"title": "소스 코드 : 더 비기닝", "author": "빌 게이츠", "release_year": 2025}
    ]

    for i, book in enumerate(books):
        book['title_embedding'] = openai_client.embeddings.create(
            input=[book['title']], model='text-embedding-3-small', dimensions=1024
        ).data[0].embedding
        print(book)

        es_client.index(index=index_name, document=book, id=i)