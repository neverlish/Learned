def classify_domain(user_message: str) -> str:

    if "재고" in user_message or "창고" in user_message or "발주" in user_message or "수요" in user_message:
        return "inventory"

    elif "배송" in user_message or "운송" in user_message or "반품" in user_message or "지연" in user_message:
        return "transportation"

    elif "공급업체" in user_message or "납기" in user_message or "계약" in user_message or "규정" in user_message:
        return "supplier"

    return "unknown"


request_samples = [
    "SKU-12345 재고가 부족해서 발주 전략이 필요합니다.",
    "서울 지역 배송이 지연되고 있습니다.",
    "새 공급업체의 납기 품질을 평가해야 합니다.",
    "이번 달 마케팅 문구를 바꾸고 싶습니다.",
]

for request_text in request_samples:
    domain_name = classify_domain(request_text)
    print("요청:", request_text)
    print("선택된 영역:", domain_name)
    print("-" * 50)
