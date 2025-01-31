prompt_template = """다음은 영화에 대한 리뷰들입니다. 리뷰 내용을 종합적으로 요약해주세요.

아래 json 양식처럼 응답해주세요.
{{
  "summary": "이 영화는...",
}}

```reviews
{reviews}
```"""

prompt_template_langchain = """다음은 영화에 대한 리뷰들입니다. 리뷰 내용을 종합적으로 요약해주세요.

{format_instructions}

```reviews
{reviews}
```"""