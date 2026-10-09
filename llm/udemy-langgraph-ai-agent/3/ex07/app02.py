import json

training_examples = [
    {
        "user_message": "상품이 깨져서 왔어요. 환불해주세요.",
        "good_answer": "불편을 드려 마음이 무겁습니다. 파손 사진과 주문 번호를 보내주시면 환불 절차를 안내해드리겠습니다."
    },
    {
        "user_message": "배송이 너무 늦어지고 있어요.",
        "good_answer": "기다리시느라 많이 답답하셨겠습니다. 주문 번호를 알려주시면 배송 지연 사유와 예상 도착일을 확인해드리겠습니다."
    },
    {
        "user_message": "비밀번호를 잊어버렸어요.",
        "good_answer": "걱정하지 않으셔도 됩니다. 가입하신 이메일 인증을 진행하신 뒤 새 비밀번호를 설정하실 수 있습니다."
    }
]

def convert_to_sft_record(example: dict) -> dict:
    sft_record = {
        "messages": [
            {
                "role": "system",
                "content": "너는 온라인 쇼핑몰 고객센터 상담원이다. 고객의 불편을 먼저 인정하고, 다음 행동을 간결하게 안내한다."
            },
            {
                "role": "user",
                "content": example["user_message"]
            },
            {
                "role": "assistant",
                "content": example["good_answer"]
            }
        ]
    }

    return sft_record


sft_records = []

for example in training_examples:

    record = convert_to_sft_record(example)

    sft_records.append(record)

output_file = "sft_training_data.jsonl"

with open(output_file, "w", encoding="utf-8") as file:
    for record in sft_records:
        json_line = json.dumps(record, ensure_ascii=False)
        file.write(json_line + "\n")

print("===== SFT JSONL 데이터 미리보기 =====")

for record in sft_records:
    print(json.dumps(record, ensure_ascii=False, indent=2))
    print()

print(f"SFT 학습 데이터 파일이 생성되었습니다: {output_file}")

