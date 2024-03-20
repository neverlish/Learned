from dotenv import load_dotenv
import os
from openai import OpenAI
load_dotenv()
API_KEY = os.environ['OPENAI_API_KEY']

client = OpenAI(api_key=API_KEY)

# asst_32WTM55evQnQ9MUBJemDHQdg
# assistant = client.beta.assistants.create(
#   name="Math Tutor2",
#   instructions="You are a personal math tutor. Write and run code to answer math questions.",
#   tools=[{"type": "code_interpreter"}],
#   model="gpt-4-1106-preview"
# )

# thread_E9m7BnlpCEtzfRd0l3IRJuqe
# thread = client.beta.threads.create()
# print(thread)

# msg_hOA9TJzfrfHwo2XWqc67WFSi
# message = client.beta.threads.messages.create(
#     thread_id="thread_E9m7BnlpCEtzfRd0l3IRJuqe",
#     role="user",
#     content="I need to solve the equation `3x + 11 = 14`. Can you help me?"
# )
# print(message)


# run_8uGa0XpbGO94XU3lEWLyvdQn
# run = client.beta.threads.runs.create(
#   thread_id="thread_E9m7BnlpCEtzfRd0l3IRJuqe",
#   assistant_id="asst_32WTM55evQnQ9MUBJemDHQdg",
#   instructions="Please address the user as Jane Doe. The user has a premium account."
# )

# run = client.beta.threads.runs.retrieve(
#   thread_id="thread_E9m7BnlpCEtzfRd0l3IRJuqe",
#   run_id="run_8uGa0XpbGO94XU3lEWLyvdQn"
# )

# print(run)

messages = client.beta.threads.messages.list(
  thread_id="thread_E9m7BnlpCEtzfRd0l3IRJuqe"
)

# for i in messages:
#     print(i)

print(messages.data[0].content[0].text.value)