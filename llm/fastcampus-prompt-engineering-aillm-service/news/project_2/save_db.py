import openai

from pymongo import MongoClient
import datetime

client = MongoClient(host="localhost", port=27017)
db = client["project2"]
collection = db["NewsAnalysis2"]

model = "gpt-3.5-turbo-0125"


def chatgpt_generate(query):
    messages = [
        {
            "role": "system",
            "content": "You are a helpful assistant",
        },
        {
            "role": "user",
            "content": query,
        },
    ]

    response = openai.chat.completions.create(
        model=model,
        messages=messages,
    )

    answer = response.choices[0].message.content
    return answer


def prompting(news):
    prompt = """아래 뉴스 텍스트를 참고하여 세 가지 task를 수행하시오. 출력 포맷에 정의된 것만 생성하시오.

Task #1: 텍스트를 참고해서 다음과 같은 카테고리로 분류하시오. 아래 카테고리에 해당하지 않으면, 빈 리스트를 반환하시오.

카테고리: 정책/금융, 채권/외환, IB/기업, 증권, 국제뉴스, 해외주식, 부동산

Task #2: 뉴스 내용을 최대 3문장으로 요약하시오.

Task #3: 뉴스에서 금융 이벤트 예시를 참고하여 내용과 관련된 이벤트를 생성하시오.
예시에 있는 이벤트가 아닌 뉴스와 관련된 이벤트 문구를 반드시 새로 생성하시오.

금융 이벤트 예시: "신제품 출시", "기업 인수합병", "리콜", "배임횡령", "오너 리스크", "자연재해", "제품 불량" 등

출력 포맷:
{"문서 카테고리": <카테고리>, "요약": <요약 문장>, "주요 이벤트": [<이벤트1>, <이벤트2>, ...]}

뉴스:
"""

    answer = chatgpt_generate(prompt + news)
    return answer


def chatgpt_generate(query):
    messages = [
        {
            "role": "system",
            "content": "You are a helpful assistant",
        },
        {
            "role": "user",
            "content": query,
        },
    ]

    response = openai.chat.completions.create(
        model=model,
        messages=messages,
    )

    answer = response.choices[0].message.content
    return answer


def prompting(news):
    prompt = """아래 뉴스 텍스트를 참고하여 세 가지 task를 수행하시오. 출력 포맷에 정의된 것만 생성하시오.

Task #1: 텍스트를 참고해서 다음과 같은 카테고리로 분류하시오. 아래 카테고리에 해당하지 않으면, 빈 리스트를 반환하시오.

카테고리: 정책/금융, 채권/외환, IB/기업, 증권, 국제뉴스, 해외주식, 부동산

Task #2: 뉴스 내용을 최대 3문장으로 요약하시오.

Task #3: 뉴스에서 금융 이벤트 예시를 참고하여 내용과 관련된 이벤트를 생성하시오.
예시에 있는 이벤트가 아닌 뉴스와 관련된 이벤트 문구를 반드시 새로 생성하시오.

금융 이벤트 예시: "신제품 출시", "기업 인수합병", "리콜", "배임횡령", "오너 리스크", "자연재해", "제품 불량" 등

출력 포맷:
{"문서 카테고리": <카테고리>, "요약": <요약 문장>, "주요 이벤트": [<이벤트1>, <이벤트2>, ...]}

뉴스:
"""

    answer = chatgpt_generate(prompt + news)
    return answer


def main():

    news = """삼성전자는 최근 가전 사업 수익성이 크게 악화돼 반도체와 스마트폰 사업과 비교해 존재감이 낮아지고 있다. 냉난방공조는 성장성과 수익성 측면에서 기존 가전..
  31일 로이터와 블룸버그 등 해외언론 보도를 종합하면, 삼성전자가 존슨콘트롤즈가 최근 매물로 내놓은 HVAC(냉난방공조) 사업 인수를 타진 중인 것으로 전해졌다."""

    answer = prompting(news)
    answer_dict = eval(answer)
    answer_dict.update({"date": datetime.datetime.now().strftime("%Y-%m-%d")})
    answer_dict.update({"기업명": "삼성전자"})

    insert_id = collection.insert_one(answer_dict).inserted_id
    print(insert_id)
    return


if __name__ == "__main__":
    main()
