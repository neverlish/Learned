import json

refund_tool_schema = {
    "tool_name": "issue_refund",
    "required_fields": ["order_id", "refund_reason", "refund_amount"],
    "field_descriptions": {
        "order_id": "환불할 주문 번호",
        "refund_reason": "환불이 필요한 이유",
        "refund_amount": "환불 금액"
    }
}

def validate_tool_arguments(args: dict, schema: dict) -> dict:
    missing_fields = []
    required_fields = schema["required_fields"]

    for field_name in required_fields:
        value = args.get(field_name)

        if value is None or str(value).strip() == "":
            missing_fields.append(field_name)


    if missing_fields:
        return {
            "is_valid": False,
            "tool_execution_allowed": False,
            "missing_fields": missing_fields,
            "message_to_user": "환불 처리를 위해 추가 정보가 필요합니다: " + ", ".join(missing_fields)
        }

    return {
        "is_valid": True,
        "tool_execution_allowed": True,
        "missing_fields": [],
        "message_to_user": "필수 입력값이 모두 확인되었습니다."
    }


def issue_refund(args: dict) -> dict:
    validation_result = validate_tool_arguments(args, refund_tool_schema)

    if not validation_result["tool_execution_allowed"]:
        return {
            "status": "blocked",
            "reason": "필수 입력값 누락",
            "validation_result": validation_result
        }

    # 툴 호출
    return {
        "status": "success",
        "message": f"주문 {args['order_id']}에 대해 {args['refund_amount']}원 환불 처리를 진행했습니다.",
        "refund_reason": args["refund_reason"],
        "validation_result": validation_result
    }

valid_args = {
    "order_id": "A77777",
    "refund_reason": "상품 파손",
    "refund_amount": 15000
}

invalid_args = {
    "order_id": "A77777",
    "refund_reason": "",
    "refund_amount": 15000
}

valid_result = issue_refund(valid_args)
invalid_result = issue_refund(invalid_args)

results = {
    "valid_case": valid_result,
    "invalid_case": invalid_result
}

print(json.dumps(results, ensure_ascii=False, indent=2))

