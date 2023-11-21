from langchain.chains import LLMChain
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate

from agents.linkedin_lookup_agent import lookup as linkedin_lookup_agent
from agents.twitter_lookup_agent import lookup as twitter_lookup_agent
from third_parties.linkedin import scrape_linkedin_profile
from third_parties.twitter import scrape_user_tweets

if __name__ == "__main__":
    print("hello Langchain!")

    linkedin_profie_url = linkedin_lookup_agent(name="Eden Marco")
    linkedin_data = scrape_linkedin_profile(linkedin_profie_url=linkedin_profie_url)

    twitter_username = twitter_lookup_agent(name="Eden Marco")
    tweets = scrape_user_tweets(username=twitter_username)

    summary_template = """
        given the Linkedin information {linkedin_information} and twitter {twitter_information} about a person from I want you to create:
        1. a short summary
        2. two interesting facts about them
        3. A topic that may interest them
        4. 2 creative Ice breakers to open a conversation with them
    """

    summary_prompt_template = PromptTemplate(
        input_variables=["linkedin_information", "twitter_information"], template=summary_template
    )
    
    llm = ChatOpenAI(temperature=0, model_name="gpt-3.5-turbo")

    chain = LLMChain(llm=llm, prompt=summary_prompt_template)

    print(chain.run(linkedin_information=linkedin_data, twitter_information=tweets))