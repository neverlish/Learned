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


#LLM
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


grouped_tools = {
    "communication": [
        {
            "name": "send_slack_message",
            "description": "Send a message to a Slack channel for team communication."
        },
        {
            "name": "send_email_notice",
            "description": "Send an email notice to recipients."
        }
    ],
    "computation": [
        {
            "name": "query_wolfram_alpha",
            "description": "Solve equations and compute mathematical expressions."
        },
        {
            "name": "calculate_sum",
            "description": "Return the sum of two numbers."
        }
    ],
    "automation": [
        {
            "name": "trigger_zapier_webhook",
            "description": "Trigger an automated workflow using a webhook."
        },
        {
            "name": "run_batch_job",
            "description": "Run a predefined batch automation job."
        }
    ]
}



# ----------------------------------------------------------
# choose_group()는 사용자 질문과 그룹 설명을 비교해
# 가장 알맞은 그룹을 고르는 함수입니다.
# ----------------------------------------------------------
def choose_group(user_query: str) -> str:
    group_descriptions = {
        "communication": "message email channel team communication notification",
        "computation": "equation math calculate number expression formula",
        "automation": "workflow automation trigger batch job process"
    }

    best_group_name = None
    best_group_score = -1

    for group_name, group_description in group_descriptions.items():
        current_group_score = simple_similarity(user_query, group_description)

        if current_group_score > best_group_score:
            best_group_score = current_group_score
            best_group_name = group_name

    return best_group_name


# ----------------------------------------------------------
# choose_tool_in_group()는 이미 고른 그룹 안에서
# 최종 도구를 하나 고르는 함수입니다. : LLM
# ----------------------------------------------------------
def choose_tool_in_group(user_query: str, group_name: str) -> str:
    tool_list = grouped_tools[group_name]

    selected_tool_name, _ = choose_tool(user_query, tool_list)

    return selected_tool_name

user_query = "Please send a message to the team channel when the task finishes."

selected_group_name = choose_group(user_query)


selected_tool_name = choose_tool_in_group(user_query, selected_group_name)


print("==============================================")
print(f"User Query: {user_query}")
print(f"Selected Group: {selected_group_name}")
print(f"Selected Tool: {selected_tool_name}")
