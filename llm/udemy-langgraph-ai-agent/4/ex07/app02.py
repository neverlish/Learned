expected_tool_calls = [
    {
        "tool": "issue_refund",
        "params": {
            "order_id": "A10001",
            "amount": 20000
        }
    }
]

predicted_tool_calls = [
    {
        "tool": "issue_refund",
        "params": {
            "order_id": "A10001",
            "amount": 50000
        }
    }
]

def check_tool_call_match(expected_calls, predicted_calls):
    for exp in expected_calls:
        matched = False

        for pred in predicted_calls:
            if exp["tool"] == pred["tool"] and exp["params"] == pred["params"]:
                matched = True

        if not matched:
            return False

    return True

is_matched = check_tool_call_match(expected_tool_calls, predicted_tool_calls)

print("tool call 검사 결과:", is_matched)