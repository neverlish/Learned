llm_config = {
    "model": "gpt-4o", 
    }

import autogen
import streamlit as st

from st_paywall import add_auth

st.set_page_config(layout="wide")
st.title("⚡ My AI agents portfolio analysis app ⚡")
st.markdown("""
Welcome to my portfolio analysis app!
            
Because running AI agents is expensive, you'll need to subscribe to access my app, but not to worry, you'll have 24 hours of trial time to determine if you really need this app before having to commit for a cheap and affordable monthly subscription. Enjoy!
            """)

add_auth(
    required=True,
    login_button_text="Login with Google",
    login_button_color="#FD504D",
    login_sidebar=False,
)

#after authentication, the email and subscription status is stored in session state
st.write("You are logged in as " + st.session_state.email)
st.write("Subscription status? " + str(st.session_state.user_subscribed))

writing_tasks = [
        """Develop an engaging financial report using all information provided, include the normalized_prices.png figure,
        and other figures if provided.
        Mainly rely on the information provided. 
        Create a table comparing all the fundamental ratios and data.
        Provide comments and description of all the fundamental ratios and data.
        Compare the stocks, consider their correlation and risks, provide a comparative analysis of the stocks.
        Provide a summary of the recent news about each stock. 
        Ensure that you comment and summarize the news headlines for each stock, provide a comprehensive analysis of the news.
        Provide connections between the news headlines provided and the fundamental ratios.
        Provide an analysis of possible future scenarios. 
        """]

financial_assistant = autogen.AssistantAgent(
    name="Financial_assistant",
    llm_config=llm_config,
)
research_assistant = autogen.AssistantAgent(
    name="Researcher",
    llm_config=llm_config,
)

writer = autogen.AssistantAgent(
    name="writer",
    llm_config=llm_config,
    system_message="""
        You are a professional writer, known for
        your insightful and engaging finance reports.
        You transform complex concepts into compelling narratives. 
        Include all metrics provided to you as context in your analysis.
        Only answer with the financial report written in markdown directly, do not include a markdown language block indicator.
        Only return your final work without additional comments.
        """,
)

# ===

critic = autogen.AssistantAgent(
    name="Critic",
    is_termination_msg=lambda x: x.get("content", "").find("TERMINATE") >= 0,
    llm_config=llm_config,
    system_message="You are a critic. You review the work of "
                "the writer and provide constructive "
                "feedback to help improve the quality of the content.",
)

legal_reviewer = autogen.AssistantAgent(
    name="Legal Reviewer",
    llm_config=llm_config,
    system_message="You are a legal reviewer, known for "
        "your ability to ensure that content is legally compliant "
        "and free from any potential legal issues. "
        "Make sure your suggestion is concise (within 3 bullet points), "
        "concrete and to the point. "
        "Begin the review by stating your role.",
)

consistency_reviewer = autogen.AssistantAgent(
    name="Consistency reviewer",
    llm_config=llm_config,
    system_message="You are a consistency reviewer, known for "
        "your ability to ensure that the written content is consistent throughout the report. "
        "Refer numbers and data in the report to determine which version should be chosen " 
        "in case of contradictions. "
        "Make sure your suggestion is concise (within 3 bullet points), "
        "concrete and to the point. "
        "Begin the review by stating your role. ",
)

textalignment_reviewer = autogen.AssistantAgent(
    name="Text alignment reviewer",
    llm_config=llm_config,
    system_message="You are a text data alignment reviewer, known for "
        "your ability to ensure that the meaning of the written content is aligned "
        "with the numbers written in the text. " 
        "You must ensure that the text clearely describes the numbers provided in the text "
        "without contradictions. "
        "Make sure your suggestion is concise (within 3 bullet points), "
        "concrete and to the point. "
        "Begin the review by stating your role. ",
)

completion_reviewer = autogen.AssistantAgent(
    name="Completion Reviewer",
    llm_config=llm_config,
    system_message="You are a content completion reviewer, known for "
        "your ability to check that financial reports contain all the required elements. "
        "You always verify that the report contains: a news report about each asset, " 
        "a description of the different ratios and prices, "
        "a description of possible future scenarios, a table comparing fundamental ratios and "
        " at least a single figure. "
        "Make sure your suggestion is concise (within 3 bullet points), "
        "concrete and to the point. "
        "Begin the review by stating your role. ",
)

meta_reviewer = autogen.AssistantAgent(
    name="Meta Reviewer",
    llm_config=llm_config,
    system_message="You are a meta reviewer, you aggregate and review "
    "the work of other reviewers and give a final suggestion on the content.",
)

def reflection_message(recipient, messages, sender, config):
    return f'''Review the following content. 
            \n\n {recipient.chat_messages_for_summary(sender)[-1]['content']}'''

review_chats = [
    {
    "recipient": legal_reviewer, "message": reflection_message, 
     "summary_method": "reflection_with_llm",
     "summary_args": {"summary_prompt" : 
        "Return review into a JSON object only:"
        "{'Reviewer': '', 'Review': ''}.",},
     "max_turns": 1},
    {"recipient": textalignment_reviewer, "message": reflection_message, 
     "summary_method": "reflection_with_llm",
     "summary_args": {"summary_prompt" : 
        "Return review into a JSON object only:"
        "{'reviewer': '', 'review': ''}",},
     "max_turns": 1},
    {"recipient": consistency_reviewer, "message": reflection_message, 
     "summary_method": "reflection_with_llm",
     "summary_args": {"summary_prompt" : 
        "Return review into a JSON object only:"
        "{'reviewer': '', 'review': ''}",},
     "max_turns": 1},
    {"recipient": completion_reviewer, "message": reflection_message, 
     "summary_method": "reflection_with_llm",
     "summary_args": {"summary_prompt" : 
        "Return review into a JSON object only:"
        "{'reviewer': '', 'review': ''}",},
     "max_turns": 1},
     {"recipient": meta_reviewer, 
      "message": "Aggregrate feedback from all reviewers and give final suggestions on the writing.", 
     "max_turns": 1},
]

critic.register_nested_chats(
    review_chats,
    trigger=writer,
)

# ===

user_proxy_auto = autogen.UserProxyAgent(
    name="User_Proxy_Auto",
    human_input_mode="NEVER",
    is_termination_msg=lambda x: x.get("content", "") and x.get("content", "").rstrip().endswith("TERMINATE"),
    code_execution_config={
        "last_n_messages": 3,
        "work_dir": "coding",
        "use_docker": False,
    },  
)

assets = st.text_input("Assets you want to analyze (provide the tickers)?")
hit_button = st.button('Start analysis')

if hit_button is True:

    from datetime import datetime
    date_str = datetime.now().strftime("%Y-%m-%d")

    financial_tasks = [
        f"""Today is the {date_str}. 
        What are the current stock prices of {assets}, and how is the performance over the past 6 months in terms of percentage change? 
        Start by retrieving the full name of each stock and use it for all future requests.
        Prepare a figure of the normalized price of these stocks and save it to a file named normalized_prices.png. Include information about, if applicable: 
        * P/E ratio
        * Forward P/E
        * Dividends
        * Price to book
        * Debt/Eq
        * ROE
        * Analyze the correlation between the stocks
        Do not use a solution that requires an API key.
        If some of the data does not makes sense, such as a price of 0, change the query and re-try.""",

        """Investigate possible reasons of the stock performance leveraging market news headlines from Bing News or Google Search. Retrieve news headlines using python and return them. Use the full name stocks to retrieve headlines. Retrieve at least 10 headlines per stock. Do not use a solution that requires an API key. Do not perform a sentiment analysis.""",
    ]

    with st.spinner("Agents working on the analysis...."):
        chat_results = autogen.initiate_chats(
            [
                {
                    "sender": user_proxy_auto,
                    "recipient": financial_assistant,
                    "message": financial_tasks[0],
                    "silent": False,
                    "summary_method": "reflection_with_llm",
                    "summary_args": {
                        "summary_prompt" : "Return the stock prices of the stocks, their performance and all other metrics"
                        "into a JSON object only. Provide the name of all figure files created. Provide the full name of each stock.",
                                    },
                    "clear_history": False,
                    "carryover": "Wait for confirmation of code execution before terminating the conversation. Verify that the data is not completely composed of NaN values. Reply TERMINATE in the end when everything is done."
                },
                {
                    "sender": user_proxy_auto,
                    "recipient": research_assistant,
                    "message": financial_tasks[1],
                    "silent": False,
                    "summary_method": "reflection_with_llm",
                    "summary_args": {
                        "summary_prompt" : "Provide the news headlines as a paragraph for each stock, be precise but do not consider news events that are vague, return the result as a JSON object only.",
                                    },
                    "clear_history": False,
                    "carryover": "Wait for confirmation of code execution before terminating the conversation. Reply TERMINATE in the end when everything is done."
                },
                {
                    "sender": critic,
                    "recipient": writer,
                    "message": writing_tasks[0],
                    "carryover": "I want to include a figure and a table of the provided data in the financial report.",
                    "max_turns": 2,
                    "summary_method": "last_msg",
                }
            ]
        )

    st.image("./coding/normalized_prices.png")
    st.markdown(chat_results[-1].chat_history[-1]["content"])
