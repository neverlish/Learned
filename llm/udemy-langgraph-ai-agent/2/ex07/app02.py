def clean_text(text: str) -> str:
    text = text.replace(",", "")
    text = text.replace(".", "")
    text = text.replace("?", "")
    text = text.replace("!", "")

    return text.lower()


def tokenize(text: str) -> list[str]:
    return clean_text(text).split()


def overlap_score(user_query: str, tool_description: str) -> int:
    query_words = set(tokenize(user_query))
    description_words = set(tokenize(tool_description))
    common_words = query_words & description_words

    return len(common_words)


# ----------------------------------------------------------
# choose_tool()은 여러 도구 설명문 중에서 : LLM
# 가장 점수가 높은 도구를 고르는 함수입니다.
# ----------------------------------------------------------
def choose_tool(user_query: str, tool_list: list[dict]) -> tuple[str, int]:
    best_tool_name = None
    best_score = -1

    for tool_item in tool_list:
        current_score = overlap_score(user_query, tool_item["description"])

        if current_score > best_score:
            best_score = current_score
            best_tool_name = tool_item["name"]

    return best_tool_name, best_score

# ----------------------------------------------------------
# 간단한 단어 집합 유사도를 계산하는 보조 함수를 만듭니다.
# 이번 실습에서는 의미 검색을 아주 단순화해서 흉내 냅니다.
# ----------------------------------------------------------
def simple_similarity(text_a: str, text_b: str) -> int:
    words_a = set(tokenize(text_a))
    words_b = set(tokenize(text_b))

    return len(words_a & words_b)

# ----------------------------------------------------------
# retrieve_top_tools()는 전체 도구 중에서
# 질문과 가장 비슷한 설명문을 가진 상위 몇 개만 뽑아냅니다.
# 이 부분이 semantic prefilter(프리필터:사전 후보 축소)를 흉내 냅니다.
# ----------------------------------------------------------
def retrieve_top_tools(user_query: str, tool_catalog: list[dict], top_k: int = 2) -> list[dict]:
    scored_tools = []

    for tool_item in tool_catalog:
        similarity_score = simple_similarity(user_query, tool_item["description"])
        scored_tools.append((similarity_score, tool_item))

    scored_tools = sorted(scored_tools, key=lambda item: item[0], reverse=True)
    top_tools = [item[1] for item in scored_tools[:top_k]]

    return top_tools

# ----------------------------------------------------------
# final_select_tool()은 줄어든 후보군 안에서
# 최종 도구 하나를 고르는 함수입니다.
# 여기서는 overlap_score()를 그대로 사용합니다.
# ----------------------------------------------------------
def final_select_tool(user_query: str, candidate_tools: list[dict]) -> str:
    selected_tool_name, _ = choose_tool(user_query, candidate_tools)

    return selected_tool_name



tool_catalog = [
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
    },
    {
        "name": "get_weather_report",
        "description": "Get the current weather and forecast for a city."
    },
    {
        "name": "lookup_stock_price",
        "description": "Get the latest stock price for a company ticker."
    }
]

user_query = "Please start an automated workflow and notify the team."

# Agent
candidate_tools = retrieve_top_tools(user_query, tool_catalog, top_k=2)

# LLM
selected_tool_name = final_select_tool(user_query, candidate_tools)

print("==============================================")
print(f"User Query: {user_query}")
print("Candidate Tools:")
for tool_item in candidate_tools:
    print(f"- {tool_item['name']}")

print(f"Final Selected Tool: {selected_tool_name}")
