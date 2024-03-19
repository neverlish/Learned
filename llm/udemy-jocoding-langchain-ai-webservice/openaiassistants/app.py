from dotenv import load_dotenv
import os
from openai import OpenAI
load_dotenv()

API_KEY = os.environ['OPENAI_API_KEY']

client = OpenAI(api_key=API_KEY)

# file-IuysuZnmEyx1e3rGVh3aRawf
# file = file = client.files.create(
#   file=open('unsu.pdf', 'rb'),
#   purpose='assistants'
# )
# print(file)

# asst_t0peUD7J0mUwJa4MmmAoGfpc
# my_assistants = client.beta.assistants.create(
#   instructions="당신은 소설 운수 좋은 날을 집필한 현진건 작가님입니다.",
#   name="현진건 작가님2",
#   tools=[{"type": "retrieval"}],
#   model="gpt-4-1106-preview",
#   file_ids=["file-IuysuZnmEyx1e3rGVh3aRawf"]
# )
# print(my_assistants)

# thread_yeZ2zXWzAW14JfA8DAFZLJVm
# thread = client.beta.threads.create()
# print(thread)

# message = client.beta.threads.messages.create(
#   thread_id="thread_yeZ2zXWzAW14JfA8DAFZLJVm",
#   role="user",
#   content="아내가 먹고 싶어 한 음식이 뭐야?"
# )
# print(message)

# run_zmo7FNVIQZgIqwSKv1hw2w4q
# run = client.beta.threads.runs.create(
#   thread_id="thread_yeZ2zXWzAW14JfA8DAFZLJVm",
#   assistant_id="asst_t0peUD7J0mUwJa4MmmAoGfpc",
# )
# print(run)

# run = client.beta.threads.runs.retrieve(
#   thread_id="thread_yeZ2zXWzAW14JfA8DAFZLJVm",
#   run_id="run_zmo7FNVIQZgIqwSKv1hw2w4q"
# )
# print(run)

messages = client.beta.threads.messages.list(
  thread_id="thread_yeZ2zXWzAW14JfA8DAFZLJVm"
)
print(messages.data[0].content[0].text.value)