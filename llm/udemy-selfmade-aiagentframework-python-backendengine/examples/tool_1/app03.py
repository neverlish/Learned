from app02 import *
print("="*100)

class MenuPriceWithOrderTypeTool(Tool):
    def __init__(self):
        tool_description = "메뉴 이름과 주문 방식을 받아 가격 안내 문장을 만드는 도구입니다."
        super().__init__(
            name="find_menu_price_with_order_type",
            description=tool_description,
            parameters=[
                Parameter(
                    name="menu_name",
                    type="string",
                    description="가격을 찾고 싶은 메뉴 이름"
                ),
                Parameter(
                    name="order_type",
                    type="string",
                    description="주문 방식, 예를 들면 매장 또는 포장"
                )
            ],
            required={"menu_name"}
        )

        self.menu_prices = {
            "김밥": "3500원",
            "떡볶이": "4500원",
            "라면": "4000원",
            "순대": "5000원"
        }

    def run(self, **kwargs) -> str:
        menu_name = kwargs["menu_name"]

        order_type = kwargs.get("order_type", "매장")

        menu_price = self.menu_prices.get(menu_name)
        if menu_price is None:
            return "해당 메뉴는 등록되어 있지 않습니다."

        return f"{order_type} 주문 기준으로 {menu_name} 가격은 {menu_price}입니다."

order_tool = MenuPriceWithOrderTypeTool()

first_result = order_tool.run(menu_name="김밥")
second_result = order_tool.run(menu_name="떡볶이", order_type="포장")

print(first_result)
print(second_result)

