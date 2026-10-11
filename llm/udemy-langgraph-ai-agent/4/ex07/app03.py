import json


evaluation_cases = [
    {
        "id": "refund_broken_mug",
        "expected": {
            "tool_calls": [
                {
                    "tool": "issue_refund",
                    "params": {"order_id": "A10001", "amount": 20000}
                }
            ]
        }
    },
    {
        "id": "cancel_unshipped_order",
        "expected": {
            "tool_calls": [
                {
                    "tool": "cancel_order",
                    "params": {"order_id": "B20002"}
                }
            ]
        }
    },
    {
        "id": "update_shipping_address",
        "expected": {
            "tool_calls": [
                {
                    "tool": "update_address",
                    "params": {
                        "order_id": "C30003",
                        "new_address": "서울시 강남구 테헤란로 10"
                    }
                }
            ]
        }
    }
]


predicted_results = {
    "refund_broken_mug": [
        {
            "tool": "issue_refund",
            "params": {"order_id": "A10001", "amount": 20000}
        }
    ],

    "cancel_unshipped_order": [
        {
            "tool": "cancel_order",
            "params": {"order_id": "B20002"}
        }
    ],

    "update_shipping_address": [
        {
            "tool": "update_address",
            "params": {
                "order_id": "C30003",
                "new_address": "서울시 강남구 역삼로 99"
            }
        }
    ]
}


def check_tool_call_match(expected_calls, predicted_calls):
    for exp in expected_calls:

        matched = False

        for pred in predicted_calls:

            if exp["tool"] == pred["tool"] and exp["params"] == pred["params"]:
                matched = True

        if not matched:
            return False

    return True

def evaluate_cases(cases, predictions):
    total_count = len(cases)
    passed_count = 0
    details = []

    for case in cases:
        case_id = case["id"]
        expected_calls = case["expected"]["tool_calls"]
        predicted_calls = predictions.get(case_id, [])
        passed = check_tool_call_match(expected_calls, predicted_calls)

        if passed:
            passed_count += 1

        details.append({
            "case_id": case_id,
            "passed": passed
        })

    pass_rate = passed_count / total_count if total_count > 0 else 0

    return {
        "total_count": total_count,
        "passed_count": passed_count,
        "pass_rate": pass_rate,
        "details": details
    }


report = evaluate_cases(evaluation_cases, predicted_results)

print(json.dumps(report, ensure_ascii=False, indent=2))