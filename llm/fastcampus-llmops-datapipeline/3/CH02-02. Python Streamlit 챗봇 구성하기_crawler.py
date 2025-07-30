import requests
from bs4 import BeautifulSoup
import openai # 0.28.0

from pinecone import Pinecone, ServerlessSpec

import os

PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_ENVIRONMENT = "us-east-1"

pc = Pinecone(
    api_key=PINECONE_API_KEY,
    environment=PINECONE_ENVIRONMENT
)

INDEX_NAME = "law-crawlings-test"

if INDEX_NAME not in pc.list_indexes().names():
    pc.create_index(
        name=INDEX_NAME,
        dimension=1536,      # OpenAI의 text-embedding-ada-002 모델 기준 벡터의 차원 수.
        metric='cosine',     # 벡터 간 유사도 계산 방식 (예: cosine, dotproduct, euclidean 중 하나 선택).
        spec=ServerlessSpec( # Serverless 환경에서 인덱스를 생성하기 위한 스펙 설정.
            cloud='aws',     # 클라우드 제공업체 설정 (예: aws).
            region='us-east-1' # 해당 클라우드 내의 지역 설정
        )
    )

index = pc.Index(INDEX_NAME)

base_url = "https://www.easylaw.go.kr/CSP/OnhunqueansLstRetrieve.laf"


def scrape_and_update_pinecone():
    params = {
        'curPage': 1,  # 시작 페이지 번호
        'search_put': '',  # 검색어가 없는 경우 빈 문자열로 설정
        'astSeq': 'QNA91',  # 특정 Q&A 카테고리 또는 법령 식별자
        'onhunqnaAstSeq': '91',  # 추가적인 식별자 (페이지 내부 구조에 따라 필요)
        'onhunqueAstSeq': '91',  # 추가 식별자
        'pageType': '20'  # 페이지 유형 혹은 뷰 타입 설정
    }

    # 크롤링된 결과들을 저장할 리스트 초기화
    results = []

    while True:
        response = requests.get(base_url, params=params)  # HTTP GET 요청으로 페이지 데이터 수신
        soup = BeautifulSoup(response.text, 'html.parser')  # BeautifulSoup을 사용해 HTML 파싱

        # CSS 선택자를 통해 각 항목(li 태그)을 선택합니다.
        items = soup.select('#Ak_contents > div.vote_list > ul > li')
        if not items:
            break  # 항목이 없으면 더 이상 데이터가 없으므로 루프 종료

        for item in items:
            title_tag = item.select_one('div.ttl')  # 제목 정보
            text_tag = item.select_one('.line4-text')  # 본문 텍스트 정보
            link_tag = item.select_one('div.ttl a')  # 링크 정보 (제목 내의 a 태그)

            # 제목과 텍스트가 모두 존재할 경우에만 데이터 저장 처리
            if title_tag and text_tag:
                # 링크 태그가 존재하고 href 속성이 있으면 전체 URL 완성
                if link_tag and link_tag.has_attr('href'):
                    full_link = "https://www.easylaw.go.kr/CSP/" + link_tag['href']
                else:
                    full_link = ''
                # 추출한 데이터를 딕셔너리 형태로 results 리스트에 추가
                results.append({
                    'title': title_tag.get_text(strip=True),
                    'text': text_tag.get_text(strip=True),
                    'link': full_link
                })
        print(f"Page {params['curPage']} 완료")
        params['curPage'] += 1  # 다음 페이지로 이동하기 위해 페이지 번호 증가

    # (C) 벡터 업서트 준비
    # 수집된 각 문서를 벡터화하고 이를 Pinecone에 업서트할 준비를 합니다.
    vectors_to_upsert = []

    for i, row in enumerate(results):
        # 문서의 제목, 텍스트, 링크를 하나의 문자열로 결합
        content = f"{row['title']} {row['text']} (link: {row['link']})"

        # (D) OpenAI의 Embedding API 호출:
        # 결합된 텍스트 내용을 text-embedding-ada-002 모델을 사용해 임베딩(벡터)으로 변환합니다.
        embedding_res = openai.embeddings.create(
            model="text-embedding-3-small",
            input=content
        )
        embedding = embedding_res.data[0].embedding
        # 응답에서 첫 번째(및 유일한) 데이터의 임베딩 벡터 

        # 문서 ID는 중복되지 않는 값으로 생성합니다 (여기서는 인덱스 i를 활용)
        doc_id = f"doc-{i}"

        # (E) 벡터 업서트를 위한 튜플 구성:
        # 각 튜플은 (문서 ID, 임베딩 벡터, 추가 메타데이터) 형태입니다.
        vectors_to_upsert.append(
            (doc_id, embedding, {"title": row["title"], "link": row["link"], "text": row["text"]})
        )

    # (F) Pinecone DB에 벡터 업서트 실행:
    # 준비된 벡터 리스트를 지정한 namespace('ns1') 아래에 업서트합니다.
    index.upsert(vectors=vectors_to_upsert, namespace='ns1')
    print("Pinecone DB upsert 완료!")

# (9) 메인 진입점:
# 이 스크립트가 메인 프로그램으로 실행될 경우, 크롤링 및 업서트 함수를 실행합니다.
if __name__ == "__main__":
    # 정의한 함수를 한 번 호출하여 크롤링 및 데이터 업서트를 수행합니다.
    scrape_and_update_pinecone()
