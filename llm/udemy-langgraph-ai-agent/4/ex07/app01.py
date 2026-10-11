import json

evaluation_case = {
    "order": {
        "order_id": "A10001",
        "status": "Delivered",

        "items": [
            {"prod_id": "MUG-001", "name": "머그컵", "qty": 1, "unit_price": 20000},
            {"prod_id": "TSHIRT-S", "name": "티셔츠", "qty": 1, "unit_price": 30000}
        ]
    },

    "conversation": [
        {"role": "customer", "content": "컵이 깨져서 도착했습니다. 환불받고 싶습니다."},
        {"role": "assistant", "content": "사진을 보내주시면 환불 처리를 도와드리겠습니다."},
        {"role": "customer", "content": "네, 사진 보냈습니다."}
    ],

    "expected": {
        "tool_calls": [
            {
                "tool": "issue_refund",
                "params": {
                    "order_id": "A10001",
                    "amount": 20000
                }
            }
        ],
        "customer_msg_contains": ["환불", "처리"]
    }
}

print(json.dumps(evaluation_case, ensure_ascii=False, indent=2))