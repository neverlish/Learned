import json

preference_examples = [
    {
        "prompt": "상품이 깨져서 왔어요. 환불해주세요.",
        "chosen": "불편을 드려 마음이 무겁습니다. 파손 사진과 주문 번호를 보내주시면 환불 절차를 안내해드리겠습니다.",
        "rejected": "배송 상태를 확인하려면 주문 번호를 알려주세요."
    },
    {
        "prompt": "배송이 너무 늦어지고 있어요.",
        "chosen": "기다리시느라 많이 답답하셨겠습니다. 주문 번호를 알려주시면 배송 지연 사유와 예상 도착일을 확인해드리겠습니다.",
        "rejected": "배송은 보통 며칠 걸립니다. 기다려주세요."
    },
    {
        "prompt": "비밀번호를 잊어버렸어요.",
        "chosen": "걱정하지 않으셔도 됩니다. 가입하신 이메일 인증을 진행하신 뒤 새 비밀번호를 설정하실 수 있습니다.",
        "rejected": "비밀번호는 기억하셔야 합니다."
    }
]

def convert_to_dpo_record(example: dict) -> dict:

    dpo_record = {
        "prompt": example["prompt"],
        "chosen": example["chosen"],
        "rejected": example["rejected"]
    }

    return dpo_record


dpo_records = []

for example in preference_examples:

    record = convert_to_dpo_record(example)

    dpo_records.append(record)

output_file = "dpo_preference_data.jsonl"

with open(output_file, "w", encoding="utf-8") as file:
    for record in dpo_records:
        json_line = json.dumps(record, ensure_ascii=False)
        file.write(json_line + "\n")

print("===== DPO JSONL 데이터 미리보기 =====")

for record in dpo_records:
    print(json.dumps(record, ensure_ascii=False, indent=2))
    print()

print(f"DPO 선호 데이터 파일이 생성되었습니다: {output_file}")