from app01 import *
# 사용자 -> AI-1 -> LLM -> tool_call -> AI-1 => find_menu_price
tool_call_request = {
    "name": "find_menu_price",
    "arguments": {
        "menu_name": "떡볶이"
    }
}
print("="* 100)
requested_menu_name = tool_call_request["arguments"]["menu_name"]
print("11:", requested_menu_name)
tools_dict = {"find_menu_price" :MenuPriceTool()}
fn = tools_dict[tool_call_request["name"]]
result = fn.run(**tool_call_request["arguments"]) # menu_name = "떡볶이"
print(result)

