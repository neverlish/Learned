from collections import Counter
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage

def manager_decision(user_message: str) -> str:
    system_message = SystemMessage(
        content=(
            "당신은 물류 업무 manager입니다.\n"
            "사용자 요청을 보고 담당 agent를 하나만 선택하세요.\n"
            "가능한 선택: inventory, transportation, supplier\n"
            "설명하지 말고 선택지만 답하세요."
        )
    )
    human_message = HumanMessage(content=user_message)
    response = llm.invoke([system_message, human_message])

    choice = response.content.strip().lower()

    if choice not in valid_choices:
        return "unknown"

    return choice


def collect_agent_vote(agent_role: str, user_message: str) -> str:

    system_message = SystemMessage(
        content=(
            f"당신은 {agent_role} 관점의 물류 전문가입니다.\n"
            "사용자 요청이 어떤 담당 agent에게 가장 적절한지 선택하세요.\n"
            "가능한 선택: inventory, transportation, supplier\n"
            "설명하지 말고 선택지만 답하세요."
        )
    )
    human_message = HumanMessage(content=user_message)

    response = llm.invoke([system_message, human_message])

    choice = response.content.strip().lower()

    if choice not in valid_choices:
        return "unknown"

    return choice


def democratic_decision(user_message: str) -> str:

    agent_roles = ["inventory", "transportation", "supplier"]

    votes = []

    for role in agent_roles:

        vote = collect_agent_vote(role, user_message)

        votes.append(vote)

    clean_votes = [vote for vote in votes if vote in valid_choices]

    if not clean_votes:
        return "unknown"

    # ["i", "i", "t"] => [("i",2)]
    final_choice = Counter(clean_votes).most_common(1)[0][0]
    print("66:", Counter(clean_votes).most_common(1))

    return final_choice


llm = ChatOpenAI(model="gpt-5.4-mini", temperature=0)
valid_choices = ["inventory", "transportation", "supplier"]

user_message = "SKU-12345 재고가 부족합니다. 발주 전략과 창고 대응이 필요합니다."
manager_choice = manager_decision(user_message)
democratic_choice = democratic_decision(user_message)

print("manager decision:", manager_choice)
print("democratic decision:", democratic_choice)
