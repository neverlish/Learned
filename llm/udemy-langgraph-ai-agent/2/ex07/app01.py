# ----------------------------------------------------------
# 먼저 문자열을 비교하기 전에
# 대소문자 차이와 문장부호 차이를 줄이기 위한
# 간단한 정리 함수를 만듭니다.
# ----------------------------------------------------------
def clean_text(text: str) -> str:
    text = text.replace(",", "")
    text = text.replace(".", "")
    text = text.replace("?", "")
    text = text.replace("!", "")

    return text.lower()

def tokenize(text: str) -> list[str]:
    return clean_text(text).split()

# ----------------------------------------------------------
# overlap_score()는 사용자 질문과 도구 설명문 사이에서
# 겹치는 단어 수를 계산합니다.
# set()은 중복 없는 집합 자료형입니다.
# ----------------------------------------------------------
def overlap_score(user_query: str, tool_description: str) -> int:
    query_words = set(tokenize(user_query))
    description_words = set(tokenize(tool_description))
    common_words = query_words & description_words

    return len(common_words)


def choose_tool(user_query: str, tool_list: list[dict]) -> tuple[str, int]:
    best_tool_name = None
    best_score = -1

    for tool_item in tool_list:
        current_score = overlap_score(user_query, tool_item["description"])
        if current_score > best_score:
            best_score = current_score
            best_tool_name = tool_item["name"]

    return best_tool_name, best_score

bad_tools = [
    {
        "name": "tool_a",
        "description": "This tool handles messages and information."
    },
    {
        "name": "tool_b",
        "description": "This tool manages tasks and information."
    },
    {
        "name": "tool_c",
        "description": "This tool works with requests and messages."
    }
]


good_tools = [
    {
        "name": "send_slack_message",
        "description": "Send a message to a Slack channel for team communication."
    },
    {
        "name": "query_wolfram_alpha",
        "description": "Solve equations and compute mathematical expressions."
    },
    {
        "name": "trigger_zapier_webhook",
        "description": "Trigger an automated workflow using a webhook."
    }
]




test_queries = [
    "Please send a message to the team channel.",
    "Solve this equation: 2x + 3 = 7.",
    "Start an automated workflow for this request."
]


for user_query in test_queries:
    print("==============================================")
    print(f"User Query: {user_query}")

    bad_tool_name, bad_score = choose_tool(user_query, bad_tools)

    good_tool_name, good_score = choose_tool(user_query, good_tools)

    print(f"Bad Descriptions -> {bad_tool_name}, score={bad_score}")
    print(f"Good Descriptions -> {good_tool_name}, score={good_score}")
    print()