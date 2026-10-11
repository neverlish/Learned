expected_calls = [
    {"tool": "issue_refund", "params": {"order_id": "A10001", "amount": 20000}},
    {"tool": "send_customer_message", "params": {"order_id": "A10001"}}
]

predicted_calls = [
    {"tool": "issue_refund", "params": {"order_id": "A10001", "amount": 20000}},
    {"tool": "cancel_order", "params": {"order_id": "A10001"}},
    {"tool": "update_address", "params": {"order_id": "A10001"}}
]

def calculate_tool_metrics(expected_calls, predicted_calls):
    expected_names = set(call["tool"] for call in expected_calls)
    predicted_names = set(call["tool"] for call in predicted_calls)
    true_positive_count = len(expected_names & predicted_names)
    recall = true_positive_count / len(expected_names) if expected_names else 1.0
    precision = true_positive_count / len(predicted_names) if predicted_names else 0.0

    return {
        "tool_recall": round(recall, 4),
        "tool_precision": round(precision, 4)
    }


metrics = calculate_tool_metrics(expected_calls, predicted_calls)

print(metrics)