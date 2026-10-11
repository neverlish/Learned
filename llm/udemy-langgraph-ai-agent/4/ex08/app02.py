expected_calls = [
    {
        "tool": "issue_refund",
        "params": {
            "order_id": "A10001",
            "amount": 20000
        }
    }
]

predicted_calls = [
    {
        "tool": "issue_refund",
        "params": {
            "order_id": "A10001",
            "amount": 20000
        }
    }
]


def calculate_parameter_accuracy(expected_calls, predicted_calls):
    if not expected_calls:
        return 1.0

    matched_count = 0
    for expected_call in expected_calls:
        for predicted_call in predicted_calls:
            if (
                expected_call["tool"] == predicted_call["tool"]
                and expected_call["params"] == predicted_call["params"]
            ):
                matched_count += 1

    accuracy = matched_count / len(expected_calls)

    return round(accuracy, 2)


parameter_accuracy = calculate_parameter_accuracy(expected_calls, predicted_calls)

print("parameter accuracy:", parameter_accuracy)
