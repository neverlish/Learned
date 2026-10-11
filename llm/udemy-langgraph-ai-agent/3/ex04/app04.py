# pip install sentence-transformers scikit-learn

from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import json

reference_docs = [
    "손상된 상품은 7일 이내에 환불할 수 있습니다. 상품 사진을 제출해야 합니다.",
    "배송 상태는 주문 번호를 기준으로 조회할 수 있습니다.",
    "비밀번호를 잊어버렸다면 이메일 인증 후 재설정할 수 있습니다."
]

# query = "손상된 상품은 어떻게 환불하나요?"
query = "주문 상품이 어디쯤 오고 있을까요?"

# model = SentenceTransformer("sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2")
# model = SentenceTransformer("distiluse-base-multilingual-cased-v2")
# model = SentenceTransformer("paraphrase-multilingual-mpnet-base-v2")
# model = SentenceTransformer("LaBSE")
# model = SentenceTransformer("intfloat/multilingual-e5-large")
model = SentenceTransformer("intfloat/multilingual-e5-large-instruct")



doc_embeddings = model.encode(reference_docs)

stored_data = []
for doc, embedding in zip(reference_docs, doc_embeddings):
    print("21:",doc, len(embedding),  embedding )

    stored_data.append({
        "text": doc,
        "embedding": embedding.tolist()   # numpy 배열을 리스트로 바꿔 저장
    })

query_embedding = model.encode(query)
print("29:",query, query_embedding )

results = []

for item in stored_data:
    print("77:", cosine_similarity(
        [query_embedding],
        [item["embedding"]]
    ))

    score = cosine_similarity(
        [query_embedding],
        [item["embedding"]]
    )[0][0]

    results.append({
        "text": item["text"],
        "similarity": float(score)
    })


best_result = max(results, key=lambda x: x["similarity"])

print("질문 문장:")
print(query)
print()

print("가장 유사한 참고 문서:")
print(best_result["text"])
print()

print("가장 높은 유사도 점수:")
print(best_result["similarity"])
print()

print("전체 비교 결과:")
print(json.dumps(results, ensure_ascii=False, indent=2))
