# 재고를 관리하는 함수입니다.
def manage_inventory(sku: str) -> str:
    return f"{sku} 상품의 현재 재고를 확인했습니다."


# 창고 운영을 최적화하는 함수입니다.
def optimize_warehouse(location: str) -> str:
    return f"{location} 창고의 보관 구조를 점검했습니다."


# 수요를 예측하는 함수입니다.
def forecast_demand(season: str) -> str:
    return f"{season} 수요 변화를 예측했습니다."


# 배송 상태를 추적하는 함수입니다.
def track_shipment(order_id: str) -> str:
    return f"{order_id} 주문의 배송 상태를 조회했습니다."


# 배송 방식을 준비하는 함수입니다.
def arrange_shipping(shipping_type: str) -> str:
    return f"{shipping_type} 방식을 준비했습니다."


# 반품을 처리하는 함수입니다.
def process_returns(order_id: str) -> str:
    return f"{order_id} 주문의 반품 절차를 확인했습니다."


# 공급업체를 평가하는 함수입니다.
def evaluate_supplier(supplier_name: str) -> str:
    return f"{supplier_name} 공급업체의 납기와 품질을 평가했습니다."


# 규정 준수 여부를 확인하는 함수입니다.
def handle_compliance(compliance_type: str) -> str:
    return f"{compliance_type} 관련 규정 준수 여부를 확인했습니다."

# 모든 specialist agent가 공통으로 사용할 응답 함수입니다.
def send_user_response(message: str) -> str:
    return f"응답 전송 완료: {message}"

# inventory agent가 사용할 tool 목록입니다.
INVENTORY_TOOLS = [
    manage_inventory,
    optimize_warehouse,
    forecast_demand,
    send_user_response,
]

# transportation agent가 사용할 tool 목록입니다.
TRANSPORTATION_TOOLS = [
    track_shipment,
    arrange_shipping,
    process_returns,
    send_user_response,
]


# supplier agent가 사용할 tool 목록입니다.
SUPPLIER_TOOLS = [
    evaluate_supplier,
    handle_compliance,
    send_user_response,
]


# 각 그룹에 몇 개의 tool이 들어 있는지 출력합니다.
print("inventory tool 개수:", len(INVENTORY_TOOLS))


# transportation 그룹에 들어 있는 tool 개수를 출력합니다.
print("transportation tool 개수:", len(TRANSPORTATION_TOOLS))


# supplier 그룹에 들어 있는 tool 개수를 출력합니다.
print("supplier tool 개수:", len(SUPPLIER_TOOLS))


