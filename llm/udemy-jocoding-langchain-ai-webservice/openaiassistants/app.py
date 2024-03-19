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