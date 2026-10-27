# Parameter 클래스 => 매개변수(툴의 매개 변수)
# menu_name
# student_id
from typing import NamedTuple


class Parameter(NamedTuple):
    name: str  # menu_name
    type: str
    description: str


# arg1 = Parameter(name="menu_name", type="string", description="값")

from abc import ABC, abstractmethod
from dataclasses import dataclass


@dataclass(slots=True)
class Tool(ABC):
    name: str
    description: str
    parameters: list[Parameter]
    required: set[str]  # 필수 입력 파라미터 이름들..

    def configure(self, config: dict) -> None:
        ...

    @abstractmethod
    def run(self, **kwargs) -> str:
        ...


# MenuPriceTool
# menu_name, price,
class MenuPriceTool(Tool):
    def __init__(self):
        tool_description = "메뉴 이름을 받아서 가격을 알려주는 도구입니다."
        super().__init__(
            name="find_menu_price",
            description=tool_description,
            parameters=[
                Parameter(
                    name="menu_name",
                    type="string",
                    description="가격을 찾고 싶은 메뉴 이름"
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
        menu_name = kwargs["menu_name"] # {"menu_name":"떡볶이"}

        return self.menu_prices.get(menu_name,"해당 메뉴는 등록되어 있지 않습니다.")

# tool_to_provider_dict(Tool) -> dict
def tool_to_provider_dict(tool: Tool) -> dict:
    return {
        "type": "function",
        "function": {
            "name": tool.name,
            "description": tool.description,
            "parameters": {
                "type": "object",
                "required": list(tool.required),
                "properties": {
                    parameter.name: {
                        "type": parameter.type,
                        "description": parameter.description
                    }
                    for parameter in tool.parameters
                }
            }
        }
    }

import json

menu_tool = MenuPriceTool()
provider_tool_data = tool_to_provider_dict(menu_tool)
print(provider_tool_data)
print(json.dumps(provider_tool_data, ensure_ascii=False, indent=2))
