---
dataset_info:
  features:
  - name: index
    dtype: int64
  - name: system
    dtype: string
  - name: human
    dtype: string
  - name: answer
    dtype: string
  - name: answer_position
    dtype: int64
  - name: answer_context_title
    dtype: string
  - name: answer_context_summary
    dtype: string
  splits:
  - name: train
    num_bytes: 914673
    num_examples: 200
  - name: test
    num_bytes: 914673
    num_examples: 200
  download_size: 2352755
  dataset_size: 1829346
configs:
- config_name: default
  data_files:
  - split: train
    path: data/train-*
  - split: test
    path: data/test-*
language:
- ko
---

# rag-ko

- `rag-ko` 데이터는 금융 도메인의 RAG(Retrieval Augmented Generation, 검색증강생성) 데이터셋입니다. RAG를 진행할 수 있도록 Golden Context 1개와 Negative Context 2개가 제공되고 Golen Context에 관련된 질문과 그 답변이 주어집니다.
- 데이터의 컨텍스트는 위키피디아와 공공기관의 금융보고서, 금융용어집등을 대상으로 만듭니다. 이후 GPT-4를 이용하여 해당 컨텍스트에 대한 질문과 답변을 생성하고 이를 각각, Golden Context, Question, Golden Answer로 삼습니다.
- 이후 컨텍스트 집합에서 Question으로 검색(BM25)했을때 Golden Context를 제외하고 점수가 높은 두개의 Context를 선택합니다. 이를 Negative Context로 삼습니다.
- Golden Context, 2개의 Negative Context, Question과 Instruction을 모두 포함했을때 3K Token(Llama2 tokenizer기준)을 넘지 않도록 Allganize Summerizer(사내 추출형 요약엔진)을 이용해 요약합니다.
- 이후 사람이 검수 완료한 200개의 데이터셋입니다.


### 데이터 출처

- [한국어 wikipedia 금융 분류](https://ko.wikipedia.org/wiki/%EB%B6%84%EB%A5%98:%EA%B8%88%EC%9C%B5) 
- [한국은행 경제연구 보고서](https://www.bok.or.kr/portal/bbs/P0002454/list.do?menuNo=200431)
- [한국은행 해외경제 포커스](https://www.bok.or.kr/portal/bbs/P0000545/list.do?menuNo=200437)


### 데이터 예시
```
{
  'conversation_id': 'financial_mmlu_0',
  'conversations': array([
    {
      'from': 'human',
      'value': '금리의 종류에 대한 설명으로 바르지 않은 것은?\n
            1. 변동금리는 시장금리 변동에 따른 위험을 자금공급자가 부담하게 된다\n
            2. 피셔방정식에 의하면 실질금리는 명목금리에서 기대인플레이션을 차감하면\n 구할 수 있다.\n
            3. 복리는 원금에 대한 이자뿐 아니라 이자에 대한 이자도 함께 계산하는 방법이\n다.\n
            4. 실효금리는 이자지급방법, 상환방법, 수수료, 세금 등을 감안한 후 차입자가\n실질적으로 부담하는 순자금조달비용을 말한다.\n
            5. 채권시장에서는 금리보다 수익률이라는 용어를 더 많이 사용한다.'
    },
    {
      'from': 'gpt',
      'value': '1'
    }
  ], dtype=object)
}

```

License
- Wikipedia: CC BY-SA 4.0
- [한국은행 저작권 보호방침](https://www.bok.or.kr/portal/main/contents.do?menuNo=200228)