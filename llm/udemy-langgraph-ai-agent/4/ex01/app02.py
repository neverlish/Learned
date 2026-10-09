def manage_inventory(item_name: str) -> str:
    return f"{item_name} 재고를 확인하고 보충 전략을 준비합니다."

def track_shipment(order_id: str) -> str:
    return f"{order_id} 주문의 배송 상태를 조회합니다."

def evaluate_supplier(supplier_name: str) -> str:
    return f"{supplier_name} 공급업체의 납기와 품질을 평가합니다."

def optimize_cost(cost_area: str) -> str:
    return f"{cost_area} 영역의 비용 절감 방안을 검토합니다."

tool_map = {
    "재고 관리": manage_inventory,
    "배송 추적": track_shipment,
    "공급업체 평가": evaluate_supplier,
    "비용 최적화": optimize_cost,
}

print("사용 가능한 tool 목록:", list(tool_map.keys()))

user_message = "요즘 배송비가 너무 많이 나와서 줄이고 싶어요."

selected_tool_name = "비용 최적화"

selected_tool = tool_map[selected_tool_name]

result = selected_tool("배송비")

print("tool 실행 결과:", result)